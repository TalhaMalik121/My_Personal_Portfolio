import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

export default function SmoothScroll({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current || document.querySelector("[data-scroll-container]");
    if (!el) return;

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    if (prefersReduced || isTouch) {
      // Respect user preferences and avoid heavy effects on touch devices
      return;
    }

    const scroll = new LocomotiveScroll({
      el,
      smooth: true,
      multiplier: 1,
      inertia: 0.8,
    });

    // Expose instance for other components to use (e.g., scrollTo)
    window.locomotiveScroll = scroll;

    const onLoad = () => scroll.update();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      if (scroll) scroll.destroy();
      window.locomotiveScroll = null;
    };
  }, []);

  return (
    <div data-scroll-container ref={ref}>
      {children}
    </div>
  );
}
