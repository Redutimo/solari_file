export interface Persona {
  id: string;
  name: string;
  role: string;
  location: string;
  voice: string; // authoring note; also shown in the Board Record dramatis personae
}

export const PERSONAS: Record<string, Persona> = {
  elena: {
    id: "elena",
    name: "Elena Solari",
    role: "Group CEO, Solari Foods",
    location: "Torino",
    voice:
      "Granddaughter of the founder. Writes personal letters on cream stock; the real message is always in the handwritten postscript.",
  },
  rafael: {
    id: "rafael",
    name: "Rafael Ortega",
    role: "Managing Director, Distribuidora Ortega",
    location: "Monterrey",
    voice:
      "Solari's Mexican distribution partner. Communicates by phone message: short lines, no pleasantries, twenty-two years of the shop floor behind every one.",
  },
  lucia: {
    id: "lucia",
    name: "Lucia Ferraro",
    role: "Regulatory & Compliance Lead",
    location: "Torino",
    voice:
      "Types numbered clauses, files everything under a reference the same day, and never once raises her voice. Never has to.",
  },
  bia: {
    id: "bia",
    name: "Beatriz “Bia” Camargo",
    role: "Junior Analyst (placement year)",
    location: "Torino, via São Paulo",
    voice: "Tapes sticky notes to the file. Lowercase, double punctuation, and the question everyone else skipped.",
  },
};

/** The rival. Appears only through press clippings — never speaks to you directly. */
export const RIVAL = {
  name: "Casa Verde Alimentos",
  base: "Barcelona",
  note: "Iberian grocery conglomerate, three times Solari's size, eighteen months into its own Latin America push.",
};

export const TRADE_PRESS = "THE PROVISIONER — International Grocery Trade Weekly";
