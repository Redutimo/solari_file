import type { ChapterContent } from "../../engine/types";

export const ch4: ChapterContent = {
  id: 4,
  title: "The Price of Knowing",
  topic: "International Market Research & Segmentation",
  region: "mexico",
  cameraDistance: 1.9,
  coldOpen: "The research budget and the launch calendar want opposite things. This week, one of them bends.",
  terms: ["segmentation", "targeting", "market research", "sample", "primary research", "positioning"],
  outcomes: [
    "Weigh research rigor against speed to market under a real deadline",
    "Judge what a given sample can and cannot support",
    "Plan how a launch corrects course when better data arrives later",
  ],
  quiz: [
    {
      question: "Primary research earns its cost over secondary research when…",
      options: [
        "the budget is tight",
        "you need market-specific answers to questions nobody has already asked",
        "speed matters more than accuracy",
        "the category is mature and well documented",
      ],
      correct: 1,
      explanation:
        "Secondary research is cheaper but answers other people's questions. Solari's segment sizing in Mexico is a question no published study has asked.",
    },
    {
      question: "For a segmentation to be useful for targeting, its segments must be…",
      options: [
        "demographic",
        "measurable, substantial, accessible and actionable",
        "defined by age bands",
        "national in scope",
      ],
      correct: 1,
      explanation:
        "The classic test: can you size it, is it worth serving, can you reach it, can you act on it? Bia's note about the 800-person sample is exactly the 'measurable' criterion failing.",
    },
    {
      kind: "text",
      question: "Research you commission first-hand to answer your own question — rather than buy from existing sources — is ________ research.",
      accept: ["primary"],
      placeholder: "one word",
      explanation:
        "Primary research. Both of Meridiano's scopes are primary; the difference between them is sample, depth, and what the findings can support.",
    },
  ],
  conceptNote:
    "Research buys certainty, and certainty has both a price and a deadline: a study only has value if its findings can still change a decision. Segmentation counts only when segments are measurable, substantial, accessible and actionable — a sample too small to size a segment can still confirm the category exists, which is why labelling your remaining assumptions is a legitimate strategy, not a failure.",
  milestones: [
    "Open the file",
    "Read the research quote",
    "Read the launch-window warning",
    "Note Bia's math",
    "Weigh rigor against speed",
    "Make the call",
    "Read the reactions",
    "See the numbers",
    "Write to the board",
    "Close the file",
  ],
  artifacts: [
    {
      kind: "email",
      from: "Meridiano Insights <propuestas@meridiano.mx>",
      to: "International Markets file",
      subject: "Proposal: Mexico segmentation study — two scopes",
      body: `Scope A ("the census"): 4,000-consumer quantitative study across six metro areas, ethnographic shop-alongs, tienda-owner panel, full segmentation model with sizing. Sixteen weeks, €190k. You will know the Mexican speciality-food shopper better than any European brand in the market.\n\nScope B ("the sketch"): 800 consumers, two metros, desk research on the rest. Five weeks, €55k. You will know enough to be dangerous, which — said with respect — is more than most of our clients ever buy.`,
    },
    {
      kind: "memo",
      from: "Strategy Desk",
      to: "International Markets file",
      subject: "The launch window is not hypothetical",
      stamp: "URGENT",
      body: `Retail listing calendars in Mexico lock in Q3. Miss the window and the first real shelf presence slips five months — into the exact quarter Casa Verde's localised line ships nationally. The full study delivers three weeks after the listing deadline.\n\nNobody in this building will say "skip the research" out loud. This memo exists so that somebody has at least written down the cost of not skipping it.`,
    },
    {
      kind: "sticky",
      from: "Bia",
      body: `Did the maths on Scope B's sample: 800 people, 2 metros = fine for “does the category exist,” useless for “which segment is ours.” If we buy the sketch, can we at least admit we're launching on a hypothesis? Hypotheses are fine! Unlabelled hypotheses are how brands die.`,
    },
  ],
  decision: {
    id: "research-spend",
    title: "Buy knowledge or buy time",
    prompt:
      "One dial this week, and it's a brutal one: how much certainty do you purchase before the listing window closes?",
    axes: [
      {
        id: "rigor",
        negLabel: "Speed to market",
        posLabel: "Research rigor",
        negHint: "The sketch: launch inside the window on an honest hypothesis.",
        posHint: "The census: know everything, and negotiate a later window from strength.",
      },
    ],
    classifications: [
      {
        id: "window-runner",
        name: "The Window Runner",
        blurb: "Buy the sketch, make the window, label the guesses honestly.",
        match: { rigor: [-100, -34] },
        effects: {
          state: { entryRiskAppetite: 15, culturalSensitivityScore: -5 },
          kpis: { budget: -55, marketShare: 0.3, riskExposure: 6, customerGrowth: 1.5 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "Speed chosen with open eyes, at least.",
            ps: "P.S. Keep Bia's assumptions register on your desk. I intend to ask about it in October. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "Good. The window beats the binder.\n\nI've watched brands research themselves straight out of this market.\n\nSend the two-metro data. My floor teams fill gaps the fast way.",
          },
          {
            personaId: "bia",
            kind: "sticky",
            text: "Okay. Starting the 'Things We're Assuming' register — one page, taped inside the file cover. Rule: nothing ships until it's on the list or crossed off.",
          },
        ],
        reckoning:
          "The listing window is made with nine days to spare. The segmentation model is a sketch and everyone knows it; growth arrives early and so does the first surprise the sketch never saw.",
      },
      {
        id: "split-ticket",
        name: "The Split Ticket",
        blurb: "The sketch now to make the window, the census running behind it to correct course.",
        match: { rigor: [-34, 34] },
        effects: {
          state: { culturalSensitivityScore: 5, regulatoryComplianceScore: 3 },
          kpis: { budget: -160, marketShare: 0.2, customerGrowth: 1.0, riskExposure: 2 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "Both invoices, then. Acceptable — provided the census is allowed to embarrass the sketch when it reports.",
            ps: "P.S. Corrections only count if we take them. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "Launch on the sketch. Correct on the census. The disciplined way.\n\nPromise me the correction meeting actually happens.\n\nI've sat in the version where it doesn't.",
          },
          {
            personaId: "bia",
            kind: "sticky",
            text: "Flagged in my calendar: week 14, 'census v. sketch — what did we get wrong?' Pre-booked the room so nobody can claim there wasn't one.",
          },
        ],
        reckoning:
          "The window is made and the meter runs on both scopes. It's the expensive, defensible middle: the launch flies on the sketch while the census quietly compiles the list of what will need fixing.",
      },
      {
        id: "cartographer",
        name: "The Cartographer",
        blurb: "Buy the census, cede the window, arrive late and certain.",
        match: { rigor: [34, 100] },
        effects: {
          state: { entryRiskAppetite: -15, culturalSensitivityScore: 12 },
          kpis: { budget: -190, marketShare: -0.1, customerSentiment: 3, riskExposure: -5, customerGrowth: -0.5 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "Five months ceded to Casa Verde, in exchange for a map. Approved.",
            ps: "P.S. I've written the date in my diary. The board will want to know what the map was for. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "Five more months of Casa Verde owning the aisle.\n\nYour study better find a segment they can't reach.\n\nBecause they'll spend those months making sure there isn't one.",
          },
          {
            personaId: "bia",
            kind: "sticky",
            text: "For the record I LOVE the census. Also for the record: booked shelf-audit photos monthly so we can watch exactly what the delay costs. Data on the data.",
          },
        ],
        reckoning:
          "The window closes without Solari in it. What arrives sixteen weeks later is the best map of the Mexican speciality shopper any European brand holds — pointed at shelves that are five months more crowded.",
      },
    ],
  },
  reflectionPrompt:
    "Board note: research spend bought certainty, speed bought position — you couldn't maximise both. Which segment do you believe Solari should target with what you now know, and what would falsify that belief?",
  epilogue:
    "The research call is filed. Next week: the label question the family has been avoiding since the board approved this expansion.",
};
