import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, useInView, animate } from "framer-motion";
import { Code, Cpu, Globe } from "lucide-react";

function Counter({ value }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const numericValue = parseInt(value) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (isInView) {
      animate(count, numericValue, { duration: 1.5, ease: "easeOut" });
    }
  }, [isInView, numericValue, count]);

  return (
    <span ref={nodeRef} className="flex items-center">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function About() {
  const stats = [
    { label: "Years Exp", value: "3+", icon: Code, color: "text-primary" },
    { label: "Projects", value: "10+", icon: Globe, color: "text-secondary" },
    { label: "Focus", value: "AI/ML", icon: Cpu, color: "text-accent" },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center py-24 relative overflow-hidden scroll-mt-32">
      <div className="w-full px-6 md:px-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative group"
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

              {/* Floating Name/Role on Image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                <p className="text-white font-bold text-sm">Muhammad Talha</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-white leading-tight">
              Crafting Intelligence <br />
              <span className="text-gradient">Through Code</span>
            </h2>

            <div className="space-y-6 text-base md:text-lg text-slate-400 leading-relaxed font-light">
              <p>
                I’m Talha, a <span className="text-white font-medium">Computer Science student</span> driven by the convergence of modern web technologies and Artificial Intelligence.
              </p>
              <p>
                My passion lies in building systems that aren't just functional but <span className="text-white font-medium">intelligent</span>. From intuitive user interfaces to complex machine learning models, I bridge the gap between design and data.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm shadow-lg p-4 rounded-2xl flex flex-col items-center text-center gap-2 group cursor-default transition-colors duration-300 hover:bg-white/10"
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                    className="flex flex-col items-center gap-2 w-full"
                  >
                    <div className={`p-3 rounded-full bg-white/5 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-heading text-white mb-0.5 flex justify-center">
                        <Counter value={stat.value} />
                      </h3>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section >
  );
}
