
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Certifications from "./components/Certifications";



export default function App() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const headerHeight = 80;
    const sectionIds = ["home", "about", "skills", "projects", "certifications", "contact"];
    const onScroll = () => {
      let current = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= headerHeight + 50 && rect.bottom >= headerHeight + 50) {
          current = id;
          break;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <Navbar active={active} />
      <main id="main" className="pt-24 md:pt-28">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
