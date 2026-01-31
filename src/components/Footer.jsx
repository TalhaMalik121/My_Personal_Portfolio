import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-12 overflow-hidden bg-gradient-to-t from-slate-900 to-slate-900/50">
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-[2px]" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="flex justify-center gap-6 mb-8">
          {[Github, Linkedin, Twitter].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="p-3 rounded-xl bg-white/5 text-slate-400 hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300 border border-white/5 hover:border-primary/50 shadow-lg hover:shadow-primary/25 group"
            >
              <Icon size={20} className="group-hover:scale-110 transition-transform" />
            </a>
          ))}
        </div>

        <p className="text-slate-300 font-medium mb-2">
          Designed & Built by <span className="text-gradient font-bold">Muhammad Talha</span>
        </p>
        <p className="text-xs text-slate-500 tracking-wide">
          © {new Date().getFullYear()} personal portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
