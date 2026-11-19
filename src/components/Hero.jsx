import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationFrame, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import Counter from "./ui/Counter";
import { useIsDesktop } from "../lib/useMediaQuery";
import Magnetic from "./Magnetic";
import DotGrid from "./ui/DotGrid";
import RollText from "./ui/RollText";
import { EASE, SOCIALS } from "../lib/utils";

const ROLES = ["RAG chatbots", "Agentic AI systems", "Computer vision models", "Deep learning pipelines", "Web & mobile apps"];

const SOCIAL_LINKS = [
  { label: "GitHub", href: SOCIALS.github },
  { label: "LinkedIn", href: SOCIALS.linkedin },
  { label: "Email", href: SOCIALS.email },
];

const line = {
  hidden: { y: "110%" },
  visible: (i = 0) => ({ y: "0%", transition: { duration: 1.4, ease: EASE, delay: 0.15 + i * 0.12 } }),
};
const fade = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE, delay: 0.7 + i * 0.1 } }),
};

const STATS = [
  { value: 3, suffix: "+", label: "Years coding" },
  { value: 10, suffix: "+", label: "Projects" },
  { value: 3.77, decimals: 2, label: "CGPA" },
];

/** Circular text badge that spins constantly and speeds up with scroll. */
function ScrollBadge() {
  const rotate = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 });
  useAnimationFrame((_, delta) => {
    const boost = Math.min(Math.abs(velocity.get()) / 60, 25);
    rotate.set(rotate.get() + (delta / 1000) * (14 + boost * 6));
  });
  const text = "SCROLL TO EXPLORE • OPEN TO WORK • ";

  return (
    <Magnetic strength={0.3}>
      <a href="#about" aria-label="Scroll to explore" className="group relative flex h-[104px] w-[104px] items-center justify-center">
        <motion.svg style={{ rotate }} viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <defs>
            <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <text className="fill-muted font-mono text-[8.2px] uppercase tracking-[0.22em] transition-colors duration-500 group-hover:fill-ink">
            <textPath href="#badge-circle">{text}</textPath>
          </text>
        </motion.svg>
        <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/15 text-ink transition-colors duration-500 group-hover:text-background">
          <span className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-ink transition-transform duration-500 ease-expo group-hover:scale-y-100" />
          <ArrowDown size={16} className="relative transition-transform duration-500 ease-expo group-hover:translate-y-0.5" />
        </span>
      </a>
    </Magnetic>
  );
}

/** Live local time in Pakistan, ticking every second. */
function LocalTime() {
  const fmt = () =>
    new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const t = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="tabular-nums">{time}</span>;
}

/** Splits a word into letters whose weight swells as the cursor approaches. */
function WeightLetters({ text }) {
  return text.split("").map((c, i) => (
    <span key={i} data-wght>
      {c}
    </span>
  ));
}

function useProximityWeight(ref, { min = 500, max = 680, radius = 300 } = {}) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const letters = Array.from(root.querySelectorAll("[data-wght]"));
    const state = letters.map(() => min);
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let running = false;

    const tick = () => {
      let moving = false;
      letters.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const d = Math.hypot(r.left + r.width / 2 - mouse.x, r.top + r.height / 2 - mouse.y);
        const t = Math.max(0, 1 - d / radius);
        const target = min + (max - min) * t * t * (3 - 2 * t);
        state[i] += (target - state[i]) * 0.12;
        if (Math.abs(target - state[i]) > 0.5) moving = true;
        el.style.fontVariationSettings = `"wght" ${state[i].toFixed(1)}`;
      });
      if (moving) raf = requestAnimationFrame(tick);
      else running = false;
    };
    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      kick();
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      kick();
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [ref, min, max, radius]);
}

