import type { ChapterContent } from "../../engine/types";

export const ch5: ChapterContent = {
  id: 5,
  title: "The Label Question",
  topic: "Global Product & Branding Strategy — Branch Point 1",
  region: "mexico",
  cameraDistance: 1.9,
  coldOpen: "The label has not changed since 1934. This week you decide whether Mexico gets the same one.",
  terms: ["brand equity", "standardisation", "adaptation", "glocalisation", "brand architecture", "positioning"],
  outcomes: [
    "Distinguish product adaptation from brand-story adaptation — they are separate decisions",
    "Read concept-test data for the trade-off it actually poses",
    "Make a branding call and name the equity it spends",
  ],
  quiz: [
    {
      question: "Brand equity is best described as…",
      options: [
        "the trademark's value on the balance sheet",
        "the commercial value of what consumers believe and feel about the brand",
        "cumulative advertising spend",
        "share of shelf space",
      ],
      correct: 1,
      explanation:
        "Equity lives in consumer perception — awareness, associations, perceived quality, loyalty. That is why a label change can 'spend' it without touching the balance sheet.",
    },
    {
      question: "'Glocalisation' refers to…",
      options: [
        "full global standardisation",
        "a global brand platform executed locally",
        "operating only local brands",
        "licensing the brand to local firms",
      ],
      correct: 1,
      explanation:
        "Glocal strategy keeps one global identity while adapting execution — products, media, voices — to each market. Two of this week's four postures are versions of it.",
    },
    {
      question: "The panel scored the original range 71 premium / 44 relevance and the adapted range 58 / 69. Choosing the adapted range primarily trades…",
      options: [
        "premium perception for personal relevance",
        "relevance for premium perception",
        "nothing — it wins on both",
        "price positioning for volume",
      ],
      correct: 0,
      explanation:
        "The data poses a real trade: adaptation buys relevance (44→69) and pays for it in premium perception (71→58). Whichever you choose, you are also choosing a customer.",
    },
    {
      kind: "text",
      question: "A global brand platform executed locally — the middle path between standardise and go native — is often called ________.",
      accept: ["glocalisation", "glocalisation", "glocal"],
      placeholder: "one word",
      explanation:
        "Glocalisation. Two of this week's four postures — the Translated Heritage and the Two Kitchens — are each half of it.",
    },
  ],
  conceptNote:
    "Brand equity is the commercial value of consumer perception: awareness, associations, perceived quality, loyalty. Standardising protects the associations; adapting buys relevance with them. Glocalisation — a global platform, locally executed — is the attempt to split the difference, and this week's panel data prices each side of that attempt precisely.",
  milestones: [
    "Open the file",
    "Read the design brief",
    "Read the panel results",
    "Read the rival's move",
    "Weigh product against story",
    "Make the call",
    "Read the reactions",
    "See the numbers",
    "Write to the board",
    "Close the file",
  ],
  artifacts: [
    {
      kind: "letter",
      stamp: "PERSONAL",
      body: `Inside this week's folder you'll find two things my grandfather never allowed in the same room: our label, and a proposal to change it. The studio has drafted a Mexican range — chile-infused oils, a salsa macha line under the Solari mark, packaging that speaks Spanish first.\n\nI have not looked at page two. I want your recommendation before I do, because whichever way you call it, I will be asked at the next family council whether the house is still ours. Give me the sentence I say back to them.`,
      ps: "P.S. My grandmother designed the border on that label in 1934. I mention it as information, not instruction. — E.",
    },
    {
      kind: "email",
      from: "Meridiano Insights <resultados@meridiano.mx>",
      to: "International Markets file",
      subject: "Concept panel results — read past the topline",
      body: `Topline: the unchanged Italian range scores 71 on premium perception, 44 on personal relevance. The adapted range inverts it: 58 premium, 69 relevance. Both beat the category average; neither wins both columns.\n\nThe finding under the finding: relevance for the adapted range is carried almost entirely by shoppers under 40, while premium perception for the original is carried by shoppers who already buy imported brands. You are not choosing a label. You are choosing a customer.`,
    },
    {
      kind: "clipping",
      from: "THE PROVISIONER — International Grocery Trade Weekly",
      subject: "Casa Verde unveils 'Abuela' line: heritage, rented locally",
      body: `Casa Verde's new Mexican range drops the Barcelona crest entirely: recipes licensed from a beloved Michoacán cooperative, packaging in regional dialect, a launch film with no Spanish accent in earshot — the Iberian giant absent from its own advertising. "Consumers want their own heritage, not ours," said a spokesperson, in what analysts read as a pointed message to slower-moving European heritage brands. No names were mentioned. None needed to be.`,
    },
  ],
  decision: {
    id: "brand-adapt",
    title: "Settle the label question",
    prompt:
      "Two dials, one identity: how far does the product range localise, and whose story does the brand tell on the shelf? This is the file's first branch point — the consequences will choose your week 9.",
    axes: [
      {
        id: "product",
        negLabel: "Original range",
        posLabel: "Localised range",
        negHint: "The Alba recipes, unchanged — the product is the heritage.",
        posHint: "Chile oils, salsa macha, Mexican formulations under the Solari mark.",
      },
      {
        id: "story",
        negLabel: "Italian story",
        posLabel: "Mexican story",
        negHint: "Nonna, the grove, the bicycle — sell the origin.",
        posHint: "Mexican tables, Mexican voices — Solari as guest, not narrator.",
      },
    ],
    classifications: [
      {
        id: "alba-doctrine",
        name: "The Alba Doctrine",
        blurb: "Original range, Italian story: the label is not negotiable.",
        match: { product: [-100, 0], story: [-100, 0] },
        effects: {
          state: { standardizationVsAdaptation: -30, culturalSensitivityScore: -10, entryRiskAppetite: 5 },
          kpis: { brandEquity: 5, customerSentiment: -4, marketShare: -0.2, riskExposure: 7 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "The family council will stand and applaud.",
            ps: "P.S. I'll be watching the under-40 relevance number while they clap. Someone in that room has to. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "You're giving me the 71-premium, 44-relevance tin.\n\nCasa Verde is selling grandmother's own recipes back to her.\n\nI'll fight with what I'm given. Note what I was given.",
          },
          {
            personaId: "lucia",
            kind: "compliance",
            text: "One range, one label file, NOM-051 already cleared. Compliance thanks you. Whether the market does is a different directorate.",
          },
        ],
        reckoning:
          "The house holds its shape and its margins: premium perception climbs where imported-goods buyers already shop. Relevance among younger shoppers stays flat — exactly where the panel said it would.",
      },
      {
        id: "translated-heritage",
        name: "The Translated Heritage",
        blurb: "Original range, Mexican story: the same tins, retold by local voices.",
        match: { product: [-100, 0], story: [0.0001, 100] },
        effects: {
          state: { standardizationVsAdaptation: -5, culturalSensitivityScore: 12 },
          kpis: { brandEquity: 2, customerSentiment: 4, budget: -120, marketShare: 0.2 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "The recipes stay; the storytellers change. That sentence I can carry into the family council with my head up.",
            ps: "P.S. It has to be true in the advertising, not just in the memo. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "A Mexican voice selling an honest Italian tin. Twenty years I've watched this work.\n\nGet the casting right.\n\nThe señora smells a rented accent through the television.",
          },
          {
            personaId: "lucia",
            kind: "compliance",
            text: "Product file unchanged; advertising claims file reopened. 'Local voices' means local testimonial rules — manageable, documented, proceeding.",
          },
        ],
        reckoning:
          "The campaign hands the microphone to Mexican kitchens and keeps the tin Italian. Sentiment warms measurably; the family council mutters but cannot point to a changed label. The trick will be keeping the promise the casting just made.",
      },
      {
        id: "two-kitchens",
        name: "The Two Kitchens",
        blurb: "Localised range, Italian story: Mexican products wearing the Alba crest.",
        match: { product: [0.0001, 100], story: [-100, 0] },
        effects: {
          state: { standardizationVsAdaptation: 20, culturalSensitivityScore: -8, entryRiskAppetite: 10 },
          kpis: { marketShare: 0.4, brandEquity: -3, customerSentiment: 1, budget: -200, riskExposure: 6 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "An Italian house signing a salsa macha. I have approved it and I still cannot quite say it aloud.",
            ps: "P.S. Watch the reviews like a hawk. Pride survives mockery poorly. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "The product will move. I promise you that.\n\nBut an Italian nonna presenting salsa macha? That's a joke my market may make before we do.\n\nGet ahead of it. Or be under it.",
          },
          {
            personaId: "lucia",
            kind: "compliance",
            text: "New formulations: full NOM dossiers, new supplier audits, origin claims needing careful wording — 'inspired by Italy, made for Mexico' clears; 'Italian salsa' does not. Six weeks minimum. The clock is running.",
          },
        ],
        reckoning:
          "The localised range ships under the old crest and sells — while a Monterrey food blogger's post asking “¿la nonna sabe?” collects thirty thousand shares. Revenue and ridicule arrive in the same weekly report.",
      },
      {
        id: "full-glocal",
        name: "The Full Glocal",
        blurb: "Localised range, Mexican story: Solari becomes a Mexican brand with Italian bones.",
        match: { product: [0.0001, 100], story: [0.0001, 100] },
        effects: {
          state: { standardizationVsAdaptation: 35, culturalSensitivityScore: 8, entryRiskAppetite: 15 },
          kpis: { marketShare: 0.6, customerSentiment: 5, brandEquity: -6, budget: -260, customerGrowth: 2.0 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "So the house learns Spanish entirely. The family council will call it surrender; the panel data calls it relevance. I will defend it.",
            ps: "P.S. Bring me growth before their patience runs out. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "Now you're playing Casa Verde's game. Smaller budget. Better product.\n\nThat can win.\n\nIt has to win FAST — before they simply buy the referee.",
          },
          {
            personaId: "lucia",
            kind: "compliance",
            text: "Full adaptation: new dossiers, new claims architecture, and — flagging early — a brand-control question wherever partners touch the localised identity. Who approves the next 'Mexican Solari' idea? Put it in writing now.",
          },
        ],
        reckoning:
          "The Mexican Solari launches and the growth curve answers first, with relevance scores the original range never touched. In Torino, brand equity slips — the house has bet it can hold two identities at once, and the growth numbers now have to outrun the family council's patience.",
      },
    ],
  },
  reflectionPrompt:
    "Board note: this was the term's first irreversible branding call. Which element of brand equity did you choose to spend, which did you protect, and what early-warning signal would tell you the trade is going wrong?",
  epilogue:
    "The label question is settled. Decisions this size don't stay in their own week — week 9 will show you where this one lands.",
  frontpage: (classification) => ({
    headline:
      classification === "The Alba Doctrine"
        ? "Solari holds the line: 'the label is the heritage'"
        : classification === "The Full Glocal"
          ? "A Mexican Solari: Alba house goes native"
          : classification === "The Two Kitchens"
            ? "Salsa macha, signed Solari: heritage house crosses the kitchen"
            : "Same tin, new voices: Solari hands Mexico the microphone",
    standfirst: `Week five of the Alba house's Latin American campaign, and the label question is settled — insiders describe the call as “${classification}.” Casa Verde's response is expected within the quarter.`,
  }),
};
