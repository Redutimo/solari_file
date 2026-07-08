import { useEffect, useMemo, useRef, useState } from "react";
import type { BranchRecord, ChapterContent, Classification, KpiKey, PersonaReaction } from "../engine/types";
import { KPI_LABELS } from "../engine/types";
import { useSim } from "../engine/store";
import { gradeReflectionText, biaMode } from "../engine/adaptivity";
import { PERSONAS } from "../content/personas";
import { PLAYABLE } from "../engine/store";
import { Reveal, useScrollProgress, usePrefersReducedMotion } from "./Reveal";
import { ArtifactView } from "./ArtifactView";
import { DecisionBlock } from "./DecisionBlock";
import { KnowledgeCheck } from "./KnowledgeCheck";

function fmtKpi(key: KpiKey, v: number): string {
  switch (key) {
    case "budget":
      return `€${Math.round(v)}k`;
    case "marketShare":
      return `${v.toFixed(1)}%`;
    case "customerGrowth":
      return `${v.toFixed(1)}%/mo`;
    default:
      return `${Math.round(v)}`;
  }
}

/** Turn a persona reaction into its in-world document form. */
function reactionArtifact(r: PersonaReaction, weekId: number) {
  const p = PERSONAS[r.personaId];
  const base = { kind: r.kind, body: r.text, ps: r.ps, portrait: r.personaId } as const;
  switch (r.kind) {
    case "letter":
      return { ...base, from: p ? `${p.role} · ${p.location}` : undefined };
    case "message":
      return { ...base, from: p ? p.name : undefined };
    case "compliance":
      return {
        ...base,
        from: p ? `${p.name} — Regulatory & Compliance` : undefined,
        subject: `Ref. SF/W${String(weekId).padStart(2, "0")} — filed same day`,
      };
    case "sticky":
      return { ...base, from: "Bia" };
    default:
      return { ...base, from: p ? `${p.name} — ${p.role}` : r.personaId };
  }
}

