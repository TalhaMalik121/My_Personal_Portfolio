import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import RollText from "./ui/RollText";
import Magnetic from "./Magnetic";
import { EASE, SOCIALS } from "../lib/utils";

const schema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

function Field({ id, label, index, error, textarea, register, ...props }) {
  const Comp = textarea ? "textarea" : "input";
  return (
    <div className="group relative">
      <div className="relative flex gap-5 border-b border-line pt-8">
        <span className="pt-0.5 font-mono text-[11px] text-faint">{index}</span>
        <div className="relative flex-1">
          <Comp
            id={id}
            placeholder=" "
            {...register(id)}
            {...props}
            className={`peer w-full bg-transparent pb-4 text-lg text-ink outline-none md:text-xl ${textarea ? "resize-none" : ""}`}
          />
          <label
            htmlFor={id}
            className="pointer-events-none absolute left-0 top-0 origin-left text-lg text-muted transition-all duration-500 ease-expo peer-focus:-translate-y-7 peer-focus:scale-[0.7] peer-focus:text-ink peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:scale-[0.7] md:text-xl"
          >
            {label}
          </label>
        </div>
        {/* animated focus line */}
        <span className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-700 ease-expo group-focus-within:scale-x-100" />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 pl-10 text-xs text-rose-300/90"
          >
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const rise = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 1.2, delay: d, ease: EASE },
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
        setToast({ type: "success", msg: "Message sent — I'll get back to you soon." });
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
    <section id="contact" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          index="06"
          label="Contact"
          lines={["Let's build", "*something remarkable.*"]}
          aside="Have a project in mind or just want to say hi? I'd love to hear from you."
        />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <motion.div {...rise(0)}>
              <span className="label">(Email)</span>
              <a
                href={SOCIALS.email}
                target="_blank"
                rel="noopener noreferrer"
                className="roll-group group mt-4 flex items-center gap-3 text-[clamp(1.25rem,2.4vw,2rem)] font-medium tracking-tight text-ink"
              >
                <span className="relative truncate">
                  <RollText>talhagulsher7782@gmail.com</RollText>
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-700 ease-expo group-hover:origin-left group-hover:scale-x-100" />
                </span>
                <ArrowUpRight size={22} className="shrink-0 transition-transform duration-700 ease-expo group-hover:rotate-45" />
              </a>
            </motion.div>

            <motion.div {...rise(0.1)} className="mt-12">
              <span className="label">(WhatsApp)</span>
              <a href="https://wa.me/923197895802" className="roll-group group mt-4 flex items-center gap-3 text-[clamp(1.25rem,2.4vw,2rem)] font-medium tracking-tight text-ink">
                <RollText>+92 319 789 5802</RollText>
                <ArrowUpRight size={22} className="shrink-0 transition-transform duration-700 ease-expo group-hover:rotate-45" />
              </a>
            </motion.div>

            <motion.div {...rise(0.2)} className="mt-12 border-t border-line pt-8">
              <p className="flex items-start gap-2.5 text-ink">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 animate-pulse-soft rounded-full bg-emerald-400" />
                Open to internships, freelance work &amp; collaborations.
              </p>
              <p className="mt-2 text-sm text-muted">I usually reply within a day.</p>
            </motion.div>
          </div>

          <motion.form {...rise(0.15)} onSubmit={handleSubmit(onSubmit)} className="lg:col-span-6 lg:col-start-7">
            <div className="space-y-6">
              <Field id="name" index="01" label="What's your name?" error={errors.name} register={register} autoComplete="off" />
              <Field id="email" index="02" label="Your email address" type="email" error={errors.email} register={register} autoComplete="off" />
              <Field id="message" index="03" label="Tell me about your project" textarea rows={4} error={errors.message} register={register} />
            </div>

            <div className="mt-12 flex items-center justify-between gap-6">
              <p className="hidden max-w-[16rem] text-xs leading-relaxed text-faint sm:block">
                Your message goes straight to my inbox. No spam, ever.
              </p>
              <Magnetic strength={0.25}>
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="roll-group btn-primary group !px-8 !py-4 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-700 ease-expo group-enabled:group-hover:scale-y-100" />
                  {isSubmitting ? (
                    <span className="relative h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
                  ) : (
                    <>
                      <span className="relative"><RollText>Send message</RollText></span>
                      <ArrowUpRight size={16} className="relative transition-transform duration-700 ease-expo group-hover:rotate-45" />
                    </>
                  )}
                </button>
              </Magnetic>
            </div>
          </motion.form>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed bottom-24 left-4 right-4 z-[80] flex items-center gap-3 rounded-full border border-white/10 bg-elevated/95 px-5 py-3.5 text-sm text-ink shadow-2xl backdrop-blur-xl md:bottom-8 md:left-auto md:right-8"
          >
            {toast.type === "success" ? <CheckCircle2 size={18} className="text-emerald-400" /> : <AlertCircle size={18} className="text-rose-400" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
