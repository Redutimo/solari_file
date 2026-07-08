import type { BranchPointDef, ChapterContent } from "../../engine/types";

const partnerConflict: ChapterContent = {
  id: 9,
  title: "The Clause 12 Letter",
  topic: "Market Entry Complication — Variant: Partner Conflict",
  region: "mexico",
  cameraDistance: 1.6,
  coldOpen: "Rafael Ortega has stopped calling. His lawyers have not.",
  terms: ["joint venture", "brand control", "negotiation", "governance", "opportunism", "relational contract"],
  outcomes: [
    "Diagnose how a governance gap becomes a partner dispute",
    "Weigh contractual leverage against relationship capital",
    "Resolve a dispute and account for the precedent it sets",
  ],
  quiz: [
    {
      question: "In partnership governance, 'thin' contract clauses are typically settled by…",
      options: [
        "the courts, in every case",
        "whichever party holds leverage — or by goodwill, where it exists",
        "the regulator",
        "automatic renegotiation",
      ],
      correct: 1,
      explanation:
        "Where the written terms are vague, outcomes are decided by bargaining power or by the relationship. Lucia's note names the problem: Solari currently holds little of either.",
    },
    {
      question: "Relational contracting theory holds that long-term partnerships depend most on…",
      options: [
        "penalty clauses",
        "trust and reciprocity built through repeated dealings",
        "the equity split",
        "exclusivity terms",
      ],
      correct: 1,
      explanation:
        "Formal terms matter at the edges; day-to-day cooperation runs on accumulated trust. That is why 'the phone stopped working' before the lawyers were engaged.",
    },
    {
      kind: "text",
      question: "Trust built through repeated dealings underpins ________ contracting — the kind now missing between Torino and Monterrey.",
      accept: ["relational"],
      placeholder: "one word",
      explanation:
        "Relational contracting. The lawyers' letter exists because the relational layer failed first; the formal layer is all that's left holding.",
    },
  ],
  conceptNote:
    "Formal governance (contracts, clauses, escalation paths) and relational governance (trust built through repeated dealing) substitute for each other under stress: where a clause is thin, the relationship decides — and where the relationship is thin, everything hangs on the clause. Renegotiating openly is slow precisely because it rebuilds the cheaper of the two mechanisms.",
  milestones: [
    "Open the file",
    "Read the lawyer's letter",
    "Read Rafael's version",
    "Read compliance's position",
    "Weigh control against the relationship",
    "Make the call",
    "Read the reactions",
    "See the numbers",
    "Write to the board",
    "Close the file",
  ],
  artifacts: [
    {
      kind: "compliance",
      from: "Vega y Asociados, S.C. — counsel to Distribuidora Ortega",
      subject: "Re: Brand usage in regional promotions — formal notice",
      stamp: "RECEIVED — TORINO",
      body: `Our client has, at its own expense, developed regional promotional materials adapting the Solari mark for the northern market — materials your Torino office rejected without, in our client's view, the consultation the partnership contemplates. Under the agreement's brand provisions, "joint development of market-facing identity" grants our client a consultative role your office has treated as decorative.\n\nOur client does not seek dispute. Our client seeks the partnership it signed. He asks — through us, which should tell you something about how this has been handled — for a defined, binding role in brand decisions for the territories he built.`,
    },
    {
      kind: "email",
      from: "Rafael Ortega <r.ortega@grupoortega.mx>",
      to: "International Markets file",
      subject: "Yes, the letter is from me",
      body: `You moved fast in this market — faster than trust grows. I carried it, my people opened three hundred doors, and when my team adapted your campaign for the north — good work, work that sold — Torino killed it in one email. No call. The lawyers' letter exists because the phone stopped working a long time before I stopped answering it.\n\nHere is the truth as I see it: you are guests who behave like landlords. I am still, today, your best friend in this country. Whether I am that in December is being decided in your office, this week, by you.`,
    },
    {
      kind: "compliance",
      from: "L. Ferraro — Regulatory & Compliance",
      subject: "The Clause 12 matter — options and exposure",
      body: `As flagged in my annotation of the original agreement: the brand-control clause is thin, and thin clauses are settled by leverage or by goodwill — we currently hold little of either in Monterrey. (1) Concede a binding role: retains the partner, dilutes brand control, precedent-setting for Brazil. (2) Hold the line: preserves control on paper; on the ground, our distribution walks on his floor. (3) Renegotiate the clause openly: slowest, least dramatic, and requires the one asset not in the file — his renewed trust.`,
    },
  ],
  decision: {
    id: "clause12",
    title: "Answer the letter",
    prompt:
      "One axis, no refuge: does Solari reassert control of the brand, or concede real authority to the partner who built its distribution?",
    axes: [
      {
        id: "control",
        negLabel: "Reassert control",
        posLabel: "Concede authority",
        negHint: "The mark is Solari's alone; the clause is settled by holding it.",
        posHint: "A binding regional brand role for Ortega — partnership made literal.",
      },
    ],
    classifications: [
      {
        id: "landlord",
        name: "The Landlord's Reply",
        blurb: "Hold the mark, cite the contract, accept the cost in Monterrey.",
        match: { control: [-100, -34] },
        effects: {
          state: { localPartnerTrust: -25, standardizationVsAdaptation: -10, entryRiskAppetite: 5 },
          kpis: { brandEquity: 3, partnerDependency: -5, marketShare: -0.4, customerSentiment: -3, riskExposure: 8 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "The mark stays ours. Correct on paper — and paper is what we will be holding if his floor stops moving our tins.",
            ps: "P.S. A second distribution plan. My desk. Month's end. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "Understood.\n\nThe contract will be honoured to the letter. Exactly to the letter. Not one door further.\n\nYou've taught me the terms of this partnership. I'm a quick study.",
          },
          {
            personaId: "lucia",
            kind: "compliance",
            text: "Legally clean; relationally scorched. I've updated the Brazil entry file accordingly: assume no warm introductions travel south from Monterrey.",
          },
        ],
        reckoning:
          "The letter is answered in kind and the mark stays whole. Within a month the difference between contractual distribution and committed distribution shows up in the northern numbers, line by line.",
      },
      {
        id: "second-signature",
        name: "The Second Signature",
        blurb: "Renegotiate Clause 12 openly: a defined consultative role, built slowly, in person.",
        match: { control: [-34, 34] },
        effects: {
          state: { localPartnerTrust: 15, regulatoryComplianceScore: 8, standardizationVsAdaptation: 5 },
          kpis: { budget: -80, customerSentiment: 2, riskExposure: -4 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "You flew to Monterrey instead of replying to the lawyers. That single flight may be the cheapest marketing spend in this file.",
            ps: "P.S. Finish the clause properly. I'll sign what rebuilds this. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "Three days. My table. No lawyers in the room until the last morning.\n\nThat is how my father did business. I had honestly stopped expecting it from Torino.\n\nThe north is yours again. Ours again.",
          },
          {
            personaId: "lucia",
            kind: "compliance",
            text: "The redrafted clause is 4 pages where it was 40 words: defined role, defined territories, defined escalation. Thin clauses invite disputes; this one is now armored. Withdraw noted from Vega y Asociados this morning.",
          },
        ],
        reckoning:
          "The dispute dissolves the old-fashioned way: slowly, in person, over food. Clause 12 emerges armored, trust emerges compounding, and the only line item is three days and a redraft — the file's rare complication that ends better than it began.",
      },
      {
        id: "open-hand",
        name: "The Open Hand",
        blurb: "Concede a binding brand role for the north: partnership made literal, precedent and all.",
        match: { control: [34, 100] },
        effects: {
          state: { localPartnerTrust: 25, standardizationVsAdaptation: 15, culturalSensitivityScore: 5 },
          kpis: { partnerDependency: 12, brandEquity: -4, marketShare: 0.4, customerSentiment: 4 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "A binding role — the first time in ninety years the mark answers to a hand outside the family. I approved it because the alternative was losing the country.",
            ps: "P.S. Brazil will read this precedent. So will everyone else. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "You'll have the northern campaigns within the month. They will sell — that was never the question.\n\nThe question was whether Solari meant the word 'partner.'\n\nQuestion answered. My floor is yours.",
          },
          {
            personaId: "lucia",
            kind: "compliance",
            text: "Binding co-approval registered. Note for the record: every future licensee and Brazilian partner will cite this arrangement in negotiation. I've priced the precedent into the Brazil file; it isn't small.",
          },
        ],
        reckoning:
          "The northern campaigns come home to Ortega's team and the region responds — sales, sentiment, loyalty of the kind money doesn't buy directly. The price sits quietly in the Brazil file: the precedent now negotiates ahead of you.",
      },
    ],
  },
  reflectionPrompt:
    "Board note: the complication grew directly from your earlier entry and pace choices. What does this dispute teach about the control–commitment trade-off you made in week 3, and what would you now write into any future partnership agreement first?",
  epilogue:
    "The dispute is closed. What it cost, and what it taught, are both in the record now.",
  frontpage: () => ({
    headline: "Solari and Ortega: the quiet war over the crest",
    standfirst:
      "A leaked legal letter reveals strain inside the Alba house's Mexican alliance — and how the new adviser answers it may decide the Brazil expansion before it begins.",
  }),
};

