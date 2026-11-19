import { motion } from "framer-motion";
import { cn, EASE } from "../../lib/utils";

/**
 * Masked word reveal. Each word slides up from behind its own clip.
 * `lines` lets you control line breaks: an array of strings (one per line).
 * Words wrapped in *asterisks* get the `highlightClass`.
 */
export default function MaskText({
  lines,
  as = "h2",
  className,
  highlightClass = "text-dim",
  delay = 0,
  stagger = 0.06,
  animate, // pass "visible"/"hidden" to control externally; otherwise reveals in view
  once = true,
}) {
  const Tag = motion[as];
  let index = 0;
  let inHighlight = false;

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word = {
    hidden: { y: "105%" },
    visible: { y: "0%", transition: { duration: 1.1, ease: EASE } },
  };

  const control = animate
    ? { initial: "hidden", animate }
    : { initial: "hidden", whileInView: "visible", viewport: { once, amount: 0.35 } };

  return (
    <Tag variants={container} {...control} className={className}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((raw) => {
            // *multi word highlight* spans several words
            let w = raw;
            if (w.startsWith("*")) {
              inHighlight = true;
              w = w.slice(1);
            }
            const hl = inHighlight;
            if (w.endsWith("*")) {
              inHighlight = false;
              w = w.slice(0, -1);
            }
            index += 1;
            return (
              <span key={index} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
                <motion.span variants={word} className={cn("inline-block will-change-transform", hl && highlightClass)}>
                  {w}
                </motion.span>
                <span className="inline-block">&nbsp;</span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
