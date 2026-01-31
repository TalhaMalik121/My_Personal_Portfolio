import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

const certifications = [
  {
    id: 1,
    name: "Web Development Bootcamp",
    org: "Capregsoft",
    image: "/certifications/cert1.jpeg",
    date: "2023"
  },
  {
    id: 2,
    name: "Python for Data Science & AI",
    org: "Coursera / IBM",
    image: "/certifications/cert3.PNG",
    date: "2023"
  },
  {
    id: 3,
    name: "Data Analysis with Python",
    org: "Coursera / IBM",
    image: "/certifications/cert2.PNG",
    date: "2022"
  },
  {
    id: 4,
    name: "Speed Programming Competition",
    org: "Visio-Spark",
    image: "/certifications/cert4.jpeg",
    date: "2022"
  },
  {
    id: 5,
    name: "Programming Competition",
    org: "Comsats-Wah",
    image: "/certifications/cert5.jpeg",
    date: "2021"
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 scroll-mt-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white">
            Licences & <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Showcasing my continuous learning journey and professional achievements.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group relative h-full bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 flex flex-col"
            >
              {/* Image Area */}
              <div className="relative h-56 p-6 bg-gradient-to-br from-white/5 to-transparent border-b border-white/5 overflow-hidden group-hover:bg-white/10 transition-colors">
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-full object-contain shadow-xl rounded-lg transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 pt-8 relative flex-1 flex flex-col">
                {/* Floating Icon Badge */}
                <div className="absolute top-0 right-8 -translate-y-1/2 w-12 h-12 bg-surface border border-white/10 rounded-2xl flex items-center justify-center shadow-lg group-hover:border-primary/30 group-hover:shadow-primary/20 transition-all duration-300">
                  <Award className="text-primary" size={24} />
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-bold font-heading text-white mb-2 leading-snug group-hover:text-primary transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                    {cert.org}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-xs font-mono text-slate-500">ISSUED {cert.date}</span>
                  {/* Decorative line */}
                  <div className="h-[1px] w-12 bg-gradient-to-r from-primary/50 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
