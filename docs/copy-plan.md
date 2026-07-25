# Writing plan — Hazelbrook & Hazelbrook

A brief for the site's copy. It defines the positioning, the voice, and what
every block of words on the page has to do, before any of it is written.

Status: **v1 draft** — for brand review, then drafting, then edit.

---

## 1 · What changes, and why

The site currently reads as a **UK renewables specialist**: London address,
registration in England, "grid connection to financial close", four practice
areas all drawn from the energy sector. The track record underneath it is
Australian road, rail and metro work.

The practice is a **Melbourne-based independent infrastructure advisory**. It
works across transport, energy, water and social infrastructure — wherever the
question is whether a project stacks up and how it gets financed. The copy has
to stop being about renewables without becoming about nothing.

The trap: a sector-agnostic firm writes sector-agnostic copy, and
sector-agnostic copy is wallpaper. The answer is not to widen the language but
to **move the specificity from the sector to the problem**. "Grid connection"
becomes "business case" — still a hard, particular thing, just one that a road
authority, a water utility and a wind developer all recognise.

---

## 2 · Positioning

> **Independent infrastructure advisory. The commercial case, from first
> business case to financial close.**

Three claims, in priority order:

1. **Independence.** No delivery arm, no audit relationship, nothing to sell on
   the back of the advice. The differentiator against the Big Four and against
   the engineering majors.
2. **Both sides of the table.** Has sat on the government side and the bidder
   side of the same kinds of deals. Knows what the other party is doing with the
   number you just sent them.
3. **Principal-led.** The person who sells the work does the work. Small by
   choice; a deliberate cap on how many engagements run at once.

**Proof:** $30bn+ of infrastructure projects worked on — WestConnex/Sydney
Motorway Corporation, Cross River Rail, West Gate Tunnel, Sydney Metro, North
East Link, and renewable generation M&A. 15+ years in the sector.

---

## 3 · Audience

All four buyer types are in scope, which means **no section may be written to
one of them at the expense of the others**. The hero and practice sections
speak to what all four share; the services section is where each one finds
itself.

| Buyer | Buys | Wants to hear |
|---|---|---|
| **Government / agency** — departments, treasuries, delivery authorities | Business cases, options analysis, assurance, procurement strategy | Rigour, probity, precedent, "this will survive scrutiny" |
| **Contractors / developers** — builders, sponsors, project cos | Bid strategy, commercial structuring, negotiation support | Commercial sharpness, speed, "knows what the client is thinking" |
| **Investors / funds** — infra funds, super funds, lenders | Diligence, financial modelling, bid support | Numbers that hold, risk called honestly |
| **Primes / advisory firms** — subcontracted bench capacity | Specialist modelling and analysis under their brand | Capability, availability, discretion |

The common denominator across all four is **the commercial case for a piece of
infrastructure, and whether it survives contact with the people who have to fund
it**. That is what the hero sells.

**Deliberate consequence:** the copy stays capability-led, not client-led. No
"we help government agencies…" constructions, which would exclude three of the
four. Instead: name the work, and let each reader recognise their own version of
it.

---

## 4 · Voice

The existing voice is the site's best asset and survives the rewrite intact.
Editorial, declarative, quietly opinionated — a senior practitioner talking, not
a brochure.

**Register:** first-person plural, small. "We" as in a practice, never "we" as
in an organisation with departments. Never "our team of experts", never "our
proven methodology".

### Five rules

1. **Say the hard part.** The current copy's best line is "the last mile is
   rarely a technical problem. It is a financial one." Every section should
   contain one sentence that a competitor would hedge.
2. **Concrete nouns, short verbs.** Business case, model, bid, close. Not
   solutions, offerings, engagements-as-a-service.
3. **No sentence that survives its own deletion.** If a line could sit on any
   consultancy's site, it goes.
4. **Numbers in the display face are earned.** A figure on the page is a claim.
   Only use ones that can be defended.
5. **Australian English.** `program` not `programme`, `-ise` endings,
   `en-AU`. Dollars are AUD and unqualified; anything else gets a currency
   prefix.

### Lexicon

**Use:** business case · appraisal · options analysis · commercial structuring ·
financial close · bid · diligence · risk allocation · value for money ·
procurement · assurance · demand · network · patronage · benefit–cost ratio ·
capital · concession · alliance · PPP

**Avoid:** solutions · leverage (as a verb) · bespoke · end-to-end · holistic ·
world-class · passionate · journey · partner (as a verb) · unlock · empower ·
best-in-class · robust (of anything but a model) · deep dive · synergies ·
thought leadership

**Handle with care:** *defence* — out of the copy by decision, so no
"national security", no "sovereign capability" euphemisms either. The sector
list simply doesn't include it. *Sustainability* — only where it's actually the
commercial question.

---

## 5 · Content map

Everything below lives in `src/content.ts` unless noted. Word budgets are
targets, not limits — but the layout is built for these lengths and long copy
will break the ruled hero and the service rows.

### 5.1 Hero — `hero`

The one thing a visitor reads. Three ruled lines, then a standfirst.

- **Eyebrow:** the discipline. Change `Infrastructure Strategy & Insight` →
  something that carries the breadth without listing sectors.
- **Statement (3 lines, 2–4 words each):** the sector-agnostic replacement for
  "From grid connection to financial close". Target:
  `From business` / `case to` / `financial close`. Same cadence, same
  ledger of hairlines, no longer energy-only.
- **Standfirst (≤ 30 words):** must name the breadth *once* — transport,
  energy, water, social — and the independence. This is the only place the
  sector list appears in full; everywhere else the work is described by problem,
  not by sector.

### 5.2 Practice — `mission`

