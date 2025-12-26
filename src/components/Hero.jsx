
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const mustard = "#F0A500";
const purple = "#6D28D9";

export default function Hero() {
  const fullText = "Hi, I’m Muhammad Talha";
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    setTyped("");
    const id = setInterval(() => {
      if (i < fullText.length) {
        setTyped(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(id);
      }
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="pb-16 px-5">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-80px" }}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">{typed}</h1>
          <p className="mt-3 text-gray-200">Computer Science Student | Developer | Tech Enthusiast</p>
          <p className="mt-4 text-gray-300 max-w-xl">
            I build smart applications using Python, AI/ML, and modern web technologies.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="/resume.pdf"
              download
              aria-label="Download resume (PDF)"
              className="px-6 py-3 rounded-full font-semibold text-black shadow-md transition-transform hover:scale-105"
              style={{ background: mustard }}
            >
              Download Resume
            </a>
            <a
              href="#contact"
              onClick={(e)=>{e.preventDefault(); const el=document.getElementById("contact"); if(el){window.scrollTo({top: el.offsetTop-80, behavior:"smooth"})}}}
              className="px-6 py-3 rounded-full font-semibold text-white shadow-md relative overflow-hidden cursor-pointer glow-effect transition-transform hover:scale-105"
              style={{ background: purple }}
            >
              <span className="relative z-10">Let’s Talk</span>
            </a> 
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
          className="flex justify-center md:justify-end"
        >
          <img
            src="/Img1.jpg"
            alt="Portrait of Muhammad Talha"
            loading="lazy"
            className="w-48 h-48 md:w-60 md:h-60 rounded-full object-cover ring-4"
            style={{ ringColor: mustard }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
