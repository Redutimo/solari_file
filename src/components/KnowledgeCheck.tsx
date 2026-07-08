import { useState } from "react";
import type { QuizQuestion } from "../engine/types";

/** Normalise a typed answer for comparison: lowercase, trim, collapse spaces, strip punctuation. */
function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/[.,;:!?'"()\-–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function textCorrect(q: Extract<QuizQuestion, { kind: "text" }>, answer: string): boolean {
  const a = norm(answer);
  if (!a) return false;
  return q.accept.some((acc) => {
    const n = norm(acc);
    return a === n || a.includes(n);
  });
}

/**
 * The desk check: concept questions — multiple choice and one-line typed
 * answers — that must all be answered correctly before the decision unlocks.
 * Wrong answers get the explanation and a retry.
 */
export function KnowledgeCheck({
  quiz,
  passed,
  onPass,
}: {
  quiz: QuizQuestion[];
  passed: boolean;
  onPass: () => void;
}) {
  const [choices, setChoices] = useState<(number | null)[]>(() => quiz.map(() => null));
  const [texts, setTexts] = useState<string[]>(() => quiz.map(() => ""));
  const [checked, setChecked] = useState(false);

  if (passed) {
    return (
      <div className="deskcheck passed">
        <span className="stamp stamp-thunk stamp-cleared">Cleared</span>
        <div className="dc-head">Desk check</div>
        <p className="dc-status">Cleared. The decision below is unlocked.</p>
      </div>
    );
  }

  const answered = quiz.map((q, i) =>
    q.kind === "text" ? texts[i].trim().length > 0 : choices[i] !== null
  );
  const results = quiz.map((q, i) =>
    q.kind === "text" ? textCorrect(q, texts[i]) : choices[i] === q.correct
  );
  const allAnswered = answered.every(Boolean);
  const allCorrect = results.every(Boolean);

  const handleCheck = () => {
    setChecked(true);
    if (allCorrect) onPass();
  };

  return (
    <div className="deskcheck" role="group" aria-label="Desk check: concept questions">
      <div className="dc-head">Desk check</div>
      <p className="dc-intro">
        Before the board hears your call, show you know the ground. All answers must be right to
        unlock the decision — wrong answers explain themselves, and you can try again.
      </p>
      {quiz.map((q, qi) => (
        <fieldset className="dc-question" key={qi}>
          <legend>
            {qi + 1}. {q.question}
          </legend>
          {q.kind === "text" ? (
            <input
              type="text"
              className="dc-text"
              value={texts[qi]}
              placeholder={q.placeholder ?? "Type your answer"}
              aria-label={`Answer to question ${qi + 1}`}
              onChange={(e) => {
                const v = e.target.value;
                setTexts((t) => t.map((x, i) => (i === qi ? v : x)));
                setChecked(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && allAnswered) handleCheck();
              }}
            />
          ) : (
            q.options.map((opt, oi) => (
              <label key={oi} className="dc-option">
                <input
                  type="radio"
                  name={`q${qi}`}
                  checked={choices[qi] === oi}
                  onChange={() => {
                    setChoices((s) => s.map((v, i) => (i === qi ? oi : v)));
                    setChecked(false);
                  }}
                />
                <span>{opt}</span>
              </label>
            ))
          )}
          {checked && answered[qi] && (
            <p className={`dc-feedback ${results[qi] ? "right" : "wrong"}`} role="status">
              {results[qi] ? "Correct. " : "Not quite. "}
              {q.explanation}
            </p>
          )}
        </fieldset>
      ))}
      <div className="commit-row">
        <button className="btn-commit" disabled={!allAnswered} onClick={handleCheck}>
          Check answers
        </button>
        {!allAnswered && <p className="commit-note">Answer every question to check.</p>}
      </div>
    </div>
  );
}
