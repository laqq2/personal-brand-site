import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useApp } from "../../hooks/useAppContext";
import { useTheme } from "../../hooks/useTheme";
import { RING_LABELS, RIVE_CONFIG } from "../../lib/constants";
import { IRIS_SLIDES } from "../../data/content";
import { TerminalIrisFallback } from "./TerminalIrisFallback";
import { RingSegmentHitZones } from "./RingSegmentHitZones";
import "./HeroTerminal.css";

export function HeroTerminal() {
  const { scrollProgress, mouseX, mouseY, portraitIndex, ecosystemOpen } = useApp();
  const { isDark } = useTheme();
  const [riveFailed, setRiveFailed] = useState(false);
  const [riveLoaded, setRiveLoaded] = useState(false);

  const { rive, RiveComponent } = useRive({
    src: RIVE_CONFIG.src,
    stateMachines: RIVE_CONFIG.stateMachine,
    autoplay: true,
    onLoad: () => setRiveLoaded(true),
    onLoadError: () => setRiveFailed(true),
  });

  const scrollInput = useStateMachineInput(rive, RIVE_CONFIG.stateMachine, RIVE_CONFIG.inputs.scrollProgress);
  const mouseXInput = useStateMachineInput(rive, RIVE_CONFIG.stateMachine, RIVE_CONFIG.inputs.mouseX);
  const mouseYInput = useStateMachineInput(rive, RIVE_CONFIG.stateMachine, RIVE_CONFIG.inputs.mouseY);
  const isDarkInput = useStateMachineInput(rive, RIVE_CONFIG.stateMachine, RIVE_CONFIG.inputs.isDark);
  const portraitInput = useStateMachineInput(rive, RIVE_CONFIG.stateMachine, RIVE_CONFIG.inputs.portraitIndex);
  const ecosystemInput = useStateMachineInput(rive, RIVE_CONFIG.stateMachine, RIVE_CONFIG.inputs.ecosystemClick);

  const prevEcosystem = useRef(false);

  useEffect(() => {
    if (scrollInput) scrollInput.value = scrollProgress;
  }, [scrollInput, scrollProgress]);

  useEffect(() => {
    if (mouseXInput) mouseXInput.value = mouseX;
    if (mouseYInput) mouseYInput.value = mouseY;
  }, [mouseXInput, mouseYInput, mouseX, mouseY]);

  useEffect(() => {
    if (isDarkInput) isDarkInput.value = isDark;
  }, [isDarkInput, isDark]);

  useEffect(() => {
    if (portraitInput) portraitInput.value = portraitIndex;
  }, [portraitInput, portraitIndex]);

  useEffect(() => {
    if (ecosystemOpen && !prevEcosystem.current && ecosystemInput) {
      ecosystemInput.fire();
    }
    prevEcosystem.current = ecosystemOpen;
  }, [ecosystemOpen, ecosystemInput]);

  useEffect(() => {
    if (rive && !riveFailed) setRiveLoaded(true);
  }, [rive, riveFailed]);

  useEffect(() => {
    if (import.meta.env.DEV && riveLoaded && rive) {
      console.info("[Rive] TerminalIris loaded — inputs wired:", RIVE_CONFIG.inputs);
    }
  }, [riveLoaded, rive]);

  const useFallback = riveFailed || !riveLoaded;

  return (
    <div
      className={`hero-terminal ${ecosystemOpen ? "hero-terminal--ecosystem" : ""}`}
      style={{
        transform: useFallback
          ? `perspective(800px) rotateX(${mouseY * -4}deg) rotateY(${mouseX * 4}deg)`
          : undefined,
      }}
    >
      {useFallback ? (
        <TerminalIrisFallback
          scrollProgress={scrollProgress}
          portraitIndex={portraitIndex}
          ecosystemOpen={ecosystemOpen}
          isDark={isDark}
        />
      ) : (
        <RiveComponent className="hero-terminal__rive" />
      )}

      {useFallback && (
        <div className="hero-terminal__labels" aria-hidden="true">
          {RING_LABELS.map((label, i) => (
            <span
              key={label}
              className="hero-terminal__label font-display"
              style={{ "--i": i } as CSSProperties}
            >
              {label}
            </span>
          ))}
        </div>
      )}

      <RingSegmentHitZones />

      <div className="sr-only" aria-live="polite">
        Terminal iris showing {IRIS_SLIDES[portraitIndex]?.label}
      </div>
    </div>
  );
}
