import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValue, useSpring, useTransform, useVelocity } from "framer-motion";
import { ArrowUpRight, LayoutGrid, Rows3 } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import RollText from "./ui/RollText";
import { cn, EASE } from "../lib/utils";

const categories = ["All", "Web", "AI/ML", "Programming"];

const projects = [
  {
    name: "Fitness RAG Chatbot",
    desc: "Conversational fitness assistant powered by retrieval-augmented generation.",
    tags: ["RAG", "AI", "Chatbot"],
    category: "AI/ML",
    github: "https://github.com/TalhaMalik121/Fitness-RAG-Chatbot.git",
    demo: null,
    image: "/projects/fitnesschatbot.png",
  },
  {
    name: "Mini Cpp Compiler",
    desc: "A lightweight compiler project for a subset of C++ language features.",
    tags: ["C++", "Compiler", "Programming"],
    category: "Programming",
    github: "https://github.com/TalhaMalik121/Mini-Cpp-Compiler.git",
    demo: null,
    image: "/projects/Mini-cppCompiler.png",
  },
  {
    name: "Sign Language Detection Saas App",
    desc: "Real-time sign language translation using computer vision.",
    tags: ["Python", "OpenCV", "TensorFlow"],
    category: "AI/ML",
    github: "https://github.com/TalhaMalik121/Sign-Language-Detector-Web.git",
    demo: null,
    image: "/projects/sign-language.png",
  },
  {
    name: "Campus Issue Tracker Web App",
    desc: "Platform for managing campus facility issues.",
    tags: ["React", "Node.js", "MongoDB"],
    category: "Web",
    github: {
      frontend: "https://github.com/TalhaMalik121/Campus-Issue-Tracker-Frontend/tree/main/campus-issue-tracker",
      backend: "https://github.com/TalhaMalik121/Campus-Issue-Tracker-Backend.git",
    },
    demo: null,
    image: "/projects/issuetracker.png",
  },
  {
    name: "Empathy-AI Chatbot",
    desc: "AI-powered mental health support platform.",
    tags: ["React", "TailwindCSS", "Firebase"],
    category: "AI/ML",
    github: "https://github.com/TalhaMalik121/Empathy-AI.git",
    demo: null,
    image: "/projects/emphaty.png",
  },
  {
    name: "TODO List App",
    desc: "Simple task manager with local storage.",
    tags: ["React", "CSS3", "Local Storage"],
    category: "Web",
    github: "https://github.com/SHAH2004-creator/pythoneeer-TO-DO",
    demo: "https://shah2004-creator.github.io/pythoneeer-TO-DO/",
    image: "/projects/todo.PNG",
  },
  {
    name: "Digit Recognizer",
    desc: "Handwritten digit classification using CNNs.",
    tags: ["Python", "TensorFlow", "OpenCV"],
    category: "AI/ML",
    github: "https://github.com/TalhaMalik121/Digit_Recognizer",
    image: "/projects/digitrecognizer.jpg",
  },
  {
    name: "Group Chat Application",
    desc: "Multi-threaded chat server using Java Sockets.",
    tags: ["Java", "Sockets", "Multi-threading"],
    category: "Programming",
    github: "https://github.com/TalhaMalik121/Group-Chat-Application",
    image: "/projects/chatapp.jpg",
  },
  {
    name: "Catering Management System",
    desc: "Desktop application for catering management.",
    tags: ["Java", "Swing", "OOP", "File Handling"],
    category: "Programming",
    github: "https://github.com/TalhaMalik121/Catering-Management-System.git",
    image: "/projects/catering.jpg",
  },
  {
    name: "Pharmacy Management System",
    desc: "Console-based pharmacy inventory system.",
    tags: ["C++", "File Handling"],
    category: "Programming",
    github: "https://github.com/TalhaMalik121/Pharmacy-Management-System",
    image: "/projects/pharmacy.png",
  },
];

const CATEGORY_COLOR = {
  "AI/ML": "#c4b5fd",
  Web: "#7dd3fc",
  Programming: "#fcd34d",
};

const linksFor = (p) => {
  const out = [];
  if (typeof p.github === "string") out.push({ label: "Code", href: p.github });
  else out.push({ label: "Frontend", href: p.github.frontend }, { label: "Backend", href: p.github.backend });
  if (p.demo) out.push({ label: "Live", href: p.demo });
  return out;
};
const mainLink = (p) => p.demo || (typeof p.github === "string" ? p.github : p.github.frontend);