export default function Hero({ start = true }) {
  const ref = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const nameY = useTransform(p, [0, 1], ["0%", "-28%"]);
  const line2X = useTransform(p, [0, 1], ["0%", "-8%"]);
  const line1X = useTransform(p, [0, 1], ["0%", "6%"]);
  const fadeOut = useTransform(p, [0, 0.7], [1, 0]);
  const imgScale = useTransform(p, [0, 1], [1, 1.2]);
  const portraitY = useTransform(p, [0, 1], ["0%", "-12%"]);

  const state = start ? "visible" : "hidden";
  const isDesktop = useIsDesktop();

  // Variable-font weight follows the cursor across the name
  const nameRef = useRef(null);
  useProximityWeight(nameRef);

  // Soft coloured light that trails the cursor
  const lx = useMotionValue(-1000);
  const ly = useMotionValue(-1000);
  const slx = useSpring(lx, { stiffness: 60, damping: 20 });
  const sly = useSpring(ly, { stiffness: 60, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(520px circle at ${slx}px ${sly}px, rgba(157,180,255,0.10), rgba(196,181,253,0.05) 40%, transparent 70%)`;
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    lx.set(e.clientX - r.left);
    ly.set(e.clientY - r.top);
  };

  return (
    <section id="home" ref={ref} onMouseMove={onMove} className="relative flex flex-col overflow-hidden pb-12 pt-20 md:min-h-[100svh] md:pb-8 md:pt-24">
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />
      <DotGrid className="absolute inset-0 h-full w-full" />
      {/* Soft light + vignette */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,255,255,0.07),transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#09090b_95%)]" />

      <motion.div initial="hidden" animate={state} className="container-x relative z-10 flex flex-1 flex-col">
        {/* Meta row */}
        <motion.div style={isDesktop ? { opacity: fadeOut } : undefined} className="grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6">
          <motion.span variants={fade} custom={0} className="label whitespace-nowrap md:col-span-4">
            <span className="md:hidden">Portfolio ©{new Date().getFullYear()}</span>
            <span className="hidden md:inline">AI Engineer &amp; Software Engineer</span>
          </motion.span>
          <motion.span variants={fade} custom={1} className="label hidden md:col-span-5 md:block">
            Based in Pakistan&nbsp;&nbsp;·&nbsp;&nbsp;<span className="text-ink"><LocalTime /></span> PKT
          </motion.span>
          <motion.span variants={fade} custom={2} className="label flex items-center justify-end gap-2.5 whitespace-nowrap text-ink md:col-span-3">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald-400" />
            Available for work
          </motion.span>
        </motion.div>

        {/* Name + portrait */}
        <div className="mt-auto grid items-end gap-7 pt-6 md:grid-cols-12 md:gap-6 md:pt-8">
          <motion.h1
            ref={nameRef}
            style={isDesktop ? { y: nameY } : undefined}
            className="relative z-10 order-2 text-[clamp(3.6rem,11vw,11rem)] font-medium leading-[0.88] tracking-tightest md:order-1 md:col-span-8"
          >
            <span className="sr-only">Muhammad Talha — AI Engineer and Software Engineer</span>
            <motion.span aria-hidden style={isDesktop ? { x: line1X } : undefined} className="block overflow-hidden pb-[0.06em]">
              <motion.span variants={line} custom={0} className="text-silver -ml-[0.07em] block">
                <WeightLetters text="Muhammad" />
              </motion.span>
            </motion.span>
            <motion.span aria-hidden style={isDesktop ? { x: line2X } : undefined} className="flex items-end gap-6 overflow-hidden pb-[0.06em] md:gap-10">
              <motion.span variants={line} custom={1} className="text-silver -ml-[0.05em] block">
                <WeightLetters text="Talha" />
              </motion.span>
              <motion.span
                variants={fade}
                custom={1}
                className="mb-[0.2em] hidden border-l border-line pl-5 font-mono text-[12px] font-normal uppercase leading-relaxed tracking-[0.18em] text-muted lg:block"
              >
                AI Engineering
                <br />
                <span className="text-ink">+ Software Engineering</span>
              </motion.span>
            </motion.span>
          </motion.h1>

          {/* Portrait — arch shape */}
          <motion.div style={isDesktop ? { y: portraitY } : undefined} className="order-1 flex justify-center md:order-2 md:col-span-4 md:justify-end">
            <div className="relative w-full max-w-[14rem] sm:max-w-[17rem] md:max-w-[19rem] lg:max-w-[21rem]" data-cursor="Hello">
              {/* offset outline echoing the arch */}
              <motion.div
                aria-hidden
                initial={{ opacity: 0, scale: 0.94 }}
                animate={start ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
                transition={{ duration: 1.6, ease: EASE, delay: 0.9 }}
                className="absolute -inset-3 rounded-b-[2.4rem] rounded-t-full border border-white/[0.07]"
              />
              <div className="group relative aspect-[4/5] overflow-hidden rounded-b-[2rem] rounded-t-full border border-white/10 bg-surface shadow-[0_40px_100px_-30px_rgba(157,180,255,0.25)]">
                <motion.div
                  initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                  animate={{ clipPath: start ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
                  transition={{ duration: 1.6, ease: EASE, delay: 0.45 }}
                  className="absolute inset-0"
                >
                  <motion.img
                    src="/Img1.jpg"
                    alt="Muhammad Talha — AI Engineer and Software Engineer"
                    fetchpriority="high"
                    style={{ scale: imgScale }}
                    className="h-full w-full object-cover object-[50%_18%] grayscale transition-[filter] duration-1000 ease-expo group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-transparent" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 1, ease: EASE, delay: 1.4 }}
                  className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 whitespace-nowrap p-4 md:p-5"
                >
                  <span className="label !text-[9px] !text-ink sm:!text-[11px]">AI Engineer</span>
                  <span className="label flex items-center gap-1.5 !text-[9px] sm:gap-2 sm:!text-[11px]">
                    <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald-400" />
                    Open to work
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom row */}
        <motion.div style={isDesktop ? { opacity: fadeOut } : undefined} className="mt-10 grid gap-10 border-t border-line pt-7 md:mt-12 md:grid-cols-12 md:gap-6">
          <motion.div variants={fade} custom={0} className="md:col-span-4">
            <p className="label mb-3">Currently building</p>
            <div className="relative h-8 overflow-hidden text-xl font-medium tracking-tight text-ink md:text-2xl">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={roleIndex}
                  initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.9, ease: EASE }}
                  className="absolute left-0 top-0 whitespace-nowrap"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            <dl className="mt-7 grid max-w-sm grid-cols-3 border-t border-line">
              {STATS.map((st) => (
                <div key={st.label} className="border-r border-line pr-3 pt-4 last:border-r-0 [&:not(:first-child)]:pl-4">
                  <dt className="sr-only">{st.label}</dt>
                  <dd className="text-2xl font-medium leading-none tracking-tight text-ink md:text-[1.7rem]">
                    {start ? <Counter to={st.value} suffix={st.suffix} decimals={st.decimals ?? 0} duration={2.4} /> : "0"}
                  </dd>
                  <p className="label mt-2 !text-[10px]">{st.label}</p>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div variants={fade} custom={1} className="md:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-muted">
              I build intelligent software — machine learning, deep learning, computer vision, RAG chatbots and agentic AI — and ship it
              through modern web and app development.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
              <Magnetic strength={0.2} className="block sm:inline-block">
                <a href="/Muhammad_Talha_Resume.pdf" download="Muhammad_Talha_Resume.pdf" className="roll-group btn-primary group w-full !px-4 sm:w-auto sm:!px-6">
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-700 ease-expo group-hover:scale-y-100" />
                  <span className="relative"><span className="sm:hidden">Resume</span><span className="hidden sm:inline"><RollText>Download resume</RollText></span></span>
                  <Download size={16} className="relative" />
                </a>
              </Magnetic>
              <Magnetic strength={0.2} className="block sm:inline-block">
                <a href="#contact" className="roll-group btn-ghost group w-full !px-4 sm:w-auto sm:!px-6">
                  <span className="relative"><RollText>Get in touch</RollText></span>
                  <ArrowUpRight size={16} className="relative transition-transform duration-700 ease-expo group-hover:rotate-45" />
                </a>
              </Magnetic>
            </div>
          </motion.div>

          <motion.div variants={fade} custom={2} className="flex items-end justify-between gap-8 md:col-span-3 md:justify-end">
            <ul className="flex gap-5 md:flex-col md:items-end md:gap-2.5">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="roll-group group flex items-center gap-1.5 text-sm text-muted transition-colors duration-500 hover:text-ink">
                    <RollText>{s.label}</RollText>
                    <ArrowUpRight size={13} className="transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="hidden md:block">
              <ScrollBadge />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
