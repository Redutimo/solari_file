import type { ChapterContent } from "../../engine/types";

export const ch1: ChapterContent = {
  id: 1,
  title: "The Posture Memo",
  topic: "The International Marketing Environment",
  region: "italy",
  cameraDistance: 2.1,
  coldOpen:
    "Solari has decided to go to Latin America. How the company carries itself when it arrives is now your file.",
  terms: ["standardisation", "adaptation", "market entry", "PESTLE", "environment", "positioning"],
  outcomes: [
    "Weigh standardisation against adaptation for a heritage brand entering a new region",
    "Read a market-environment brief — regulation, retail structure, competition — for its strategic implications",
    "Set an initial strategic posture and defend it in writing",
  ],
  quiz: [
    {
      question: "Standardisation is attractive to a firm like Solari primarily because it…",
      options: [
        "maximises local relevance in each market",
        "delivers economies of scale and a consistent global brand",
        "removes the need for regulatory work",
        "guarantees faster market entry",
      ],
      correct: 1,
      explanation:
        "Standardisation's classic payoffs are scale economies and one coherent brand worldwide. Its cost is local relevance — which is the other end of this week's slider.",
    },
    {
      question: "Which fact in this week's file most directly forces some adaptation, whatever posture you choose?",
      options: [
        "Casa Verde's marketing budget",
        "The 9% growth of the premium segment",
        "NOM-051 front-of-pack labelling law",
        "Solari's zero name recognition",
      ],
      correct: 2,
      explanation:
        "Regulation is non-negotiable adaptation: NOM-051 changes the label whether or not the strategy wants it to. Competitive and awareness factors influence the choice; the law removes part of it.",
    },
    {
      question: "In a PESTLE analysis of Mexico, the concentration of modern retail in three groups belongs under…",
      options: ["Political", "Economic", "Social", "Legal"],
      correct: 1,
      explanation:
        "Market and industry structure — including buyer power from concentrated retail — sits in the economic environment. It shapes bargaining terms for every entrant.",
    },
    {
      kind: "text",
      question: "Complete the module's central trade-off: standardisation versus ________.",
      accept: ["adaptation", "adapting", "localisation", "localisation", "local customisation"],
      placeholder: "one word",
      explanation:
        "Standardisation versus adaptation — the axis this week's first slider sits on, and the tension the whole term keeps re-pricing.",
    },
  ],
  conceptNote:
    "The standardisation–adaptation decision is the discipline's oldest argument. Standardisation buys scale economies and a consistent global brand (Levitt's case); adaptation buys local relevance and responsiveness. Neither wins in general — the answer depends on how much the product's meaning changes when it crosses a border. This week's posture only sets your default; every later week can spend against it.",
  milestones: [
    "Open the file",
    "Read Elena's letter",
    "Review the market brief",
    "Note the rival",
    "Weigh the posture",
    "Make the call",
    "Read the reactions",
    "See the numbers",
    "Write to the board",
    "Close the file",
  ],
  artifacts: [
    {
      kind: "letter",
      stamp: "CONFIDENTIAL",
      body: `My grandfather sold his first case of oil from a bicycle in Alba. He believed the label should never change — not the typeface, not the harvest date, not the Italian on the back of the tin. For forty years, that stubbornness was the strategy.\n\nIt has taken us as far as it can. The board has approved entry into Latin America — Mexico first, Brazil to follow. What it has not approved, because we cannot agree, is how we carry ourselves when we arrive.\n\nThat is now your file. I want your instinct on paper by Friday: how Italian do we stay, and how fast do we move?`,
      ps: "P.S. Welcome to the house. Ask Bia where the good coffee is hidden. — E.",
    },
    {
      kind: "email",
      from: "Strategy Desk <strategy@solari.it>",
      to: "International Markets file",
      subject: "MX environment brief — the two-paragraph version",
      body: `Mexico: 130M consumers, a premium grocery segment growing 9% a year, and a modern-trade sector concentrated in three retail groups who dictate terms to brands far larger than us. Import duties on EU speciality foods are manageable under the Global Agreement, but labelling law (NOM-051) requires front-of-pack warnings that will sit directly on top of Nonna Solari's face.\n\nOur name recognition in Mexico is, rounding generously, zero. What we have is the category's tailwind: "Italian" still sells aspiration in every market we've measured. The question the board keeps circling: is that enough to carry an unchanged brand, or is it a story we'll have to retell in someone else's words?`,
    },
    {
      kind: "clipping",
      from: "THE PROVISIONER — International Grocery Trade Weekly",
      subject: "Casa Verde doubles Latin America budget, again",
      body: `Barcelona-based Casa Verde Alimentos confirmed Tuesday that it will double its Latin American marketing spend for the second consecutive year, calling the region "the decade's only open door." The conglomerate's playbook is familiar: buy shelf space at loss-making rates, localise everything down to the jingle, and dare smaller heritage brands to follow. Several already have. Few are still standing.`,
    },
  ],
  decision: {
    id: "posture",
    title: "Set the global posture",
    prompt:
      "Elena wants your opening posture on paper: how much does Solari adapt to each market, and how aggressively does it enter? This memo will be quoted back to you all term.",
    axes: [
      {
        id: "stdAdapt",
        negLabel: "Standardise",
        posLabel: "Adapt",
        negHint: "One brand, one label, one story — Alba decides.",
        posHint: "Each market gets a Solari built for it — the market decides.",
      },
      {
        id: "pace",
        negLabel: "Cautious entry",
        posLabel: "Aggressive entry",
        negHint: "Prove the model in one city before spending the second euro.",
        posHint: "Take position while the door is open — outrun Casa Verde.",
      },
    ],
    classifications: [
      {
        id: "heritage-purist",
        name: "The Heritage Purist",
        blurb: "Unchanged and unhurried: the label is the strategy, patience is the plan.",
        match: { stdAdapt: [-100, 0], pace: [-100, 0] },
        effects: {
          state: { standardizationVsAdaptation: -20, entryRiskAppetite: -15, culturalSensitivityScore: -5 },
          kpis: { brandEquity: 3, riskExposure: -3, customerSentiment: -2 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "My grandfather would have hired you on the spot. My only condition: we notice early — not gracefully, early — if Mexico turns out not to have read his biography.",
            ps: "P.S. The family council meets in October. Bring me one number I can defend. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "Read the memo. Patience I can sell.\n\nA tin nobody here can pronounce — that I cannot.\n\nSend me one thing that says you know where you landed. One.",
          },
          {
            personaId: "lucia",
            kind: "compliance",
            text: "Noted. (1) A slow entry simplifies my NOM-051 workload considerably. (2) An unchanged label does the opposite. Net effect on my team: neutral. No objection.",
          },
        ],
        reckoning:
          "Brand equity holds firm and Torino approves of its own reflection. In Monterrey, the first focus group returns the word “distante” — twice, unprompted.",
      },
      {
        id: "global-crusader",
        name: "The Global Crusader",
        blurb: "One unchanged brand, moving fast: the world adapts to Solari.",
        match: { stdAdapt: [-100, 0], pace: [0.0001, 100] },
        effects: {
          state: { standardizationVsAdaptation: -25, entryRiskAppetite: 30, culturalSensitivityScore: -10, localPartnerTrust: -5 },
          kpis: { brandEquity: 4, budget: -180, riskExposure: 8, marketShare: 0.3 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "Bold. The board will applaud, and I will let them.",
            ps: "P.S. I am keeping the reserve fund where I can reach it. Try not to make me. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "Speed, with an unchanged label. Okay.\n\nUnderstand this: every week of speed is bought with my relationships.\n\nI keep receipts.",
          },
          {
            personaId: "lucia",
            kind: "compliance",
            text: "For the record: (1) accelerated timelines compress regulatory review; (2) compressed review is where fines happen. I have flagged this in writing and will re-flag it at each milestone.",
          },
        ],
        reckoning:
          "The launch calendar moves up six weeks and the budget feels it immediately. Shelf commitments are signed before the labelling review closes — a sentence Lucia has underlined in her file.",
      },
      {
        id: "careful-localist",
        name: "The Careful Localist",
        blurb: "Adapt deliberately, enter deliberately: learn the market before spending on it.",
        match: { stdAdapt: [0.0001, 100], pace: [-100, 0] },
        effects: {
          state: { standardizationVsAdaptation: 25, entryRiskAppetite: -15, culturalSensitivityScore: 10, localPartnerTrust: 5 },
          kpis: { customerSentiment: 4, budget: -60, brandEquity: -2 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "Sensible — perhaps to a fault. I'll defend the pace to the board.",
            ps: "P.S. Show me what all this listening buys us by spring. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "Now THIS I can work with.\n\nCome to Monterrey. Walk the aisles with me.\n\nI'll show you exactly where an Italian brand earns its Spanish.",
          },
          {
            personaId: "lucia",
            kind: "compliance",
            text: "Endorsed. (1) Adaptation raises labelling complexity, but (2) your timeline gives my team room to do it properly. This is the rare memo I file without annotations.",
          },
        ],
        reckoning:
          "Little visible happens, which is the point. Sentiment ticks up in early panels, brand equity dips as Torino grumbles about “dilution,” and Rafael forwards your memo to his floor managers with the subject line “por fin.”",
      },
      {
        id: "market-chameleon",
        name: "The Market Chameleon",
        blurb: "Adapt everything, move fast: become Mexican before Casa Verde does.",
        match: { stdAdapt: [0.0001, 100], pace: [0.0001, 100] },
        effects: {
          state: { standardizationVsAdaptation: 35, entryRiskAppetite: 30, culturalSensitivityScore: 5, localPartnerTrust: 5 },
          kpis: { marketShare: 0.5, budget: -220, brandEquity: -4, riskExposure: 5, customerSentiment: 2 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "You are asking a ninety-year-old house to learn a new language at a sprint. It may even be right.",
            ps: "P.S. Write to me monthly — personally — about what we are becoming. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "Ambitious. I like ambitious.\n\nI've also seen ambitious go home in a box.\n\nLet's agree NOW what we do not change. Before the market decides for us.",
          },
          {
            personaId: "lucia",
            kind: "compliance",
            text: "Three parallel adaptation workstreams at entry speed. (1) Possible. (2) Expensive. (3) The audit trail will be immaculate because I will make it so. Do not test point 3.",
          },
        ],
        reckoning:
          "Early listings land and spend runs hot. In Torino, senior staff have started asking what, exactly, is still Solari — a fair question that does not yet have an owner.",
      },
    ],
  },
  reflectionPrompt:
    "Draft your note to the board: which side of the standardisation–adaptation trade-off did you weight more heavily, and what specific risk does your posture accept in exchange?",
  epilogue:
    "Your posture memo is in the record. The rest of the term will test it.",
  frontpage: (classification) => ({
    headline:
      classification === "The Heritage Purist" || classification === "The Global Crusader"
        ? "Solari to Latin America: the label stays"
        : "Solari goes to Mexico — and goes local",
    standfirst: `The Alba heritage house declares its posture: insiders describe the new adviser's opening memo as “${classification}.” Casa Verde declined to comment.`,
  }),
};