function CategoryTag({ category, className = "" }) {
  return (
    <span className={cn("label inline-flex items-center gap-2 !text-ink", className)}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: CATEGORY_COLOR[category], boxShadow: `0 0 10px ${CATEGORY_COLOR[category]}` }} />
      {category}
    </span>
  );
}

function LinkPill({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="roll-group group/pill relative z-20 inline-flex items-center gap-1 overflow-hidden rounded-full border border-white/15 px-3.5 py-1.5 text-xs text-ink transition-colors duration-500 ease-expo hover:border-ink hover:text-background"
    >
      <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-expo group-hover/pill:scale-y-100" />
      <span className="relative"><RollText>{label}</RollText></span>
      <ArrowUpRight size={12} className="relative" />
    </a>
  );
}

/* ---------------- List view: index rows + floating preview ---------------- */
function ProjectIndex({ items }) {
  const [active, setActive] = useState(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 160, damping: 22, mass: 0.6 });
  const y = useSpring(my, { stiffness: 160, damping: 22, mass: 0.6 });
  const vx = useVelocity(x);
  const rotate = useTransform(vx, [-1800, 0, 1800], [-8, 0, 8], { clamp: true });

  const slide = useSpring(0, { stiffness: 140, damping: 24 });
  const slideY = useTransform(slide, (v) => `${-v * 100}%`);

  const enter = (i) => {
    setActive(i);
    slide.set(i);
  };
  const current = active !== null ? items[active] : null;

  return (
    <div
      className="relative"
      onMouseMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
      onMouseLeave={() => setActive(null)}
    >
      <ul className="group/list border-b border-line">
        {items.map((p, i) => (
          <motion.li
            key={p.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: EASE, delay: (i % 4) * 0.05 }}
            onMouseEnter={() => enter(i)}
            className="group/row relative border-t border-line first:border-t-0 transition-opacity duration-500 ease-expo group-hover/list:opacity-30 hover:!opacity-100"
          >
            <a href={mainLink(p)} target="_blank" rel="noopener noreferrer" aria-label={p.name} data-cursor="View" className="absolute inset-0 z-10" />
            <div className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-r from-white/[0.035] to-transparent transition-transform duration-700 ease-expo group-hover/row:scale-y-100" />
            {/* category-coloured accent line */}
            <span
              className="pointer-events-none absolute left-0 top-0 h-full w-px origin-top scale-y-0 transition-transform duration-700 ease-expo group-hover/row:scale-y-100"
              style={{ background: CATEGORY_COLOR[p.category] }}
            />

            <div className="relative grid grid-cols-12 items-center gap-6 py-8">
              <span className="label col-span-1 pl-4">{String(i + 1).padStart(2, "0")}</span>
              <div className="col-span-5 transition-transform duration-700 ease-expo group-hover/row:translate-x-3">
                <h3 className="text-[clamp(1.5rem,2.35vw,2.35rem)] font-medium leading-[1.05] tracking-tightest text-ink">{p.name}</h3>
                <p className="mt-2 max-w-lg text-sm text-muted">{p.desc}</p>
              </div>
              <div className="col-span-3">
                <CategoryTag category={p.category} />
                <p className="mt-2 font-mono text-[11px] text-faint">{p.tags.join(" · ")}</p>
              </div>
              <div className="col-span-3 flex flex-wrap justify-end gap-2">
                {linksFor(p).map((l) => (
                  <LinkPill key={l.label} {...l} />
                ))}
              </div>
            </div>
          </motion.li>
        ))}
      </ul>

      {/* Floating preview */}
      <motion.div
        aria-hidden
        style={{ x, y, rotate, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: current ? 1 : 0.4, opacity: current ? 1 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="pointer-events-none fixed left-0 top-0 z-40 w-[400px] overflow-hidden rounded-2xl border border-white/10 bg-elevated shadow-[0_40px_90px_-20px_rgba(0,0,0,0.95)]"
      >
        <div className="relative h-[240px] overflow-hidden">
          <motion.div style={{ y: slideY }} className="h-full w-full">
            {items.map((p) => (
              <div key={p.name} className="flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_70%)] p-3">
                <img src={p.image} alt="" className="max-h-full max-w-full rounded-md object-contain" />
              </div>
            ))}
          </motion.div>
                  </div>
        <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
          <span className="truncate text-sm text-ink">{current?.name}</span>
          {current && <CategoryTag category={current.category} className="shrink-0 !text-[10px]" />}
        </div>
      </motion.div>
    </div>
  );
}

