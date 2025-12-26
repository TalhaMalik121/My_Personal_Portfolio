
import { motion } from "framer-motion";

const mustard = "#F0A500";

export default function About() {
  return (
    <section id="about" className="px-5 py-12">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-80px" }}
        className="max-w-5xl mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
          className="text-center text-3xl font-extrabold text-yellow-400 border-b-2 border-yellow-400 pb-2"
        >
          About Me
        </motion.h2>

        <div className="my-12" />

        <div className="mt-8 grid md:grid-cols-[1fr_1.2fr] gap-8 items-center">
          <motion.img
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
            //src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=600&auto=format&fit=crop"
            src="/Img4.jpg"
            alt="Portrait of Muhammad Talha"
            loading="lazy"
            className="rounded-2xl object-contain w-64 md:w-80 h-auto ring-4 mx-auto"
            style={{ ringColor: mustard }}
          />
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
            className="text-gray-200 leading-relaxed"
          >
            I’m Talha, a Computer Science student passionate about AI/ML and Python.
            I build smart applications using Python, AI/ML, and modern web technologies.
            I’m always eager to learn new things and a strong believer in the power of
            technology to solve real-world problems.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
