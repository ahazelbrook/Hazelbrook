/**
 * Site header — the horizontal lock-up on a hairline.
 *
 * A marketing page wants a plain content column, not an app shell, so this is
 * a simple sticky bar rather than TopNav: monogram and wordmark at the left
 * edge, three anchors at the right, one hairline underneath.
 *
 * The <header> element carries the page chrome (sticky, hairline, paper wash) —
 * things Astryx has no token for. Everything inside it is Astryx layout.
 */

import { HStack } from '@astryxdesign/core/Layout';
import { Text } from '@astryxdesign/core/Text';
import { Monogram, Wordmark } from './Brand';
import { firm } from '../content';

const NAV = [
  { href: '#practice', label: 'Practice' },
  { href: '#services', label: 'Services' },
  /* The one link that leaves the page. The Journal is prerendered to static
     HTML by scripts/prerender.mjs and is not part of this app. */
  { href: '/journal/', label: 'Journal' },
  { href: '#contact', label: 'Contact' },
];

export function SiteHeader() {
  return (
    <header className="hb-site-header">
      <div className="hb-site-header__inner">
        <HStack vAlign="center" justify="between" gap={4} width="100%">
          <a href="#top" className="hb-lockup" aria-label={`${firm.name} — home`}>
            <HStack vAlign="center" gap={2}>
              <Monogram width={32} />
              <Wordmark />
            </HStack>
          </a>

          <nav aria-label="Primary">
            <HStack vAlign="center" gap={5}>
              {NAV.map(item => (
                <a key={item.href} href={item.href} className="hb-nav-link">
                  <Text type="supporting" weight="medium" color="inherit">
                    {item.label}
                  </Text>
                </a>
              ))}
            </HStack>
          </nav>
        </HStack>
      </div>
    </header>
  );
}
