/**
 * The practice — mission statement and the three figures.
 *
 * Figures are set in Young Serif because the brand deck is explicit that
 * numbers in the display face "read as considered, not generated".
 */

import { VStack } from '@astryxdesign/core/Layout';
import { Grid } from '@astryxdesign/core/Grid';
import { Text } from '@astryxdesign/core/Text';
import { mission } from '../content';

export function Mission() {
  return (
    <section className="hb-section" id="practice">
      <div className="hb-container">
        <VStack gap={8}>
          <VStack gap={5}>
            <p className="hb-label">{mission.label}</p>
            <h2 className="hb-display hb-display--l">{mission.heading}</h2>
          </VStack>

          <div className="hb-prose">
            <VStack gap={4}>
              {mission.body.map(paragraph => (
                <Text key={paragraph.slice(0, 24)} type="body" as="p">
                  {paragraph}
                </Text>
              ))}
            </VStack>
          </div>

          <hr className="hb-rule" />

          <Grid columns={{ minWidth: 200 }} gap={6} width="100%">
            {mission.figures.map(figure => (
              <VStack key={figure.caption} gap={3}>
                <p className="hb-figure">{figure.value}</p>
                <p className="hb-label">{figure.caption}</p>
              </VStack>
            ))}
          </Grid>
        </VStack>
      </div>
    </section>
  );
}
