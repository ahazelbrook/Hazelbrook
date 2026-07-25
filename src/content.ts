/**
 * Every word on the site, and the one piece of configuration it needs.
 *
 * The copy is written to the brief in `docs/copy-plan.md` — positioning, voice
 * rules and a section-by-section content map, reviewed by a brand consultant
 * before drafting. Read that first if you are changing anything structural.
 *
 * The short version: this is a Melbourne infrastructure advisory that works
 * across transport, energy, water and social infrastructure. The copy stays
 * specific by naming the *problem* rather than the sector, because a
 * sector-agnostic page that widens its language turns into wallpaper.
 */

// -----------------------------------------------------------------------------
// CONFIGURATION
// -----------------------------------------------------------------------------

/**
 * Where the contact form posts.
 *
 * Create a form at https://formspree.io (or Getform / Basin — the payload is
 * the same shape) and paste the endpoint here. Until this is a real URL the
 * form stays in preview mode: it validates and shows the success state, but
 * does not send. Nothing is silently swallowed.
 */
export const FORM_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID';

export const isFormConfigured = (): boolean =>
  FORM_ENDPOINT.startsWith('https://') && !FORM_ENDPOINT.includes('REPLACE_WITH');

// -----------------------------------------------------------------------------
// THE FIRM
// -----------------------------------------------------------------------------

export const firm = {
  name: 'Hazelbrook & Hazelbrook',
  discipline: 'Infrastructure Strategy & Commercial Advisory',
  established: 'Independent — no delivery arm',
  domain: 'hazelbrook.co',
} as const;

/**
 * Contact details.
 *
 * The practice shows the city rather than a street address — deliberate for a
 * practice that works on its clients' sites, and it keeps the footer honest
 * about where the work is done rather than where the desk is.
 *
 * `reach` exists because a Melbourne line on its own reads as historical
 * against a track record that is largely Sydney and Brisbane.
 *
 * NOTE — the telephone number is carried over from the existing site. Confirm
 * it is a live line before launch.
 */
export const contact = {
  email: 'hello@hazelbrook.co',
  telephone: '+61 426 364 426',
  location: 'Melbourne, Australia',
  reach: 'Working nationally',
} as const;

// -----------------------------------------------------------------------------
// THE PAGE
// -----------------------------------------------------------------------------

/**
 * The proposition, ruled.
 *
 * "From grid connection to financial close" was the renewables version of this
 * line. The replacement keeps the cadence and the three-line break — the hero's
 * hairline ledger is built for exactly three lines — and swaps the energy-only
 * starting point for one a road authority, a water utility and a wind developer
 * all recognise.
 *
 * The standfirst is the only place on the page the sector list appears in full.
 * Its last three verbs are deliberate: build it, fund it, justify it — the
 * three things the page's audiences respectively do with a project.
 */
export const hero = {
  eyebrow: firm.discipline,
  statement: ['From business', 'case to', 'financial close'],
  standfirst:
    'Independent advice on the commercial case for transport, energy, water and social infrastructure — for the people who build it, fund it, and justify it.',
} as const;

export const mission = {
  label: 'The practice',
  heading: 'Where the case meets the money',
  body: [
    'We advise on the commercial case for infrastructure across the life of a project — options and appraisal, the demand evidence underneath the case, funding and financing structure, and the procurement and negotiation that end at financial close.',
    'The decisive problems are rarely technical. They are commercial, and they are settled by people who were not in the room when the engineering was agreed — a treasury, a credit committee, a board. Our work is to make sure those two conversations are the same conversation. That is as true of a road as of a wind farm.',
    'We are independent, and quietly opinionated. No delivery arm, no bid of our own to protect, no audit relationship to preserve. We take a small number of engagements, we staff them with the people who sold them, and we tell clients what we actually think.',
  ],
  figures: [
    { value: '$30bn+', caption: 'Projects worked on' },
    { value: '15+', caption: 'Years in infrastructure' },
  ],
} as const;

/**
 * Track record — the carousel.
 *
 * Each card is a colour field from the brand spectrum with ink type on top,
 * which is the brand pack's own `.hb-field`: "A statement field — the one time
 * colour fills a page."
 *
 * Two rules govern what these cards may say, and they pull in opposite
 * directions. Confidentiality prevents naming the client, the mandate or the
 * fee. But it does not prevent naming the *nature of the task* — so the label
 * on each card leads with the discipline rather than a city, which is the
 * difference between borrowed glory and a proof point.
 *
 * The descriptions themselves describe the projects, from the public record.
 * Where one is critical, it has to pass a test: would you say this out loud, in
 * a meeting, to the agency that delivered it? An insight into why a variable
 * turned commercial passes. A cost-overrun scoreboard does not — every reader
 * already knows the number, and repeating it proves only that you read the
 * paper.
 */
export const trackRecord = {
  label: 'Track record',
  heading: 'Six projects, and what they turned on',
  standfirst:
    'Roads, heavy rail, motorway concessions and renewables. We have built the models that get tested, and tested the models that get built.',
} as const;

