import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Magnetic from "./Magnetic";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  }),
};

export default function Hero() {
  const words = ["Building", "digital", "experiences", "that", "matter."];

  return (
    <section id="home" className="min-h-[80vh] flex items-center justify-center relative pt-20 scroll-mt-32">

      <div className="container px-2 z-10 grid md:grid-cols-2 gap-12 items-center">

        {/* Text Content */}
        <div className="max-w-2xl order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-white/10 mb-8 shadow-lg shadow-black/20 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-white font-medium text-sm">Available for work</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-heading leading-[1.1] mb-8 text-white tracking-tight">
            {words.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className={`inline-block mr-4 ${word === "experiences" ? "text-gradient" : ""}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-lg leading-relaxed"
          >
            I craft accessible, pixel-perfect, and performant web experiences using modern technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <Magnetic>
              <a
                href="#projects"
                className="inline-flex px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/50"
              >
                View Work
              </a>
            </Magnetic>
            <Magnetic>
              <div className="flex gap-3">
                {[Github, Linkedin, Mail].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="p-4 rounded-xl bg-surface border border-white/10 text-slate-400 hover:text-white hover:border-primary/50 hover:bg-white/5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </Magnetic>
          </motion.div>
        </div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8 }}
          className="relative order-1 md:order-2 flex justify-center"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full blur-3xl opacity-30 animate-pulse-slow" />
            <div className="relative w-full h-full rounded-full p-2 bg-gradient-to-tr from-slate-800 to-slate-900 ring-1 ring-white/10 shadow-2xl">
              <img
                src="/Img1.jpg"
                alt="Talha"
                className="w-full h-full object-cover rounded-full border-4 border-slate-900 shadow-2xl relative z-10"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
