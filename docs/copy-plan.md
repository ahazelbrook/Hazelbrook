# Writing plan — Hazelbrook & Hazelbrook

A brief for the site's copy. It defines the positioning, the voice, and what
every block of words on the page has to do, before any of it is written.

Status: **v3** — drafted, brand-reviewed and edited. All six stages in §8 are
complete; §6 lists what still needs real values before launch.

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

1. **Senior-only delivery.** No leverage pyramid. The model is built by the
   person who will sit in the room and answer for it. This is the live grievance
   against both the majors and the Big Four, and it leads because it is the one
   claim a competitor structurally cannot copy.
2. **Knowledge of both sides — not allegiance to either.** Framed as what we
   know, never as who we sit with: *we have built the models that get tested,
   and tested the models that get built.*
3. **Independence, stated concretely.** "Independent" alone is a null word here;
   every boutique on every panel claims it. It earns its place only when the
   page says what we are independent *of*: no delivery arm, no bid of our own to
   protect, no audit relationship to preserve.

**Proof:** $30bn+ of infrastructure projects worked on — WestConnex/Sydney
Motorway Corporation, Cross River Rail, West Gate Tunnel, Sydney Metro, North
East Link, and renewable generation M&A. 15+ years in the sector.

**Constraint:** the principal is **not named** on the page (client decision). So
claim 1 is carried by *how the work is described* — "built by the person who
will sit in the room", "we staff them with the people who sold them" — and is
never asserted as a title. The page does not say "principal-led", because a page
with no person on it cannot evidence that phrase.

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

**Known gap — the prime buyer.** Panels are off the page and there is no
"how we're engaged" block (both client decisions), so the subcontracting route
is never described. The only signal that bench capacity is available is the
enquiry type *"Specialist capacity under your brand"* in the contact form. That
is thin for a buyer type ranked in scope, and it is logged in §7 as the first
thing to revisit if the prime channel matters.

---

## 4 · Voice

The existing voice is the site's best asset and survives the rewrite intact.
Editorial, declarative, quietly opinionated — a senior practitioner talking, not
a brochure.

**Register:** first-person plural, small. "We" as in a practice, never "we" as
in an organisation with departments. Never "our team of experts", never "our
proven methodology".

### Five rules

1. **Say the hard part — but ration it.** The best line in the current copy is
   "the last mile is rarely a technical problem. It is a financial one." That
   device works because it is scarce. **One or two per page, not one per
   section**: four consecutive epigrams in the service rows is a tic, and a
   reader who spots the tic disbelieves all four. Dial down in the service
   descriptions and project cards; dial *up* in practice ¶3.
2. **Concrete nouns, short verbs.** Business case, model, bid, close. Not
   solutions, offerings, engagements-as-a-service.
3. **No sentence that survives its own deletion.** If a line could sit on any
   consultancy's site, it goes.
4. **Numbers in the display face are earned.** A figure on the page is a claim.
   Only use ones that can be defended — and use each one **once**.
5. **Australian English.** `program` not `programme`, `-ise` endings,
   `en-AU`. Dollars are AUD and unqualified; anything else gets a currency
   prefix.

### The candour test

Two project cards criticise the projects they describe. Criticism is only an
asset when it demonstrates competence rather than hindsight. Every such sentence
must pass: **would I say this out loud, in a meeting, to the agency that
delivered this project?** If not, it doesn't go on the page. A cost-overrun
scoreboard fails the test — every reader already knows the number, and it
proves only that we read the paper. An insight into *why* a variable turned
commercial passes it.

### Lexicon

**Use:** business case · appraisal · options analysis · assurance · commercial
structuring · financial close · bid · diligence · risk allocation · value for
money · procurement · demand · patronage · network · benefit–cost ratio ·
capital · concession · alliance · PPP

**Avoid:** solutions · leverage (as a verb) · bespoke · end-to-end · holistic ·
world-class · passionate · journey · partner (as a verb) · unlock · empower ·
best-in-class · robust (of anything but a model) · deep dive · synergies ·
thought leadership

**Banned outright:** **counsel**. "Independent counsel" is London
magic-circle register, and in Australia counsel means a barrister.

**Handle with care:** *defence* — out of the copy by decision, so no "national
security" or "sovereign capability" euphemisms either; the sector list simply
doesn't include it.

***Independent*** — only ever adjacent to what it is independent of, with **one
sanctioned exception**: the hero standfirst, where there is no room for the
qualifier and the practice section makes it concrete two screens below. The
editorial pass found three bare uses and was right about two of them; the meta
and Open Graph descriptions now carry "no delivery arm". If a future edit adds
a fourth, the exception has stopped being an exception.

---

## 5 · Content map

Everything below lives in `src/content.ts` unless noted. Word budgets are
targets, not limits — but the layout is built for these lengths and long copy
will break the ruled hero and the service rows.

### 5.1 Hero — `hero`

The one thing a visitor reads. Three ruled lines, then a standfirst.

