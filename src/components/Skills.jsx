import { motion } from "framer-motion";

const skillGroups = [
  {
    title: "AI & Tools",
    skills: [
      { name: "TensorFlow", icon: "/icons/tensorflow.svg" },
      { name: "Keras", icon: "/icons/Keras.svg" },
      { name: "NumPy", icon: "/icons/numpy.svg" },
      { name: "Pandas", icon: "/icons/pandas.svg" },
      { name: "Git", icon: "/icons/git.svg" },
      { name: "GitHub", icon: "/icons/github.svg" },
    ],
    delay: 0
  },
  {
    title: "Frontend & Design",
    skills: [
      { name: "React", icon: "/icons/react.svg" },
      { name: "Tailwind", icon: "/icons/tailwind.svg" },
      { name: "HTML5", icon: "/icons/html.svg" },
      { name: "CSS3", icon: "/icons/css.svg" },
      { name: "Figma", icon: "/icons/figma.svg" },
    ],
    delay: 0.1
  },
  {
    title: "Backend & Core",
    skills: [
      { name: "Python", icon: "/icons/python.svg" },
      { name: "Java", icon: "/icons/java.svg" },
      { name: "C++", icon: "/icons/c++.svg" },
      { name: "Django", icon: "/icons/django.svg" },
    ],
    delay: 0.2
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative scroll-mt-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white">
            Technical <span className="text-gradient">Proficiency</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A comprehensive overview of the technologies and tools I leverage to build intelligent solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: group.delay }}
              className="bg-surface/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 group"
            >
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-8 text-center relative pb-4">
                {group.title}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full group-hover:w-32 transition-all duration-500 opacity-80 group-hover:opacity-100 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
              </h3>

              <div className="flex flex-col gap-3">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent hover:bg-white/5 hover:border-white/10 hover:translate-x-2 transition-all duration-300 cursor-default group/skill w-full"
                  >
                    <div className="w-6 h-6 flex items-center justify-center shrink-0">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-full h-full object-contain transition-all opacity-80 group-hover/skill:opacity-100"
                      />
                    </div>
                    <span className="text-sm font-bold text-slate-400 group-hover/skill:text-white transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
