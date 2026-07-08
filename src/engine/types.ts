// ---------- Simulation state ----------

/** Persistent strategic state variables (branch-eligible). */
export interface StrategyState {
  standardizationVsAdaptation: number; // -100 (full standardisation) .. 100 (full adaptation)
  entryRiskAppetite: number; // -100 (cautious) .. 100 (aggressive)
  culturalSensitivityScore: number; // 0..100
  regulatoryComplianceScore: number; // 0..100
  localPartnerTrust: number; // 0..100
}

/** Dashboard-facing KPIs, surfaced narratively and in the Board Record. */
export interface Kpis {
  brandEquity: number; // 0..100 index
  marketShare: number; // % of Mexican speciality segment
  budget: number; // € thousands remaining
  customerGrowth: number; // % monthly
  partnerDependency: number; // 0..100
  customerSentiment: number; // 0..100
  riskExposure: number; // 0..100 cultural/regulatory
}

export type StateVar = keyof StrategyState;
export type KpiKey = keyof Kpis;

export const KPI_LABELS: Record<KpiKey, string> = {
  brandEquity: "Brand equity",
  marketShare: "Market share (MX speciality)",
  budget: "Marketing budget (€k)",
  customerGrowth: "Customer growth",
  partnerDependency: "Local partner dependency",
  customerSentiment: "Customer sentiment",
  riskExposure: "Cultural & regulatory risk",
};

export const STATE_LABELS: Record<StateVar, string> = {
  standardizationVsAdaptation: "Standardisation ↔ Adaptation",
  entryRiskAppetite: "Entry risk appetite",
  culturalSensitivityScore: "Cultural sensitivity",
  regulatoryComplianceScore: "Regulatory compliance",
  localPartnerTrust: "Local partner trust",
};

// ---------- Content model ----------

export type ArtifactKind =
  | "memo" // Solari internal memo (olive letterhead)
  | "email" // printed correspondence thread (carbon blue)
  | "letter" // Elena's personal letter — cream stock, handwritten postscript
  | "message" // Rafael's phone messages — forwarded transcript slip
  | "clipping" // trade-press clipping / rival coverage (newsprint)
  | "compliance" // Lucia's typed note — reference number, exposure rating
  | "sticky" // Bia's sticky note (intern scaffolding)
  | "frontpage"; // THE PROVISIONER front page

export interface Artifact {
  kind: ArtifactKind;
  from?: string; // sender / masthead line
  to?: string;
  subject?: string;
  body: string; // paragraphs separated by \n\n
  stamp?: string; // e.g. "CONFIDENTIAL", "RECEIVED — TORINO"
  ps?: string; // handwritten postscript (letter kind)
  portrait?: string; // persona id — renders a cameo in the document head
}

export interface Axis {
  id: string;
  negLabel: string; // left pole
  posLabel: string; // right pole
  negHint: string; // one-line meaning of the left pole
  posHint: string;
}

/** A named strategic classification for a region of the slider space. */
export interface Classification {
  id: string;
  name: string;
  blurb: string; // one sentence shown live under the sliders
  /** Matches when every listed axis value falls in [min,max] (-100..100). */
  match: Record<string, [number, number]>;
  effects: {
    state: Partial<Record<StateVar, number>>; // deltas
    kpis: Partial<Record<KpiKey, number>>; // deltas
  };
  reactions: PersonaReaction[]; // 2–3, specific to this classification
  reckoning: string; // narrative beat, 1–3 sentences
}

export interface PersonaReaction {
  personaId: string;
  kind: ArtifactKind; // how the reaction arrives (letter, message, …)
  text: string;
  ps?: string; // handwritten postscript (Elena's letters)
}

export interface DecisionDef {
  id: string;
  title: string; // e.g. "The posture memo"
  prompt: string; // what the file is asking the student to call
  axes: Axis[]; // 1 or 2
  classifications: Classification[];
}

export type QuizQuestion =
  | {
      kind?: "choice"; // default
      question: string;
      options: string[];
      correct: number; // index into options
      explanation: string; // shown after answering, right or wrong
    }
  | {
      kind: "text"; // one-line typed answer
      question: string;
      accept: string[]; // accepted answers, matched case-insensitively
      placeholder?: string;
      explanation: string;
    };

export interface ChapterContent {
  id: number; // week number
  title: string;
  topic: string; // syllabus topic
  coldOpen: string; // editorial framing line(s)
  region: "italy" | "mexico" | "brazil" | "world";
  cameraDistance: number; // role-ladder zoom: smaller = closer
  outcomes: string[]; // learning outcomes, shown in the module brief
  artifacts: Artifact[];
  quiz: QuizQuestion[]; // desk check — must be passed before the decision unlocks
  decision: DecisionDef;
  conceptNote: string; // theory tie-back shown in the reckoning
  reflectionPrompt: string;
  epilogue: string;
  terms: string[]; // module terminology for the soft-adaptivity heuristic
  frontpage?: (classificationName: string) => { headline: string; standfirst: string };
  milestones: string[]; // ~8–10 beats, drive the reading-progress rail
}

export interface BranchRule {
  variantId: string;
  /** Human explanation template; engine appends the contributing decisions. */
  explanation: string;
  /** Shown at end of term for variants the student never saw: who gets this file. */
  unseenNote: string;
  /** Which state variables this rule hinges on — used to attribute contributions. */
  drivers: StateVar[];
  test: (s: StrategyState) => boolean;
}

export interface BranchPointDef {
  chapterId: number;
  rules: BranchRule[]; // evaluated in order; last should be the default (test: () => true)
  variants: Record<string, ChapterContent>;
}

// ---------- Records ----------

export interface DecisionRecord {
  chapterId: number;
  decisionId: string;
  values: Record<string, number>; // axisId -> value
  classificationId: string;
  classificationName: string;
  stateDeltas: Partial<Record<StateVar, number>>;
  kpiDeltas: Partial<Record<KpiKey, number>>;
  timestamp: number;
}

export interface BranchRecord {
  chapterId: number;
  variantId: string;
  variantTitle: string;
  explanation: string;
  contributors: string[]; // plain-language list of prior decisions that led here
}

export interface Headline {
  chapterId: number;
  headline: string;
  standfirst: string;
}
