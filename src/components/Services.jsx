import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BrainCircuit, Code2 } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import { useIsDesktop } from "../lib/useMediaQuery";

const services = [
  {
    title: "AI Engineering",
    description:
      "Designing, training and shipping intelligent systems — from research-grade models to production-ready AI products.",
    icon: BrainCircuit,
    features: [
      { name: "Machine Learning", details: "Predictive models, data pipelines" },
      { name: "Deep Learning", details: "Neural networks · TensorFlow, Keras" },
      { name: "Computer Vision", details: "Recognition, detection · OpenCV" },
      { name: "RAG Chatbots", details: "Assistants grounded in your data" },
      { name: "Agentic AI", details: "Tool-using agents that automate work" },
    ],
  },
  {
    title: "Software Engineering",
    description:
      "Building fast, reliable and beautifully crafted software that puts intelligent features in front of real users.",
    icon: Code2,
    features: [
      { name: "Web Development", details: "React, Next.js, Tailwind CSS" },
      { name: "Backend & APIs", details: "Node.js, Express, FastAPI, Django" },
      { name: "App Development", details: "Mobile & desktop applications" },
      { name: "Databases", details: "MySQL, MongoDB, PostgreSQL" },
    ],
  },
];

function ServiceCard({ service, index, total, progress }) {
  const range = [index / total, 1];
  const targetScale = 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(progress, range, [1, targetScale]);
  const dim = useTransform(progress, range, [0, (total - 1 - index) * 0.25]);
  const Icon = service.icon;
  const last = index === total - 1;
  const isDesktop = useIsDesktop();

  return (
    <div className="md:sticky" style={isDesktop ? { top: `calc(6.5rem + ${index * 22}px)` } : undefined}>
      <motion.article
        style={isDesktop ? { scale } : undefined}
        className={`relative origin-top overflow-hidden rounded-3xl border border-line bg-surface ${last ? "" : "mb-5 md:mb-[14vh]"}`}
      >
        {/* top sheen */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_100%_0%,rgba(255,255,255,0.05),transparent_70%)]" />
        {/* darken as it gets covered */}
        <motion.div aria-hidden style={isDesktop ? { opacity: dim } : { opacity: 0 }} className="pointer-events-none absolute inset-0 z-20 bg-black" />

        {/* Counter pinned to the card's top-right, aligned with the icon row */}
        <span className="label absolute right-7 top-[2.6rem] z-10 md:right-12 md:top-[4.1rem]">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        <div className="relative grid gap-10 p-7 md:grid-cols-12 md:gap-8 md:p-12">
          <div className="flex flex-col md:col-span-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15">
              <Icon size={20} strokeWidth={1.5} className="text-ink" />
            </span>
            <h3 className="mt-10 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1] tracking-tightest text-ink md:mt-auto md:pt-20">
              {service.title}
            </h3>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">{service.description}</p>
          </div>

          <ul className="flex flex-col justify-end md:col-span-5 md:col-start-8 md:pt-14">
            {service.features.map((f, i) => (
              <li key={f.name} className="group flex flex-col gap-1 border-t border-line py-4 last:border-b sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:py-5">
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-[11px] text-faint">0{i + 1}</span>
                  <span className="text-lg font-medium tracking-tight text-ink transition-transform duration-700 ease-expo group-hover:translate-x-1.5">
                    {f.name}
                  </span>
                </span>
                <span className="pl-8 text-sm text-muted sm:pl-0 sm:text-right">{f.details}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </div>
  );
}

export default function Services() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <section id="services" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          index="04"
          label="Services"
          lines={["AI & Software", "*Engineering.*"]}
          aside="Two disciplines, one goal: AI that actually ships. I take ideas from model to product — machine learning, deep learning, computer vision, RAG chatbots and agentic AI, delivered through modern web and app development."
        />

        <div ref={containerRef} className="relative">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} total={services.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
