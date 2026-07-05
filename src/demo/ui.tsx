import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts, gradients } from "../tokens";
import { PhoneFrame } from "../components/PhoneFrame";

// Scale factor so the 390×844 phone reads big on the 1080×1920 canvas.
export const PHONE_SCALE = 1.78;

/** Full-frame background: light or dark, with a slow living-gradient drift. */
export const Stage: React.FC<{
  children: React.ReactNode;
  tone?: "light" | "dark";
}> = ({ children, tone = "light" }) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 120], [0, 1], {
    extrapolateRight: "extend",
  });
  const angle = 155 + Math.sin(drift * Math.PI * 2) * 8;
  const base =
    tone === "light"
      ? `linear-gradient(${angle}deg, #edf7dd 0%, #f9fbf8 50%, #f0f5ec 100%)`
      : `linear-gradient(${angle}deg, #16233b 0%, #0e1625 55%, #0a1017 100%)`;
  return (
    <AbsoluteFill style={{ background: base }}>
      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** The device, scaled up and dropped in with a spring. */
export const DemoPhone: React.FC<{
  children: React.ReactNode;
  enterAt?: number;
  yOffset?: number;
}> = ({ children, enterAt = 0, yOffset = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({
    frame: frame - enterAt,
    fps,
    config: { damping: 200, mass: 0.7 },
  });
  const scale = interpolate(e, [0, 1], [0.9, PHONE_SCALE]);
  const opacity = interpolate(e, [0, 1], [0, 1]);
  const y = interpolate(e, [0, 1], [40, yOffset]);
  return (
    <div style={{ transform: `translateY(${y}px) scale(${scale})`, opacity }}>
      <PhoneFrame>{children}</PhoneFrame>
    </div>
  );
};

/** Bottom caption pill that springs up and holds. */
export const Caption: React.FC<{ text: string; delay?: number }> = ({
  text,
  delay = 6,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame: frame - delay, fps, config: { damping: 18 } });
  return (
    <div
      style={{
        position: "absolute",
        bottom: 150,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity: e,
        transform: `translateY(${interpolate(e, [0, 1], [40, 0])}px)`,
      }}
    >
      <div
        style={{
          background: colors.foreground,
          color: "#fff",
          fontFamily: fonts.ui,
          fontWeight: 700,
          fontSize: 40,
          letterSpacing: -0.5,
          padding: "20px 40px",
          borderRadius: 999,
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
        }}
      >
        {text}
      </div>
    </div>
  );
};

/** Animated tap ripple: a finger-dot lands at (x,y) at `at` and ripples out. */
export const TapDot: React.FC<{
  x: number;
  y: number;
  at: number;
}> = ({ x, y, at }) => {
  const frame = useCurrentFrame();
  const local = frame - at;
  if (local < 0 || local > 26) return null;
  const press = interpolate(local, [0, 6, 12], [0, 1, 0.85], {
    extrapolateRight: "clamp",
  });
  const ripple = interpolate(local, [0, 26], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ position: "absolute", left: x, top: y }}>
      <div
        style={{
          position: "absolute",
          width: 90,
          height: 90,
          marginLeft: -45,
          marginTop: -45,
          borderRadius: "50%",
          border: `4px solid ${colors.primary}`,
          transform: `scale(${interpolate(ripple, [0, 1], [0.3, 2.2])})`,
          opacity: interpolate(ripple, [0, 0.15, 1], [0, 0.9, 0]),
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 46,
          height: 46,
          marginLeft: -23,
          marginTop: -23,
          borderRadius: "50%",
          background: "rgba(14,22,37,0.85)",
          transform: `scale(${press})`,
        }}
      />
    </div>
  );
};

/** Reusable pill toggle that flips ON around frame `at`. */
export const Toggle: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - at, fps, config: { damping: 14 } });
  const track = interpolate(t, [0, 1], [0, 1]);
  return (
    <div
      style={{
        width: 52,
        height: 30,
        borderRadius: 999,
        background: `rgba(162,240,35,${track})`,
        border: `2px solid ${track > 0.5 ? colors.primary : colors.border}`,
        position: "relative",
        transition: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          left: 2,
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
          transform: `translateX(${interpolate(t, [0, 1], [0, 22])}px)`,
        }}
      />
    </div>
  );
};

export { colors, fonts, gradients };
