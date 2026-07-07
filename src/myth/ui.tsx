import React from "react";
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../tokens";

const STARS = new Array(60).fill(0).map((_, i) => ({
  x: random(`sx${i}`) * 1080,
  y: random(`sy${i}`) * 1350,
  r: 1 + random(`sr${i}`) * 2,
  phase: random(`sp${i}`) * 10,
}));

/** Continuous night-sky backdrop shared by every scene — no per-scene color blocks. */
export const NightStage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(120% 90% at 50% 20%, #16233b 0%, #0e1625 45%, #070b12 100%)",
      }}
    >
      {STARS.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: s.r,
            height: s.r,
            borderRadius: "50%",
            background: "#fff",
            opacity: 0.25 + 0.55 * Math.abs(Math.sin(frame / 30 + s.phase)),
          }}
        />
      ))}
      {children}
    </AbsoluteFill>
  );
};

/** Explanatory headline — same role as the app-demo captions, now over illustration. */
export const MythCaption: React.FC<{ text: string; delay?: number; bottom?: boolean }> = ({
  text,
  delay = 6,
  bottom = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame: frame - delay, fps, config: { damping: 200, mass: 0.7 } });
  return (
    <div
      style={{
        position: "absolute",
        [bottom ? "bottom" : "top"]: 130,
        left: 0,
        right: 0,
        textAlign: "center",
        padding: "0 80px",
        fontFamily: fonts.ui,
        fontWeight: 700,
        fontSize: 54,
        lineHeight: 1.15,
        letterSpacing: -1,
        color: "#fff",
        textShadow: "0 4px 30px rgba(0,0,0,0.6)",
        opacity: e,
        transform: `translateY(${interpolate(e, [0, 1], [bottom ? 24 : -24, 0])}px)`,
      }}
    >
      {text}
    </div>
  );
};

/** A single ray in the light-burst effect. */
const Ray: React.FC<{ angle: number; length: number; opacity: number }> = ({ angle, length, opacity }) => (
  <div
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      width: 6,
      height: length,
      background: `linear-gradient(${colors.primary}, transparent)`,
      transform: `translate(-50%,-100%) rotate(${angle}deg)`,
      transformOrigin: "50% 100%",
      opacity,
    }}
  />
);

/** Radiating light burst — used for the gate breaking open / triumph beat. */
export const LightBurst: React.FC<{ progress: number; x: number; y: number; size?: number }> = ({
  progress,
  x,
  y,
  size = 1,
}) => {
  const rays = new Array(16).fill(0).map((_, i) => i * (360 / 16));
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `scale(${size})` }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: interpolate(progress, [0, 1], [0, 900]),
          height: interpolate(progress, [0, 1], [0, 900]),
          marginLeft: -interpolate(progress, [0, 1], [0, 450]),
          marginTop: -interpolate(progress, [0, 1], [0, 450]),
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(162,240,35,${0.85 * (1 - progress)}) 0%, rgba(162,240,35,0) 70%)`,
        }}
      />
      {rays.map((a, i) => (
        <Ray key={i} angle={a} length={interpolate(progress, [0, 1], [0, 260])} opacity={1 - progress} />
      ))}
    </div>
  );
};

/** Laurel wreath that draws itself leaf-by-leaf — classic Greek victory motif. */
export const LaurelWreath: React.FC<{ progress: number; size?: number }> = ({ progress, size = 320 }) => {
  const leavesPerSide = 9;
  const leaf = (side: 1 | -1, i: number) => {
    const t = i / (leavesPerSide - 1);
    const reveal = interpolate(progress, [t * 0.8, t * 0.8 + 0.2], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const angle = 40 + t * 120; // sweep from bottom to top
    const rad = (angle * Math.PI) / 180;
    const r = size * 0.42;
    const cx = size / 2 + side * Math.sin(rad) * r;
    const cy = size / 2 + Math.cos(rad) * r * 1.05;
    const rot = side * (angle - 90);
    return (
      <div
        key={`${side}-${i}`}
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          width: 34,
          height: 16,
          background: colors.primary,
          borderRadius: "50% 50% 50% 0",
          transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${reveal})`,
          opacity: reveal,
          boxShadow: "0 0 14px rgba(162,240,35,0.6)",
        }}
      />
    );
  };
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {new Array(leavesPerSide).fill(0).map((_, i) => leaf(-1, i))}
      {new Array(leavesPerSide).fill(0).map((_, i) => leaf(1, i))}
    </div>
  );
};

export { colors, fonts };
