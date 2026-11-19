import { motion } from "framer-motion";
import MaskText from "./MaskText";
import { EASE } from "../../lib/utils";

/**
 * Editorial section header: a hairline that draws across, an index + label
 * row, then a large masked headline with optional supporting copy.
 */
export default function SectionHeading({ index, label, lines, aside }) {
  return (
    <div className="mb-16 md:mb-24">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="hairline origin-left"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        className="mt-5 flex items-center justify-between"
      >
        <span className="label">
          <span className="text-ink">({index})</span>&nbsp;&nbsp;{label}
        </span>
        <span className="label hidden sm:inline">Muhammad Talha — Portfolio</span>
      </motion.div>

      <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:items-end">
        <MaskText
          lines={lines}
          className="text-[clamp(2.5rem,6.4vw,6rem)] font-medium leading-[0.98] tracking-tightest lg:col-span-8"
        />
        {aside && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.35, ease: EASE }}
            className="max-w-md text-base leading-relaxed text-muted lg:col-span-4 lg:justify-self-end"
          >
            {aside}
          </motion.p>
        )}
      </div>
    </div>
  );
}
