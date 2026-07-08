import type { DecisionRecord, BranchRecord, Kpis, StrategyState } from "./types";
import type { ChapterProgress } from "./store";
import { INITIAL_KPIS } from "./store";

export interface ReportGrade {
  dimension: string;
  score: number; // 0..100
  comment: string;
}

export interface BoardReport {
  opening: string[];
  grades: ReportGrade[];
  branchAssessment: string;
  reflectionNote: string;
  closing: string;
}

const clamp = (v: number) => Math.min(100, Math.max(0, Math.round(v)));

function call(decisions: DecisionRecord[], chapterId: number): string | null {
  return decisions.find((d) => d.chapterId === chapterId)?.classificationName ?? null;
}

/** Assemble the board's end-of-term interim letter from the actual record. */
export function buildBoardReport(
  strategy: StrategyState,
  kpis: Kpis,
  decisions: DecisionRecord[],
  branches: BranchRecord[],
  progress: Record<number, ChapterProgress>
): BoardReport {
  const posture = call(decisions, 1);
  const entry = call(decisions, 3);
  const label = call(decisions, 5);
  const week9 = call(decisions, 9);
  const branch = branches.find((b) => b.chapterId === 9);

  const opening: string[] = [
    `The board has reviewed weeks 1–9 of the Latin America programme. This letter records how your advice has positioned the company.`,
    `You opened as “${posture ?? "(no posture recorded)"}”, entered Mexico as “${entry ?? "(no entry mode recorded)"}”, and settled the label as “${label ?? "(no branding call recorded)"}”. Those three calls set the terms for everything that followed.`,
  ];

  const share = kpis.marketShare.toFixed(1);
  const spent = Math.round(INITIAL_KPIS.budget - kpis.budget);
  const grades: ReportGrade[] = [
    {
      dimension: "Market results",
      score: clamp(40 + kpis.marketShare * 25 + (kpis.brandEquity - INITIAL_KPIS.brandEquity)),
      comment: `${share}% of the Mexican speciality segment. Brand equity ${Math.round(kpis.brandEquity)}. €${spent}k spent.`,
    },
    {
      dimension: "Cultural intelligence",
      score: clamp(strategy.culturalSensitivityScore),
      comment:
        strategy.culturalSensitivityScore >= 60
          ? "Consistent attention to how the market actually thinks. Keep it."
          : strategy.culturalSensitivityScore >= 35
            ? "Adequate, with gaps. Several calls were corrected after the fact, at cost."
            : "The board's main concern. Too many calls were made from Torino's frame of reference.",
    },
    {
      dimension: "Partnership",
      score: clamp(strategy.localPartnerTrust),
      comment:
        strategy.localPartnerTrust >= 60
          ? "Relations with Ortega are an asset. Brazil can borrow against them."
          : strategy.localPartnerTrust >= 35
            ? "Workable but not warm. Brazil will need relationships this file has not built."
            : "Damaged. The company has no committed friend in its most important market.",
    },
    {
      dimension: "Regulatory discipline",
      score: clamp(strategy.regulatoryComplianceScore),
      comment:
        strategy.regulatoryComplianceScore >= 55
          ? "Compliance kept pace. Ms Ferraro's files are in order."
          : "The strategy has outrun its paperwork more than once. Fines arrive late; causes arrive early.",
    },
    {
      dimension: "Risk posture",
      score: clamp(50 + strategy.entryRiskAppetite / 2),
      comment:
        strategy.entryRiskAppetite > 40
          ? "Aggressive. Acceptable while it produces position; not while it produces surprises."
          : strategy.entryRiskAppetite < -20
            ? "Conservative. Defensible in year one. Caution has a price, and Casa Verde is collecting it."
            : "Measured. Risk taken where justified, declined where not.",
    },
  ];

  const branchAssessment = branch
    ? `Week 9 was the programme's first real test: ${branch.variantTitle.toLowerCase()}. You answered with “${week9 ?? ""}”. ${branch.explanation}`
    : "Week 9 has not yet been resolved.";

  const qualities = Object.values(progress)
    .map((p) => p.reflectionQuality)
    .filter(Boolean);
  const strongCount = qualities.filter((q) => q === "strong").length;

  // Quote the student's own strongest note back — proof the record was read.
  const best = Object.entries(progress)
    .filter(([, p]) => p.reflection.trim().length > 0)
    .sort((a, b) => {
      const rank = (q?: string) => (q === "strong" ? 2 : q === "middling" ? 1 : 0);
      return rank(b[1].reflectionQuality) - rank(a[1].reflectionQuality) || b[1].reflection.length - a[1].reflection.length;
    })[0];
  const quote = best
    ? (() => {
        const text = best[1].reflection.trim().replace(/\s+/g, " ");
        const cut = text.length > 180 ? text.slice(0, 177).replace(/\s+\S*$/, "") + "…" : text;
        return ` In week ${best[0]} you wrote: “${cut}”`;
      })()
    : "";

  const reflectionNote =
    strongCount >= qualities.length - 1 && qualities.length > 0
      ? "Your written notes were consistently reasoned and used the language of the discipline."
      : strongCount >= 2
        ? "Your written notes were uneven — strong when it mattered, thin elsewhere. The board reads the thin ones too."
        : "Your written notes were brief. The record shows the decisions but not the reasoning. Fix that in the second half.";
  const reflectionNoteWithQuote = reflectionNote + quote;

  const closing = `The second half brings the pricing corridor, the channel build, and Casa Verde's answer. Know the ground, write down the reasoning. Every decision in this file compounds. — E. Solari, for the board`;

  return { opening, grades, branchAssessment, reflectionNote: reflectionNoteWithQuote, closing };
}