const culturalBacklash: ChapterContent = {
  id: 9,
  title: "The Hashtag Week",
  topic: "Market Entry Complication — Variant: Cultural Backlash",
  region: "mexico",
  cameraDistance: 1.6,
  coldOpen: "The campaign tested well. Then Mexico saw it.",
  terms: ["crisis response", "cultural appropriation", "glocalisation", "social listening", "brand trust", "apology"],
  outcomes: [
    "Make a crisis-response decision under time pressure",
    "Explain why pre-tested creative can still fail in public",
    "Reposition a brand's voice after a cultural misstep",
  ],
  quiz: [
    {
      question: "The first principles of brand crisis response are…",
      options: [
        "never apologise; it admits liability",
        "respond quickly, honestly, and in the affected audience's own terms",
        "increase media spend to change the subject",
        "go silent for thirty days",
      ],
      correct: 1,
      explanation:
        "Speed, honesty, and answering in the audience's terms — Rafael's point about not sending 'a lawyer's apology translated twice' is this principle from the shop floor.",
    },
    {
      question: "The spot scored well in testing and still triggered a backlash. This shows that…",
      options: [
        "consumer testing is worthless",
        "a message's cultural meaning is made in public and can exceed what testing samples",
        "social media reactions are random",
        "humor never crosses borders",
      ],
      correct: 1,
      explanation:
        "Meaning is completed by the audience, in context, at scale. A test panel sees the ad; the public sees who is speaking, to whom, and with what authority.",
    },
    {
      kind: "text",
      question: "A message's cultural ________ is completed by the audience, in public — which is why the panel scores didn't save this campaign.",
      accept: ["meaning"],
      placeholder: "one word",
      explanation:
        "Meaning. The spot said what Solari intended in the test room, and something else entirely once Mexico decided who was talking.",
    },
  ],
  conceptNote:
    "Crisis response has a known shape: speed, honesty, and answering in the affected audience's terms rather than your own. The deeper lesson is about meaning-making — a message's cultural meaning is completed in public, by the audience, which is why pre-testing can pass creative that a country then rejects. The campaign didn't fail because it was misunderstood; it failed because it was understood.",
  milestones: [
    "Open the file",
    "Read the monitoring alert",
    "Read the coverage",
    "Read Monterrey's read",
    "Weigh defence against apology",
    "Make the call",
    "Read the reactions",
    "See the numbers",
    "Write to the board",
    "Close the file",
  ],
  artifacts: [
    {
      kind: "email",
      from: "Social Listening Desk <alerts@solari.it>",
      to: "International Markets file",
      subject: "ESCALATION: #LaNonnaNoSabe — hour 36",
      stamp: "URGENT",
      body: `The 'Abuela Siciliana' spot — the one positioning our nonna as the knowing elder teaching a Mexican kitchen — has been re-cut by a Guadalajara comedy account with the caption “gracias por explicarnos nuestra propia comida.” 4.1M views in 36 hours. #LaNonnaNoSabe is trending in three metros.\n\nSentiment tracker: −11 points and falling. Two national retailers have asked, informally so far, whether the campaign will continue. The agency's position is that the spot tested well. It did. Testing, we are now reminded, is not the same as being seen.`,
    },
    {
      kind: "clipping",
      from: "THE PROVISIONER — International Grocery Trade Weekly",
      subject: "Solari's abuela problem",
      body: `The Alba house's push into Mexico has met its first genuine crisis: a campaign accused of casting Italian heritage as the teacher and Mexican cuisine as the student. Casa Verde — whose own 'Abuela' line launched with Michoacán recipes and local voices — has said nothing publicly, which competitors will recognise as the loudest available comment. The next 72 hours of response, one analyst noted, "will be worth more than the last six months of media spend, in one direction or the other."`,
    },
    {
      kind: "email",
      from: "Rafael Ortega <r.ortega@grupoortega.mx>",
      to: "International Markets file",
      subject: "Before Torino decides anything",
      body: `My phone has not stopped. Shopkeepers are asking if they should pull the poster; two have already, without asking. Understand what happened: nobody is angry at the oil. They are angry at the *lecture*. The joke landing on us is that a guest stood in the kitchen and corrected the cook.\n\nWhatever you decide — and decide fast — do not send a lawyer's apology written in Italian and translated twice. If Solari speaks this week, it speaks like a guest who knows what he got wrong.`,
    },
  ],
  decision: {
    id: "backlash",
    title: "Answer the hashtag",
    prompt:
      "Seventy-two hours, one axis: does Solari stand by the campaign it paid for, or withdraw it and rebuild in Mexico's own voice?",
    axes: [
      {
        id: "response",
        negLabel: "Defend the campaign",
        posLabel: "Withdraw & relaunch",
        negHint: "Contextualize, ride it out — brands that apologise for everything stand for nothing.",
        posHint: "Pull the spot, apologise as a guest, hand the next campaign to Mexican creators.",
      },
    ],
    classifications: [
      {
        id: "stand-firm",
        name: "The Firm Stand",
        blurb: "Contextualize the spot, decline the apology, trust the storm to pass.",
        match: { response: [-100, -34] },
        effects: {
          state: { culturalSensitivityScore: -15, standardizationVsAdaptation: -10 },
          kpis: { customerSentiment: -8, brandEquity: -3, marketShare: -0.5, riskExposure: 10, budget: -40 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "We have chosen dignity as our defence. I hope the market grades on that rubric. The family council does — but the council doesn't buy oil in Guadalajara.",
            ps: "P.S. If a third retailer calls, I want to know within the hour. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "I passed your statement to the shopkeepers.\n\nOne read it and said: 'the guest is still explaining.'\n\nNo better summary of our risk. My floor holds as long as it can.",
          },
          {
            personaId: "lucia",
            kind: "compliance",
            text: "No legal exposure in standing firm; the exposure is commercial and it is being measured in real time by the sentiment tracker. I note the retailers' 'informal' questions have a habit of becoming formal.",
          },
        ],
        reckoning:
          "The storm does not pass. Sentiment finds a lower floor, a second retailer quietly halves the facing count, and the comedy account posts a follow-up with double the views.",
      },
      {
        id: "guest-apology",
        name: "The Guest's Apology",
        blurb: "Pull the spot, apologise plainly and locally, pause before relaunching.",
        match: { response: [-34, 34] },
        effects: {
          state: { culturalSensitivityScore: 12, standardizationVsAdaptation: 8 },
          kpis: { customerSentiment: 4, budget: -110, brandEquity: -1, riskExposure: -5 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "Your apology sounds like a person, not a committee. 'We came to your table and forgot we were guests' is the first sentence of this crisis I would put my name under.",
            ps: "P.S. Approved as written. Do not let the agency improve it. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "The shopkeepers read it. One put the poster BACK up.\n\nAn honest 'nos equivocamos' buys what a million pesos of media cannot.\n\nYou have room to breathe. Use it slowly.",
          },
          {
            personaId: "lucia",
            kind: "compliance",
            text: "Withdrawal executed cleanly across all placements; the agency's make-good covers most of it. The apology text cleared review without edits, which in my tenure is a first.",
          },
        ],
        reckoning:
          "The spot comes down, the apology goes up, and the temperature drops within days. Nothing is won yet — but the account of the crisis now ends with the guest who apologised, not the guest who explained. The relaunch question waits, patiently, in next month's file.",
      },
      {
        id: "handed-microphone",
        name: "The Handed Microphone",
        blurb: "Withdraw, apologise, and commission the relaunch entirely from Mexican creators.",
        match: { response: [34, 100] },
        effects: {
          state: { culturalSensitivityScore: 20, standardizationVsAdaptation: 20, localPartnerTrust: 10 },
          kpis: { customerSentiment: 8, budget: -240, brandEquity: 2, customerGrowth: 1.5, riskExposure: -8 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "So the answer to 'the nonna doesn't know' is to say so ourselves — and pay Mexican kitchens to do the teaching. Expensive, humble, and possibly the smartest thing in this file.",
            ps: "P.S. The family council hears about this after it works. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "The creator list is real. Actual cooks people trust — not influencer wallpaper.\n\nLet them speak. Don't make them props.\n\nDo that, and your worst week here becomes your best quarter.",
          },
          {
            personaId: "lucia",
            kind: "compliance",
            text: "Creator contracts reviewed: usage rights, disclosure compliance, and — learning from this month — a cultural review panel with actual veto power, in writing. The process now matches the promise. Proceed.",
          },
        ],
        reckoning:
          "The relaunch hands Mexico the microphone and the market answers with something rarer than forgiveness: interest. Sentiment recovers past its pre-crisis line; the budget takes the hit and the lesson enters the file in permanent ink — the market was never asking Solari to stop being Italian, only to stop narrating.",
      },
    ],
  },
  reflectionPrompt:
    "Board note: this backlash traces directly to earlier standardisation and cultural-lens choices. Which specific earlier decision loaded this risk, what did the market's reaction actually object to, and how does your response reposition the brand's voice?",
  epilogue:
    "The campaign is gone; the lesson stays in the file. The relaunch is next month's work.",
  frontpage: () => ({
    headline: "#LaNonnaNoSabe: Solari's Mexican lesson",
    standfirst:
      "A campaign that tested well and landed badly hands the Alba house its first crisis abroad — and its response is being graded in real time, aisle by aisle.",
  }),
};

