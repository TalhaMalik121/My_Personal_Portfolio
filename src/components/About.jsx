import { motion } from "framer-motion";
import { Code, Cpu, Globe } from "lucide-react";



export default function About() {
  const stats = [
    { label: "Years Exp", value: "3+", icon: Code, color: "text-primary" },
    { label: "Projects", value: "10+", icon: Globe, color: "text-secondary" },
    { label: "Focus", value: "AI & Web", icon: Cpu, color: "text-accent" },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center py-24 relative overflow-hidden scroll-mt-32">
      <div className="w-full px-6 md:px-20 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-16 text-center text-white leading-tight tracking-tight"
        >
          About <span className="text-gradient">Me</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative group mt-12"
          >
            {/* White Breathing Pulse */}
            {/* Deep Ambient Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-full blur-3xl opacity-60" />

            {/* Crisp Sonar Waves */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-3xl border border-white/30"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ scale: 1.35, opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: i * 1.3,
                }}
              />
            ))}

            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-full aspect-square rounded-3xl overflow-hidden"
            >
              <img
                src="/Img4.jpg"
                alt="Profile"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />


            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
          >
            {/* Background Gradient for Text Block */}
            <div className="absolute -inset-8 bg-gradient-to-l from-primary/10 to-transparent blur-3xl rounded-full opacity-50 pointer-events-none md:block hidden" />



            <div className="space-y-6 text-base md:text-lg lg:text-xl text-slate-400 leading-relaxed font-light relative">
              <p>
                I am a <span className="text-white font-medium">Computer Science Undergraduate</span> merging the precision of software engineering with the creativity of modern web design and the power of <span className="text-primary font-medium">Artificial Intelligence</span>.
              </p>
              <p>
                From training <span className="text-white">Convolutional Neural Networks</span> for gesture recognition to architecting <span className="text-white">Real-time Java Socket Systems</span> and building scalable <span className="text-white">Full-Stack Web Apps</span>, I thrive on solving complex problems with clean, efficient code.
              </p>
              <p>
                My goal is simple: to build clear, intelligent, and user-centric digital experiences that make an impact.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-md border border-white/5 py-2 px-8 rounded-xl flex flex-col items-center justify-center text-center gap-1.5 shadow-lg hover:border-primary/20 hover:bg-white/10 transition-all duration-300 group cursor-default"
                >
                  <div className={`p-2 rounded-full bg-white/5 ${stat.color} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-inner ring-1 ring-white/5`}>
                    <stat.icon size={16} />
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold font-heading text-white tracking-tight">
                      <span className="tabular-nums">{stat.value}</span>
                    </h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section >
  );
}
