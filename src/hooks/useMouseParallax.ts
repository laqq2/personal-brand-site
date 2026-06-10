import { useEffect, useRef, useState } from "react";

const LERP = 0.12;

export function useMouseParallax(enabled = true) {
  const [mouse, setMouse] = useState({ x: 0, y: 0, normX: 0.5, normY: 0.5 });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      const normX = e.clientX / window.innerWidth;
      const normY = e.clientY / window.innerHeight;
      target.current = {
        x: (normX - 0.5) * 2,
        y: (normY - 0.5) * 2,
      };
      setMouse((prev) => ({ ...prev, normX, normY }));
      if (!raf.current) raf.current = requestAnimationFrame(tick);
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * LERP;
      current.current.y += (target.current.y - current.current.y) * LERP;
      setMouse((prev) => ({
        ...prev,
        x: current.current.x,
        y: current.current.y,
      }));
      if (
        Math.abs(target.current.x - current.current.x) > 0.001 ||
        Math.abs(target.current.y - current.current.y) > 0.001
      ) {
        raf.current = requestAnimationFrame(tick);
      } else {
        raf.current = null;
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  return mouse;
}