/** Right-edge wayfinding rail: where you are in the file, click to jump. */
function ChapterRail({ committed }: { committed: boolean }) {
  const beats = useMemo(
    () =>
      [
        { id: "sec-file", label: "The file" },
        { id: "sec-check", label: "Desk check" },
        { id: "sec-decision", label: "Decision" },
        ...(committed
          ? [
              { id: "sec-reaction", label: "Reaction" },
              { id: "sec-consequences", label: "Consequences" },
              { id: "sec-reflection", label: "Reflection" },
              { id: "sec-epilogue", label: "Epilogue" },
            ]
          : []),
      ],
    [committed]
  );
  const [active, setActive] = useState<string>("sec-file");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px" }
    );
    beats.forEach((b) => {
      const el = document.getElementById(b.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [beats]);

  return (
    <nav className="chapter-rail no-print" aria-label="Position in this file">
      {beats.map((b) => (
        <a
          key={b.id}
          href={`#${b.id}`}
          className={`rail-dot${active === b.id ? " active" : ""}`}
          aria-current={active === b.id ? "true" : undefined}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(b.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          <span className="rail-label">{b.label}</span>
        </a>
      ))}
    </nav>
  );
}

export function ChapterView({
  chapter,
  branchRecord,
  next,
  onClose,
}: {
  chapter: ChapterContent;
  branchRecord?: BranchRecord;
  next: { label: string; go: () => void };
  onClose: () => void;
}) {
  const sim = useSim();
  const scroll = useScrollProgress();
  const reduced = usePrefersReducedMotion();

  const existing = sim.decisions.find((d) => d.chapterId === chapter.id);
  const [committed, setCommitted] = useState<Classification | null>(
    existing ? chapter.decision.classifications.find((c) => c.id === existing.classificationId) ?? null : null
  );
  const quizPassed = sim.progress[chapter.id]?.quizPassed === true;
  const [reflection, setReflection] = useState(sim.progress[chapter.id]?.reflection ?? "");
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const saveTimer = useRef<number | null>(null);
  const alreadyComplete = sim.progress[chapter.id]?.completed === true;

  useEffect(() => {
    // "instant" bypasses the global smooth scroll-behavior — a new file
    // should start at the top, not animate its way there.
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [chapter.id]);

  const onReflect = (text: string) => {
    setReflection(text);
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      sim.saveReflection(chapter.id, text);
      setSavedAt(Date.now());
    }, 600);
  };

  const handleCommit = (values: Record<string, number>, c: Classification) => {
    sim.applyDecision({
      chapterId: chapter.id,
      decisionId: chapter.decision.id,
      values,
      classificationId: c.id,
      classificationName: c.name,
      stateDeltas: c.effects.state,
      kpiDeltas: c.effects.kpis,
      timestamp: Date.now(),
    });
    if (chapter.frontpage) {
      const fp = chapter.frontpage(c.name);
      sim.recordHeadline({ chapterId: chapter.id, headline: fp.headline, standfirst: fp.standfirst });
    }
    setCommitted(c);
    // Carry the reader forward to the consequences.
    window.setTimeout(() => {
      document.getElementById("sec-reaction")?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    }, 450);
  };

  const completeChapter = () => {
    const quality = gradeReflectionText(reflection, chapter.terms);
    sim.saveReflection(chapter.id, reflection);
    sim.gradeReflection(
      chapter.id,
      quality,
      `Week ${chapter.id}: reflection graded “${quality}” (heuristic: length + module terminology).`
    );
    sim.completeChapter(chapter.id);
  };

  const bia = useMemo(() => {
    if (!sim.adaptivityEnabled) return null;
    const prior = PLAYABLE.filter((id) => id < chapter.id);
    const qualities = prior.map((id) => sim.progress[id]?.reflectionQuality);
    return biaMode(qualities);
  }, [sim.adaptivityEnabled, sim.progress, chapter.id]);

  const fp = committed && chapter.frontpage ? chapter.frontpage(committed.name) : null;

  return (
    <div className="page">
      <div className="progress-rail" style={{ width: `${scroll * 100}%` }} aria-hidden="true" />
      <ChapterRail committed={!!committed} />

      {/* ---- Cold open: typographic title card ---- */}
      <header className="coldopen coldopen-typo">
        <div className="coldopen-inner">
          <div className="week-no">{String(chapter.id).padStart(2, "0")}</div>
          <div className="topic">{chapter.topic}</div>
          <h1>{chapter.title}</h1>
          <p className="epigraph">{chapter.coldOpen}</p>
          <div className="module-brief">
            <div className="mb-label">This week you will</div>
            <ul>
              {chapter.outcomes.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
          <div className="scroll-cue">scroll to open the file ↓</div>
        </div>
      </header>

      <main id="main">
        {branchRecord && (
          <section className="section">
            <div className="col">
              <Reveal>
                <div className="branch-reveal">
                  <h3>Why this file reached your desk</h3>
                  <p className="why">{branchRecord.explanation}</p>
                  {branchRecord.contributors.length > 0 && (
                    <>
                      <p className="eyebrow" style={{ marginBottom: "0.4rem" }}>
                        The decisions that led here
                      </p>
                      <ul>
                        {branchRecord.contributors.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        <section className="section" id="sec-file">
          <div className="col col-wide">
            <div className="section-label">The file</div>
            <div className="file-desk">
              {bia === "hint" && (
                <Reveal>
                  <ArtifactView
                    artifact={{
                      kind: "sticky",
                      from: "Bia",
                      body: `quick pointer before the sliders — this week is really about ${chapter.topic.toLowerCase()}. for each pole ask what it COSTS. your last two board notes didn't say + the board reads for that!!`,
                    }}
                  />
                </Reveal>
              )}
              {bia === "stretch" && (
                <Reveal>
                  <ArtifactView
                    artifact={{
                      kind: "sticky",
                      from: "Bia",
                      body: `your board notes have been strong, so — harder one: if Casa Verde could read this week's decision before you made it, would you change it? why not??`,
                    }}
                  />
                </Reveal>
              )}
              {chapter.artifacts.map((a, i) => (
                <Reveal key={i}>
                  <ArtifactView artifact={a} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="sec-check">
          <div className="col">
            <div className="section-label">The desk check</div>
            <Reveal>
              <KnowledgeCheck quiz={chapter.quiz} passed={quizPassed} onPass={() => sim.passQuiz(chapter.id)} />
            </Reveal>
          </div>
        </section>

        <section className="section" id="sec-decision">
          <div className="col">
            <div className="section-label">The decision</div>
            {quizPassed || committed ? (
              <Reveal>
                <DecisionBlock
                  def={chapter.decision}
                  committed={!!committed}
                  committedName={committed?.name}
                  onCommit={handleCommit}
                />
              </Reveal>
            ) : (
              <div className="decision locked" aria-live="polite">
                <h3 className="d-title">{chapter.decision.title}</h3>
                <p className="d-prompt">Clear the desk check above to unlock this decision.</p>
              </div>
            )}
          </div>
        </section>

        {committed && (
          <>
            <section className="section" id="sec-reaction">
              <div className="col">
                <div className="section-label">The reaction</div>
                {committed.reactions.map((r, i) => (
                  <Reveal key={i}>
                    <ArtifactView artifact={reactionArtifact(r, chapter.id)} />
                  </Reveal>
                ))}
              </div>
            </section>

            <section className="section" id="sec-consequences">
              <div className="col">
                <div className="section-label">The consequences</div>
                <Reveal>
                  <p className="reckoning-copy">{committed.reckoning}</p>
                </Reveal>
                <Reveal>
                  <div className="kpi-grid" role="table" aria-label="Key performance indicators after this decision">
                    {(Object.keys(KPI_LABELS) as KpiKey[]).map((k) => {
                      const delta = committed.effects.kpis[k] ?? 0;
                      const dir = delta > 0 ? "up" : delta < 0 ? "down" : "flat";
                      const badForUp = k === "riskExposure" || k === "partnerDependency";
                      return (
                        <div className="kpi-cell" key={k} role="row">
                          <div className="k-label">{KPI_LABELS[k]}</div>
                          <div className="k-value">
                            {fmtKpi(k, sim.kpis[k])}
                            <span
                              className={`k-delta ${
                                dir === "flat" ? "flat" : (dir === "up") !== badForUp ? "up" : "down"
                              }`}
                            >
                              {dir === "flat" ? "—" : `${delta > 0 ? "▲" : "▼"} ${Math.abs(delta)}`}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Reveal>
                <Reveal>
                  <div className="concept-note">
                    <div className="cn-label">From the module reader</div>
                    <p>{chapter.conceptNote}</p>
                  </div>
                </Reveal>
              </div>
            </section>

            <section className="section" id="sec-reflection">
              <div className="col">
                <div className="section-label">The reflection</div>
                <Reveal>
                  <div className="reflection">
                    <p className="r-prompt">{chapter.reflectionPrompt}</p>
                    <textarea
                      value={reflection}
                      onChange={(e) => onReflect(e.target.value)}
                      aria-label="Your written reflection for the board"
                      placeholder="From the desk of the adviser…"
                    />
                    <div className="r-meta">
                      <span>{reflection.trim() ? `${reflection.trim().split(/\s+/).length} words` : "unwritten"}</span>
                      <span>{savedAt ? "autosaved" : "autosaves as you type"}</span>
                    </div>
                    <p className="r-hint">The board reads these — your strongest note is quoted back in the end-of-term letter.</p>
                  </div>
                </Reveal>
              </div>
            </section>

            <section className="section" id="sec-epilogue">
              <div className="col">
                <div className="section-label">Epilogue</div>
                <Reveal>
                  <p className="epilogue-copy">{chapter.epilogue}</p>
                </Reveal>
                {fp && (
                  <Reveal>
                    <ArtifactView artifact={{ kind: "frontpage", subject: fp.headline, body: fp.standfirst }} />
                  </Reveal>
                )}
                <div className="close-file-row">
                  <button
                    className="btn-commit"
                    onClick={() => {
                      completeChapter();
                      next.go();
                    }}
                  >
                    Close the file → {next.label.toLowerCase()}
                  </button>
                  <button
                    className="btn-quiet"
                    style={{ marginLeft: "0.8rem" }}
                    onClick={() => {
                      completeChapter();
                      onClose();
                    }}
                  >
                    Close and return to the desk
                  </button>
                  <p className="commit-note">
                    {alreadyComplete
                      ? "This file is already closed — changes to the reflection still save."
                      : "Your reflection is saved to the board record on the way out."}
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
