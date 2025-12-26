
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[128px] animate-pulse-slow delay-1000" />
      </div>

      <div className="container mx-auto px-6 z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm"
          >
            <span className="text-secondary font-medium">Available for work</span>
          </motion.div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold font-heading leading-tight mb-6">
            Building digital <br />
            <span className="text-gradient">experiences</span> that matter.
          </h1>

          <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
            I'm Talha, a creative developer focused on building scalable, user-centric web applications with modern technologies.
          </p>

          <div className="flex gap-4 items-center">
            <a
              href="#projects"
              className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              View Work
            </a>
            <div className="flex gap-4 ml-6">
              {[Github, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:scale-110 transform duration-200"
                >
                  <Icon size={20} className="text-gray-300" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative order-first md:order-last"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-96 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-2xl blur-lg opacity-50 animate-float" />
            <img
              src="/Img1.jpg"
              alt="Profile"
              className="w-full h-full object-cover rounded-2xl border border-white/10 relative z-10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
}
