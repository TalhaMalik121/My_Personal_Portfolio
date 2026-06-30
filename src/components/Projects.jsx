import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Send } from "lucide-react";
import { useState, useMemo } from "react";
import clsx from "clsx";

const categories = ["All", "Web", "AI/ML", "Programming"];

const projects = [
  {
    name: "Fitness RAG Chatbot",
    desc: "Conversational fitness assistant powered by retrieval-augmented generation.",
    tags: ["RAG", "AI", "Chatbot"],
    category: "AI/ML",
    github: "https://github.com/TalhaMalik121/Fitness-RAG-Chatbot.git",
    demo: null,
    image: "/projects/fitnesschatbot.png"
  },
  {
    name: "Mini Cpp Compiler",
    desc: "A lightweight compiler project for a subset of C++ language features.",
    tags: ["C++", "Compiler", "Programming"],
    category: "Programming",
    github: "https://github.com/TalhaMalik121/Mini-Cpp-Compiler.git",
    demo: null,
    image: "/projects/Mini-cppCompiler.png"
  },
  {
    name: "Sign Language Detection Saas App",
    desc: "Real-time sign language translation using computer vision.",
    tags: ["Python", "OpenCV", "TensorFlow"],
    category: "AI/ML",
    github: "https://github.com/TalhaMalik121/Sign-Language-Detector-Web.git",
    demo: null,
    image: "/projects/sign-language.png"
  },
  {
    name: "Campus Issue Tracker Web App",
    desc: "Platform for managing campus facility issues.",
    tags: ["React", "Node.js", "MongoDB"],
    category: "Web",
    github: {
      frontend: "https://github.com/TalhaMalik121/Campus-Issue-Tracker-Frontend/tree/main/campus-issue-tracker",
      backend: "https://github.com/TalhaMalik121/Campus-Issue-Tracker-Backend.git"
    },
    demo: null,
    image: "/projects/issuetracker.png"
  },
  {
    name: "Empathy-AI Chatbot",
    desc: "AI-powered mental health support platform.",
    tags: ["React", "TailwindCSS", "Firebase"],
    category: "AI/ML",
    github: "https://github.com/TalhaMalik121/Empathy-AI.git",
    demo: null,
    image: "/projects/emphaty.png"
  },
  {
    name: "TODO List App",
    desc: "Simple task manager with local storage.",
    tags: ["React", "CSS3", "Local Storage"],
    category: "Web",
    github: "https://github.com/SHAH2004-creator/pythoneeer-TO-DO",
    demo: "https://shah2004-creator.github.io/pythoneeer-TO-DO/",
    image: "/projects/todo.PNG"
  },


  {
    name: "Digit Recognizer",
    desc: "Handwritten digit classification using CNNs.",
    tags: ["Python", "TensorFlow", "OpenCV"],
    category: "AI/ML",
    github: "https://github.com/TalhaMalik121/Digit_Recognizer",
    image: "/projects/digitrecognizer.jpg"
  },
  {
    name: "Group Chat Application",
    desc: "Multi-threaded chat server using Java Sockets.",
    tags: ["Java", "Sockets", "Multi-threading"],
    category: "Programming",
    github: "https://github.com/TalhaMalik121/Group-Chat-Application",
    image: "/projects/chatapp.jpg"
  },
  {
    name: "Catering Management System",
    desc: "Desktop application for catering management.",
    tags: ["Java", "Swing", "OOP", "File Handling"],
    category: "Programming",
    github: "https://github.com/TalhaMalik121/Catering-Management-System.git",
    image: "/projects/catering.jpg"
  },
  {
    name: "Pharmacy Management System",
    desc: "Console-based pharmacy inventory system.",
    tags: ["C++", "File Handling"],
    category: "Programming",
    github: "https://github.com/TalhaMalik121/Pharmacy-Management-System",
    image: "/projects/pharmacy.png"
  },
];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = useMemo(() => {
    return filter === "All" ? projects : projects.filter(p => p.category === filter);
  }, [filter]);

  return (
    <section id="projects" className="py-5 md:py-10 scroll-mt-32 relative">
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
                className={clsx(
                  "group relative flex-col h-full bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2",
                  !showAll && i >= 3 ? "hidden md:flex" : "flex"
                )}
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

        {/* Mobile View More Button */}
        {!showAll && filteredProjects.length > 3 && (
          <div className="mt-8 text-center md:hidden">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium hover:bg-white/10 hover:text-white transition-all"
            >
              View More Projects
            </button>
          </div>
        )}



      </div>
    </section >
  );
}
