import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const categories = ["All", "Programming","Web", "Design", "AI", "Tools"];

const allSkills = [
  { name: "Python", icon: "/icons/python.svg", category: "Programming" },
  { name: "C++", icon: "/icons/c++.svg", category: "Programming" },
  { name: "Java", icon: "/icons/java.svg", category: "Programming" },
  { name: "HTML", icon: "/icons/html.svg", category: "Web" },
  { name: "CSS", icon: "/icons/css.svg", category: "Web" },
  { name: "TailwindCSS", icon: "/icons/tailwind.svg", category: "Web" },
  { name: "Bootstrap", icon: "/icons/bootstrap.svg", category: "Web" },
  { name: "JavaScript", icon: "/icons/js.svg", category: "Web" },
  { name: "React", icon: "/icons/react.svg", category: "Web" },
  { name: "Django", icon: "/icons/django.svg", category: "Web" },
  { name: "Figma", icon: "/icons/figma.svg", category: "Design" },
  { name: "NumPy", icon: "/icons/numpy.svg", category: "AI" },
  { name: "Pandas", icon: "/icons/pandas.svg", category: "AI" },
  { name: "Matplotlib", icon: "/icons/matplotlib.svg", category: "AI" },
  { name: "Seaborn", icon: "/icons/seaborn.svg", category: "AI" },
  { name: "Scikit-learn", icon: "/icons/scikit-learn.svg", category: "AI" },
  { name: "TensorFlow", icon: "/icons/tensorflow.svg", category: "AI" },
  { name: "Keras", icon: "/icons/Keras.svg", category: "AI" },
  {
    name: "NLTK",
    icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><circle cx='32' cy='32' r='30' fill='%231f77b4'/><text x='32' y='40' font-size='18' text-anchor='middle' fill='white' font-family='Arial'>NLTK</text></svg>",
    category: "AI"
  },
  {
    name: "BeautifulSoup",
    icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><circle cx='32' cy='32' r='30' fill='%23FF9900'/><text x='32' y='40' font-size='12' text-anchor='middle' fill='white' font-family='Arial'>BS</text></svg>",
    category: "AI"
  },

  { name: "Git", icon: "/icons/git.svg", category: "Tools" },
  { name: "GitHub", icon: "/icons/github.svg", category: "Tools" },
];

// Scroll-in animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Skills() {
  const [filter, setFilter] = useState("All");
  const skills = useMemo(() => {
    return filter === "All" ? allSkills : allSkills.filter(s => s.category === filter);
  }, [filter]);

  return (
    <section id="skills" className="px-5 py-12">
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
          Skills
        </motion.h2>

        <div className="flex justify-center flex-wrap gap-4 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative px-4 py-2 rounded-full font-semibold transition-all hover:scale-105 ${filter === cat ? "text-yellow-400" : "text-gray-300"}`}
            >
              {cat}
              {filter === cat && (
                <motion.span
                  layoutId="underline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400"
                />
              )}
            </button>
          ))}
        </div>

        <motion.div 
          className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { 
              transition: { staggerChildren: 0.1 } // stagger effect for smooth animation
            }
          }}
        >
          {skills.map((s, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ scale: 1.08, boxShadow: "0 0 20px rgba(240,165,0,0.6)" }}
              whileTap={{ scale: 1.08, boxShadow: "0 0 20px rgba(240,165,0,0.6)" }}
              animate={{ y: ["0%", "-3%", "0%"], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } }} // floating animation
              className="p-6 rounded-2xl bg-black/40 flex flex-col items-center justify-center gap-3 text-center cursor-pointer"
            >
              <div className="text-yellow-400 text-4xl">
                <img src={s.icon} alt={s.name} loading="lazy" className="w-12 h-12" />
              </div>
              <p className="font-medium">{s.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
