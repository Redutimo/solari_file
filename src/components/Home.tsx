import { ALL_WEEKS } from "../content/chapters";
import { isUnlocked, useSim, roleForWeek, PLAYABLE } from "../engine/store";
import { Reveal } from "./Reveal";

/**
 * The cabinet: only closed files and the one on your desk are visible.
 * The rest of the term stays in the drawer — the routes are revealed at the
 * end, in the board's letter, not up front.
 */
export function Home({ onOpen, onOpenReport }: { onOpen: (id: number) => void; onOpenReport: () => void }) {
  const sim = useSim();

  const completedCount = PLAYABLE.filter((id) => sim.progress[id]?.completed).length;
  const currentWeek = PLAYABLE.find((id) => !sim.progress[id]?.completed) ?? null;
  const allDone = currentWeek === null;
  const role = roleForWeek(currentWeek ?? 9);

  // Show only: completed playable weeks + the current one. Nothing ahead.
  const visible = ALL_WEEKS.filter(
    (w) => PLAYABLE.includes(w.id) && (sim.progress[w.id]?.completed || w.id === currentWeek)
  );

  return (
    <div className="page">
      <header className="cabinet-hero cabinet-hero-typo">
        <div className="hero-inner">
          <div className="eyebrow">Global Board · Value Creation Across Markets</div>
          <h1>The Solari File</h1>
          <p className="standfirst">
            Solari Foods, a family-owned Italian food house, is expanding into Latin America.
            You are its international marketing adviser. Each week, a new file reaches your desk.
          </p>
          <p className="hero-status">
            {role.title}
            {role.nextAt ? ` · promotion at week ${role.nextAt}` : ""} · {completedCount} of{" "}
            {PLAYABLE.length} files closed
          </p>
          <div className="hero-cta">
            {allDone ? (
              <button className="btn-commit" onClick={onOpenReport}>
                Read the board's letter
              </button>
            ) : (
              <button className="btn-commit" onClick={() => onOpen(currentWeek!)}>
                {completedCount === 0 ? `Begin — open week ${currentWeek}` : `Continue — open week ${currentWeek}`}
              </button>
            )}
          </div>
        </div>
      </header>

      <main id="main" className="folder-list">
        <div className="section-label">Your desk</div>
        {visible.map((w) => {
          const prog = sim.progress[w.id];
          const unlocked = isUnlocked(w.id, sim.progress);
          const status = prog?.completed ? "done" : unlocked ? "open" : "locked";
          const showTitle = w.id !== 9 || prog?.decided || sim.branches.some((b) => b.chapterId === 9);
          return (
            <Reveal key={w.id}>
              <button
                className="folder"
                disabled={!unlocked}
                onClick={() => onOpen(w.id)}
                aria-label={`Week ${w.id}: ${showTitle ? w.title : "contents shaped by your earlier decisions"}. ${
                  status === "done" ? "Complete. Reopen to review." : "Open this file."
                }`}
              >
                <span className="f-week">{String(w.id).padStart(2, "0")}</span>
                <span className="f-titles">
                  <span className="f-title">{showTitle ? w.title : "— shaped by your file —"}</span>
                  <br />
                  <span className="f-topic">{w.topic}</span>
                </span>
                <span className={`f-status ${status}`}>
                  {status === "done" ? "closed" : "on your desk"}
                </span>
              </button>
            </Reveal>
          );
        })}

        {allDone && (
          <Reveal>
            <button className="folder folder-report" onClick={onOpenReport} aria-label="The board's letter: your end-of-term assessment and the route map.">
              <span className="f-week">✉</span>
              <span className="f-titles">
                <span className="f-title">The Board's Letter</span>
                <br />
                <span className="f-topic">Your half-term assessment — and the routes you did and didn't take</span>
              </span>
              <span className="f-status open">delivered</span>
            </button>
          </Reveal>
        )}

        <p className="commit-note" style={{ marginTop: "2rem", textAlign: "center" }}>
          {allDone
            ? "All six files are closed. Weeks 6–8 and 10–16 arrive in the full-term release."
            : `Week ${currentWeek} is on your desk. The rest of the term stays in the cabinet until you get there.`}
        </p>
      </main>
    </div>
  );
}
