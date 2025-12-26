import { motion } from "framer-motion";
import { useState } from "react";

const links = [
  { to: "home", label: "Home" },
  { to: "about", label: "About" },
  { to: "skills", label: "Skills" },
  { to: "projects", label: "Projects" },
  { to: "certifications", label: "Certfications" },
  { to: "contact", label: "Contact" },
];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.offsetTop - 80; // account for fixed navbar
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function Navbar({ active }) {
  const [isOpen, setIsOpen] = useState(false); // for mobile menu toggle

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md shadow-lg"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("home");
            setIsOpen(false); // close mobile menu on click
          }}
          className="font-extrabold tracking-wide hover:scale-105 transition-transform"
        >
          Talha
        </a>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.to}
              href={`#${l.to}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(l.to);
              }}
              className={`cursor-pointer relative group transition-colors hover:scale-105 ${
                active === l.to ? "text-mustard" : "hover:text-yellow-300"
              }`}
            >
              <span className="relative z-10">{l.label}</span>
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-mustard transition-all ${
                  active === l.to ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </a>
          ))}
          <a
            href="/resume.pdf"
            download
            aria-label="Download resume (PDF)"
            className="ml-4 px-4 py-2 rounded-full bg-yellow-400 text-black font-semibold hover:scale-105 transition-transform"
          >
            Resume
          </a>
        </div>

        {/* Hamburger Button (mobile only) */}
        <button
          className="sm:hidden flex flex-col gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`block h-0.5 w-6 bg-yellow-400 transition-transform ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-yellow-400 transition-opacity ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-yellow-400 transition-transform ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden bg-black/50 backdrop-blur-md">
          {links.map((l) => (
            <a
              key={l.to}
              href={`#${l.to}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(l.to);
                setIsOpen(false); // close menu after click
              }}
              className={`block px-4 py-3 text-white hover:bg-yellow-400 hover:text-black transition-colors ${
                active === l.to ? "bg-yellow-400 text-black" : ""
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download
            aria-label="Download resume (PDF)"
            className="block px-4 py-3 text-white hover:bg-yellow-400 hover:text-black transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Resume
          </a>
        </div>
      )}
    </motion.nav>
  );
}
