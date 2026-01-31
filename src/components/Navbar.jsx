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
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div
          className={`relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 border ${scrolled || mobileOpen
            ? "bg-slate-900/80 backdrop-blur-lg border-white/10 shadow-2xl shadow-primary/5 w-full max-w-5xl"
            : "bg-surface/50 backdrop-blur-md border-white/5 w-full max-w-5xl hover:border-white/10"
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

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Magnetic>
              <button
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm hover:shadow-lg hover:shadow-primary/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Download size={16} /> <span className="hidden lg:inline">Resume</span>
              </button>
            </Magnetic>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 text-white bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-24 left-4 right-4 z-50 md:hidden glass p-6 rounded-3xl border border-white/10 shadow-2xl"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMobileOpen(false);
                    }}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all ${activeSection === item.id
                      ? "bg-primary/20 text-white border border-primary/20"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    <item.icon size={20} className={activeSection === item.id ? "text-primary" : ""} />
                    <span className="font-medium text-lg">{item.label}</span>
                  </motion.a>
                ))}
                <div className="h-px bg-white/10 my-2" />
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  <Download size={20} /> Resume
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
