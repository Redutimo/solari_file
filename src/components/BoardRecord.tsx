import { useState } from "react";
import { useSim, INITIAL_KPIS } from "../engine/store";
import { KPI_LABELS, STATE_LABELS, type KpiKey, type StateVar } from "../engine/types";
import { PERSONAS } from "../content/personas";
import { PersonaPortrait } from "./PersonaPortrait";

const STATE_RANGES: Record<StateVar, [number, number]> = {
  standardizationVsAdaptation: [-100, 100],
  entryRiskAppetite: [-100, 100],
  culturalSensitivityScore: [0, 100],
  regulatoryComplianceScore: [0, 100],
  localPartnerTrust: [0, 100],
};

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

export function BoardRecord({ onPrint }: { onPrint: () => void }) {
  const sim = useSim();
  const [confirmingReset, setConfirmingReset] = useState(false);

  return (
    <div className="record-page">
      <div className="eyebrow">Solari Foods · International Markets</div>
      <h1>The Board Record</h1>
      <p style={{ color: "var(--ink-soft)", fontStyle: "italic" }}>
        Everything the file remembers: the calls, the numbers, the path — and the paths not taken.
      </p>

      <section className="record-section" aria-label="Current indicators">
        <h2>The indicators, as of this week</h2>
        <div className="kpi-grid">
          {(Object.keys(KPI_LABELS) as KpiKey[]).map((k) => {
            const net = sim.kpis[k] - INITIAL_KPIS[k];
            const badForUp = k === "riskExposure" || k === "partnerDependency";
            const dir = net > 0 ? "up" : net < 0 ? "down" : "flat";
            return (
              <div className="kpi-cell" key={k}>
                <div className="k-label">{KPI_LABELS[k]}</div>
                <div className="k-value">
                  {fmtKpi(k, sim.kpis[k])}
                  <span className={`k-delta ${dir === "flat" ? "flat" : (dir === "up") !== badForUp ? "up" : "down"}`}>
                    {dir === "flat" ? "— steady" : `${net > 0 ? "▲" : "▼"} ${Math.abs(Math.round(net * 10) / 10)} since week 1`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="record-section" aria-label="Strategic position">
        <h2>The strategic position</h2>
        {(Object.keys(STATE_LABELS) as StateVar[]).map((k) => {
          const [lo, hi] = STATE_RANGES[k];
          const v = sim.strategy[k];
          const pct = ((v - lo) / (hi - lo)) * 100;
          const zeroPct = ((0 - lo) / (hi - lo)) * 100;
          return (
            <div className="statevar-row" key={k}>
              <span className="sv-label">{STATE_LABELS[k]}</span>
              <span className="sv-track" role="img" aria-label={`${STATE_LABELS[k]}: ${v} on a scale of ${lo} to ${hi}`}>
                <span
                  className="sv-fill"
                  style={
                    lo < 0
                      ? { left: `${Math.min(zeroPct, pct)}%`, width: `${Math.abs(pct - zeroPct)}%` }
                      : { left: 0, width: `${pct}%` }
                  }
                />
                {lo < 0 && <span className="sv-marker" style={{ left: `${zeroPct}%` }} />}
              </span>
              <span className="sv-value">{Math.round(v)}</span>
            </div>
          );
        })}
        <p className="commit-note">
          These five variables are what the simulation uses to decide which scenarios you meet. Nothing is hidden.
        </p>
      </section>

      {sim.branches.length > 0 && (
        <section className="record-section" aria-label="Branch resolutions">
          <h2>Scenario resolutions</h2>
          {sim.branches.map((b) => (
            <div className="branch-reveal" key={b.chapterId} style={{ marginTop: "1.2rem" }}>
              <h3>
                Week {b.chapterId} resolved as: {b.variantTitle}
              </h3>
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
          <p className="commit-note">The full route map — including the paths you didn't take — is revealed in the board's letter at the end of term.</p>
        </section>
      )}

      <section className="record-section" aria-label="Decision ledger">
        <h2>The ledger</h2>
        {sim.decisions.length === 0 ? (
          <p style={{ color: "var(--ink-soft)" }}>No decisions entered yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="ledger">
              <thead>
                <tr>
                  <th>Week</th>
                  <th>The call</th>
                  <th>Strategic effects</th>
                  <th>Indicator effects</th>
                </tr>
              </thead>
              <tbody>
                {sim.decisions.map((d) => (
                  <tr key={`${d.chapterId}-${d.decisionId}`}>
                    <td className="mono">{String(d.chapterId).padStart(2, "0")}</td>
                    <td>
                      <strong>{d.classificationName}</strong>
                    </td>
                    <td className="mono">
                      {Object.entries(d.stateDeltas)
                        .map(([k, v]) => `${STATE_LABELS[k as StateVar].split(" ")[0]} ${v! > 0 ? "+" : ""}${v}`)
                        .join(" · ") || "—"}
                    </td>
                    <td className="mono">
                      {Object.entries(d.kpiDeltas)
                        .map(([k, v]) => `${KPI_LABELS[k as KpiKey].split(" ")[0]} ${v! > 0 ? "+" : ""}${v}`)
                        .join(" · ") || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {sim.headlines.length > 0 && (
        <section className="record-section" aria-label="Press archive">
          <h2>The clippings drawer</h2>
          <div className="headline-strip">
            {sim.headlines.map((h) => (
              <article className="artifact frontpage" key={h.chapterId} style={{ margin: 0, transform: "none" }}>
                <div className="fp-mast">THE PROVISIONER</div>
                <div className="fp-sub">week {h.chapterId} · from the archive</div>
                <h3 className="fp-headline">{h.headline}</h3>
                <p className="fp-standfirst">{h.standfirst}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="record-section" aria-label="Dramatis personae">
        <h2>Dramatis personae</h2>
        <div style={{ overflowX: "auto" }}>
          <table className="ledger">
            <tbody>
              {Object.values(PERSONAS).map((p) => (
                <tr key={p.id}>
                  <td style={{ width: 56 }}>
                    <PersonaPortrait id={p.id} size={44} />
                  </td>
                  <td>
                    <strong>{p.name}</strong>
                  </td>
                  <td>
                    {p.role}, {p.location}
                  </td>
                  <td style={{ fontStyle: "italic", color: "var(--ink-soft)" }}>{p.voice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="record-section" aria-label="Adaptivity log">
        <h2>The tutor's margin (soft adaptivity)</h2>
        <label style={{ display: "flex", gap: "0.6rem", alignItems: "center", fontFamily: "var(--font-utility)", fontSize: "0.8rem", marginBottom: "1rem" }}>
          <input
            type="checkbox"
            checked={sim.adaptivityEnabled}
            onChange={(e) => sim.setAdaptivity(e.target.checked)}
          />
          Bia may respond to the quality of my board notes (fully logged below — nothing hidden)
        </label>
        <ul className="adaptivity-log">
          {sim.adaptivityLog.length === 0 ? (
            <li>No entries yet.</li>
          ) : (
            sim.adaptivityLog.map((l, i) => <li key={i}>· {l}</li>)
          )}
        </ul>
      </section>

      <div className="record-actions no-print">
        <button className="btn-quiet" onClick={onPrint}>
          Export reflections (print view)
        </button>
        {!confirmingReset ? (
          <button className="btn-danger" onClick={() => setConfirmingReset(true)}>
            Reset the simulation
          </button>
        ) : (
          <>
            <button
              className="btn-danger"
              onClick={() => {
                sim.resetSimulation();
                setConfirmingReset(false);
              }}
            >
              Confirm reset — clears the whole record
            </button>
            <button className="btn-quiet" onClick={() => setConfirmingReset(false)}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