/* ---------------- Grid view: image cards ---------------- */
function ProjectCard({ p, index }) {
  const ref = useRef(null);
  // Observe the unclipped wrapper; a fully clipped element never reports as visible.
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: EASE, delay: (index % 2) * 0.08 }}
      className="group"
    >
      <a
        href={mainLink(p)}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="View"
        className="relative block overflow-hidden rounded-2xl border border-line bg-surface p-2"
      >
        <motion.div
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
          transition={{ duration: 1.4, ease: EASE }}
          className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl bg-[#0d0d0f] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_70%)] p-4"
        >
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="max-h-full max-w-full rounded-md object-contain shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
          <span className="absolute bottom-4 left-4 inline-flex translate-y-3 items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-xs font-medium text-background opacity-0 transition-all duration-700 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
            View project <ArrowUpRight size={12} />
          </span>
          <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 font-mono text-[10px] text-ink backdrop-blur-md">
            {String(index + 1).padStart(2, "0")}
          </span>
        </motion.div>
      </a>

      <div className="mt-5 flex items-center justify-between gap-4">
        <CategoryTag category={p.category} />
        <p className="truncate font-mono text-[11px] text-faint">{p.tags.join(" · ")}</p>
      </div>
      <h3 className="mt-3 text-2xl font-medium tracking-tight text-ink md:text-[1.75rem]">{p.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {linksFor(p).map((l) => (
          <LinkPill key={l.label} {...l} />
        ))}
      </div>
    </motion.article>
  );
}

function ProjectGrid({ items }) {
  const [showAll, setShowAll] = useState(false);
  return (
    <>
      <div className="grid gap-x-6 gap-y-14 md:grid-cols-2">
        {items.map((p, i) => (
          <div key={p.name} className={cn(!showAll && i >= 4 && "hidden md:block")}>
            <ProjectCard p={p} index={i} />
          </div>
        ))}
      </div>
      {!showAll && items.length > 4 && (
        <button onClick={() => setShowAll(true)} className="btn-ghost mt-14 w-full md:hidden">
          View all {items.length} projects
        </button>
      )}
    </>
  );
}

const VIEWS = [
  { id: "list", label: "List", icon: Rows3 },
  { id: "grid", label: "Grid", icon: LayoutGrid },
];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState("list");
  const filtered = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.category === filter)), [filter]);

  return (
    <section id="projects" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          index="05"
          label="Selected work"
          lines={["Featured", "*projects.*"]}
          aside="A selection of my recent work, ranging from web applications to machine learning models."
        />

        {/* Toolbar */}
        <div className="flex items-end justify-between gap-6 border-b border-line">
          <div className="-mb-px flex gap-6 overflow-x-auto md:gap-10">
            {categories.map((cat) => {
              const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "roll-group relative flex shrink-0 items-center gap-2 pb-4 text-sm transition-colors duration-500 md:text-base",
                    filter === cat ? "text-ink" : "text-muted hover:text-ink"
                  )}
                >
                  {cat !== "All" && <span className="h-1.5 w-1.5 rounded-full" style={{ background: CATEGORY_COLOR[cat] }} />}
                  <RollText>{cat}</RollText>
                  <sup className="font-mono text-[10px] text-faint">{String(count).padStart(2, "0")}</sup>
                  {filter === cat && (
                    <motion.span layoutId="filter-line" className="absolute inset-x-0 bottom-0 h-px bg-ink" transition={{ type: "spring", stiffness: 380, damping: 34 }} />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mb-3 hidden shrink-0 items-center gap-1 rounded-full border border-line p-1 md:flex">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                aria-label={`${v.label} view`}
                className={cn(
                  "relative flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs transition-colors duration-500",
                  view === v.id ? "text-background" : "text-muted hover:text-ink"
                )}
              >
                {view === v.id && (
                  <motion.span layoutId="view-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                )}
                <v.icon size={14} className="relative" />
                <span className="relative">{v.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${view}-${filter}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: EASE }}
            className={view === "grid" ? "pt-12" : "pt-12 md:pt-0"}
          >
            {view === "list" ? (
              <>
                <div className="hidden md:block">
                  <ProjectIndex items={filtered} />
                </div>
                <div className="md:hidden">
                  <ProjectGrid items={filtered} />
                </div>
              </>
            ) : (
              <ProjectGrid items={filtered} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
