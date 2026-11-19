import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "./Magnetic";
import RollText from "./ui/RollText";
import { useLenis } from "../lib/SmoothScroll";
import { EASE, SOCIALS } from "../lib/utils";

const links = [
  { label: "GitHub", href: SOCIALS.github },
  { label: "LinkedIn", href: SOCIALS.linkedin },
  { label: "Email", href: SOCIALS.email },
];

export default function Footer() {
  const lenis = useLenis();
  const ref = useRef(null);
  const wordRef = useRef(null);
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const light = useMotionTemplate`radial-gradient(360px circle at ${mx}px ${my}px, rgba(255,255,255,0.95), rgba(255,255,255,0.15) 45%, transparent 70%)`;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wordY = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);

  const onMove = (e) => {
    const r = wordRef.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 2 }) : window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <footer ref={ref} className="relative z-10 overflow-hidden border-t border-line pb-10 pt-20 md:pb-8 md:pt-32">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
            className="text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-tightest"
          >
            Have an idea?
            <br />
            <span className="text-dim">Let's talk.</span>
          </motion.h2>

          <Magnetic strength={0.35}>
            <a
              href="#contact"
              className="group relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-ink text-background active:scale-95 md:h-44 md:w-44"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-accent transition-transform duration-700 ease-expo group-hover:scale-y-100" />
              <span className="relative flex flex-col items-center gap-2 text-sm font-medium">
                <ArrowUpRight size={22} className="transition-transform duration-700 ease-expo group-hover:rotate-45" />
                Get in touch
              </span>
            </a>
          </Magnetic>
        </div>

        {/* Giant wordmark with cursor light */}
        <div
          ref={wordRef}
          onMouseMove={onMove}
          onMouseLeave={() => {
            mx.set(-1000);
            my.set(-1000);
          }}
          className="relative mt-20 select-none overflow-hidden md:mt-28"
        >
          <motion.div style={{ y: wordY }} className="relative">
            <p aria-hidden className="text-dim whitespace-nowrap text-center text-[15.5vw] font-semibold leading-[0.8] tracking-tightest xl:text-[13.5rem]">
              Talha<span className="text-faint">.</span>
            </p>
            <motion.p
              aria-hidden
              style={{ backgroundImage: light, WebkitBackgroundClip: "text", backgroundClip: "text" }}
              className="absolute inset-0 whitespace-nowrap text-center text-[15.5vw] font-semibold leading-[0.8] tracking-tightest text-transparent xl:text-[13.5rem]"
            >
              Talha.
            </motion.p>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-6 border-t border-line pt-6 text-xs text-muted md:grid-cols-3 md:items-center">
          <p className="flex items-center gap-3">
            <img src="/logo.svg" alt="" width="24" height="24" className="h-6 w-6" />
            © {new Date().getFullYear()} Muhammad Talha. All rights reserved.
          </p>
          <ul className="flex gap-6 md:justify-center">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="roll-group transition-colors duration-500 hover:text-ink">
                  <RollText>{l.label}</RollText>
                </a>
              </li>
            ))}
          </ul>
          <button onClick={toTop} className="roll-group text-left transition-colors duration-500 hover:text-ink md:text-right">
            <RollText>Back to top ↑</RollText>
          </button>
        </div>
      </div>
    </footer>
  );
}
