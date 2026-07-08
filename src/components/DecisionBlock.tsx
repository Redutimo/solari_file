import { useMemo, useState } from "react";
import type { Classification, DecisionDef } from "../engine/types";

export function classify(def: DecisionDef, values: Record<string, number>): Classification {
  const found = def.classifications.find((c) =>
    Object.entries(c.match).every(([axisId, [lo, hi]]) => {
      const v = values[axisId] ?? 0;
      return v >= lo && v <= hi;
    })
  );
  return found ?? def.classifications[0];
}

export function DecisionBlock({
  def,
  committed,
  committedName,
  onCommit,
}: {
  def: DecisionDef;
  committed: boolean;
  committedName?: string;
  onCommit: (values: Record<string, number>, c: Classification) => void;
}) {
  const [values, setValues] = useState<Record<string, number>>(
    () => Object.fromEntries(def.axes.map((a) => [a.id, 0]))
  );
  const live = useMemo(() => classify(def, values), [def, values]);

  if (committed) {
    return (
      <div className="decision committed">
        <span className="stamp stamp-thunk">Entered in the record</span>
        <h3 className="d-title">{def.title}</h3>
        <div className="classification-live">
          <div className="eyebrow">The call, as entered in the record</div>
          <div className="c-name">{committedName}</div>
        </div>
        <div className="committed-seal">The file continues below</div>
      </div>
    );
  }

  return (
    <div className="decision" role="group" aria-label={`Decision: ${def.title}`}>
      <h3 className="d-title">{def.title}</h3>
      <p className="d-prompt">{def.prompt}</p>

      {def.axes.map((axis) => (
        <div className="axis" key={axis.id}>
          <div className="axis-labels">
            <span>{axis.negLabel}</span>
            <span>{axis.posLabel}</span>
          </div>
          <input
            type="range"
            min={-100}
            max={100}
            step={1}
            value={values[axis.id]}
            aria-label={`${axis.negLabel} versus ${axis.posLabel}`}
            aria-valuetext={`${values[axis.id]} on the scale from ${axis.negLabel} (-100) to ${axis.posLabel} (100)`}
            onChange={(e) => setValues((v) => ({ ...v, [axis.id]: Number(e.target.value) }))}
          />
          <div className="axis-hints">
            <span>{axis.negHint}</span>
            <span>{axis.posHint}</span>
          </div>
        </div>
      ))}

      <div className="classification-live" aria-live="polite">
        <div className="eyebrow">This posture has a name</div>
        <div className="c-name">{live.name}</div>
        <div className="c-blurb">{live.blurb}</div>
      </div>

      <div className="commit-row">
        <button className="btn-commit" onClick={() => onCommit(values, live)}>
          Enter the decision
        </button>
        <p className="commit-note">This is entered in the board record and carries forward through the term.</p>
      </div>
    </div>
  );
}
