import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

const certifications = [
  {
    id: 1,
    name: "Web Development Bootcamp",
    org: "Capregsoft",
    image: "/certifications/cert1.jpeg",
  },
  {
    id: 2,
    name: "Python for Data Science & AI",
    org: "Coursera / IBM",
    image: "/certifications/cert3.PNG",
  },
  {
    id: 3,
    name: "Data Analysis with Python",
    org: "Coursera / IBM",
    image: "/certifications/cert2.PNG",
  },
  {
    id: 4,
    name: "Speed Programming Competition",
    org: "Visio-Spark",
    image: "/certifications/cert4.jpeg",
  },
  {
    id: 5,
    name: "Programming Competition",
    org: "Comsats-Wah",
    image: "/certifications/cert5.jpeg",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 bg-black/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Licences & <span className="text-gradient">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all group"
            >
              <div className="relative h-56 mb-6 overflow-hidden rounded-xl bg-black/50">
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex items-start gap-3">
                <Award className="text-yellow-500 shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-white text-lg leading-tight mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {cert.org}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
