
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const mustard = "#F0A500";

const schema = z.object({
  name: z.string().min(2, { message: "Please enter your full name (min 2 chars)." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(10, { message: "Message should be at least 10 characters." }),
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
        setToast({ type: "success", msg: "Thanks! Your message was sent ✅" });
        reset();
      } else {
        setToast({ type: "error", msg: "Oops! Something went wrong. Try again." });
      }
    } catch (e) {
      setToast({ type: "error", msg: "Network error. Please try later." });
    }
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <section id="contact" className="px-5 py-12">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-80px" }}
        className="max-w-5xl mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
          className="text-center text-3xl font-extrabold text-yellow-400 border-b-2 border-yellow-400 pb-2"
        >
          Contact Me
        </motion.h2>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
            className="rounded-2xl p-5 text-black cursor-pointer transition-transform hover:scale-105"
            style={{ background: mustard }}
          >
            <p className="font-semibold">Email</p>
            <p className="text-sm">talhagulsher7782@gmail.com</p>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=talhagulsher7782@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-purple-900 underline"
            >
              Send me a message
            </a>

          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
            className="rounded-2xl p-5 text-black cursor-pointer transition-transform hover:scale-105"
            style={{ background: mustard }}
          >
            <p className="font-semibold">WhatsApp</p>
            <p className="text-sm">+92 319 789 5802</p>
            <a href="https://wa.me/923197895802" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-purple-900 underline">
              Send me a message
            </a>
          </motion.div>
        </div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
          className="mt-8 space-y-4"
        >
          <input
            {...register("name")}
            type="text"
            placeholder="Your Full Name"
            className="w-full p-3 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2"
          />
          {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}

          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2"
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}

          <textarea
            {...register("message")}
            placeholder="Your Message"
            rows={5}
            className="w-full p-3 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2"
          ></textarea>
          {errors.message && <p className="text-red-400 text-sm">{errors.message.message}</p>}

          <button
            disabled={!isValid || isSubmitting}
            className="w-full px-6 py-3 rounded-full font-semibold text-black disabled:opacity-60 disabled:cursor-not-allowed shadow-lg transition-transform hover:scale-105 bg-mustard"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </motion.div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 ${toast.type === "success" ? "bg-green-500" : "bg-red-500"} text-white rounded-full shadow-lg font-semibold`}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
