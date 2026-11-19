import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Pulls its child gently toward the cursor while hovered. */
export default function Magnetic({ children, strength = 0.3, className }) {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 14, mass: 0.2 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 14, mass: 0.2 });

  function handleMove(e) {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) * strength);
    y.set((e.clientY - (top + height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={className ?? "inline-block"}
    >
      {children}
    </motion.div>
  );
}
