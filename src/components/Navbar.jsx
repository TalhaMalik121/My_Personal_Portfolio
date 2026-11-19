import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { User, Code, Briefcase, Home, Layers, Send, ArrowUpRight, GraduationCap } from "lucide-react";
import Magnetic from "./Magnetic";
import RollText from "./ui/RollText";
import { cn, EASE } from "../lib/utils";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Code },
  { id: "services", label: "Services", icon: Layers },
  { id: "projects", label: "Work", icon: Briefcase },
  { id: "contact", label: "Contact", icon: Send },
];

export default function Navbar({ show = true }) {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 30);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-ink/70"
        style={{ scaleX: progress }}
      />

      {/* Desktop */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={show ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 hidden md:block"
      >
        <div
          className={cn(
            "transition-[background-color,border-color,backdrop-filter] duration-700 ease-expo border-b",
            scrolled ? "border-line bg-background/70 backdrop-blur-xl" : "border-transparent bg-transparent"
          )}
        >
          <nav className="container-x flex h-[72px] items-center justify-between">
            <a href="#home" className="roll-group group flex items-center gap-3 text-[15px] font-medium tracking-tight text-ink">
              <img src="/logo.svg" alt="Muhammad Talha logo" width="32" height="32" className="h-8 w-8 transition-transform duration-700 ease-expo group-hover:rotate-[-8deg]" />
              <RollText>Muhammad Talha</RollText>
            </a>

            <ul className="flex items-center gap-7">
              {navItems.slice(1).map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      "roll-group relative flex items-center gap-2 text-[13px] transition-colors duration-500",
                      active === item.id ? "text-ink" : "text-muted hover:text-ink"
                    )}
                  >
                    <span className="relative flex h-1.5 w-1.5 items-center justify-center">
                      {active === item.id && (
                        <motion.span
                          layoutId="nav-dot"
                          className="absolute h-1.5 w-1.5 rounded-full bg-ink"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        />
                      )}
                    </span>
                    <RollText>{item.label}</RollText>
                  </a>
                </li>
              ))}
            </ul>

            <Magnetic strength={0.25}>
              <a href="#contact" className="roll-group btn-primary group !px-5 !py-2.5 text-[13px]">
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-700 ease-expo group-hover:scale-y-100" />
                <span className="relative">
                  <RollText>Let's talk</RollText>
                </span>
                <ArrowUpRight size={15} className="relative transition-transform duration-700 ease-expo group-hover:rotate-45" />
              </a>
            </Magnetic>
          </nav>
        </div>
      </motion.header>

      {/* Mobile dock */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={show ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.4 }}
        className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-sm md:hidden"
      >
        <ul className="flex items-center justify-between rounded-full border border-white/10 bg-[#141416]/85 p-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-label={item.label}
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-500",
                  active === item.id ? "text-background" : "text-muted"
                )}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="dock-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <item.icon size={18} strokeWidth={1.75} className="relative z-10" />
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>
    </>
  );
}
