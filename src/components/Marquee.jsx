import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/** A row that drifts constantly and accelerates/reverses with scroll velocity. */
function VelocityRow({ children, baseVelocity = 2 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 300 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const skew = useTransform(smooth, [-2000, 0, 2000], [-6, 0, 6]);
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div style={{ x, skewX: skew }} className="flex flex-nowrap will-change-transform">
        {[0, 1, 2, 3].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const PHRASES = ["AI Engineering", "Machine Learning", "Deep Learning", "Computer Vision", "RAG Chatbots", "Agentic AI", "Web Development", "App Development"];
const TECH = [
  { name: "React", icon: "/icons/react.svg" },
  { name: "Python", icon: "/icons/python.svg" },
  { name: "TensorFlow", icon: "/icons/tensorflow.svg" },
  { name: "Keras", icon: "/icons/Keras.svg" },
  { name: "Tailwind", icon: "/icons/tailwind.svg" },
  { name: "Java", icon: "/icons/java.svg" },
  { name: "C++", icon: "/icons/c++.svg" },
  { name: "NumPy", icon: "/icons/numpy.svg" },
  { name: "Pandas", icon: "/icons/pandas.svg" },
  { name: "Figma", icon: "/icons/figma.svg" },
  { name: "Git", icon: "/icons/git.svg" },
];

export default function Marquee() {
  return (
    <div aria-hidden className="relative z-10 select-none border-y border-line py-10 md:py-14">
      <VelocityRow baseVelocity={-1.6}>
        {PHRASES.map((p) => (
          <span key={p} className="flex items-center text-[clamp(2.75rem,7vw,6.5rem)] font-medium leading-none tracking-tightest text-ink">
            <span className="px-6 md:px-10">{p}</span>
            <span className="h-[0.14em] w-[0.14em] rounded-full bg-faint" />
          </span>
        ))}
      </VelocityRow>

      <div className="mt-6 md:mt-8">
        <VelocityRow baseVelocity={1.2}>
          {TECH.map((t) => (
            <span key={t.name} className="flex items-center gap-3 px-6 text-lg font-medium text-faint md:px-9 md:text-xl">
              <img src={t.icon} alt="" className="h-6 w-6 object-contain opacity-60 grayscale" />
              {t.name}
            </span>
          ))}
        </VelocityRow>
      </div>
    </div>
  );
}
