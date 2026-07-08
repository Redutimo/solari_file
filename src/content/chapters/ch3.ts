import type { ChapterContent } from "../../engine/types";

export const ch3: ChapterContent = {
  id: 3,
  title: "The Shape of the Door",
  topic: "Market Entry Mode Selection",
  region: "mexico",
  cameraDistance: 1.9,
  coldOpen: "Exporting, licensing, joint venture, or a wholly-owned operation: this week you choose how Solari enters Mexico, and how much it commits.",
  terms: ["entry mode", "exporting", "licensing", "joint venture", "FDI", "control", "commitment"],
  outcomes: [
    "Compare the four classic entry modes on control, commitment and risk",
    "Evaluate a partner's joint-venture proposal against the strategic alternatives",
    "Anticipate the governance consequences of an ownership structure",
  ],
  quiz: [
    {
      question: "Ranked by resource commitment, lowest to highest, the classic entry modes run…",
      options: [
        "FDI → joint venture → licensing → exporting",
        "exporting → licensing → joint venture → FDI (wholly-owned)",
        "licensing → exporting → FDI → joint venture",
        "joint venture → exporting → FDI → licensing",
      ],
      correct: 1,
      explanation:
        "Exporting commits least (and controls least); wholly-owned FDI commits most. Licensing and joint ventures sit between, trading control for local capability.",
    },
    {
      question: "The central trade-off in entry-mode theory is that…",
      options: [
        "price rises with quality",
        "control rises with commitment — and so does exposure to loss",
        "speed falls as budgets grow",
        "tariffs offset taxes",
      ],
      correct: 1,
      explanation:
        "More ownership buys more control over brand, channel and margin, and puts more capital at risk if the market turns. Lucia's note makes the same point as workload.",
    },
    {
      question: "The most common failure point of international joint ventures is…",
      options: [
        "technology transfer costs",
        "governance and control disputes between the partners",
        "customs delays",
        "advertising standards",
      ],
      correct: 1,
      explanation:
        "JVs fail over who decides — brand control, reinvestment, exit. That is why the 'thin' Clause 12 in this week's agreement matters more than its 40 words suggest.",
    },
    {
      kind: "text",
      question: "Name the entry mode in which ownership and governance are shared with a local partner.",
      accept: ["joint venture", "a joint venture", "jv"],
      placeholder: "two words",
      explanation:
        "The joint venture — Rafael's 60/40 proposal. Shared ownership buys local capability and costs sole control.",
    },
  ],
  conceptNote:
    "Entry-mode theory arranges the options along one trade-off: control rises with commitment, and so does exposure. Exporting is cheap and reversible but keeps you far from the customer; licensing rents the brand out; a joint venture buys local capability at the price of shared governance; wholly-owned entry maximises both control and the size of a possible mistake. Reversibility is the underrated variable — ask what each mode would cost to undo.",
  milestones: [
    "Open the file",
    "Read the options paper",
    "Read Ortega's proposal",
    "Read compliance's note",
    "Weigh control against pace",
    "Make the call",
    "Read the reactions",
    "See the numbers",
    "Write to the board",
    "Close the file",
  ],
  artifacts: [
    {
      kind: "memo",
      from: "Strategy Desk",
      to: "International Markets file",
      subject: "Entry mode options paper — the honest version",
      body: `Four doors into Mexico, in ascending order of commitment: keep exporting through Distribuidora Ortega under a tighter contract; license the brand to a Mexican manufacturer for local production; form a joint venture with Ortega, sharing ownership and decisions; or buy our way in outright — our own subsidiary, our own plant, our own consequences.\n\nThe textbook trade-off holds: control rises with commitment, and so does the size of the mistake you're allowed to make. What the textbook omits: whichever door we choose, Rafael Ortega is standing in three of them.`,
    },
    {
      kind: "email",
      from: "Rafael Ortega <r.ortega@grupoortega.mx>",
      to: "International Markets file",
      subject: "A proposal, made once",
      body: `Twenty-two years I have distributed European brands. Twice I have proposed a joint venture; the first partner said yes and we built the category leader in imported preserves. The second said no, went alone, and sold their plant to Casa Verde at a loss four years later. I don't tell this story to threaten. I tell it because I am about to make my second-ever proposal again.\n\nJoint venture, 60/40, my people running distribution and government relations, your people running brand and product. I bring thirty years of relationships. You bring ninety years of name. Or we can keep things as they are — I sell your tins, you check my numbers, and we never find out what the two houses could have built.`,
    },
    {
      kind: "compliance",
      from: "L. Ferraro — Regulatory & Compliance",
      subject: "Entry mode: regulatory load by option",
      stamp: "INTERNAL — CIRCULATE ON REQUEST",
      body: `Ranked by my team's workload, lightest first: (1) Continued export — known regime, NOM-051 labelling only. (2) Licensing — adds trademark and quality-control enforcement in a jurisdiction where our counsel is, to be generous, new. (3) Joint venture — adds foreign-investment registration and a shareholders' agreement that WILL be tested; they always are. (4) Wholly-owned — adds everything above plus permanent establishment, tax, and employment law.\n\nI rank options; I don't pick them. But note that options 3 and 4 are the only ones where a mistake carries the Solari name on the incorporation papers.`,
    },
  ],
  decision: {
    id: "entry-mode",
    title: "Choose the door",
    prompt:
      "The board wants the entry mode settled this week. Two dials: how much ownership Solari holds, and how fast the commitment scales.",
    axes: [
      {
        id: "ownership",
        negLabel: "Partner-led",
        posLabel: "Solari-owned",
        negHint: "Ortega's people, Ortega's relationships, shared upside.",
        posHint: "Our subsidiary, our control, our name on every filing.",
      },
      {
        id: "commitment",
        negLabel: "Staged",
        posLabel: "All-in",
        negHint: "Scale commitment as evidence arrives.",
        posHint: "Full commitment now — buy position, learn in public.",
      },
    ],
    classifications: [
      {
        id: "exporters-gambit",
        name: "The Exporter's Gambit",
        blurb: "Stay partner-led, scale by evidence: Ortega sells, Solari watches the data.",
        match: { ownership: [-100, 0], commitment: [-100, 0] },
        effects: {
          state: { entryRiskAppetite: -20, localPartnerTrust: 10, regulatoryComplianceScore: 8 },
          kpis: { partnerDependency: 12, budget: -50, riskExposure: -4, marketShare: 0.2 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "The reversible choice. Prudent or timid — the numbers will tell us which, and I can live with either verdict.",
            ps: "P.S. The board calls it prudent. Barcelona will call it something else. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "So. Not the venture.\n\nI won't pretend that's the answer I wanted.\n\nBut you chose me over your own plant. That, I honour. My floor, my hustle, your tins.",
          },
          {
            personaId: "lucia",
            kind: "compliance",
            text: "Option 1, as ranked. My team's capacity is now free for the labelling file, which — see my next note — will need it.",
          },
        ],
        reckoning:
          "The safest door, and the narrowest: sales run through Ortega's relationships and the dependency line on the dashboard says so. What Solari saves in risk it pays in distance from its own customer.",
      },
      {
        id: "joint-venture",
        name: "The Two Houses",
        blurb: "Take Ortega's proposal: shared ownership, all-in together.",
        match: { ownership: [-100, 0], commitment: [0.0001, 100] },
        effects: {
          state: { entryRiskAppetite: 20, localPartnerTrust: 20, regulatoryComplianceScore: -5 },
          kpis: { partnerDependency: 20, budget: -300, marketShare: 0.6, customerSentiment: 3, riskExposure: 4 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "Ninety years of sole ownership, ended by my signature. I said yes because Rafael's first venture is the only import story in that market with a happy ending.",
            ps: "P.S. Do not make me study the second kind. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "My father framed the first venture agreement.\n\nThis one goes on the wall beside it.\n\nNow we find out what the two houses build. Together — which is the point.",
          },
          {
            personaId: "lucia",
            kind: "compliance",
            text: "The shareholders' agreement runs 84 pages. I have annotated 31 of them. Clause 12 — brand control in dispute scenarios — is thin. I record this now so that no one is surprised later.",
          },
        ],
        reckoning:
          "Signatures in Monterrey, photographs, a lunch that runs four hours. Market access arrives overnight and so does its price: every future brand decision now has a second signature line, and Lucia's note on Clause 12 becomes a standing item in the file.",
      },
      {
        id: "licensed-foothold",
        name: "The Measured Claim",
        blurb: "Solari-owned but staged: a small subsidiary first, the plant only if the numbers vote yes.",
        match: { ownership: [0.0001, 100], commitment: [-100, 0] },
        effects: {
          state: { entryRiskAppetite: 5, localPartnerTrust: -10, regulatoryComplianceScore: 3 },
          kpis: { partnerDependency: -8, budget: -180, brandEquity: 2, marketShare: 0.3 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "Our own people on the ground at last — modestly, expandably. It is the choice I would have made myself, which is exactly why I hired someone else to make it.",
            ps: "P.S. Rafael will read the org chart before he reads your email. Call him first. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "A Solari office in Mexico City. 'To support the partnership.'\n\nI've imported long enough to translate that.\n\nWe keep selling for you. And I keep one eye on the exits. Like you.",
          },
          {
            personaId: "lucia",
            kind: "compliance",
            text: "Permanent establishment triggered; tax registration underway; headcount of six keeps the exposure legible. Structurally sound. Relationally — not my department, but even I can read that email from Monterrey.",
          },
        ],
        reckoning:
          "The subsidiary opens quietly above a bank in Polanco. Control improves, optionality is preserved — and something cools in Monterrey by exactly the amount the org chart implies.",
      },
      {
        id: "full-fdi",
        name: "The Planted Flag",
        blurb: "Wholly-owned, all-in: our plant, our payroll, our country now too.",
        match: { ownership: [0.0001, 100], commitment: [0.0001, 100] },
        effects: {
          state: { entryRiskAppetite: 35, localPartnerTrust: -20, regulatoryComplianceScore: -10 },
          kpis: { partnerDependency: -15, budget: -520, marketShare: 0.8, brandEquity: 3, riskExposure: 10 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "The largest cheque this house has written since the war, signed with my grandfather's pen.",
            ps: "P.S. Prove the size of it was judgement, not momentum. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "So Solari goes alone.\n\nI'll finish the contract professionally. Ortega doesn't do bitterness.\n\nWhen you need a friend in this market — and you will — check how many you left standing.",
          },
          {
            personaId: "lucia",
            kind: "compliance",
            text: "Four regulatory regimes engaged simultaneously. My team is doubled, my inbox is quadrupled, and my formal risk memo is nine pages. Executive summary: everything is survivable except impatience.",
          },
        ],
        reckoning:
          "Ground breaks outside Querétaro before the ink dries in the registry. Position is bought, visibly and irreversibly — and the partner who knew every shopkeeper in the north now takes Casa Verde's calls.",
      },
    ],
  },
  reflectionPrompt:
    "Board note: entry-mode theory trades control against commitment and risk. Which of the four modes did you choose, what does it maximise, and what is the specific failure case you've accepted?",
  epilogue:
    "The entry mode is set. Most of the term's remaining problems will trace back to this page.",
};