const steadyExpansion: ChapterContent = {
  id: 9,
  title: "The Quiet Quarter",
  topic: "Market Entry Complication — Variant: Steady Expansion",
  region: "world",
  cameraDistance: 2.4,
  coldOpen: "Nothing is on fire. The board wants to know what you plan to do with that.",
  terms: ["consolidation", "pricing corridor", "channel mix", "penetration", "resource allocation", "sequencing"],
  outcomes: [
    "Allocate resources between deepening an existing market and opening a new one",
    "Apply Ansoff's growth options to a live decision",
    "Choose a leading indicator that would prove your own call wrong",
  ],
  quiz: [
    {
      question: "Deepening an existing market (penetration) is generally lower-risk than entering a new one because…",
      options: [
        "it requires no budget",
        "it builds on knowledge, relationships and brand presence you already hold",
        "regulators favour incumbents",
        "it avoids all competition",
      ],
      correct: 1,
      explanation:
        "Penetration compounds assets you already own. Market development re-runs the entry problem — new consumers, new channels, new regulation — from a lower base of knowledge.",
    },
    {
      kind: "text",
      question: "In Ansoff's matrix, taking existing products into a new country market is called market ________.",
      accept: ["development"],
      placeholder: "one word",
      explanation:
        "Market development: existing products, new market. Deepening Mexico instead would be market penetration — the two halves of this week's slider.",
    },
  ],
  conceptNote:
    "In Ansoff's terms this week is penetration versus market development: deepening Mexico compounds existing knowledge, relationships and brand presence — lower risk, capped upside — while opening Brazil takes existing products to a new market, where the main risk is precisely the knowledge you don't yet have. Sequencing is the discipline: a pilot exists so that being wrong stays affordable.",
  milestones: [
    "Open the file",
    "Read the quarter's numbers",
    "Read the Brazil teaser",
    "Read the rival's move",
    "Weigh depth against breadth",
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
      subject: "Q3 review: the numbers behaved",
      body: `The rare memo with no fire in it. Mexico is tracking: distribution stable, sentiment steady, the balanced posture of your early weeks paying out in small, compounding increments. No crisis has arrived, which the board — reading this week's trade press about other companies — has noticed.\n\nSteady is not the same as finished. The question this quarter poses is quieter and harder than a crisis: double down on deepening Mexico, or bank it and open the second front early?`,
    },
    {
      kind: "email",
      from: "Ana Lúcia Barros <al.barros@mercadofino.com.br>",
      to: "International Markets file",
      subject: "Introduction — and an observation about your category",
      body: `We haven't met — Bia Camargo suggested I write. Mercado Fino operates 340 premium grocery doors across São Paulo state, and I have watched the Mexican entries of four European houses from here with professional interest. Yours is the first that hasn't embarrassed itself by month six, which in our market counts as a reference.\n\nThe São Paulo speciality segment is growing 11% and Casa Verde's Brazilian launch has been, between us, clumsy — wrong pack sizes, wrong tone. There is a window. Windows in Brazil close the way they do everywhere: while committees are still describing them. When you're ready to talk, I answer my own phone.`,
    },
    {
      kind: "clipping",
      from: "THE PROVISIONER — International Grocery Trade Weekly",
      subject: "Casa Verde stumbles in Brazil; doubles Mexican promotion instead",
      body: `Casa Verde's São Paulo launch has underperformed internal targets by a reported 40%, prompting the Barcelona group to redirect budget into Mexican trade promotion — heavy discounting in the exact aisles where smaller European entrants have been quietly building position. "When Casa Verde can't win the new market," one distributor observed, "it makes the old one expensive for everyone else." Heritage brands with thin Mexican margins are advised to check them.`,
    },
  ],
  decision: {
    id: "steady",
    title: "Spend the quiet",
    prompt:
      "The reward for a balanced hand is a real choice instead of a crisis: deepen Mexico while Casa Verde makes it expensive, or take Barros's window and open Brazil early?",
    axes: [
      {
        id: "front",
        negLabel: "Deepen Mexico",
        posLabel: "Open Brazil",
        negHint: "Defend margin and share where you've earned them — depth before breadth.",
        posHint: "Take the São Paulo window while Casa Verde is stumbling — breadth while it's cheap.",
      },
    ],
    classifications: [
      {
        id: "deep-roots",
        name: "The Deep Roots",
        blurb: "All resources to Mexico: hold margin, grow share, let Brazil wait its turn.",
        match: { front: [-100, -34] },
        effects: {
          state: { entryRiskAppetite: -10, localPartnerTrust: 10, regulatoryComplianceScore: 5 },
          kpis: { marketShare: 0.6, budget: -150, customerSentiment: 3, riskExposure: -4, partnerDependency: 5 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "Depth before breadth — my grandfather's second-favourite sentence. I would rather fight on ground we hold than ground we are renting.",
            ps: "P.S. Casa Verde is about to make Mexico expensive. Budget accordingly. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "Correct call.\n\nThey're coming to discount us out of the aisle. They'll find it already belongs to relationships they can't buy quarterly.\n\nEvery peso you keep here works twice this year.",
          },
          {
            personaId: "bia",
            kind: "sticky",
            text: "Told Ana Lúcia 'not yet, keep the coffee warm.' She said — direct quote — 'the disciplined ones always say that; the good ones eventually call.' Filed under motivation.",
          },
        ],
        reckoning:
          "The quiet quarter is spent where it was earned. Share deepens against Casa Verde's discounting, margins hold on relationship rather than price — and in São Paulo a window stays open a little longer, watched by someone who answers her own phone.",
      },
      {
        id: "measured-bridge",
        name: "The Measured Bridge",
        blurb: "Hold Mexico's course; open a small São Paulo pilot through Mercado Fino.",
        match: { front: [-34, 34] },
        effects: {
          state: { entryRiskAppetite: 10, localPartnerTrust: 5 },
          kpis: { marketShare: 0.3, budget: -220, customerGrowth: 1.5, riskExposure: 3 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "Both, in proportion — the Mexican lesson applied to Brazil before Brazil can teach it expensively.",
            ps: "P.S. Keep the pilot small enough to fail privately and honest enough to scale publicly. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "A pilot I can respect.\n\nNote: you're entering Brazil the way you should have entered here. Partner first. Flags later.\n\nSomeone has been reading their own file.",
          },
          {
            personaId: "bia",
            kind: "sticky",
            text: "340 doors and we start with 20 — Ana Lúcia called the pilot design 'adorably Italian, correctly sized.' Also I may get to do the São Paulo store checks IN PERSON. Filing this under best week.",
          },
        ],
        reckoning:
          "Twenty doors in São Paulo, quietly, while Mexico holds course. The pilot's first reorder arrives two weeks early — the most eloquent data point in this quarter's file — and the second front now exists at a size the house can afford to be wrong about.",
      },
      {
        id: "second-front",
        name: "The Second Front",
        blurb: "Take the window at scale: Brazil now, while Casa Verde is face-down in it.",
        match: { front: [34, 100] },
        effects: {
          state: { entryRiskAppetite: 25, localPartnerTrust: -5, culturalSensitivityScore: -5 },
          kpis: { marketShare: 0.2, budget: -380, customerGrowth: 2.5, riskExposure: 8, brandEquity: 2 },
        },
        reactions: [
          {
            personaId: "elena",
            kind: "letter",
            text: "Two markets, one house, eighteen months apart. This is the tempo that builds groups — or breaks them. I have approved the spend.",
            ps: "P.S. I re-read your week-one memo last night. The board will hold you to its logic. — E.",
          },
          {
            personaId: "rafael",
            kind: "message",
            text: "So Brazil gets the budget while Casa Verde discounts my aisles.\n\nI'll hold Mexico. Not a complaint — a price tag.\n\nWhen their promotion war starts, remember whose margins fund your São Paulo adventure.",
          },
          {
            personaId: "bia",
            kind: "sticky",
            text: "Full entry brief for Brazil drafted — and I put the cultural-lens section FIRST this time, before anyone asks. We are not doing the 'shared Latin warmth' deck. I've seen the 'shared Latin warmth' deck. Never again.",
          },
        ],
        reckoning:
          "Brazil opens at scale through Mercado Fino's doors while Casa Verde is still explaining its pack sizes to Barcelona. Growth arrives fast and so does stretch: two markets now draw on one budget, and the Mexican margins funding the advance are the exact ones Casa Verde has started discounting against.",
      },
    ],
  },
  reflectionPrompt:
    "Board note: your balanced early play earned an opportunity instead of a crisis. Using the resource-allocation logic of this module, defend your depth-versus-breadth call — and name the leading indicator you'll watch to know if it was wrong.",
  epilogue:
    "The quarter closes. Brazil is on the map now, one way or another.",
  frontpage: (classification) => ({
    headline:
      classification === "The Second Front"
        ? "Solari opens Brazil while Casa Verde stumbles"
        : classification === "The Deep Roots"
          ? "Solari digs in: Mexico first, Brazil can wait"
          : "Twenty doors in São Paulo: Solari's quiet bridge to Brazil",
    standfirst:
      "The Alba house's steady Latin American hand reaches its first fork in the road — and the trade is watching which way the quiet money moves.",
  }),
};

