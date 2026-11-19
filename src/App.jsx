import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import SmoothScroll from "./lib/SmoothScroll";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function App() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <div className="relative min-h-screen bg-background">
          {/* Film grain */}
          <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />

          <Cursor />
          <Navbar />

          <main className="relative z-10">
            <Hero />
            <Marquee />
            <About />
            <Education />
            <Skills />
            <Services />
            <Projects />
            <Contact />
          </main>

          <Footer />
        </div>
      </SmoothScroll>
    </MotionConfig>
  );
}
