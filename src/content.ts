/**
 * Every word on the site, and the one piece of configuration it needs.
 *
 * Copy is drafted from the brand pack's own language — the proposition, the
 * standfirsts and the spectrum's sector meanings all come from
 * "Hazelbrook Brand Deck.dc.html" v1.0. It is meant to be edited.
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
  discipline: 'Infrastructure Strategy & Insight',
  established: 'Independent since 1974',
  domain: 'hazelbrook.co',
} as const;

/**
 * Contact details as they appear on the printed stationery.
 *
 * NOTE — the telephone number below is the one used on the brand pack's
 * business-card mock-up. +44 20 7946 xxxx is an Ofcom range reserved for
 * fiction and drama, so it is a placeholder, not a live line. Replace it (and
 * confirm the address and registration number) before the site goes public.
 */
export const contact = {
  email: 'hello@hazelbrook.co',
  telephone: '+61 426 364 426',
  address: ['18 Ridgmount Street', 'London WC1E 7AH'],
  offices: ['London', 'Sydney'],
  registration: 'Registered in England no. OC148213',
} as const;

// -----------------------------------------------------------------------------
// THE PAGE
// -----------------------------------------------------------------------------

export const hero = {
  eyebrow: firm.discipline,
  /** The proposition, straight from the deck. Ruled, as the brand intends. */
  statement: ['From grid', 'connection to', 'financial close'],
  standfirst:
    'Independent counsel for the people building hard infrastructure — and for the funds and public bodies that back them.',
} as const;

export const mission = {
  label: 'The practice',
  heading: 'Energised by solving the hard problems',
  body: [
    'We advise developers, funds and public bodies across the life of a renewable project — from feasibility and grid strategy, through consents and structuring, to the last mile before financial close.',
    'The last mile is rarely a technical problem. It is a financial one, and it is usually decided by people who were not in the room when the engineering was settled. Our work is to make sure those two conversations are the same conversation.',
    'We are independent, and quietly opinionated. We take a small number of engagements, we staff them with the people who sold them, and we tell clients what we actually think.',
  ],
  figures: [
    { value: '1974', caption: 'Independent since' },
    { value: '2', caption: 'Offices — London & Sydney' },
  ],
} as const;

/**
 * Track record — the carousel.
 *
 * Each card is a colour field from the brand spectrum with ink type on top,
 * which is the brand pack's own `.hb-field`: "A statement field — the one time
 * colour fills a page." The accents are assigned by sector the way the deck
 * defines them — Vapor for grid and engineering, Glow for generation, Dusk for
 * policy and the long view, Tide for transition and renewables.
 *
 * The overviews below describe the projects themselves, drawn from public
 * reporting. They are deliberately not claims about the firm's specific
 * mandate, scope or fee on any one of them — that detail is yours to add, and
 * should be checked against what you can actually say publicly.
 */
export const trackRecord = {
  label: 'Track record',
  heading: 'Worked on over $30bn of infrastructure projects',
  standfirst:
    'Roads, heavy rail, motorway concessions and renewables — on both sides of the table, from business case to financial close.',
} as const;

export const projects = [
  {
    accent: 'ember',
    sector: 'Transaction · Sydney',
    figure: '$9.26bn',
    title: 'Sydney Motorway Corporation sale',
    description:
      'The NSW Government sold 51% of Sydney Motorway Corporation to Sydney Transport Partners — Transurban alongside AustralianSuper, CPP Investments and the Abu Dhabi Investment Authority. The proceeds paid for the M4–M5 Link, the piece that turned WestConnex from two motorways into a network.',
  },
  {
    accent: 'vapor',
    sector: 'Heavy rail · Brisbane',
    figure: '10.2 km',
    title: 'Cross River Rail',
    description:
      'Twin tunnels beneath the Brisbane River and the CBD, with four new underground stations at Boggo Road, Woolloongabba, Albert Street and Roma Street. Delivered as a PPP, and a study in how a business case moves: costed at $5.4bn, now reported near $19bn, with services from 2029.',
  },
  {
    accent: 'dusk',
    sector: 'Motorway · Melbourne',
    figure: '$10bn+',
    title: 'West Gate Tunnel',
    description:
      'A second crossing for Melbourne’s west, linking the West Gate Freeway to the Port of Melbourne and CityLink. It opened in December 2025 at roughly double its original estimate — most of the overrun bought and paid for in a long dispute over where contaminated spoil could go.',
  },
  {
    accent: 'glow',
    sector: 'Metro rail · Sydney',
    figure: 'Driverless',
    title: 'Sydney Metro',
    description:
      'Australia’s largest public transport programme: fully automated, high-frequency, and now extending 23 kilometres to Western Sydney Airport. Metro resets what land near a station is worth, which is the part of the case a conventional transport appraisal tends to miss.',
  },
  {
    accent: 'tide',
    sector: 'Motorway · Melbourne',
    figure: '$11.1bn',
    title: 'North East Link',
    description:
      'Victoria’s longest road tunnel, and the largest road PPP ever let in Australia — a four-party partnership on an incentivised target cost, with risk and reward shared rather than simply transferred to the builder. A deliberate answer to how the last generation of contracts ended.',
  },
  {
    accent: 'ember',
    sector: 'Renewables · Australia',
    figure: 'Multiple',
    title: 'Renewable energy M&A and financial close',
    description:
      'Buy-side and sell-side across wind, solar and storage — diligence, commercial structuring and the long grind to close. The technical case is usually settled early. The financing case is what decides whether the thing actually gets built.',
  },
] as const;

/**
 * The four practice areas, each carrying its accent from the brand spectrum.
 * The spectrum's meanings are defined in the brand deck: Vapor is grid and
 * engineering, Glow is generation and yield, Dusk is policy and the long view,
 * Tide is transition and growth.
 */
export const services = [
  {
    accent: 'vapor',
    index: '01',
    title: 'Grid & Connections',
    description:
      'Connection strategy, queue position and network charging. Where a project sits on the grid decides what it is worth long before anyone breaks ground.',
  },
  {
    accent: 'glow',
    index: '02',
    title: 'Generation & Yield',
    description:
      'Technology selection, yield assessment and revenue stacking across merchant, contracted and balancing markets. What the asset will actually earn, not what the brochure says.',
  },
  {
    accent: 'dusk',
    index: '03',
    title: 'Policy & Consents',
    description:
      'Planning strategy, consenting risk and regulatory change. The long view on schemes whose economics are set by decisions taken years before commissioning.',
  },
  {
    accent: 'tide',
    index: '04',
    title: 'Transition & Capital',
    description:
      'Commercial structuring, diligence support and the path to financial close. We sit on the developer’s side of the table, or the fund’s, and we say which risks are real.',
  },
] as const;

export const contactSection = {
  label: 'Contact',
  heading: 'Tell us what you are building',
  standfirst:
    'A short note is enough to start. We reply to every enquiry ourselves, usually within two working days.',
} as const;

/** Enquiry types offered in the contact form. */
export const ENQUIRY_TYPES = [
  'New engagement',
  'Grid & connections',
  'Generation & yield',
  'Policy & consents',
  'Transition & capital',
  'Media or speaking',
  'Something else',
] as const;
