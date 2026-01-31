import { motion } from "framer-motion";
import { Code2, Cpu, Globe, Server, Database, Network, Terminal, Layers } from "lucide-react";

const services = [
    {
        title: "Web Development",
        description: "Building scalable, high-performance web applications with modern technologies.",
        icon: <Globe size={40} className="text-primary" />,
        gradient: "from-blue-500/20 to-cyan-500/20",
        features: [
            { name: "Frontend", details: "React, Next.js, Tailwind CSS" },
            { name: "Backend", details: "Node.js, Express, FastAPI" },
            { name: "Database", details: "MySQL, MongoDB, PostgreSQL" }
        ]
    },
    {
        title: "AI & Machine Learning",
        description: "Developing intelligent systems for computer vision and data analysis.",
        icon: <Cpu size={40} className="text-purple-500" />,
        gradient: "from-purple-500/20 to-pink-500/20",
        features: [
            { name: "Computer Vision", details: "Image Recognition, Object Detection" },
            { name: "ML Workflows", details: "Data Processing, Model Training" },
            { name: "Tools", details: "TensorFlow, PyTorch, OpenCV" }
        ]
    },
    {
        title: "Programming & Networking",
        description: "Robust software solutions and network infrastructure simulation.",
        icon: <Terminal size={40} className="text-emerald-500" />,
        gradient: "from-emerald-500/20 to-teal-500/20",
        features: [
            { name: "Languages", details: "Java, C++, Python" },
            { name: "Networking", details: "Cisco Packet Tracer, Network Config" },
            { name: "Applications", details: "Desktop Apps, System Tools" }
        ]
    }
];

export default function Services() {
    return (
        <section id="services" className="py-20 relative scroll-mt-32">
            {/* Background Elements */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white">
                        My <span className="text-gradient">Services</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Delivering high-quality solutions across web development, artificial intelligence, and software engineering.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className={`relative h-full bg-surface/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-300 group overflow-hidden`}
                        >
                            {/* Hover Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

                            <div className="relative z-10 flex flex-col h-full">
                                {/* Icon Container */}
                                <div className="mb-6 inline-block p-4 rounded-2xl bg-white/5 border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                                    {service.title}
                                </h3>

                                <p className="text-slate-400 mb-8 leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="mt-auto space-y-4">
                                    {service.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                            <div className="w-1.5 h-1.5 rounded-full bg-current mt-2 shrink-0 opacity-70" style={{ color: i === 0 ? '#3b82f6' : i === 1 ? '#a855f7' : '#10b981' }} />
                                            <div>
                                                <h4 className="text-sm font-semibold text-slate-200">{feature.name}</h4>
                                                <p className="text-xs text-slate-500">{feature.details}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>


                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 border border-white/10 text-white font-bold hover:bg-white/10 hover:border-primary/50 hover:text-primary transition-all duration-300 shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1"
                    >
                        Let's Discuss Your Project <Layers size={18} />
                    </a>
                </motion.div>
            </div>
        </section >
    );
}
