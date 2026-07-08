import { useCallback, useEffect, useMemo, useState } from "react";
import { Home } from "./components/Home";
import { ChapterView } from "./components/ChapterView";
import { BoardRecord } from "./components/BoardRecord";
import { BoardReport } from "./components/BoardReport";
import { PrintView } from "./components/PrintView";
import { CHAPTERS, branch9 } from "./content/chapters";
import { resolveBranch } from "./engine/branch";
import { useSim, roleForWeek, isUnlocked, PLAYABLE } from "./engine/store";

type View =
  | { name: "home" }
  | { name: "chapter"; id: number }
  | { name: "record" }
  | { name: "report" }
  | { name: "print" };

function parseHash(): View {
  const h = window.location.hash.replace(/^#\/?/, "");
  const week = h.match(/^week\/(\d+)$/);
  if (week) return { name: "chapter", id: Number(week[1]) };
  if (h === "record") return { name: "record" };
  if (h === "letter") return { name: "report" };
  if (h === "print") return { name: "print" };
  return { name: "home" };
}

function hashFor(v: View): string {
  switch (v.name) {
    case "chapter":
      return `#/week/${v.id}`;
    case "record":
      return "#/record";
    case "report":
      return "#/letter";
    case "print":
      return "#/print";
    default:
      return "#/desk";
  }
}

export default function App() {
  const [view, setView] = useState<View>(() => parseHash());
  const sim = useSim();

  // View → URL. URL → view (back/forward, deep links).
  const navigate = useCallback((v: View) => {
    if (window.location.hash !== hashFor(v)) window.location.hash = hashFor(v);
    setView(v);
  }, []);
  useEffect(() => {
    const onHash = () => setView(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Guard deep links to locked weeks: bounce to the desk.
  useEffect(() => {
    if (view.name === "chapter" && !isUnlocked(view.id, sim.progress)) {
      navigate({ name: "home" });
    }
  }, [view, sim.progress, navigate]);

  // Move focus to the main heading on navigation — screen readers and
  // keyboard users land where the content starts.
  useEffect(() => {
    const h = document.querySelector<HTMLElement>("main h1, .coldopen h1, .cabinet-hero h1");
    h?.setAttribute("tabindex", "-1");
    h?.focus({ preventScroll: true });
  }, [view]);

  const currentWeek = PLAYABLE.find((id) => !sim.progress[id]?.completed) ?? null;
  const role = roleForWeek(view.name === "chapter" ? view.id : (currentWeek ?? 9));

  // Resolve week 9 lazily, exactly when it is opened, from live state.
  const resolved9 = useMemo(() => {
    if (view.name !== "chapter" || view.id !== 9) return null;
    const existing = sim.branches.find((b) => b.chapterId === 9);
    if (existing) {
      return { chapter: branch9.variants[existing.variantId], record: existing, isNew: false };
    }
    const { rule, variant, contributors } = resolveBranch(branch9, sim.strategy, sim.decisions);
    const record = {
      chapterId: 9,
      variantId: rule.variantId,
      variantTitle: variant.title,
      explanation: rule.explanation,
      contributors,
    };
    return { chapter: variant, record, isNew: true };
  }, [view, sim.branches, sim.strategy, sim.decisions]);

  useEffect(() => {
    if (resolved9?.isNew) sim.recordBranch(resolved9.record);
  }, [resolved9]);

  const chapter =
    view.name === "chapter" ? (view.id === 9 ? resolved9?.chapter : CHAPTERS[view.id]) : undefined;

  const context =
    view.name === "chapter" && chapter
      ? `Week ${String(chapter.id).padStart(2, "0")} · ${chapter.title}`
      : view.name === "record"
        ? "The Board Record"
        : view.name === "report"
          ? "The Board's Letter"
          : role.title;

  // What comes after this chapter closes: the next week, or the letter.
  const nextAfter = (id: number): { label: string; go: () => void } => {
    const idx = PLAYABLE.indexOf(id);
    const next = idx >= 0 && idx < PLAYABLE.length - 1 ? PLAYABLE[idx + 1] : null;
    if (next) return { label: `Open week ${next}`, go: () => navigate({ name: "chapter", id: next }) };
    return { label: "Read the board's letter", go: () => navigate({ name: "report" }) };
  };

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <nav className="topbar no-print" aria-label="File navigation">
        <button className="brand" onClick={() => navigate({ name: "home" })} aria-label="Return to the desk">
          The Solari File
        </button>
        <span className="role">{context}</span>
        <div className="actions">
          <button
            className={`btn-quiet${view.name === "home" ? " active" : ""}`}
            aria-current={view.name === "home" ? "page" : undefined}
            onClick={() => navigate({ name: "home" })}
          >
            Desk
          </button>
          <button
            className={`btn-quiet${view.name === "record" ? " active" : ""}`}
            aria-current={view.name === "record" ? "page" : undefined}
            onClick={() => navigate({ name: "record" })}
          >
            Record
          </button>
        </div>
      </nav>

      {view.name === "home" && (
        <Home
          onOpen={(id) => navigate({ name: "chapter", id })}
          onOpenReport={() => navigate({ name: "report" })}
        />
      )}
      {view.name === "chapter" && chapter && (
        <ChapterView
          key={view.id}
          chapter={chapter}
          branchRecord={view.id === 9 ? resolved9?.record : undefined}
          next={nextAfter(view.id)}
          onClose={() => navigate({ name: "home" })}
        />
      )}
      {view.name === "record" && (
        <main id="main">
          <BoardRecord onPrint={() => navigate({ name: "print" })} />
        </main>
      )}
      {view.name === "report" && (
        <main id="main">
          <BoardReport />
        </main>
      )}
      {view.name === "print" && (
        <main id="main">
          <PrintView onBack={() => navigate({ name: "record" })} />
        </main>
      )}
    </>
  );
}
