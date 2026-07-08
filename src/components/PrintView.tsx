import { useSim } from "../engine/store";
import { CHAPTERS, branch9 } from "../content/chapters";

export function PrintView({ onBack }: { onBack: () => void }) {
  const sim = useSim();
  const entries = Object.entries(sim.progress)
    .map(([id, p]) => ({ id: Number(id), ...p }))
    .filter((e) => e.reflection.trim().length > 0)
    .sort((a, b) => a.id - b.id);

  const titleFor = (id: number): string => {
    if (CHAPTERS[id]) return CHAPTERS[id].title;
    if (id === 9) {
      const b = sim.branches.find((x) => x.chapterId === 9);
      if (b) return branch9.variants[b.variantId]?.title ?? "Week 9";
    }
    return `Week ${id}`;
  };
  const promptFor = (id: number): string => {
    if (CHAPTERS[id]) return CHAPTERS[id].reflectionPrompt;
    if (id === 9) {
      const b = sim.branches.find((x) => x.chapterId === 9);
      if (b) return branch9.variants[b.variantId]?.reflectionPrompt ?? "";
    }
    return "";
  };

  return (
    <div className="print-page">
      <div className="no-print" style={{ marginBottom: "1.5rem", display: "flex", gap: "0.8rem" }}>
        <button className="btn-quiet" onClick={onBack}>
          ← Back to the record
        </button>
        <button className="btn-quiet" onClick={() => window.print()}>
          Print / save as PDF
        </button>
      </div>
      <div className="eyebrow">Solari Foods · International Markets · end-of-module portfolio</div>
      <h1>Notes to the Board</h1>
      <p style={{ color: "#555", fontStyle: "italic" }}>
        The adviser's written reflections, collated from the file in the order they were entered.
      </p>
      {entries.length === 0 && <p style={{ marginTop: "2rem" }}>No reflections written yet.</p>}
      {entries.map((e) => {
        const d = sim.decisions.find((x) => x.chapterId === e.id);
        return (
          <div className="print-entry" key={e.id}>
            <h3>
              Week {String(e.id).padStart(2, "0")} — {titleFor(e.id)}
            </h3>
            {d && <p className="p-class">The call entered: “{d.classificationName}”</p>}
            <p style={{ fontSize: "0.85rem", color: "#777", marginBottom: "0.6rem" }}>{promptFor(e.id)}</p>
            <p style={{ whiteSpace: "pre-wrap" }}>{e.reflection}</p>
          </div>
        );
      })}
      <p className="no-print commit-note" style={{ marginTop: "3rem" }}>
        Note for the pilot: this export lives in your browser only — LMS/gradebook integration is future scope.
      </p>
    </div>
  );
}