export const branch9: BranchPointDef = {
  chapterId: 9,
  rules: [
    {
      variantId: "partner-conflict",
      explanation:
        "Your entry risk appetite ran high while partner trust ran low — fast moves made on a relationship that was never given time to set.",
      unseenNote:
        "This file reaches advisers whose risk appetite runs high while partner trust runs low. Yours didn't — Rafael Ortega never called the lawyers.",
      drivers: ["entryRiskAppetite", "localPartnerTrust"],
      test: (s) => s.entryRiskAppetite > 40 && s.localPartnerTrust < 30,
    },
    {
      variantId: "cultural-backlash",
      explanation:
        "Your strategy stayed heavily standardised while cultural sensitivity stayed low — the brand kept telling its own story in a market that was never asked.",
      unseenNote:
        "This file reaches advisers who keep the brand heavily standardised while cultural sensitivity stays low. Yours didn't — #LaNonnaNoSabe never trended.",
      drivers: ["standardizationVsAdaptation", "culturalSensitivityScore"],
      test: (s) => s.standardizationVsAdaptation < -35 && s.culturalSensitivityScore < 40,
    },
    {
      variantId: "steady-expansion",
      explanation:
        "You played a balanced hand — no variable ran to an extreme, so no stored risk detonated. The complication you face is the one balanced players earn: a genuine opportunity.",
      unseenNote:
        "This file reaches advisers who play a balanced hand — no stored risk, so the week brings an opportunity instead of a crisis. Your file went another way.",
      drivers: ["entryRiskAppetite", "standardizationVsAdaptation", "localPartnerTrust"],
      test: () => true,
    },
  ],
  variants: {
    "partner-conflict": partnerConflict,
    "cultural-backlash": culturalBacklash,
    "steady-expansion": steadyExpansion,
  },
};
