import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  StrategyState,
  Kpis,
  DecisionRecord,
  BranchRecord,
  Headline,
  StateVar,
  KpiKey,
} from "./types";

export const INITIAL_STRATEGY: StrategyState = {
  standardizationVsAdaptation: 0,
  entryRiskAppetite: 0,
  culturalSensitivityScore: 50,
  regulatoryComplianceScore: 50,
  localPartnerTrust: 50,
};

export const INITIAL_KPIS: Kpis = {
  brandEquity: 62,
  marketShare: 0,
  budget: 2400,
  customerGrowth: 0,
  partnerDependency: 20,
  customerSentiment: 55,
  riskExposure: 25,
};

export type ReflectionQuality = "strong" | "middling" | "weak";

export interface ChapterProgress {
  decided: boolean;
  reflection: string;
  reflectionQuality?: ReflectionQuality;
  completed: boolean;
  quizPassed?: boolean;
}

interface SimState {
  strategy: StrategyState;
  kpis: Kpis;
  decisions: DecisionRecord[];
  branches: BranchRecord[];
  headlines: Headline[];
  progress: Record<number, ChapterProgress>;
  adaptivityEnabled: boolean;
  adaptivityLog: string[];

  applyDecision: (rec: DecisionRecord) => void;
  passQuiz: (chapterId: number) => void;
  saveReflection: (chapterId: number, text: string) => void;
  gradeReflection: (chapterId: number, quality: ReflectionQuality, note: string) => void;
  completeChapter: (chapterId: number) => void;
  recordBranch: (rec: BranchRecord) => void;
  recordHeadline: (h: Headline) => void;
  setAdaptivity: (on: boolean) => void;
  resetSimulation: () => void;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const STATE_BOUNDS: Record<StateVar, [number, number]> = {
  standardizationVsAdaptation: [-100, 100],
  entryRiskAppetite: [-100, 100],
  culturalSensitivityScore: [0, 100],
  regulatoryComplianceScore: [0, 100],
  localPartnerTrust: [0, 100],
};

const KPI_BOUNDS: Partial<Record<KpiKey, [number, number]>> = {
  brandEquity: [0, 100],
  marketShare: [0, 100],
  customerSentiment: [0, 100],
  partnerDependency: [0, 100],
  riskExposure: [0, 100],
};

export const useSim = create<SimState>()(
  persist(
    (set) => ({
      strategy: { ...INITIAL_STRATEGY },
      kpis: { ...INITIAL_KPIS },
      decisions: [],
      branches: [],
      headlines: [],
      progress: {},
      adaptivityEnabled: true,
      adaptivityLog: [],

      applyDecision: (rec) =>
        set((s) => {
          const strategy = { ...s.strategy };
          for (const [k, d] of Object.entries(rec.stateDeltas)) {
            const key = k as StateVar;
            const [lo, hi] = STATE_BOUNDS[key];
            strategy[key] = clamp(strategy[key] + (d ?? 0), lo, hi);
          }
          const kpis = { ...s.kpis };
          for (const [k, d] of Object.entries(rec.kpiDeltas)) {
            const key = k as KpiKey;
            const next = kpis[key] + (d ?? 0);
            const bounds = KPI_BOUNDS[key];
            kpis[key] = bounds ? clamp(next, bounds[0], bounds[1]) : next;
          }
          return {
            strategy,
            kpis,
            decisions: [...s.decisions, rec],
            progress: {
              ...s.progress,
              [rec.chapterId]: {
                ...(s.progress[rec.chapterId] ?? { reflection: "", completed: false }),
                decided: true,
              },
            },
          };
        }),

      passQuiz: (chapterId) =>
        set((s) => ({
          progress: {
            ...s.progress,
            [chapterId]: {
              ...(s.progress[chapterId] ?? { decided: false, reflection: "", completed: false }),
              quizPassed: true,
            },
          },
        })),

      saveReflection: (chapterId, text) =>
        set((s) => ({
          progress: {
            ...s.progress,
            [chapterId]: {
              ...(s.progress[chapterId] ?? { decided: false, completed: false }),
              reflection: text,
            },
          },
        })),

      gradeReflection: (chapterId, quality, note) =>
        set((s) => ({
          progress: {
            ...s.progress,
            [chapterId]: {
              ...(s.progress[chapterId] ?? { decided: false, reflection: "", completed: false }),
              reflectionQuality: quality,
            },
          },
          adaptivityLog: [...s.adaptivityLog, note],
        })),

      completeChapter: (chapterId) =>
        set((s) => ({
          progress: {
            ...s.progress,
            [chapterId]: {
              ...(s.progress[chapterId] ?? { decided: false, reflection: "" }),
              completed: true,
            },
          },
        })),

      recordBranch: (rec) =>
        set((s) => ({
          branches: [...s.branches.filter((b) => b.chapterId !== rec.chapterId), rec],
        })),

      recordHeadline: (h) =>
        set((s) => ({
          headlines: [...s.headlines.filter((x) => x.chapterId !== h.chapterId), h],
        })),

      setAdaptivity: (on) => set(() => ({ adaptivityEnabled: on })),

      resetSimulation: () =>
        set(() => ({
          strategy: { ...INITIAL_STRATEGY },
          kpis: { ...INITIAL_KPIS },
          decisions: [],
          branches: [],
          headlines: [],
          progress: {},
          adaptivityLog: [],
        })),
    }),
    { name: "solari-file-v1" }
  )
);

/** Playable chapters in the v1 slice. 6–8 and 10–16 are sealed placeholders. */
export const PLAYABLE = [1, 2, 3, 4, 5, 9];

/** A chapter is unlocked when the previous *playable* chapter is complete. */
export function isUnlocked(chapterId: number, progress: Record<number, ChapterProgress>): boolean {
  const idx = PLAYABLE.indexOf(chapterId);
  if (idx === -1) return false;
  if (idx === 0) return true;
  const prev = PLAYABLE[idx - 1];
  return progress[prev]?.completed === true;
}

/** Role ladder. */
export function roleForWeek(week: number): { title: string; nextAt: number | null } {
  if (week <= 5) return { title: "International Marketing Analyst", nextAt: 6 };
  if (week <= 11) return { title: "Regional Marketing Manager", nextAt: 12 };
  return { title: "Global CMO", nextAt: null };
}
