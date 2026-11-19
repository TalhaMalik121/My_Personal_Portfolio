import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import { EASE } from "../lib/utils";

const skillGroups = [
  {
    title: "AI & Tools",
    note: "Modelling, data and version control",
    skills: [
      { name: "TensorFlow", icon: "/icons/tensorflow.svg" },
      { name: "Keras", icon: "/icons/Keras.svg" },
      { name: "NumPy", icon: "/icons/numpy.svg" },
      { name: "Pandas", icon: "/icons/pandas.svg" },
      { name: "Git", icon: "/icons/git.svg" },
      { name: "GitHub", icon: "/icons/github.svg" },
    ],
  },
  {
    title: "Frontend & Design",
    note: "Interfaces, systems and prototyping",
    skills: [
      { name: "React", icon: "/icons/react.svg" },
      { name: "Tailwind", icon: "/icons/tailwind.svg" },
      { name: "HTML5", icon: "/icons/html.svg" },
      { name: "CSS3", icon: "/icons/css.svg" },
      { name: "Figma", icon: "/icons/figma.svg" },
    ],
  },
  {
    title: "Backend & Core",
    note: "Languages, frameworks and services",
    skills: [
      { name: "Python", icon: "/icons/python.svg" },
      { name: "Java", icon: "/icons/java.svg" },
      { name: "C++", icon: "/icons/c++.svg" },
      { name: "Django", icon: "/icons/django.svg", invert: true },
    ],
  },
];

const chips = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};
const chip = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
};

export default function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          index="03"
          label="Expertise"
          lines={["Technical", "*proficiency.*"]}
          aside="A comprehensive overview of the technologies and tools I leverage to build intelligent solutions."
        />

        <div>
          {skillGroups.map((g, gi) => (
            <div key={g.title} className="group relative">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: EASE, delay: gi * 0.1 }}
                className="hairline origin-left"
              />
              {/* Hover wash */}
              <div className="pointer-events-none absolute inset-0 origin-top scale-y-0 bg-white/[0.02] transition-transform duration-700 ease-expo group-hover:scale-y-100" />

              <div className="relative grid gap-6 py-10 md:grid-cols-12 md:gap-6 md:py-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.1, ease: EASE }}
                  className="flex items-start gap-6 md:col-span-4"
                >
                  <span className="label pt-2">0{gi + 1}</span>
                  <div>
                    <h3 className="text-2xl font-medium tracking-tight text-ink transition-transform duration-700 ease-expo group-hover:translate-x-2 md:text-3xl">
                      {g.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{g.note}</p>
                  </div>
                </motion.div>

                <motion.ul
                  variants={chips}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  className="flex flex-wrap content-start gap-2.5 md:col-span-8 md:justify-end"
                >
                  {g.skills.map((s) => (
                    <motion.li
                      key={s.name}
                      variants={chip}
                      className="group/chip flex items-center gap-2.5 rounded-full border border-line bg-surface py-2 pl-2 pr-4 transition-[border-color,background-color] duration-500 ease-expo hover:border-white/25 hover:bg-elevated"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.04]">
                        <img
                          src={s.icon}
                          alt=""
                          className={`h-4 w-4 object-contain opacity-70 grayscale transition-all duration-500 group-hover/chip:opacity-100 group-hover/chip:grayscale-0 ${s.invert ? "invert" : ""}`}
                        />
                      </span>
                      <span className="text-sm text-muted transition-colors duration-500 group-hover/chip:text-ink">{s.name}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          ))}
          <div className="hairline" />
        </div>
      </div>
    </section>
  );
}