Three paragraphs and two figures. The section that makes the reader trust the
person.

- **Heading:** replace "Energised by solving the hard problems" — the pun is
  renewables-specific and the sentiment is generic. Wanted: a heading about
  judgement under commercial pressure.
- **¶1 (≈45 words):** what we do and for whom, across the whole project life —
  strategy and business case, through structuring and procurement, to close.
  Names all four buyer types by their work, not by flattery.
- **¶2 (≈55 words):** the argument. Keep the existing insight — the decisive
  problems are commercial, not technical, and they are settled by people who
  weren't in the room for the engineering. Generalise it off renewables: it is
  as true of a road business case as a wind farm.
- **¶3 (≈40 words):** how we work. Independent, small, few engagements, staffed
  by the people who sold them, and we say what we think. Keep this almost
  verbatim — it is the most distinctive paragraph on the site.
- **Figures:** `$30bn+` / *Projects worked on* — and `15+` / *Years in
  infrastructure*.

### 5.3 Track record — `trackRecord`, `projects`

Six cards. **The project descriptions stay substantially as they are** — they
describe the projects, not the mandate, which is the agreed way to claim them.
Work needed:

- **Heading and standfirst:** already sector-broad ("Roads, heavy rail, motorway
  concessions and renewables"). Widen the standfirst by one notch to signal the
  practice isn't transport-only, and keep "on both sides of the table" — it is
  doing real positioning work.
- **Card 6 (renewables M&A):** the only non-transport card. Keep it; it is what
  makes the list read as *infrastructure* rather than *roads*.
- **`program` spelling** in the Sydney Metro card.
- One card's `sector` label per card stays as `Type · City` — cheap, scannable
  sector breadth.

### 5.4 Services — `services` + heading in `src/components/Services.tsx`

Four areas, renumbered and rewritten from the renewables set. This is where each
audience finds itself, so the four are chosen to cover the four buyers:

| # | Accent | Area | Serves | Covers |
|---|---|---|---|---|
| 01 | Dusk (policy, the long view) | **Strategy & Business Case** | Government, agency | Options analysis, appraisal, investment logic, assurance |
| 02 | Glow (yield) | **Financial Modelling & Funding** | Investors, primes | Models, funding and financing structure, value for money, affordability |
| 03 | Vapor (engineering, networks) | **Networks, Demand & Data** | Government, developers | Network and demand analysis, patronage, data analytics, the evidence under the case |
| 04 | Tide (transition, capital) | **Transactions & Close** | Contractors, funds | Procurement, commercial structuring, bid support, diligence, financial close |

Accent meanings are reassigned from the brand deck's energy readings to their
general-infrastructure equivalents — the deck's logic (dusk = the long view,
glow = yield, vapor = the network, tide = capital in motion) carries over
without strain. Note the reassignment in the `services` comment.

- **Section heading** (hard-coded in the component, move it to `content.ts`):
  "Four questions that decide a project" still works and should survive.
- **Each description ≤ 35 words**, one clause of what it is, one clause of why
  it decides the outcome. Keep the current pattern — the second sentence is
  where the opinion lives.

### 5.5 Contact — `contactSection`, `ENQUIRY_TYPES`

- Heading "Tell us what you are building" assumes a builder. Three of four
  audiences aren't building anything. Replace with something that works for a
  department writing a business case *and* a contractor bidding.
- Enquiry types must mirror the new four service areas exactly, plus New
  engagement / Media or speaking / Something else.

### 5.6 Chrome — footer, header, `index.html`

| What | Now | Change |
|---|---|---|
| `firm.discipline` | Infrastructure Strategy & Insight | Broaden; appears in header, footer and meta |
| `firm.established` | Independent since 1974 | Not defensible for this practice — replace with a plain independence line |
| `contact.address` | 18 Ridgmount Street, London | Melbourne — **needs a real address** |
| `contact.offices` | London, Sydney | Melbourne |
| `contact.registration` | Registered in England no. OC148213 | ABN — **needs a real number** |
| `SiteFooter.tsx` | Column hard-coded `London` | Column label follows the office |
| `index.html` | `lang="en-GB"`, renewables description | `en-AU`, new description, new OG copy |
| `README.md` | "with a focus on renewables", £40bn figure | Rewrite the copy sections |

---

## 6 · Facts to confirm before launch

These are placeholders in the draft and are flagged in code. None can be
invented:

1. **Street address** in Melbourne (or the decision to show the city only).
2. **ABN / ACN** to replace the England registration.
3. **Telephone** — `+61 426 364 426` is already in the file; confirm it's live.
4. **`$30bn+` and `15+ years`** — both now load-bearing claims on the page.
5. **Form endpoint** — the contact form stays in preview mode until set.

---

## 7 · Who writes what

| Stage | Task | Model | Why |
|---|---|---|---|
| 1 | This plan — positioning, voice, content map | **Opus 5** | The judgement call about how a four-audience page holds together is the hardest thing in the job |
| 2 | Brand consultant review of the plan | **Opus 5** | An adversarial read needs to be as strong as the plan; a weaker reviewer rubber-stamps |
| 3 | Copy drafting — every section | **Opus 5** | This is the voice work. The whole value is in sentences a weaker draft would flatten |
| 4 | Editorial pass — grammar, clarity, consistency, Australian English, no repeated constructions | **Sonnet 5** | A rule-checkable pass against a fixed brief; fast and precise, and a second model catches what the drafter's ear has gone deaf to |
| 5 | Roll-in of both reviews, build, lint, commit | **Opus 5** | Deciding which notes to take is an editorial call, not a mechanical one |

Sequence: **plan → brand review → roll in → draft → edit → roll in → ship.**
