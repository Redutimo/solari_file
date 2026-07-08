# The Solari File

*Global Board: Value Creation Across Markets* — a narrative, scrollytelling business simulation for an International Marketing degree module. A ninety-year-old Italian specialty-food house (Solari Foods, Alba) expands into Mexico and then Brazil; the student is its international marketing adviser, and every week a case file lands on their desk.

Built from [`blueprint.md`](../blueprint.md) and [`build-prompt-v2.md`](../build-prompt-v2.md). This is the **v1 vertical slice**: chapters 1–5 fully playable, plus chapter 9 with all three branch variants. Chapters 6–8 and 10–16 are sealed placeholders.

## Run it

```bash
npm install
npm run dev        # http://localhost:5180
npm run build      # production build (type-checks first)
```

## What's in the slice

- **Six playable chapters** with the full loop: module brief (learning outcomes) → scrollytelling case file, laid out as a two-column desk spread → **desk check** (multiple-choice *and* one-line typed answers; all must be right before the decision unlocks) → paired-slider decision with live-named classification → in-world persona reactions → narrative KPI reckoning with a **module-reader concept note** tying the call back to theory → autosaved reflection → epilogue, which carries you straight into the next week.
- **Personas with their own paper.** Elena writes personal letters with handwritten postscripts; Rafael sends terse phone messages (forwarded-transcript slips); Lucia files numbered compliance notes with reference lines; Bia leaves taped sticky notes. Voice and document form are inseparable — you know who's talking before you read a word.
- **Real navigation.** Hash routing (`#/week/3`, `#/record`, `#/letter`) so refresh, back button, and deep links behave; locked weeks bounce to the desk; a right-edge wayfinding rail tracks your position through each file's beats and jumps on click; closing a file flows directly into the next one.
- **A real branching engine.** Five strategy variables persist across the term (`standardizationVsAdaptation`, `entryRiskAppetite`, `culturalSensitivityScore`, `regulatoryComplianceScore`, `localPartnerTrust`). Week 9 resolves to *Partner Conflict*, *Cultural Backlash*, or *Steady Expansion* by threshold rules on that state — and tells the student, in plain language, which of their prior decisions caused it. Play it twice with different strategies and you get different weeks.
- **A quiet cabinet.** Only closed files and the current week are visible; future weeks stay hidden so the branching never reads as a wall of locked content.
- **The Board's Letter.** When all six files close, a personalised end-of-term report unlocks: a crisp in-world letter generated from the student's actual record (it quotes their strongest reflection back — and says so plainly when the notes were thin), graded marks on five dimensions, and **the files you never opened**: the two week-9 scenarios shown as sealed folders, each with the plain-language reason it never reached your desk. The whole app is a 277 kB bundle, no WebGL.
- **Soft adaptivity, fully logged**: a simple heuristic (length + module terminology) grades reflections; two weak notes in a row and Bia the intern leaves a scaffolding sticky note, two strong ones and she asks a stretch question. Toggleable in the Board Record; every grading event is visible in "The tutor's margin."
- **The Board Record**: decision ledger, KPI dossier, strategy-variable position, branch explanations, the clippings drawer (front pages generated from your decisions), dramatis personae, reset, and a print-view export of all reflections.

## Re-theming for another course

All content lives in data files, separate from components:

| File | Contains |
|---|---|
| `src/content/chapters/ch1.ts`–`ch5.ts` | One chapter each: cold open, learning outcomes, artifacts, desk-check quiz, decision axes, classifications with effects + persona reactions + reckoning, concept note, reflection prompt, epilogue, front-page generator |
| `src/content/chapters/ch9.ts` | The three week-9 variants and the branch rules (thresholds, drivers, explanations) |
| `src/content/chapters/index.ts` | Chapter registry + sealed-week titles |
| `src/content/personas.ts` | The cast |
| `src/engine/store.ts` | Initial KPI/state values, role ladder, unlock order |

Swap the company, the markets, the cast, and the thresholds without touching a component. The engine (`src/engine/`) is course-agnostic.

## Deliberate v1 limits

- Persistence is `localStorage` only — no accounts, no LMS/gradebook export (the print view says so to the student).
- Reflection export = print-styled page → browser print-to-PDF.
- The instructor-facing cohort view is future scope; the per-student ingredients (branch record, variable trajectory, reflections) already exist in the store.
- Accessibility: skip link, ARIA on sliders/controls, content in DOM in reading order (scroll reveals are presentation-only), `prefers-reduced-motion` respected, and the app is fully completable without WebGL (text fallbacks everywhere).
