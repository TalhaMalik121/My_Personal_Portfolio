import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useState, useMemo } from "react";
import clsx from "clsx";

const categories = ["All", "Web", "AI/ML", "Programming"];

const projects = [
  {
    name: "Sign Language Detection",
    desc: "Real-time sign language recognition system using computer vision.",
    tags: ["Python", "OpenCV", "TensorFlow"],
    category: "AI/ML",
    github: "https://github.com/TalhaMalik121",
    demo: null,
    image: "/projects/sign-language.png"
  },
  {
    name: "Issue Tracker",
    desc: "A comprehensive bug tracking and project management tool.",
    tags: ["React", "Node.js", "MongoDB"],
    category: "Web",
    github: "https://github.com/TalhaMalik121",
    demo: null,
    image: "/projects/issuetracker.png"
  },
  {
    name: "Empathy",
    desc: "A platform focused on mental health awareness and community support.",
    tags: ["React", "TailwindCSS", "Firebase"],
    category: "Web",
    github: "https://github.com/TalhaMalik121",
    demo: null,
    image: "/projects/emphaty.png"
  },
  {
    name: "TODO List App",
    desc: "A sleek task management tool built with React and modern CSS.",
    tags: ["React", "CSS3", "Local Storage"],
    category: "Web",
    github: "https://github.com/SHAH2004-creator/pythoneeer-TO-DO",
    demo: "https://shah2004-creator.github.io/pythoneeer-TO-DO/",
    image: "/projects/todo.PNG"
  },
  {
    name: "Sentiment Analysis",
    desc: "AI-powered emotion detection using NLTK and Streamlit.",
    tags: ["Python", "NLTK", "Streamlit", "ML"],
    category: "AI/ML",
    github: "https://github.com/TalhaMalik121/Sentiment_Tagger",
    demo: "https://sentimenttagger-bywpchotxpgyb8bsh4xrvc.streamlit.app/",
    image: "/projects/sentimentTagger.PNG"
  },
  {
    name: "Personal Portfolio",
    desc: "My premium personal website to showcase my work and skills.",
    tags: ["React", "Vite", "TailwindCSS", "Framer Motion"],
    category: "Web",
    github: "https://github.com/TalhaMalik121/Webain_Personal_Portfolio",
    demo: "https://webain-personal-portfolio.vercel.app/",
    image: "/projects/portfolio.png"
  },
  {
    name: "Digit Recognizer",
    desc: "Handwritten digit recognition utilizing TensorFlow and CNNs.",
    tags: ["Python", "TensorFlow", "OpenCV"],
    category: "AI/ML",
    github: "https://github.com/TalhaMalik121/Digit_Recognizer",
    image: "/projects/digitrecognizer.jpg"
  },
  {
    name: "Catering Management System",
    desc: "A management system for catering services to handle orders and inventory.",
    tags: ["C++", "OOP", "File Handling"],
    category: "Programming",
    github: "https://github.com/TalhaMalik121",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1000"
  },
  {
    name: "Pharmacy Management System",
    desc: "A console-based application for managing pharmacy stock and sales.",
    tags: ["C++", "OOP", "File Handling"],
    category: "Programming",
    github: "https://github.com/TalhaMalik121",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=1000"
  },
];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    return filter === "All" ? projects : projects.filter(p => p.category === filter);
  }, [filter]);

  return (
    <section id="projects" className="py-10 scroll-mt-32 relative">
      <div className="container mx-auto px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mb-8">
            A selection of my recent work, ranging from web applications to machine learning models.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={clsx(
                  "px-4 py-2 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border",
                  filter === cat
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
                    : "bg-surface text-slate-400 border-white/10 hover:border-primary hover:text-primary hover:bg-white/5"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((p, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                key={p.name}
                className="group relative flex flex-col h-full bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-52 overflow-hidden bg-slate-900/50 border-b border-white/5 group-hover:border-primary/20 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-xs font-bold text-white border border-white/10 shadow-lg group-hover:border-primary/30 transition-colors">
                      {p.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold font-heading mb-2 text-white group-hover:text-primary transition-colors duration-300">
                      {p.name}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 group-hover:text-slate-300 transition-colors">
                      {p.desc}
                    </p>
                  </div>

                  <div className="mt-auto">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/5 rounded-md border border-white/5 group-hover:border-white/10 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/5">
                      {typeof p.github === "string" ? (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 text-white text-xs font-bold hover:bg-white/10 hover:scale-105 hover:text-primary transition-all duration-300 group/btn"
                        >
                          <Github size={16} className="group-hover/btn:rotate-12 transition-transform" /> Code
                        </a>
                      ) : (
                        <>
                          <a
                            href={p.github.frontend}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 text-white text-xs font-bold hover:bg-white/10 hover:scale-105 hover:text-primary transition-all duration-300 group/btn"
                          >
                            <Github size={16} className="group-hover/btn:rotate-12 transition-transform" /> Frontend
                          </a>
                          <a
                            href={p.github.backend}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 text-white text-xs font-bold hover:bg-white/10 hover:scale-105 hover:text-primary transition-all duration-300 group/btn"
                          >
                            <Github size={16} className="group-hover/btn:rotate-12 transition-transform" /> Backend
                          </a>
                        </>
                      )}

                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold hover:shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all duration-300 group/btn"
                        >
                          <ExternalLink size={16} className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
