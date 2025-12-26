import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 w-full aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/Img4.jpg"
                alt="Profile"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            {/* Background decorative blob */}
            <div className="absolute -top-10 -left-10 w-2/3 h-2/3 bg-primary/30 rounded-full blur-[100px] -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 md:mb-6">
              Passionate about <br />
              <span className="text-gradient">Artificial Intelligence</span>
            </h2>

            <div className="space-y-4 md:space-y-6 text-sm md:text-base text-gray-400 leading-relaxed">
              <p>
                I’m Talha, a Computer Science student with a deep focus on AI/ML and modern web development.
                My journey involves translating complex problems into elegant, scalable solutions.
              </p>
              <p>
                Whether it's building intuitive user interfaces with React or training machine learning models with Python,
                I strive for excellence in every line of code. I believe in the power of technology to transform ideas into reality.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-1">3+</h3>
                <p className="text-sm text-gray-400">Years of Coding</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-1">10+</h3>
                <p className="text-sm text-gray-400">Projects Completed</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