- **Eyebrow:** the discipline. `Infrastructure Strategy & Insight` → a line that
  carries breadth and the commercial subject.
- **Statement (3 lines, 2–4 words each):** the sector-agnostic replacement for
  "From grid connection to financial close". Target:
  `From business` / `case to` / `financial close`. Same cadence, same ledger of
  hairlines, no longer energy-only.
- **Standfirst (≤ 30 words):** names the breadth *once* — transport, energy,
  water, social — and closes on the three things the four audiences do with a
  project: build it, fund it, justify it. This is the only place the sector list
  appears in full; everywhere else the work is described by problem, not sector.
  No "counsel".

### 5.2 Practice — `mission`

Three paragraphs and two figures. The section that makes the reader trust the
practitioner.

- **Heading:** replace "Energised by solving the hard problems" — the pun is
  renewables-specific and the sentiment is generic. Wanted: the commercial
  subject, stated flatly.
- **¶1 (≈40 words):** what we do, across the whole project life — appraisal, the
  demand evidence, funding structure, procurement and close. Describes the work,
  not the client, so all four audiences fit inside it.
- **¶2 (≈55 words):** the argument, and the page's primary epigram. Keep the
  existing insight — the decisive problems are commercial, not technical, and
  are settled by people who weren't in the room for the engineering — and
  generalise it explicitly off renewables.
- **¶3 (≈45 words):** how we work. **Near-verbatim from the current copy** — it
  is the most commercially valuable paragraph on the site, and every instinct in
  revision will be to make it more professional. Don't. Fold the concrete
  independence line into it: no delivery arm, no bid of our own to protect, no
  audit relationship to preserve.
- **Figures:** `$30bn+` / *Projects worked on* — and `15+` / *Years in
  infrastructure*.

### 5.3 Track record — `trackRecord`, `projects`

Six cards. The descriptions still describe the **projects**, not the mandate —
that is the agreed way to claim them. Three changes:

- **Name the discipline, not the mandate.** The `sector` label currently reads
  `Type · City`, which is cheap. Confidentiality prevents naming the client, the
  mandate and the fee; it does **not** prevent naming the nature of the task.
  Relabel to `Discipline · Sector` — *Sell-side transaction · Motorway*,
  *Business case & appraisal · Heavy rail*. This is the single
  highest-leverage edit in the rewrite: it converts six pieces of borrowed glory
  into six proof points at zero confidentiality cost. Cities are dropped; the
  project names carry them for any Australian reader.
- **`$30bn+` moves out of the heading.** It is currently the heading *and* a
  figure. Sophisticated buyers know exactly what genre of number a summed
  capital value is, and repeating it amplifies the smell rather than the claim.
  Use it once, as the figure. The heading becomes about the work.
- **Standfirst** carries the reframed both-sides line (§2, claim 2).

Per-card work:

| Card | Change |
|---|---|
| SMC sale | Keep. Relabel. |
| **Cross River Rail** | **Delete the cost scoreboard** ("$5.4bn → near $19bn"). Pure hindsight, aimed at a target client, proves only that we read the paper. Replace with what separates the two numbers — scope, timing and risk transfer — which demonstrates the skill instead of scoring the point. |
| **West Gate Tunnel** | Keep the spoil insight, **reframe off the blowout**. The real point is that a soil classification became the largest commercial risk on a $10bn motorway after being priced as a technical detail. Say that, and criticism becomes competence. |
| Sydney Metro | Keep the land-value insight. Fix `programme` → `program`. |
| North East Link | Keep. Relabel. |
| Renewables M&A | Keep — it is what makes the list read as *infrastructure* rather than *roads*. |

### 5.4 Services — `services` + heading (move out of `Services.tsx`)

Four areas, re-cut and resequenced to a lifecycle spine: **evidence → case →
funding → close**. Demand work sits *underneath* the business case, not after
the funding structure.

| # | Accent | Area | Serves |
|---|---|---|---|
| 01 | Dusk (the long view) | **Strategy, Business Case & Assurance** | Government, agency |
| 02 | Vapor (the network) | **Demand & Network Evidence** | Agencies, developers |
| 03 | Glow (yield) | **Financial Modelling & Funding** | Investors, primes |
| 04 | Tide (capital in motion) | **Transactions & Close** | Contractors, funds |

- **"Data" is killed.** It reads as either AI-adjacent filler or a junior
  offering, and it was the one non-commercial word diluting the commercial-case
  proposition the hero just made. The capability survives inside 02, where it is
  evidence rather than a product.
- **Assurance is surfaced at title level**, not buried in a description.
  Independent review — model audit, business case assurance, peer review of
  someone else's BCR — is the most repeatable, most conflict-safe, most sellable
  thing a small practice offers, and the one thing a government buyer can
  purchase from a one-person practice without a procurement problem.
- Accent meanings are reassigned from the brand deck's energy readings to their
  general-infrastructure equivalents; the deck's logic (dusk = the long view,
  glow = yield, vapor = the network, tide = capital in motion) carries over
  without strain. Note the reassignment in the `services` comment.
