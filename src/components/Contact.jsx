
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Mail, MessageSquare, Send } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const [toast, setToast] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      const resp = await fetch("https://formspree.io/f/mrblnyew", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (resp.ok) {
        setToast({ type: "success", msg: "Message sent successfully! 🚀" });
        reset();
      } else {
        setToast({ type: "error", msg: "Failed to send message. Please try again." });
      }
    } catch (e) {
      setToast({ type: "error", msg: "Network error. Please check your connection." });
    }
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <section id="contact" className="py-20 bg-black/40 relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-gray-400">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-primary/20 text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Email</h3>
                  <a href="mailto:talhagulsher7782@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                    talhagulsher7782@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-secondary/20 text-secondary">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">WhatsApp</h3>
                  <a href="https://wa.me/923197895802" className="text-gray-400 hover:text-white transition-colors">
                    +92 319 789 5802
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <input
                {...register("name")}
                placeholder="Name"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-colors"
                autoComplete="off"
              />
              {errors.name && <p className="text-red-400 text-xs ml-1">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <input
                {...register("email")}
                placeholder="Email"
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-colors"
                autoComplete="off"
              />
              {errors.email && <p className="text-red-400 text-xs ml-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <textarea
                {...register("message")}
                placeholder="Message"
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-colors resize-none"
              ></textarea>
              {errors.message && <p className="text-red-400 text-xs ml-1">{errors.message.message}</p>}
            </div>

            <button
              disabled={!isValid || isSubmitting}
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Send Message <Send size={18} /></>
              )}
            </button>
          </motion.form>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border border-white/10 ${toast.type === "success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
              } font-medium flex items-center gap-3`}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
