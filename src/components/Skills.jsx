import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import clsx from "clsx";

const categories = ["All", "Programming", "Web", "AI", "Tools"];

const allSkills = [
  { name: "Python", icon: "/icons/python.svg", category: "Programming" },
  { name: "C++", icon: "/icons/c++.svg", category: "Programming" },
  { name: "Java", icon: "/icons/java.svg", category: "Programming" },
  { name: "HTML", icon: "/icons/html.svg", category: "Web" },
  { name: "CSS", icon: "/icons/css.svg", category: "Web" },
  { name: "Tailwind", icon: "/icons/tailwind.svg", category: "Web" },
  { name: "React", icon: "/icons/react.svg", category: "Web" },
  { name: "Django", icon: "/icons/django.svg", category: "Web" },
  { name: "NumPy", icon: "/icons/numpy.svg", category: "AI" },
  { name: "Pandas", icon: "/icons/pandas.svg", category: "AI" },
  { name: "TensorFlow", icon: "/icons/tensorflow.svg", category: "AI" },
  { name: "Keras", icon: "/icons/Keras.svg", category: "AI" },
  { name: "Git", icon: "/icons/git.svg", category: "Tools" },
  { name: "GitHub", icon: "/icons/github.svg", category: "Tools" },
  { name: "Figma", icon: "/icons/figma.svg", category: "Design" },
];

export default function Skills() {
  const [filter, setFilter] = useState("All");
  const skills = useMemo(() => {
    return filter === "All" ? allSkills : allSkills.filter(s => s.category === filter);
  }, [filter]);

  return (
    <section id="skills" className="py-20 bg-black/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Technical <span className="text-gradient">Proficiency</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-6 md:mt-8">
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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          layout
        >
          {skills.map((s) => (
            <motion.div
              layout
              key={s.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center gap-4 hover:border-primary/30 transition-colors backdrop-blur-sm group"
            >
              <div className="w-16 h-16 p-3 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <img src={s.icon} alt={s.name} className="w-full h-full object-contain" />
              </div>
              <span className="font-medium text-gray-300 group-hover:text-white transition-colors">{s.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