- **Section heading** "Four questions that decide a project" survives the
  re-cut. Move it from the component into `content.ts`.
- **Each description ≤ 35 words.** Per voice rule 1, only two of the four carry
  an opinion; the other two state the work plainly.

### 5.5 Conduct — new block, new component

The page claims knowledge of both sides, names six live public projects, and
describes two of them critically. That combination raises a discretion question
in a probity-conscious reader's mind whether we intend it or not. Two or three
sentences convert the page's largest liability into a proof point, and they
retro-justify the whole "worked on" framing:

- Conflicts checked before an engagement is accepted; one party per transaction.
- Client work is not discussed.
- Nothing on the page describes a mandate, a client or a fee — the projects are
  described from the public record.

Placed immediately after the track record, where the projects have just been
named. Cheapest high-value block on the page.

### 5.6 Contact — `contactSection`, `ENQUIRY_TYPES`, `ContactForm.tsx`

- Heading "Tell us what you are building" assumes a builder; three of the four
  audiences aren't building anything. Replace, plainly — this is not a place for
  a clever line.
- Same builder assumption in the form's textarea placeholder ("What are you
  building…") and the hard-coded `London` label, both in `ContactForm.tsx`.
- Enquiry types mirror the four new service areas, plus **"Specialist capacity
  under your brand"** — the prime's only visible route (§3).

### 5.7 Chrome — footer, header, `index.html`

| What | Now | Change |
|---|---|---|
| `firm.discipline` | Infrastructure Strategy & Insight | Broaden; appears in header, footer and meta |
| `firm.established` | Independent since 1974 | Not defensible for this practice — replace with a plain independence line |
| `contact.address` | 18 Ridgmount Street, London | Melbourne — **needs a real address** |
| `contact.offices` | London, Sydney | Melbourne, **working nationally** — a Melbourne-only line against a Sydney/Brisbane track record reads as historical |
| `contact.registration` | Registered in England no. OC148213 | ABN — **needs a real number** |
| **Practice details** | — | New line: PI and public liability cover, ABN, GST registration. These are procurement enablers, not legal footnotes: a prime cannot onboard without PI certificates and a procurement officer cannot progress without an ABN. **Needs real values** |
| `SiteFooter.tsx` | Column hard-coded `London` | Column labels follow the city |
| `index.html` | `lang="en-GB"`, renewables description | `en-AU`, new description, new OG copy |
| `README.md` | "focus on renewables", £40bn figure | Rewrite the copy sections |

---

## 6 · Facts to confirm before launch

Placeholders in the draft, flagged in code. None can be invented:

1. **Street address** in Melbourne (or the decision to show the city only).
2. **ABN / ACN** to replace the England registration.
3. **PI and public liability cover** — insurer and sums, for the practice
   details line.
4. **Telephone** — `+61 426 364 426` is already in the file; confirm it's live.
5. **`$30bn+` and `15+ years`** — both are load-bearing claims on the page.
6. **Form endpoint** — the contact form stays in preview mode until set.

---

## 7 · Deferred, with reasons

Recommended by the brand review, declined or deferred by the client. Logged so
the reasoning survives:

| Item | Status | Consequence |
|---|---|---|
| **Name the principal** | Declined | The review's #1 change. Costs verification of the $30bn claim, a CV for primes to tender, and a name for agencies to reference-check. Positioning claim 1 is dialled back to compensate (§2). |
| **Panel / prequalification position** | Off the page | Government is buyer #1 and panels are how government buys advice. No route is now described. |
| **"How we're engaged" block** | Not built | The four-audience fix segments by capability only, not by transaction shape. Partly mitigated by one enquiry type. |
| **Capability statement (1-page PDF)** | Not built | The artefact that gets forwarded internally and attached to tenders. Worth doing next. |

---

## 8 · Who writes what

| Stage | Task | Model | Why |
|---|---|---|---|
| 1 | This plan — positioning, voice, content map | **Opus 5** | The judgement call about how a four-audience page holds together is the hardest thing in the job |
| 2 | Brand consultant review of the plan | **Opus 5** | An adversarial read needs to be as strong as the plan; a weaker reviewer rubber-stamps |
| 3 | Roll-in of the review → v2 | **Opus 5** | Deciding which notes to take is an editorial call, not a mechanical one |
| 4 | Copy drafting — every section | **Opus 5** | This is the voice work. The whole value is in sentences a weaker draft would flatten |
| 5 | Editorial pass — grammar, clarity, consistency, Australian English, repeated constructions | **Sonnet 5** | A rule-checkable pass against a fixed brief; fast and precise, and a second model catches what the drafter's ear has gone deaf to |
| 6 | Roll-in of the edit, build, lint, ship | **Opus 5** | Same call as stage 3 |

Sequence: **plan → brand review → roll in → draft → edit → roll in → ship.**
