export const SPRING = { type: 'spring', stiffness: 90, damping: 22 };

export function prefersReducedMotion() {
  try {
    return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {
    return false;
  }
}

export function getTransition() {
  return prefersReducedMotion() ? { duration: 0 } : SPRING;
}
