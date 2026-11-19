import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A small, solid dot that trails the pointer. It never inverts or balloons:
 * - over links/buttons it tints to the accent colour and grows only slightly
 * - over elements with data-cursor="Label" a compact label pill appears beside it
 * Fine pointers only; the native cursor is hidden while it's active.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState({ type: "default", label: "" });
  const [visible, setVisible] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dx = useSpring(x, { stiffness: 900, damping: 50, mass: 0.3 });
  const dy = useSpring(y, { stiffness: 900, damping: 50, mass: 0.3 });
  const lx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.6 });
  const ly = useSpring(y, { stiffness: 300, damping: 30, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(mq.matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("has-cursor", enabled);
    if (!enabled) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e) => {
      const labelled = e.target.closest("[data-cursor]");
      if (labelled) return setMode({ type: "label", label: labelled.dataset.cursor });
      if (e.target.closest("a, button, [role='button'], input, textarea, label")) return setMode({ type: "hover", label: "" });
      setMode({ type: "default", label: "" });
    };
    const leave = () => setVisible(false);
    const md = () => setDown(true);
    const mu = () => setDown(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", md);
    window.addEventListener("mouseup", mu);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", md);
      window.removeEventListener("mouseup", mu);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const active = mode.type !== "default";

  return (
    <>
      {/* Dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{ x: dx, y: dy, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: active ? 12 : 8,
          height: active ? 12 : 8,
          opacity: visible ? 1 : 0,
          scale: down ? 0.7 : 1,
          backgroundColor: active ? "#9db4ff" : "#ededef",
          boxShadow: active ? "0 0 0 4px rgba(157,180,255,0.18)" : "0 0 0 0px rgba(157,180,255,0)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
      />

      {/* Label pill */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{ x: lx, y: ly }}
      >
        <AnimatePresence>
          {mode.type === "label" && visible && (
            <motion.span
              key={mode.label}
              initial={{ opacity: 0, scale: 0.85, x: 14, y: 14 }}
              animate={{ opacity: 1, scale: 1, x: 18, y: 18 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
              className="block whitespace-nowrap rounded-full border border-white/10 bg-[#141416]/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-md"
            >
              {mode.label} ↗
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
