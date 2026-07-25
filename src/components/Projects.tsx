/**
 * Track record — a carousel of colour fields.
 *
 * Modelled on the Innovation Endeavors carousel: tall colour-filled cards with
 * ink type centred on them, the neighbouring cards peeking in at both edges,
 * and a connected dot rail underneath rather than arrows.
 *
 * The colours are Hazelbrook's own. The brand spectrum's mid tones land almost
 * exactly where that reference sits — Glow against its ochre, Dusk its lilac,
 * Vapor its pale blue, Tide its mint — so the card is simply the brand pack's
 * `.hb-field`: "A statement field — the one time colour fills a page. Ink type
 * on top."
 *
 * Scrolling is Astryx's Carousel (snap, edge fade, keyboard and trackpad). Its
 * own prev/next buttons are turned off because the dot rail is the navigation,
 * and two affordances for one job is clutter.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Carousel } from '@astryxdesign/core/Carousel';
import { VStack } from '@astryxdesign/core/Layout';
import { Text } from '@astryxdesign/core/Text';
import { projects, trackRecord } from '../content';

export function Projects() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [active, setActive] = useState(0);

  /** The element Carousel actually scrolls — the root, or its scrolling child. */
  const getScroller = useCallback((): HTMLElement | null => {
    const root = scrollerRef.current;
    if (!root) return null;
    if (root.scrollWidth > root.clientWidth + 1) return root;
    return (
      Array.from(root.querySelectorAll<HTMLElement>('*')).find(
        el => el.scrollWidth > el.clientWidth + 1,
      ) ?? root
    );
  }, []);

  /**
   * Cards snap to the start edge, so the active one is whichever leading edge
   * sits nearest the scroller's left edge — not the one nearest the centre.
   */
  useEffect(() => {
    const scroller = getScroller();
    if (!scroller) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const lead = scroller.scrollLeft;
        let nearest = 0;
        let best = Infinity;
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const distance = Math.abs(card.offsetLeft - lead);
          if (distance < best) {
            best = distance;
            nearest = i;
          }
        });
        setActive(nearest);
      });
    };

    onScroll();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [getScroller]);

  const goTo = (index: number) => {
    const scroller = getScroller();
    const card = cardRefs.current[index];
    if (!scroller || !card) return;
    scroller.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
  };

  return (
    <section className="hb-section hb-section--record" id="track-record">
      <div className="hb-container">
        <VStack gap={5}>
          <p className="hb-label">{trackRecord.label}</p>
          <h2 className="hb-display hb-display--l">{trackRecord.heading}</h2>
          <p className="hb-standfirst">{trackRecord.standfirst}</p>
        </VStack>
      </div>

      <div className="hb-record__track">
        <Carousel
          ref={scrollerRef}
          hasSnap
          hasEdgeFade={false}
          hasButtons={false}
          gap={3}
          aria-label="Selected infrastructure projects"
        >
          <ul className="hb-cards">
            {projects.map((project, i) => (
              <li
                key={project.title}
                ref={el => {
                  cardRefs.current[i] = el;
                }}
                className="hb-card-field"
                data-hb-accent={project.accent}
                aria-current={i === active ? 'true' : undefined}
              >
                <p className="hb-label hb-card-field__sector">{project.sector}</p>
                <h3 className="hb-display hb-display--m hb-card-field__title">
                  {project.title}
                </h3>
                <p className="hb-figure hb-card-field__figure">{project.figure}</p>
                <Text type="body" as="p">
                  {project.description}
                </Text>
              </li>
            ))}
          </ul>
        </Carousel>
      </div>

      {/* The dot rail: position indicator and navigation in one. */}
      <div className="hb-container">
        <div className="hb-rail" role="tablist" aria-label="Choose a project">
          {projects.map((project, i) => (
            <button
              key={project.title}
              type="button"
              role="tab"
              className="hb-rail__dot"
              aria-selected={i === active}
              aria-label={project.title}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
