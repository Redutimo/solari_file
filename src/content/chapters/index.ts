import type { ChapterContent } from "../../engine/types";
import { ch1 } from "./ch1";
import { ch2 } from "./ch2";
import { ch3 } from "./ch3";
import { ch4 } from "./ch4";
import { ch5 } from "./ch5";
import { branch9 } from "./ch9";

export { branch9 };

/** Fully authored, non-branching chapters in the v1 slice. */
export const CHAPTERS: Record<number, ChapterContent> = {
  1: ch1,
  2: ch2,
  3: ch3,
  4: ch4,
  5: ch5,
};

export interface SealedChapter {
  id: number;
  title: string;
  topic: string;
  branchPoint: boolean;
  note: string;
}

/** The rest of the term — titled, topiced, sealed. */
export const SEALED: SealedChapter[] = [
  { id: 6, title: "The Corridor", topic: "International Pricing Strategy", branchPoint: false, note: "Grey-market risk and the price of one price." },
  { id: 7, title: "Middlemen", topic: "Global Distribution & Channel Strategy", branchPoint: false, note: "Direct or partner-led — who touches the customer last?" },
  { id: 8, title: "Lost in Translation", topic: "International Promotion & Glocalisation", branchPoint: false, note: "Campaign localisation, line by line." },
  { id: 10, title: "The Feed", topic: "Digital & Social Media in Global Markets", branchPoint: false, note: "Platform strategy, one region at a time." },
  { id: 11, title: "Paper Walls", topic: "Trade Regulation & Political Risk", branchPoint: false, note: "A tariff shifts. The plan must too." },
  { id: 12, title: "The Countermove", topic: "Competitive Strategy in Global Markets", branchPoint: true, note: "Casa Verde answers. Branch point 3." },
  { id: 13, title: "Clean Hands", topic: "Sustainability & Ethics in International Marketing", branchPoint: false, note: "Cost against claims you can stand behind." },
  { id: 14, title: "The Reckoning Ledger", topic: "Global Marketing Performance & Metrics", branchPoint: false, note: "Read the term's numbers. Reallocate." },
  { id: 15, title: "The Crisis", topic: "Reputation / Crisis Scenario", branchPoint: true, note: "Shaped by everything above it in this file. Branch point 4." },
  { id: 16, title: "The Defence", topic: "Capstone: Global Strategy Defence", branchPoint: false, note: "The whole term, the whole map, the board waiting." },
];

export const ALL_WEEKS: { id: number; title: string; topic: string; sealed: boolean; branchPoint: boolean }[] = [
  ...Object.values(CHAPTERS).map((c) => ({
    id: c.id,
    title: c.title,
    topic: c.topic,
    sealed: false,
    branchPoint: c.id === 5,
  })),
  { id: 9, title: "Week 9", topic: "Market Entry Complication — shaped by your file", sealed: false, branchPoint: true },
  ...SEALED.map((s) => ({ id: s.id, title: s.title, topic: s.topic, sealed: true, branchPoint: s.branchPoint })),
].sort((a, b) => a.id - b.id);
