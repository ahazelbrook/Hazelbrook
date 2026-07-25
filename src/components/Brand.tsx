/**
 * The mark.
 *
 * Brand rule, from the deck: "THE MARK IS ARTWORK, NOT TYPE." These components
 * place the supplied vector files and never rebuild the mark from typefaces.
 * The only thing that changes between them is which file is placed and how wide
 * it is drawn — clear space is held by the layout around them.
 */

import logomark from '../brand/hazelbrook-logomark.svg';
import logomarkReversed from '../brand/hazelbrook-logomark-reversed.svg';
import monogram from '../brand/hazelbrook-monogram-ink.svg';
import monogramReversed from '../brand/hazelbrook-monogram.svg';
import { firm } from '../content';

/** Minimum sizes from the deck: primary 180px on screen, monogram 32px. */
const MIN_LOGOMARK_WIDTH = 180;
const MIN_MONOGRAM_WIDTH = 32;

type LogomarkProps = {
  /** Rendered width in px. Clamped to the brand minimum. */
  width?: number;
  /** Use the paper-filled artwork for ink grounds and photography. */
  isReversed?: boolean;
};

/**
 * The primary lock-up — covers, statements, signage. Two lines, the ampersand
 * always Ember.
 */
export function Logomark({ width = 420, isReversed = false }: LogomarkProps) {
  return (
    <img
      src={isReversed ? logomarkReversed : logomark}
      alt={firm.name}
      width={Math.max(width, MIN_LOGOMARK_WIDTH)}
      style={{ width: '100%', maxWidth: Math.max(width, MIN_LOGOMARK_WIDTH), height: 'auto' }}
    />
  );
}

/**
 * The monogram — favicon, avatar, stamp, and the site header where a two-line
 * lock-up would not sit on a single rule.
 */
export function Monogram({ width = 34, isReversed = false }: LogomarkProps) {
  const resolved = Math.max(width, MIN_MONOGRAM_WIDTH);
  return (
    <img
      src={isReversed ? monogramReversed : monogram}
      alt=""
      aria-hidden="true"
      width={resolved}
      style={{ width: resolved, height: 'auto', display: 'block' }}
    />
  );
}

/**
 * The wordmark, set in Young Serif.
 *
 * This is the one sanctioned setting of the name in type — the brand pack ships
 * `.hb-wordmark` for exactly this. It is not the mark, and it never stands in
 * for the mark: it accompanies the monogram in the header, where the full
 * artwork would be illegible at a nav bar's height.
 */
export function Wordmark({ isReversed = false }: { isReversed?: boolean }) {
  return (
    <span className={`hb-wordmark${isReversed ? ' hb-wordmark--reversed' : ''}`}>
      {firm.name}
    </span>
  );
}
