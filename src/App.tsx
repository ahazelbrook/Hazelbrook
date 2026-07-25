import { SiteHeader } from './components/SiteHeader';
import { Hero } from './components/Hero';
import { Mission } from './components/Mission';
import { Services } from './components/Services';
import { ContactForm } from './components/ContactForm';
import { SiteFooter } from './components/SiteFooter';

export default function App() {
  return (
    <>
      <a href="#contact" className="hb-skip-link">
        Skip to contact
      </a>
      <SiteHeader />
      <main>
        <Hero />
        <Mission />
        <Services />
        <ContactForm />
      </main>
      <SiteFooter />
    </>
  );
}
