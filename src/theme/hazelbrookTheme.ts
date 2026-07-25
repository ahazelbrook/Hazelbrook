// Hazelbrook & Hazelbrook — Astryx theme
// The same decisions as hazelbrook-brand.css, expressed the Astryx way.
//
//   npm install @astryxdesign/core @astryxdesign/theme-neutral
//   npm install -D @astryxdesign/cli
//   npx astryx theme build hazelbrookTheme.ts -o dist/theme.css
//
// Wrap the app once:  <Theme theme={hazelbrookTheme}>{children}</Theme>
// A thin brand layer only — Astryx's neutral ramp, spacing and motion scales
// are deliberately untouched.

import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

// Foundation. Ink and paper carry every page.
const INK = 'light-dark(#17181A, #F0EEE9)';
const PAPER = 'light-dark(#F6F5F1, #16171A)';

// Ember — the colour of the ampersand in the mark, and the brand's one
// interactive accent. The rest of the spectrum (Glow, Dusk, Vapor, Tide) is
// editorial: applied per document via --hb-accent, never wired to UI tokens.
const EMBER_DEEP = 'light-dark(#B4442E, #E46C4A)';

export const hazelbrookTheme = defineTheme({
  name: 'hazelbrook',
  extends: neutralTheme,

  tokens: {
    // Accent → Ember
    '--color-accent': EMBER_DEEP,
    '--color-text-accent': EMBER_DEEP,
    '--color-icon-accent': EMBER_DEEP,
    '--color-accent-muted':
      'light-dark(rgba(180,68,46,0.10), rgba(228,108,74,0.16))',
    '--color-on-accent': 'light-dark(#F6F5F1, #17181A)',

    // Foreground ink
    '--color-text-primary': INK,
    '--color-icon-primary': INK,

    // Grounds
    '--color-background-body': PAPER,
    '--color-background-surface': 'light-dark(#FFFFFF, #1D1E21)',

    // Nothing in this brand is rounded — the rigour is the personality.
    '--radius-inner': '0px',
    '--radius-element': '0px',
    '--radius-container': '0px',
    '--radius-page': '0px',

    // Young Serif ships a single weight; display headings must not fake bold.
    '--text-display-1-weight': '400',
    '--text-display-2-weight': '400',
    '--text-display-3-weight': '400',
  },

  typography: {
    // Scale: the brand deck sets body at 16px with 1.68 leading ("Body —
    // Space Grotesk regular, 1.68 leading"). Astryx's neutral ramp is base 14,
    // so the base is raised to meet the deck. Ratio is left at neutral's 1.2.
    scale: {base: 16, ratio: 1.2},

    // NOTE — family names are written bare here, not "'Young Serif'".
    // Astryx quotes these itself when it builds the CSS custom property, so a
    // pre-quoted name compiles to font-family: "'Young Serif'", which is not a
    // valid family reference and silently falls back to the system font. This
    // was corrected from the brand pack's original file; the fallbacks strings
    // are stacks, so their internal quoting is correct as supplied.
    heading: {
      family: 'Young Serif',
      fallbacks: "'Iowan Old Style', Georgia, serif",
    },
    body: {
      family: 'Space Grotesk',
      fallbacks: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    },
  },

  components: {
    // Square buttons, ink-filled, accent on hover.
    button: {
      base: {borderRadius: '0'},
    },
    // Display headings are Young Serif at its natural weight, set tight.
    heading: {
      'level:1': {
        fontFamily: "'Young Serif', Georgia, serif",
        fontWeight: '400',
        letterSpacing: '-0.01em',
        lineHeight: '1.04',
      },
      'level:2': {
        fontFamily: "'Young Serif', Georgia, serif",
        fontWeight: '400',
        letterSpacing: '-0.01em',
        lineHeight: '1.08',
      },
    },
  },
});
