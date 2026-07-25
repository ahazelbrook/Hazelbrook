/**
 * Services — four practice areas, each carrying its accent from the spectrum.
 *
 * The brand deck assigns a meaning to every accent (Vapor is grid and
 * engineering, Glow is generation and yield, Dusk is policy and the long view,
 * Tide is transition and growth), so each row switches accent via the
 * data-hb-accent attribute rather than hard-coding a colour. Colour arrives
 * small — a rule and a dot, never a filled panel. "Bright is a guest, never
 * the host."
 *
 * Rows, not cards: these are scannable records, and the layout doc is explicit
 * that wrapping each one in a Card is how a page starts looking like a
 * prototype.
 */

import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Text } from '@astryxdesign/core/Text';
import { services } from '../content';

export function Services() {
  return (
    <section className="hb-section hb-section--shade" id="services">
      <div className="hb-container">
        <VStack gap={8}>
          <VStack gap={5}>
            <p className="hb-label">What we do</p>
            <h2 className="hb-display hb-display--l">
              Four questions that decide a project
            </h2>
          </VStack>

          <ul className="hb-services">
            {services.map(service => (
              <li
                key={service.index}
                className="hb-service"
                data-hb-accent={service.accent}
              >
                <div className="hb-service__index">
                  <HStack gap={3} vAlign="center">
                    <span className="hb-dot" />
                    <p className="hb-label">{service.index}</p>
                  </HStack>
                </div>

                <div className="hb-service__body">
                  <VStack gap={3}>
                    <h3 className="hb-display hb-display--m">{service.title}</h3>
                    <Text type="body" as="p" color="secondary">
                      {service.description}
                    </Text>
                  </VStack>
                </div>
              </li>
            ))}
          </ul>
        </VStack>
      </div>
    </section>
  );
}
