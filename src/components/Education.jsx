import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Award } from "lucide-react";
import Counter from "./ui/Counter";
import { EASE } from "../lib/utils";

const GPA = 3.77;
const GPA_MAX = 4;

const HIGHLIGHTS = [
  <>Maintained top-tier academic excellence with a <span className="text-ink">{GPA.toFixed(2)} CGPA</span>.</>,
  <>
    Awarded the <span className="text-ink">Prime Minister Youth Laptop Scheme 2025</span> merit award for achieving 97% academic merit.
  </>,
  <>
    Specialized coursework in Data Structures, Algorithms, Web Engineering, Database Systems, Computer Networks, and
    Object-Oriented Programming.
  </>,
];

/** Large gold CGPA ring; the arc draws in and a marker travels to its end. */
function GpaRing({ inView }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  const ratio = GPA / GPA_MAX;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      {/* warm inner glow */}
      <div aria-hidden className="absolute inset-[12%] rounded-full bg-[radial-gradient(closest-side,rgba(232,201,138,0.14),transparent)]" />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90 overflow-visible">
        <defs>
          <linearGradient id="gold-arc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0d49a" />
            <stop offset="45%" stopColor="#c89b52" />
            <stop offset="100%" stopColor="#7d6a50" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.2" />
        <motion.circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="url(#gold-arc)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: inView ? c * (1 - ratio) : c }}
          transition={{ duration: 2.4, ease: EASE, delay: 0.2 }}
          style={{ filter: "drop-shadow(0 0 6px rgba(232,201,138,0.35))" }}
        />
      </svg>

      {/* marker riding to the end of the arc */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: inView ? ratio * 360 : 0, opacity: inView ? 1 : 0 }}
        transition={{ duration: 2.4, ease: EASE, delay: 0.2 }}
      >
        <span className="absolute left-1/2 top-[4%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f0d49a] bg-background shadow-[0_0_14px_rgba(240,212,154,0.7)]" />
      </motion.div>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[clamp(4.5rem,9vw,7.5rem)] font-semibold leading-none tracking-tightest text-ink">
          {inView ? <Counter to={GPA} decimals={2} duration={2.4} /> : "0.00"}
        </span>
        <span className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-muted">
          CGPA&nbsp;&nbsp;/&nbsp;&nbsp;{GPA_MAX.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

const line = {
  hidden: { y: "105%" },
  visible: (i) => ({ y: "0%", transition: { duration: 1.2, ease: EASE, delay: 0.1 + i * 0.1 } }),
};
const rise = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 1, ease: EASE, delay: 0.5 + i * 0.1 } }),
};

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const markY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const state = inView ? "visible" : "hidden";

  return (
    <section id="education" ref={ref} className="relative scroll-mt-20 overflow-hidden py-24 md:py-32">
      {/* giant faint monogram watermark */}
      <motion.img
        aria-hidden
        src="/logo-outline.svg"
        alt=""
        style={{ y: markY }}
        className="pointer-events-none absolute -left-[6%] top-[8%] w-[62vw] max-w-[820px] opacity-[0.03]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c89b52]/40 to-transparent" />

      <div className="container-x relative">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Ring */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <GpaRing inView={inView} />
          </div>

          {/* Copy */}
          <motion.div initial="hidden" animate={state} className="order-1 lg:order-2 lg:col-span-7">
            <motion.p variants={rise} custom={-4} className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-[#d6b06a]">
              <img src="/logo.svg" alt="" className="h-5 w-5" />
              <span>02</span>
              <span className="h-px w-14 bg-[#d6b06a]/60" />
              <span>Academic foundation</span>
            </motion.p>

            <h2 className="mt-8 text-[clamp(2.75rem,6.2vw,6rem)] font-semibold leading-[0.95] tracking-tightest text-ink">
              <span className="block overflow-hidden pb-[0.04em]">
                <motion.span variants={line} custom={0} className="block">Bachelor of</motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.04em]">
                <motion.span variants={line} custom={1} className="block">Science in</motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.12em]">
                <motion.span
                  variants={line}
                  custom={2}
                  className="block bg-gradient-to-r from-[#f0d49a] via-[#d6a85a] to-[#a9803f] bg-clip-text pr-[0.1em] font-serif font-normal italic tracking-[-0.02em] text-transparent"
                >
                  Computer Science
                </motion.span>
              </span>
            </h2>

            {/* University */}
            <motion.div variants={rise} custom={0} className="mt-8 flex items-center gap-5">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-[0_15px_40px_-15px_rgba(214,176,106,0.6)]">
                <img src="/education/comsats-logo.png" alt="COMSATS University Islamabad logo" className="h-full w-full object-contain" />
              </span>
              <div>
                <h3 className="text-lg font-normal tracking-tight text-ink md:text-2xl">COMSATS University Islamabad, Wah Campus</h3>
                <p className="mt-1.5 whitespace-nowrap font-mono text-[10px] tracking-[0.08em] text-muted sm:text-[11px] md:text-xs md:tracking-[0.12em]">
                  Feb 2023 – Jan 2027&nbsp;&nbsp;/&nbsp;&nbsp;8th Semester
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: inView ? 1 : 0 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.6 }}
              className="mt-9 h-px origin-left bg-line"
            />

            <ul className="mt-9 space-y-6">
              {HIGHLIGHTS.map((h, i) => (
                <motion.li key={i} variants={rise} custom={i + 1} className="group flex gap-4">
                  <Award size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-[#d6b06a] transition-transform duration-500 ease-expo group-hover:-rotate-12 group-hover:scale-110" />
                  <p className="text-base leading-relaxed text-muted md:text-lg">{h}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
