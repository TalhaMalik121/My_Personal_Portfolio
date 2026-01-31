import { motion } from "framer-motion";
import { Code, Cpu, Globe } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Years Exp", value: "3+", icon: Code, color: "text-primary" },
    { label: "Projects", value: "10+", icon: Globe, color: "text-secondary" },
    { label: "Focus", value: "AI/ML", icon: Cpu, color: "text-accent" },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden scroll-mt-32">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            {/* Abstract Background Shapes */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />

            <div className="relative z-10 w-full aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/50">
              <img
                src="/Img4.jpg"
                alt="Profile"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

              {/* Floating Name/Role on Image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                <p className="text-white font-bold text-sm">Muhammad Talha</p>
                <p className="text-slate-300 text-xs text-xs">Full Stack & AI Engineer</p>
              </div>
            </div>
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
                <div
                  key={i}
                  className="glass-card p-4 rounded-2xl flex flex-col items-center text-center gap-2 group cursor-default"
                >
                  <div className={`p-3 rounded-full bg-white/5 ${stat.color} group-hover:scale-110 transition-transform duration-300 border border-white/5`}>
                    <stat.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-heading text-white mb-0.5">{stat.value}</h3>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
