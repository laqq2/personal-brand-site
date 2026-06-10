import Lenis from "lenis";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseLenisOptions {
  enabled?: boolean;
  onProgress?: (progress: number) => void;
}

export function useLenis({ enabled = true, onProgress }: UseLenisOptions = {}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  const resetScroll = useCallback(() => {
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });
    setScrollProgress(0);
    onProgressRef.current?.(0);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setScrollProgress(0);
      return;
    }

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
      autoRaf: false,
    });

    lenisRef.current = lenis;
    lenis.scrollTo(0, { immediate: true });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const unsub = lenis.on("scroll", (e: { scroll: number; limit: number; progress?: number }) => {
      const clamped = Math.max(
        0,
        Math.min(1, e.progress ?? (e.limit > 0 ? e.scroll / e.limit : 0)),
      );
      setScrollProgress(clamped);
      onProgressRef.current?.(clamped);
    });

    return () => {
      unsub?.();
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return { scrollProgress, lenis: lenisRef, resetScroll };
}

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < breakpoint,
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}
