// import { motion } from "framer-motion";

// const mustard = "#F0A500";
// const purple = "#6D28D9";

// const projects = [
//   { 
//     name: "TODO List App", 
//     desc: "React + CSS3", 
//     github: "https://github.com/SHAH2004-creator/pythoneeer-TO-DO", 
//     demo: "https://shah2004-creator.github.io/pythoneeer-TO-DO/", 
//     image: "/projects/todo.PNG" 
//   },
//   { 
//     name: "Sentiment & Emotion Detector", 
//     desc: "Python + NLTK + Streamlit", 
//     github: "https://github.com/TalhaMalik121/Sentiment_Tagger", 
//     demo: "https://sentimenttagger-bywpchotxpgyb8bsh4xrvc.streamlit.app/", 
//     image: "/projects/sentimentTagger.PNG"
//   },
//   { 
//     name: "Personal Portfolio Website", 
//     desc: "React + Vite + TailwindCss.", 
//     github: "https://github.com/TalhaMalik121/Webain_Personal_Portfolio", 
//     demo: "https://webain-personal-portfolio.vercel.app/", 
//     image: "/projects/portfolio.png" 
//   },
//   { 
//     name: "Digit Recognizer(0 to 9)", 
//     desc: "Python + Numpy + Tensorflow + Tkinter + PIL", 
//     github: "https://github.com/TalhaMalik121/Digit_Recognizer", 
//     image: "/projects/digitrecognizer.jpg" // 🚫 no demo here
//   },
// ];

// export default function Projects() {
//   return (
//     <section id="projects" className="px-5 py-12 bg-black/20">
//       <motion.div
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: false, margin: "-80px" }}
//         className="max-w-6xl mx-auto"
//       >
//         <motion.h2
//           initial={{ opacity: 0, y: 24 }}
//           whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
//           className="text-center text-3xl font-extrabold text-yellow-400 border-b-2 border-yellow-400 pb-2"
//         >
//           Projects
//         </motion.h2>
//         <motion.p
//           initial={{ opacity: 0, y: 24 }}
//           whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }}
//           className="text-center text-gray-300 mt-2 mb-8 text-lg"
//         >
//           My Recent Work
//         </motion.p>

//         <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {projects.map((p, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } }}
//               whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(240,165,0,0.5)" }}
//               className="bg-black/60 rounded-2xl overflow-hidden cursor-pointer transition-transform"
//             >
//               <div className="overflow-hidden rounded-t-2xl">
//                 <img
//                   src={p.image}
//                   alt={p.name}
//                   className="w-full h-48 object-cover transition-transform hover:scale-105"
//                 />
//               </div>
//               <div className="p-6 flex flex-col items-center gap-4">
//                 <h3 className="text-xl font-bold text-yellow-400">{p.name}</h3>
//                 <p className="text-gray-300 text-center">{p.desc}</p>
//                 <div className="flex gap-4 mt-2">
//                   {/* GitHub button */}
//                   <a
//                     href={p.github}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="px-4 py-2 rounded-full text-white font-semibold transition-all hover:bg-yellow-400 hover:text-black"
//                     style={{ background: purple }}
//                   >
//                     GitHub
//                   </a>

//                   {/* Live Demo button only if demo exists */}
//                   {p.demo && (
//                     <a
//                       href={p.demo}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="px-4 py-2 rounded-full text-white font-semibold transition-all hover:bg-yellow-400 hover:text-black"
//                       style={{ background: mustard }}
//                     >
//                       Live Demo
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </section>
//   );
// }
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useState, useMemo } from "react";
import clsx from "clsx";

const categories = ["All", "Web", "AI/ML", "Programming"];

const projects = [
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
    name: "Hotel Management System",
    desc: "A console-based application for managing hotel bookings and records.",
    tags: ["C++", "OOP", "File Handling"],
    category: "Programming",
    github: "https://github.com/TalhaMalik121",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000"
  },
];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    return filter === "All" ? projects : projects.filter(p => p.category === filter);
  }, [filter]);

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto mb-8">
            A selection of my recent work, ranging from web applications to machine learning models.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={clsx(
                  "px-4 py-2 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300",
                  filter === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((p) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={p.name}
                className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-primary/50 transition-colors"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs font-medium text-white border border-white/10">
                      {p.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 relative z-20">
                  <h3 className="text-xl font-bold font-heading mb-2 group-hover:text-primary transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {p.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors"
                    >
                      <Github size={18} /> Code
                    </a>
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-white hover:text-accent transition-colors"
                      >
                        <ExternalLink size={18} /> Live Demo
                      </a>
                    )}
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
