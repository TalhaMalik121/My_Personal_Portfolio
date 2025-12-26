import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/5 bg-black/40 text-center">
      <div className="flex justify-center gap-6 mb-4">
        {[Github, Linkedin, Twitter].map((Icon, i) => (
          <a key={i} href="#" className="text-gray-400 hover:text-white transition-colors">
            <Icon size={20} />
          </a>
        ))}
      </div>
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} Muhammad Talha. Built with React & Tailwind.
      </p>
    </footer>
  );
}
