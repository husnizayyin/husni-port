import { useEffect } from 'react';
import { ScrollTrigger } from './lib/gsap';
import { installScrollCancel } from './lib/scroll';
import { Chrome } from './components/Chrome';
import { Hero } from './components/Hero';
import { Position } from './components/Position';
import { Film } from './components/Film';
import { Work } from './components/Work';
import { TechStack } from './components/TechStack';
import { Depth } from './components/Depth';
import { Mix } from './components/Mix';
import { Contact } from './components/Contact';

export default function App() {
  useEffect(() => {
    const removeCancel = installScrollCancel();

    // Pin distances are measured from layout, so re-measure once the web fonts have loaded.
    const refresh = () => ScrollTrigger.refresh();
    const timer = window.setTimeout(refresh, 400);
    Promise.race([
      Promise.all([
        document.fonts.load('600 100px "Fraunces Variable"'),
        document.fonts.load('550 16px "Schibsted Grotesk Variable"'),
      ]).then(() => document.fonts.ready),
      new Promise((resolve) => window.setTimeout(resolve, 2200)),
    ]).then(refresh, refresh);

    return () => {
      removeCancel();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Chrome />
      <main>
        <Hero />
        <Position />
        <Film />
        <Work />
        <TechStack />
        <Depth />
        <Mix />
        <Contact />
      </main>
    </>
  );
}
