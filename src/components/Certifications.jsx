// src/components/Certifications.jsx
import React from "react";
import { motion } from "framer-motion";

const certifications = [
  {
    id: 1,
    name: "4-Weeks-Web-Development-BootCamp at Capregsoft",
    image: "/certifications/cert1.jpeg",
  },
  {
    id: 2,
    name: "Python for Data Science,AI and Development",
    image: "/certifications/cert3.PNG",
  },
  {
    id: 3,
    name: "Python for Data Analysis: NUMPY and PANDAS",
    image: "/certifications/cert2.PNG",
  },
    {
    id: 4,
    name: "Visio-Spark Speed Programming Competition",
    image: "/certifications/cert4.jpeg",
  },
    {
    id: 5,
    name: "Comsats-Wah Speed Proramming Competition",
    image: "/certifications/cert5.jpeg",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-16 bg-deepNavy">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading with yellow underline (same as Projects) */}
        <motion.h2
          className="text-3xl font-extrabold text-center text-yellow-400 border-b-2 border-yellow-400 pb-2 mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Certifications
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: i * 0.15 },
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 30px rgba(240,165,0,0.5)",
              }}
              whileTap={{
                scale: 1.05,
                boxShadow: "0 15px 30px rgba(240,165,0,0.5)",
              }}
              className="bg-black/60 rounded-2xl overflow-hidden cursor-pointer transition-transform p-6 flex flex-col items-center text-center"
            >
              <img
                src={cert.image}
                alt={cert.name}
                loading="lazy"
                className="w-96 h-96 object-contain mb-6 rounded-lg border-4 border-[#0b0430]"
              />
              <h3 className="text-lg font-semibold text-yellow-400">
                {cert.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
