import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Code, Briefcase, Home, Download, Menu, X, Layers, Send } from "lucide-react";
import Magnetic from "./Magnetic";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "services", label: "Services", icon: Layers },
    { id: "projects", label: "Projects", icon: Briefcase },

    { id: "contact", label: "Contact", icon: Send },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden md:flex fixed top-6 left-0 right-0 z-50 justify-center px-4"
      >
        <div
          className={`relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 border ${scrolled || mobileOpen
            ? "bg-slate-900/80 backdrop-blur-lg border-white/10 shadow-2xl shadow-primary/5 w-full max-w-7xl"
            : "bg-surface/50 backdrop-blur-md border-white/5 w-full max-w-7xl hover:border-white/10"
            }`}
        >
          {/* Brand Name */}
          <a href="#home" className="text-2xl font-bold font-heading tracking-tight group">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary transition-all duration-500">
              Talha
            </span>
            <span className="text-primary group-hover:text-white transition-colors duration-300">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 z-10 ${activeSection === item.id ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-full border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] backdrop-blur-sm -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-20 flex items-center gap-2">
                  {item.label}
                </span>
              </a>
            ))}
          </div>

          {/* Actions - Resume Removed */}
          <div className="hidden md:flex items-center gap-3">
            {/* Space kept for potential future actions or removed entirely if valid */}
          </div>

        </div>
      </motion.nav>

      {/* Mobile Bottom Dock navigation */}
      < div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm" >
        <div className="flex items-center justify-between px-6 py-4 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-primary/10 ring-1 ring-white/5">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActiveSection(item.id)}
              className={`relative p-2 rounded-full transition-all duration-300 ${activeSection === item.id ? "text-white bg-white/10" : "text-slate-400 hover:text-white"}`}
            >
              <item.icon size={20} />
              {activeSection === item.id && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </a>
          ))}
        </div>
      </div >
    </>
  );
}
