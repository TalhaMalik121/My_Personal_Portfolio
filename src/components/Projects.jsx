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
import { motion } from "framer-motion";

const mustard = "#F0A500";
const purple = "#6D28D9";

const projects = [
  { 
    name: "TODO List App", 
    desc: "React + CSS3", 
    github: "https://github.com/SHAH2004-creator/pythoneeer-TO-DO", 
    demo: "https://shah2004-creator.github.io/pythoneeer-TO-DO/", 
    image: "/projects/todo.PNG" 
  },
  { 
    name: "Sentiment & Emotion Detector", 
    desc: "Python + NLTK + Streamlit", 
    github: "https://github.com/TalhaMalik121/Sentiment_Tagger", 
    demo: "https://sentimenttagger-bywpchotxpgyb8bsh4xrvc.streamlit.app/", 
    image: "/projects/sentimentTagger.PNG"
  },
  { 
    name: "Personal Portfolio Website", 
    desc: "React + Vite + TailwindCss.", 
    github: "https://github.com/TalhaMalik121/Webain_Personal_Portfolio", 
    demo: "https://webain-personal-portfolio.vercel.app/", 
    image: "/projects/portfolio.png" 
  },
  { 
    name: "Digit Recognizer(0 to 9)", 
    desc: "Python + Numpy + Tensorflow + Tkinter + PIL", 
    github: "https://github.com/TalhaMalik121/Digit_Recognizer", 
    image: "/projects/digitrecognizer.jpg" // 🚫 no demo here
  },
];

export default function Projects() {
  return (
    <section id="projects" className="px-5 py-12 bg-deepNavy">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-80px" }}
        className="max-w-6xl mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
          className="text-center text-3xl font-extrabold text-yellow-400 border-b-2 border-yellow-400 pb-2"
        >
          Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }}
          className="text-center text-gray-300 mt-2 mb-8 text-lg"
        >
          My Recent Work
        </motion.p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } }}
              whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(240,165,0,0.5)" }}
              whileTap={{ scale: 1.05, boxShadow: "0 15px 30px rgba(240,165,0,0.5)" }} // ✅ added for mobile
              className="bg-black/60 rounded-2xl overflow-hidden cursor-pointer transition-transform"
            >
              <div className="overflow-hidden rounded-t-2xl">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-48 object-cover transition-transform hover:scale-105 active:scale-105" // ✅ active:scale-105 for mobile
                />
              </div>
              <div className="p-6 flex flex-col items-center gap-4">
                <h3 className="text-xl font-bold text-yellow-400">{p.name}</h3>
                <p className="text-gray-300 text-center">{p.desc}</p>
                <div className="flex gap-4 mt-2">
                  {/* GitHub button */}
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full text-white font-semibold transition-all hover:bg-yellow-400 hover:text-black active:scale-105"
                    style={{ background: purple }}
                  >
                    GitHub
                  </a>

                  {/* Live Demo button only if demo exists */}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full text-white font-semibold transition-all hover:bg-yellow-400 hover:text-black active:scale-105"
                      style={{ background: mustard }}
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
