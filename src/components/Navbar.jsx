import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const links = [
  { to: "home", label: "Home" },
  { to: "about", label: "About" },
  { to: "skills", label: "Skills" },
  { to: "projects", label: "Projects" },
  { to: "certifications", label: "Certifications" },
  { to: "contact", label: "Contact" },
];

export default function Navbar({ active }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 100;
      window.scrollTo({ top, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          scrolled ? "bg-background/80 backdrop-blur-md border-white/5 py-4" : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToId("home"); }}
            className="text-2xl font-bold font-heading bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
          >
            Talha.
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-sm">
              {links.map((link) => (
                <button
                  key={link.to}
                  onClick={() => scrollToId(link.to)}
                  className={clsx(
                    "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
                    active === link.to ? "text-white" : "text-gray-400 hover:text-white"
                  )}
                >
                  {active === link.to && (
                    <motion.div
                      layoutId="bubble"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              ))}
            </div>

            <a
              href="/resume.pdf"
              download
              className="px-6 py-2.5 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform"
            >
              Resume
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 right-6 z-50 w-64 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-2 md:hidden flex flex-col gap-1"
          >
            {links.map((link) => (
              <button
                key={link.to}
                onClick={() => scrollToId(link.to)}
                className={clsx(
                  "w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  active === link.to
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </button>
            ))}

            <div className="h-px bg-white/10 my-1" />

            <a
              href="/resume.pdf"
              download
              className="w-full text-center px-4 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors"
            >
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
