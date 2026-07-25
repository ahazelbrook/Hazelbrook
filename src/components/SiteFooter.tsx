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
              <p className="hb-label">Offices</p>
              {contact.offices.map(office => (
                <Text key={office} type="body" as="p" color="inherit">
                  {office}
                </Text>
              ))}
            </VStack>

            <VStack gap={2}>
              <p className="hb-label">London</p>
              {contact.address.map(line => (
                <Text key={line} type="body" as="p" color="inherit">
                  {line}
                </Text>
              ))}
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

          <HStack justify="between" gap={4} wrap="wrap">
            <p className="hb-label">
              © {new Date().getFullYear()} {firm.name}
            </p>
            <p className="hb-label">{contact.registration}</p>
          </HStack>
        </VStack>
      </div>
    </footer>
  );
}
