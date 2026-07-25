/**
 * Conduct — conflicts and confidentiality.
 *
 * Sits directly after the track record, which is the point at which the page
 * has just named six live public projects and been candid about two of them. A
 * probity-conscious reader forms a question there; this answers it in three
 * sentences rather than leaving it to sit under the rest of the page.
 *
 * Deliberately the quietest block on the page — no figure, no accent, no
 * carousel. It is a statement of practice, and it should read like one.
 */

import { VStack } from '@astryxdesign/core/Layout';
import { Text } from '@astryxdesign/core/Text';
import { conduct } from '../content';

export function Conduct() {
  return (
    <section className="hb-section" id="conduct">
      <div className="hb-container">
        <VStack gap={8}>
          <VStack gap={5}>
            <p className="hb-label">{conduct.label}</p>
            <h2 className="hb-display hb-display--l">{conduct.heading}</h2>
          </VStack>

          <div className="hb-prose">
            <VStack gap={4}>
              {conduct.body.map(paragraph => (
                <Text key={paragraph.slice(0, 24)} type="body" as="p">
                  {paragraph}
                </Text>
              ))}
            </VStack>
          </div>
        </VStack>
      </div>
    </section>
  );
}
