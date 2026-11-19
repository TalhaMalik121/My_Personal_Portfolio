import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";

const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

/**
 * Inertial smooth scrolling for the whole page. Uses native scroll under the
 * hood, so position: sticky and framer-motion's useScroll keep working.
 */
export default function SmoothScroll({ children, enabled = true }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const instance = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      anchors: { offset: -40 },
    });
    setLenis(instance);

    let raf = requestAnimationFrame(function loop(time) {
      instance.raf(time);
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(raf);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (enabled) lenis.start();
    else lenis.stop();
  }, [lenis, enabled]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