export const projects = [
  {
    accent: 'ember',
    sector: 'Sell-side transaction · Motorway',
    figure: '$9.26bn',
    title: 'Sydney Motorway Corporation sale',
    description:
      'The NSW Government sold 51% of Sydney Motorway Corporation to Sydney Transport Partners — Transurban alongside AustralianSuper, CPP Investments and the Abu Dhabi Investment Authority. The proceeds paid for the M4–M5 Link, the piece that turned WestConnex from two motorways into a network.',
  },
  {
    accent: 'vapor',
    sector: 'Business case & appraisal · Heavy rail',
    figure: '10.2 km',
    title: 'Cross River Rail',
    description:
      'Twin tunnels beneath the Brisbane River and the CBD, with four new underground stations at Boggo Road, Woolloongabba, Albert Street and Roma Street, delivered as a PPP. Its first published cost and its current one reflect different scope, timing and risk allocation — separating the three is most of the work in reading an infrastructure number.',
  },
  {
    accent: 'dusk',
    sector: 'Commercial risk · Motorway',
    figure: '$10bn+',
    title: 'West Gate Tunnel',
    description:
      'A second crossing for Melbourne’s west, linking the West Gate Freeway to the Port of Melbourne and CityLink, opened in December 2025. Its largest single commercial exposure turned out to be a soil classification — where contaminated spoil could lawfully go was priced as a technical detail and settled as a contractual one.',
  },
  {
    accent: 'glow',
    sector: 'Demand & land value · Metro rail',
    figure: 'Driverless',
    title: 'Sydney Metro',
    description:
      'Australia’s largest public transport program: fully automated, high-frequency, and now extending 23 kilometres to Western Sydney Airport. Metro resets what land near a station is worth, which is the part of the case a conventional transport appraisal tends to miss.',
  },
  {
    accent: 'tide',
    sector: 'Procurement & contract strategy · Motorway',
    figure: '$11.1bn',
    title: 'North East Link',
    description:
      'Victoria’s longest road tunnel, and the largest road PPP ever let in Australia — a four-party partnership on an incentivised target cost, with risk and reward shared rather than simply transferred to the builder. It is a deliberate answer to how the last generation of contracts ended.',
  },
  {
    accent: 'ember',
    sector: 'Diligence & financial close · Renewables',
    figure: 'Multiple',
    title: 'Renewable energy M&A',
    description:
      'Buy-side and sell-side across wind, solar and storage — valuation, negotiation and the long grind to close, on assets whose technical case was signed off long before anyone asked whether it could be financed.',
  },
] as const;

/**
 * Conduct — conflicts and confidentiality.
 *
 * The page claims knowledge of both sides of a transaction, names six live
 * public projects and describes two of them critically. That combination raises
 * a discretion question in a probity-conscious reader's mind whether we intend
 * it or not, so it is answered directly rather than left hanging. It also
 * explains why the cards above read the way they do.
 */
export const conduct = {
  label: 'Conduct',
  heading: 'One party per transaction',
  body: [
    'We check conflicts before accepting an engagement, and act for one party per transaction. Client work is not discussed, and we do not carry client logos.',
    'Nothing on this page describes a mandate, a client or a fee. The projects above are described from the public record.',
  ],
} as const;

/**
 * The four practice areas.
 *
 * Sequenced as a lifecycle — evidence, case, funding, close — because demand
 * work sits underneath a business case rather than after a funding structure.
 *
 * The accents keep the brand deck's logic and shed its energy-sector readings:
 * Dusk is the long view, Vapor is the network, Glow is yield, Tide is capital in
 * motion. The deck's meanings translate to general infrastructure without
 * strain.
 *
 * Only two of the four descriptions carry an opinion. Four consecutive
 * aphorisms is a tic, and a reader who notices the tic stops believing any of
 * them.
 */
export const servicesSection = {
  label: 'What we do',
  heading: 'Four questions that decide a project',
} as const;

export const services = [
  {
    accent: 'dusk',
    index: '01',
    title: 'Strategy, Business Case & Assurance',
    description:
      'Options analysis, appraisal and investment logic, and independent review of a case someone else has built. Most business cases fail scrutiny on their assumptions, not their arithmetic.',
  },
  {
    accent: 'vapor',
    index: '02',
    title: 'Demand & Network Evidence',
    description:
      'Demand, patronage and network analysis: the forecast the rest of the case rests on, built so it can be interrogated line by line rather than defended as a black box.',
  },
  {
    accent: 'glow',
    index: '03',
    title: 'Financial Modelling & Funding',
    description:
      'Financial models, funding structure and financing terms, affordability and value for money — built by the person who will sit in the room and answer for them.',
  },
  {
    accent: 'tide',
    index: '04',
    title: 'Transactions & Close',
    description:
      'Procurement strategy, commercial structuring, diligence and bid support, through to the point where risk allocation is finally settled.',
  },
] as const;

export const contactSection = {
  label: 'Contact',
  heading: 'Tell us what you are working on',
  standfirst:
    'A short note is enough to start. We reply to every enquiry ourselves, usually within two working days.',
} as const;

/**
 * Enquiry types offered in the contact form.
 *
 * These mirror the four service areas. "Specialist capacity under your brand"
 * is the one route on the page for an advisory firm or prime looking for bench
 * capacity — a different transaction from a named mandate, and one that
 * otherwise has nowhere to land.
 */
export const ENQUIRY_TYPES = [
  'New engagement',
  'Strategy, business case or assurance',
  'Demand and network evidence',
  'Financial modelling and funding',
  'Transactions and financial close',
  'Specialist capacity under your brand',
  'Media or speaking',
  'Something else',
] as const;
