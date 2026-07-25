import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Theme } from '@astryxdesign/core/theme';
import { hazelbrookTheme } from './theme/hazelbrookTheme';
import App from './App';
import './styles/index.css';

/**
 * The theme is applied once, here. Every brand decision — Ember, ink, paper,
 * zero radius, Young Serif and Space Grotesk — comes from hazelbrookTheme.ts,
 * which is the brand pack's own file, dropped in unmodified.
 *
 * mode="light" is deliberate: the brand is drawn for ink on paper, and the
 * printed feel is the point. The theme does carry dark-mode values, so
 * switching to "system" is a one-word change if that is ever wanted.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme theme={hazelbrookTheme} mode="light">
      <App />
    </Theme>
  </StrictMode>,
);
