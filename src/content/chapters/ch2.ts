import type { ChapterContent } from "../../engine/types";

export const ch2: ChapterContent = {
  id: 2,
  title: "Reading the Room",
  topic: "Cultural Analysis & Consumer Behaviour",
  region: "mexico",
  cameraDistance: 1.9,
  coldOpen: "Before Solari can sell to the Mexican shopper, someone has to understand her. This week you decide how.",
  outcomes: [
    "Apply cultural frameworks — Hofstede's dimensions, high/low-context — to a real consumer profile",
    "Recognise the self-reference criterion in your own team's assumptions",
    "Choose a research lens and account for what it can miss",
  ],
  quiz: [
    {
      question: "The self-reference criterion is the risk of…",
      options: [
        "spending too much on research",
        "assuming your own culture's values apply in the new market",
        "relying on a distribution partner's opinion",
        "using quantitative data over qualitative",
      ],
      correct: 1,
      explanation:
        "The SRC is the unconscious use of your own cultural frame to interpret another market — exactly the trap Bia's note points at in 'family, table, tradition'.",
    },
    {
      question: "Mexico is described as a high-context, family-collectivist grocery market. For marketing, this most implies…",
      options: [
        "price-led messaging wins",
        "trust travels through people and relationships, not claims",
        "individual-achievement appeals will resonate",
        "in-store presence matters less than advertising",
      ],
      correct: 1,
      explanation:
        "In high-context, collectivist settings, recommendation and relationship carry more weight than explicit product claims — Rafael's shopkeeper point, in framework terms.",
    },
    {
      question: "A market scoring high on uncertainty avoidance will tend to…",
      options: [
        "switch brands readily",
        "prefer familiar, trusted brands and clear guarantees",
        "ignore brand heritage entirely",
        "respond mainly to novelty",
      ],
      correct: 1,
      explanation:
        "High uncertainty avoidance favours the known and the guaranteed — an opening for a heritage brand, but only once it has become familiar.",
    },
    {
      kind: "text",
      question: "The error of judging a foreign market through your own culture's values is the self-________ criterion.",
      accept: ["reference", "self-reference", "self reference"],
      placeholder: "one word",
      explanation:
        "The self-reference criterion — Bia's warning about 'family, table, tradition' being Solari's story about Mexico, not Mexico's story about itself.",
    },
  ],
  conceptNote:
    "Cultural frameworks are hypotheses, not answers. Hofstede's dimensions and the high/low-context distinction tell you where to look; the self-reference criterion — judging another market through your own culture's values — is the error they exist to catch. The strongest consumer profiles start from a framework and then let local fieldwork contradict it.",
  terms: [
    "Hofstede",
    "cultural dimensions",
    "consumer behaviour",
    "high-context",
    "collectivism",
    "self-reference criterion",
  ],
  milestones: [
    "Open the file",
    "Read the research pack",
    "Read Rafael's dispatch",
    "Note Bia's question",
    "Choose your lens",
    "Make the call",
    "Read the reactions",
    "See the numbers",
    "Write to the board",
    "Close the file",
  ],
  artifacts: [
    {
      kind: "email",
      from: "Strategy Desk <strategy@solari.it>",
      to: "International Markets file",
      subject: "MX consumer pack — framework attached, arguments not included",
      body: `The agency's cultural read, compressed: Mexican grocery decisions are family decisions — multigenerational households, high-context communication, brand trust built through people rather than claims. Hofstede scores put Mexico far from Italy on uncertainty avoidance and closer than you'd think on family collectivism, which is either our opening or our trap depending on who's presenting.\n\nThe fault line for this file: do we read the Mexican shopper through what Solari already knows — family, table, tradition, the things Italy and Mexico genuinely share — or do we commission a ground-up local read and let it contradict us?`,
    },
    {
      kind: "email",
      from: "Rafael Ortega <r.ortega@grupoortega.mx>",
      to: "International Markets file",
      subject: "What your agency deck won't tell you",
      body: `I read the pack. Fine work, very expensive fonts. Here is what it misses from the shop floor: the señora who buys premium oil on the 15th and the 30th because those are pay days. The nephew who chooses the brand because the shopkeeper — not the shelf — recommends it. Your category is bought on trust and paid in cash, and no dimension score tells you which tienda owner's opinion moves a neighbourhood.\n\nCome down and count it yourselves, or trust the people who already have. Either is fine. Guessing from Torino is not.`,
    },
    {
      kind: "sticky",
      from: "Bia",
      body: `Question nobody asked in the readout: “family, table, tradition” — that's OUR story about THEM. Did anyone check if it's their story about themselves? (São Paulo says hi. Same trap waiting there, different flag.)`,
    },
  ],
  decision: {
    id: "lens",
    title: "Choose the cultural lens",
    prompt:
      "The consumer profile you commission now will underwrite every campaign this term. How do you read the Mexican shopper?",
    axes: [
      {
        id: "lens",
        negLabel: "Through Solari's lens",
        posLabel: "Through local eyes",
        negHint: "Lead with what Italy and Mexico share — family, table, craft. Fast and coherent.",
        posHint: "Commission the ground-up local read — slower, dearer, and allowed to contradict Torino.",
      },
    ],
    classifications: [
      {
        id: "mirror",
        name: "The Familiar Mirror",
        blurb: "Read Mexico through what Solari already believes: shared values, one story.",
        match: { lens: [-100, -34] },
        effects: {
          state: { standardizationVsAdaptation: -15, culturalSensitivityScore: -12, localPartnerTrust: -5 },
          kpis: { budget: -40, brandEquity: 2, riskExposure: 6 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "There is real truth in the shared table — I have eaten at both. Just remember that resemblance is not recognition.",
            ps: "P.S. When the first campaign tests, show me the under-40 numbers before anything else. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "So the profile was written in Torino after all.\n\nI'll sell against it. When it misses — and somewhere it will — the invoice comes marked 'I told you.'",
          },
          {
            personaId: "bia",
            kind: "sticky",
            text: "Filed the deck. Left the textbook open on your chair at 'self-reference criterion' — worth two minutes before the campaign brief goes out.",
          },
        ],
        reckoning:
          "The profile is coherent and finished ahead of schedule. Whether it is accurate is a separate property — and risk exposure creeps up in the places nobody in Torino thought to check.",
      },
      {
        id: "split-frame",
        name: "The Split Frame",
        blurb: "Start from shared values, then pressure-test them against local fieldwork.",
        match: { lens: [-34, 34] },
        effects: {
          state: { culturalSensitivityScore: 8, standardizationVsAdaptation: 5 },
          kpis: { budget: -80, customerSentiment: 2 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "A hypothesis with the humility to be checked. My grandfather never once operated this way — which is rather the point.",
            ps: "P.S. Send me the contradictions, not just the confirmations. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "Acceptable.\n\nSend your field team through me first.\n\nThey'll interview actual shoppers — not whoever speaks English near the office.",
          },
          {
            personaId: "bia",
            kind: "sticky",
            text: "The fieldwork brief actually says 'find where we're wrong.' That's the right brief — I'll make sure the agency treats it as an instruction, not a slogan.",
          },
        ],
        reckoning:
          "The fieldwork returns with two confirmations and one bruise: the shared-table story lands, but “heritage” means grandmother's mole here, not anyone's olive grove. Cheaper to learn now than in a campaign.",
      },
      {
        id: "ground-truth",
        name: "The Ground Truth",
        blurb: "Local researchers, local frame, and Torino reads the result last.",
        match: { lens: [34, 100] },
        effects: {
          state: { culturalSensitivityScore: 15, standardizationVsAdaptation: 12, localPartnerTrust: 8 },
          kpis: { budget: -140, customerSentiment: 4, brandEquity: -2 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "You've commissioned a mirror we may not enjoy looking into. Good.",
            ps: "P.S. I want the unedited version. Not the board version. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "Your researchers asked my floor manager questions I've never heard an importer ask. Twenty-two years.\n\nWhatever this costs — it's buying something real.",
          },
          {
            personaId: "bia",
            kind: "sticky",
            text: "The Guadalajara focus group transcript is the best thing in this file so far. Page 12. Read page 12.",
          },
        ],
        reckoning:
          "The local read costs real money and repays it in discomfort: half of Torino's assumptions survive contact, half do not. Rafael's people start returning calls the same day — trust, it turns out, was also being measured.",
      },
    ],
  },
  reflectionPrompt:
    "Write the board note: which cultural assumption about the Mexican consumer are you most worried Solari is importing from Italy unexamined, and how would your chosen research approach catch it?",
  epilogue:
    "The consumer profile is filed next to the posture memo. Next week: how Solari physically enters the market.",
};
