/**
 * Footer — the one ink ground on the page.
 *
 * The deck reserves reversed panels for major divisions, so the page gets
 * exactly one: the reversed lock-up on ink, closing the document the way the
 * back of a business card does.
 */

import { VStack, HStack } from '@astryxdesign/core/Layout';
import { Grid } from '@astryxdesign/core/Grid';
import { Text } from '@astryxdesign/core/Text';
import { Logomark } from './Brand';
import { contact, firm } from '../content';

export function SiteFooter() {
  return (
    <footer className="hb-section hb-panel--ink">
      <div className="hb-container">
        <VStack gap={8}>
          <Logomark width={300} isReversed />

          <hr className="hb-rule hb-rule--reversed" />

          <Grid columns={{ minWidth: 200 }} gap={6} width="100%">
            <VStack gap={2}>
              <p className="hb-label">Based</p>
              <Text type="body" as="p" color="inherit">
                {contact.location}
              </Text>
              <Text type="body" as="p" color="inherit">
                {contact.reach}
              </Text>
            </VStack>

            <VStack gap={2}>
              <p className="hb-label">Direct</p>
              <a href={`mailto:${contact.email}`} className="hb-link hb-link--reversed">
                {contact.email}
              </a>
              <a
                href={`tel:${contact.telephone.replace(/\s/g, '')}`}
                className="hb-link hb-link--reversed"
              >
                {contact.telephone}
              </a>
            </VStack>

            <VStack gap={2}>
              <p className="hb-label">Practice</p>
              <Text type="body" as="p" color="inherit">
                {firm.discipline}
              </Text>
              <Text type="body" as="p" color="inherit">
                {firm.established}
              </Text>
            </VStack>
          </Grid>

          <hr className="hb-rule hb-rule--reversed" />

          {/* ABN and PI cover belong on this line — a prime cannot onboard a
              subcontractor without current certificates, and a procurement
              officer cannot progress an engagement without an ABN. They are
              deferred rather than dropped: add them here when the real values
              are to hand, alongside the copyright. */}
          <HStack justify="between" gap={4} wrap="wrap">
            <p className="hb-label">
              © {new Date().getFullYear()} {firm.name}
            </p>
          </HStack>
        </VStack>
      </div>
    </footer>
  );
}
