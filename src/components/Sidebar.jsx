import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, User, Code, Briefcase, FileText, Send, Award } from "lucide-react";

export default function Sidebar({ activeSection }) {
    const navItems = [
        { id: "about", label: "About", icon: User },
        { id: "skills", label: "Skills", icon: Code },
        { id: "projects", label: "Projects", icon: Briefcase },
        { id: "certifications", label: "Certifications", icon: Award },
        { id: "contact", label: "Contact", icon: Send },
    ];

    return (
        <aside className="w-full h-full p-6 flex flex-col relative">
            {/* Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col items-center text-center"
            >
                <div className="relative w-48 h-48 mb-6 group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                    <img
                        src="/Img1.jpg"
                        alt="Talha"
                        className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl relative z-10"
                    />
                </div>

                <h1 className="text-3xl font-bold mb-2 text-dark font-heading">Talha</h1>
                <p className="text-secondary font-medium mb-4 bg-secondary/10 px-4 py-1 rounded-full text-sm">
                    Creative Developer
                </p>

                <p className="text-muted text-sm leading-relaxed mb-8 max-w-xs mx-auto">
                    Building scalable, user-centric web applications with modern technologies.
                </p>

                {/* Navigation */}
                <nav className="w-full max-w-xs mb-8">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${activeSection === item.id
                                            ? "bg-primary text-white shadow-lg shadow-primary/25 translate-x-1"
                                            : "text-slate-600 hover:bg-slate-100 hover:text-primary"
                                        }`}
                                >
                                    <item.icon size={18} />
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Socials & CTA */}
                <div className="mt-auto w-full max-w-xs flex flex-col gap-4">
                    <div className="flex justify-center gap-4">
                        {[Github, Linkedin, Mail].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="p-2.5 rounded-full bg-slate-100 text-slate-600 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
                            >
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>

                    <button className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg">
                        <Download size={18} />
                        Download CV
                    </button>
                </div>
            </motion.div>
        </aside>
    );
}
