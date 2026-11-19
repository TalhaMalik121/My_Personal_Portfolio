import { useEffect, useRef } from "react";

/**
 * A quiet field of dots. Near the cursor they brighten, grow and are gently
 * pushed away; everything eases back with per-dot interpolation, so motion
 * feels fluid rather than snappy. Pauses when offscreen.
 */
export default function DotGrid({ className, gap = 28, radius = 170 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(pointer: fine)").matches;
    let dots = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      const ox = (w % gap) / 2;
      const oy = (h % gap) / 2;
      for (let x = ox; x <= w; x += gap) {
        for (let y = oy; y <= h; y += gap) {
          dots.push({ bx: x, by: y, x, y, a: 0 });
        }
      }
    }

    function frame() {
      // Smooth the cursor itself for a silky trail
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;

      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const dx = d.bx - mouse.x;
        const dy = d.by - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const f = Math.max(0, 1 - dist / radius);
        const ease = f * f * (3 - 2 * f); // smoothstep
        const push = ease * 14;
        const tx = d.bx + (dist ? (dx / dist) * push : 0);
        const ty = d.by + (dist ? (dy / dist) * push : 0);
        d.x += (tx - d.x) * 0.14;
        d.y += (ty - d.y) * 0.14;
        d.a += (ease - d.a) * 0.14;

        const alpha = 0.09 + d.a * 0.75;
        const size = 0.9 + d.a * 1.4;
        ctx.fillStyle = `rgba(237, 237, 239, ${alpha})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function loop() {
      if (visible) frame();
      raf = requestAnimationFrame(loop);
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
      if (mouse.x < -1000) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
    };
    const onLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
    };

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    build();
    if (reduced) frame();
    else loop();

    const onResize = () => {
      build();
      if (reduced) frame();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [gap, radius]);

  return <canvas ref={ref} aria-hidden className={className} />;
}
