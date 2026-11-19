import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award } from "lucide-react";
import { EASE } from "../lib/utils";

const HIGHLIGHTS = [
  <>
    Awarded the <span className="text-ink">Prime Minister Youth Laptop Scheme 2025</span> merit award for achieving 97% academic merit.
  </>,
  <>
    Specialized coursework in Data Structures, Algorithms, Web Engineering, Database Systems, Computer Networks, and
    Object-Oriented Programming.
  </>,
];

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
  const state = inView ? "visible" : "hidden";

  return (
    <section id="education" ref={ref} className="relative scroll-mt-20 overflow-hidden py-20 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c89b52]/40 to-transparent" />

      <motion.div initial="hidden" animate={state} className="container-x relative">
        <motion.p variants={rise} custom={-4} className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-[#d6b06a]">
          <img src="/logo.svg" alt="" className="h-5 w-5" />
          <span>02</span>
          <span className="h-px w-14 bg-[#d6b06a]/60" />
          <span>Academic foundation</span>
        </motion.p>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
          {/* Degree */}
          <h2 className="text-[clamp(2.75rem,6.2vw,6rem)] font-semibold leading-[0.95] tracking-tightest text-ink lg:col-span-7">
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

          {/* University + highlights */}
          <div className="lg:col-span-5 lg:pb-3">
            <motion.div variants={rise} custom={0} className="flex items-center gap-5">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-[0_15px_40px_-15px_rgba(214,176,106,0.6)]">
                <img src="/education/comsats-logo.png" alt="COMSATS University Islamabad logo" className="h-full w-full object-contain" />
              </span>
              <div>
                <h3 className="text-lg font-normal tracking-tight text-ink md:text-xl">COMSATS University Islamabad, Wah Campus</h3>
                <p className="mt-1.5 whitespace-nowrap font-mono text-[10px] tracking-[0.08em] text-muted sm:text-[11px] md:text-xs md:tracking-[0.12em]">
                  Feb 2023 – Jan 2027&nbsp;&nbsp;/&nbsp;&nbsp;8th Semester
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: inView ? 1 : 0 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.6 }}
              className="mt-8 h-px origin-left bg-line"
            />

            <ul className="mt-8 space-y-6">
              {HIGHLIGHTS.map((h, i) => (
                <motion.li key={i} variants={rise} custom={i + 1} className="group flex gap-4">
                  <Award size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-[#d6b06a] transition-transform duration-500 ease-expo group-hover:-rotate-12 group-hover:scale-110" />
                  <p className="text-base leading-relaxed text-muted md:text-[17px]">{h}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
