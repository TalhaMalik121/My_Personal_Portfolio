import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import Magnetic from "./Magnetic";
import RollText from "./ui/RollText";
import { useLenis } from "../lib/SmoothScroll";
import { cn, EASE, EASE_IN_OUT, SOCIALS } from "../lib/utils";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Work" },
  { id: "contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: SOCIALS.github },
  { label: "LinkedIn", href: SOCIALS.linkedin },
  { label: "Email", href: SOCIALS.email },
];

/* ---------------- Mobile: top bar + full-screen menu ---------------- */
function MobileNav({ active, scrolled }) {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  // Freeze page scroll while the menu is open
  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
  }, [open, lenis]);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    // wait one tick so scrolling is unlocked before we move
    setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;
      if (lenis) lenis.scrollTo(target, { offset: id === "home" ? 0 : -64, duration: 1.4 });
      else target.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  return (
    <div className="md:hidden">
      {/* Top bar */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] border-b transition-[background-color,border-color] duration-500",
          scrolled || open ? "border-line bg-background/85 backdrop-blur-xl" : "border-transparent bg-transparent"
        )}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <a href="#home" onClick={(e) => go(e, "home")} className="flex items-center gap-2.5 text-[15px] font-medium tracking-tight text-ink">
            <img src="/logo.svg" alt="Muhammad Talha logo" width="32" height="32" className="h-8 w-8" />
            Muhammad Talha
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative flex h-10 items-center gap-2.5 rounded-full border border-white/15 pl-4 pr-3 text-xs font-medium text-ink transition-transform active:scale-95"
          >
            <span className="relative h-4 overflow-hidden">
              <motion.span animate={{ y: open ? "-50%" : "0%" }} transition={{ duration: 0.5, ease: EASE }} className="block">
                <span className="block h-4 leading-4">Menu</span>
                <span className="block h-4 leading-4">Close</span>
              </motion.span>
            </span>
            <span className="relative block h-3 w-4">
              <motion.span
                className="absolute left-0 h-px w-4 bg-ink"
                animate={open ? { top: "50%", rotate: 45 } : { top: "20%", rotate: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              />
              <motion.span
                className="absolute left-0 h-px w-4 bg-ink"
                animate={open ? { top: "50%", rotate: -45 } : { top: "80%", rotate: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.7, ease: EASE_IN_OUT, delay: 0.1 } }}
            transition={{ duration: 0.8, ease: EASE_IN_OUT }}
            className="fixed inset-0 z-[70] flex flex-col bg-[#0c0c0e] px-5 pb-8 pt-24"
          >
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(157,180,255,0.10),transparent_70%)]" />

            <nav className="relative flex-1">
              <ul>
                {navItems.map((item, i) => (
                  <li key={item.id} className="overflow-hidden border-b border-line">
                    <motion.a
                      href={`#${item.id}`}
                      onClick={(e) => go(e, item.id)}
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "100%", transition: { duration: 0.4, ease: EASE_IN_OUT } }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.05 }}
                      className="flex items-center justify-between py-3 active:opacity-60"
                    >
                      <span className="flex items-center gap-3">
                        <span className={cn("h-1.5 w-1.5 rounded-full transition-colors", active === item.id ? "bg-accent" : "bg-transparent")} />
                        <span className={cn("text-[2.15rem] font-medium leading-tight tracking-tightest", active === item.id ? "text-ink" : "text-ink/80")}>
                          {item.label}
                        </span>
                      </span>
                      <span className="font-mono text-[11px] text-faint">{String(i + 1).padStart(2, "0")}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
              className="relative mt-8 space-y-6"
            >
              <a href="/resume.pdf" download="Muhammad_Talha_Resume.pdf" className="btn-primary w-full">
                Download resume <Download size={16} />
              </a>
              <div className="flex items-center justify-between">
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-muted active:text-ink">
                    {s.label} <ArrowUpRight size={13} />
                  </a>
                ))}
              </div>
              <p className="label flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald-400" />
                Available for work
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
        className="fixed inset-x-0 top-0 z-[90] h-px origin-left bg-ink/70"
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

      <MobileNav active={active} scrolled={scrolled} />
    </>
  );
}
