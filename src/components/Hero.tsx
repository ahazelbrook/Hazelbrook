/**
 * Hero — the proposition, ruled.
 *
 * This is the brand's signature layout move: display type sitting on a ledger
 * of hairlines, one under every line. It is why each line of the statement is
 * its own element rather than a wrapped paragraph — the ruling has to land on
 * the baseline grid, not wherever the browser happens to break the text.
 */

import { VStack } from '@astryxdesign/core/Layout';
import { hero } from '../content';

export function Hero() {
  return (
    <section className="hb-section hb-section--hero" id="top">
      <div className="hb-container">
        <VStack gap={6}>
          <p className="hb-label">{hero.eyebrow}</p>

          {/* The statement is split into one block per line so the ruling lands
              on the baseline. That split is purely visual, so the accessible
              name is set from the joined sentence — otherwise the lines
              concatenate and a screen reader reads "gridconnection". */}
          <h1
            className="hb-display hb-display--xl hb-ruled"
            aria-label={hero.statement.join(' ')}
          >
            {hero.statement.map(line => (
              <span key={line} className="hb-ruled__line" aria-hidden="true">
                {line}
              </span>
            ))}
          </h1>

          <p className="hb-standfirst">{hero.standfirst}</p>
        </VStack>
      </div>
    </section>
  );
}
