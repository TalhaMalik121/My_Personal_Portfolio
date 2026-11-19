import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import Counter from "./ui/Counter";
import { EASE } from "../lib/utils";

const INTRO =
  "I am a Computer Science Undergraduate merging the precision of software engineering with the creativity of modern web design and the power of Artificial Intelligence.";

function ScrollWord({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

/** Words brighten one by one as the paragraph travels through the viewport. */
function ScrollRevealText({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="relative text-[clamp(1.6rem,3vw,2.75rem)] font-medium leading-[1.18] tracking-[-0.035em] text-ink">
      {words.map((w, i) => (
        <ScrollWord key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </ScrollWord>
      ))}
    </p>
  );
}

function Portrait() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  // Observe the unclipped wrapper: a fully clipped element never reports as intersecting.
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
        transition={{ duration: 1.6, ease: EASE }}
        className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface"
        data-cursor="Talha"
      >
        <motion.img
          src="/Img4-1400.jpg"
          alt="Portrait of Muhammad Talha, AI Engineer and Software Engineer"
          style={{ y, scale: 1.25 }}
          className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter] duration-[1.4s] ease-expo group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
          <span className="label text-ink">Muhammad Talha</span>
          <span className="label">CS Undergraduate</span>
        </div>
      </motion.div>
    </div>
  );
}

const stats = [
  { label: "Years of experience", value: 3, suffix: "+" },
  { label: "Projects built", value: 10, suffix: "+" },
  { label: "Core focus", text: "AI & Web" },
];

const rise = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 1.2, delay: d, ease: EASE },
});

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading index="01" label="About" lines={["Engineering precision,", "*designed with intent.*"]} />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Portrait />
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <span className="label mb-8 block">(Who I am)</span>
            <ScrollRevealText text={INTRO} />

            <motion.p {...rise(0)} className="mt-10 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              From training <span className="text-ink">Convolutional Neural Networks</span> for gesture recognition to architecting{" "}
              <span className="text-ink">Real-time Java Socket Systems</span> and building scalable{" "}
              <span className="text-ink">Full-Stack Web Apps</span>, I thrive on solving complex problems with clean, efficient code.
            </motion.p>

            <div className="mt-16 grid grid-cols-3 border-t border-line">
              {stats.map((s, i) => (
                <motion.div key={s.label} {...rise(i * 0.1)} className="border-r border-line py-7 pr-4 last:border-r-0 [&:not(:first-child)]:pl-4 md:[&:not(:first-child)]:pl-6">
                  <p className="whitespace-nowrap text-[clamp(1.5rem,3.4vw,3rem)] font-medium leading-none tracking-tightest text-ink">
                    {s.text ?? <Counter to={s.value} suffix={s.suffix} />}
                  </p>
                  <p className="label mt-3 !text-[10px] md:!text-[11px]">{s.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.figure {...rise(0)} className="mt-16 border-l border-white/20 pl-6 md:pl-8">
              <span className="label mb-4 block">(Goal)</span>
              <blockquote className="text-xl font-medium leading-snug tracking-tight text-ink md:text-2xl">
                My goal is simple: to build clear, intelligent, and user-centric digital experiences that make an impact.
              </blockquote>
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  );
}
