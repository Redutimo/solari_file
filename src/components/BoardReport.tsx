import { useMemo } from "react";
import { useSim } from "../engine/store";
import { buildBoardReport } from "../engine/report";
import { branch9 } from "../content/chapters";
import { Reveal } from "./Reveal";

/**
 * The Board's Letter: unlocked when every playable file is closed.
 * Ends with the route reveal — the paths taken and not taken.
 */
export function BoardReport() {
  const sim = useSim();
  const report = useMemo(
    () => buildBoardReport(sim.strategy, sim.kpis, sim.decisions, sim.branches, sim.progress),
    [sim.strategy, sim.kpis, sim.decisions, sim.branches, sim.progress]
  );
  const takenVariant = sim.branches.find((b) => b.chapterId === 9)?.variantId;
  const unopened = branch9.rules
    .filter((r) => r.variantId !== takenVariant)
    .map((r) => ({
      id: r.variantId,
      title: branch9.variants[r.variantId].title,
      topic: branch9.variants[r.variantId].topic.replace("Market Entry Complication — Variant: ", ""),
      note: r.unseenNote,
    }));

  return (
    <div className="record-page">
      <Reveal>
        <article className="artifact memo report-letter">
          <span className="stamp">BOARD — IN CONFIDENCE</span>
          <div className="a-head">
            <div className="letterhead">SOLARI · ALBA · MCMXXXIV</div>
            <div><strong>From:</strong> The Board of Solari Foods S.p.A.</div>
            <div><strong>To:</strong> The adviser, International Markets</div>
          </div>
          <div className="a-subject">Interim assessment — Latin America programme, weeks 1–9</div>
          <div className="a-body">
            {report.opening.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p>{report.branchAssessment}</p>
            <p>{report.reflectionNote}</p>
          </div>
        </article>
      </Reveal>

      <section className="record-section" aria-label="The board's marks">
        <h2>The board's marks</h2>
        {report.grades.map((g) => (
          <Reveal key={g.dimension}>
            <div className="grade-row">
              <div className="grade-head">
                <span className="grade-dim">{g.dimension}</span>
                <span className="grade-score">{g.score}</span>
              </div>
              <div className="sv-track" role="img" aria-label={`${g.dimension}: ${g.score} out of 100`}>
                <span className="sv-fill" style={{ left: 0, width: `${g.score}%` }} />
              </div>
              <p className="grade-comment">{g.comment}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="record-section" aria-label="The files you never opened">
        <h2>The files you never opened</h2>
        <p style={{ marginBottom: "1.4rem" }}>
          Week 9 had three possible files. Your decisions chose one. These are the other two —
          still sealed, and now you know why.
        </p>
        {sim.branches.map((b) => (
          <div className="branch-reveal" key={b.chapterId} style={{ marginBottom: "1.4rem" }}>
            <h3>The file you received — {b.variantTitle}</h3>
            <p className="why">{b.explanation}</p>
            {b.contributors.length > 0 && (
              <ul>
                {b.contributors.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <div className="unopened-row">
          {unopened.map((u) => (
            <Reveal key={u.id}>
              <div className="unopened-file">
                <span className="stamp">Never opened</span>
                <div className="uf-topic">{u.topic}</div>
                <div className="uf-title">{u.title}</div>
                <p className="uf-note">{u.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="commit-note" style={{ marginTop: "1.2rem" }}>
          Two more forks — weeks 12 and 15 — stay sealed until the full term.
        </p>
      </section>

      <Reveal>
        <p className="epilogue-copy" style={{ marginTop: "3rem" }}>
          {report.closing}
        </p>
      </Reveal>
    </div>
  );
}
