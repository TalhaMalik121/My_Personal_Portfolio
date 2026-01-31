import { useState, useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Send } from "lucide-react";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 10, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.1 }
  },
};

export default function Hero() {
  const [textKey, setTextKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTextKey((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);



  function handleMouseMove({ clientX, clientY }) {
    mouseX.set(clientX);
    mouseY.set(clientY);
  }

  const words = ["Muhammad", "Talha"];

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="min-h-[80vh] flex items-center justify-center relative pt-20 scroll-mt-32 group"
    >

      {/* Spotlight Overlay */}
      <motion.div
        className="pointer-events-none fixed inset-0 transition duration-300 opacity-0 group-hover:opacity-100 -z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.1),
              transparent 80%
            )
          `,
        }}
      />

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
            <span className="text-white font-medium text-sm">Ready to Innovate</span>
          </motion.div>

          <motion.h1
            key={textKey}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-7xl font-bold font-heading leading-[1.1] mb-8 text-white tracking-tight"
          >
            {words.map((word, i) => (
              <span key={i} className={`inline-block mr-4 ${word === "Talha" ? "text-primary drop-shadow-md" : ""}`}>
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-lg leading-relaxed"
          >
            Merging Full-Stack Engineering with Artificial Intelligence to build scalable, intelligent, and impactful digital solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <motion.a
              href="#projects"
              className="relative inline-flex px-6 py-3 md:px-8 md:py-4 rounded-xl bg-primary text-white font-semibold overflow-hidden shadow-lg shadow-primary/25 text-sm md:text-base"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(99, 102, 241, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                initial={{ x: "-150%" }}
                animate={{ x: "150%" }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear", repeatDelay: 3 }}
              />
              <span className="relative z-10">Explore Work</span>
            </motion.a>

            <motion.a
              href="#contact"
              className="px-6 py-3 md:px-8 md:py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-primary/50 transition-all duration-300 flex items-center gap-2 text-sm md:text-base"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Connect <Send size={18} />
            </motion.a>
            <div className="flex gap-3">
              {[
                { Icon: Github, href: "https://github.com/TalhaMalik121" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-talha-3b6a5a286/" },
                { Icon: Mail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=talhagulsher7782@gmail.com" }
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="p-4 rounded-xl bg-surface border border-white/10 text-slate-400 hover:text-white hover:border-primary/50 hover:bg-white/5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-110 hover:-translate-y-1"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0, y: [0, -15, 0] }}
          transition={{
            duration: 0.8,
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
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
