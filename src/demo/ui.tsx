import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts } from "../tokens";

const SOLID: Record<string, string> = {
  black: "#0b0b0c",
  dark: "#0e1625",
  lime: "#a2f023",
  light: "#f9fbf8",
};

/** Full-bleed flat brand-color backdrop — no gradient, changes per beat for punch. */
export const Stage: React.FC<{
  children: React.ReactNode;
  tone?: "light" | "dark" | "lime" | "black";
}> = ({ children, tone = "light" }) => (
  <AbsoluteFill style={{ background: SOLID[tone] }}>
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>{children}</AbsoluteFill>
  </AbsoluteFill>
);

/**
 * Renders one real, unmodified app screenshot with a 3D perspective tilt —
 * the screenshot pixels themselves are never redrawn or cropped. The device
 * flies in from an angle and settles into its target tilt on a snappy
 * spring. `children` are positioned in the screenshot's own pixel space so
 * overlays track the real UI exactly regardless of final on-canvas scale.
 */
export const TiltPhone: React.FC<{
  src: string;
  width?: number;
  height?: number;
  scale?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  shake?: boolean;
  children?: React.ReactNode;
}> = ({ src, width = 390, height = 815, scale = 2.3, rotateX = 4, rotateY = -8, rotateZ = 0, shake, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 14, mass: 0.9 } });
  const entryScale = interpolate(enter, [0, 1], [0.72, 1]);
  const entryRotY = interpolate(enter, [0, 1], [rotateY - 30, rotateY]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const shakeX = shake
    ? Math.sin(frame * 1.4) * interpolate(frame, [0, 20], [10, 0], { extrapolateRight: "clamp" })
    : 0;

  return (
    <div style={{ perspective: 1600, opacity }}>
      <div
        style={{
          transform: `translateX(${shakeX}px) scale(${entryScale * scale}) rotateX(${rotateX}deg) rotateY(${entryRotY}deg) rotateZ(${rotateZ}deg)`,
          transformStyle: "preserve-3d",
          transformOrigin: "center",
          position: "relative",
          width,
          height,
          filter: "drop-shadow(0 55px 100px rgba(0,0,0,0.5))",
        }}
      >
        <Img src={staticFile(src)} style={{ width, height, display: "block", borderRadius: 28 }} />
        {children}
      </div>
    </div>
  );
};

/**
 * The "flip" beat: two real full-screen captures (word / definition) joined
 * by a whole-device 3D rotation — a transition, not a redraw of the card.
 * Settles into a crossfade to a third real capture (progress advanced) so
 * the whole beat uses only genuine screenshots.
 */
export const RealFlip: React.FC<{
  frontSrc: string;
  backSrc: string;
  nextSrc: string;
  flipAt: number;
  nextAt: number;
  width?: number;
  height?: number;
  scale?: number;
  rotateX?: number;
  children?: React.ReactNode;
}> = ({ frontSrc, backSrc, nextSrc, flipAt, nextAt, width = 390, height = 815, scale = 2.3, rotateX = 2, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 14, mass: 0.9 } });
  const entryScale = interpolate(enter, [0, 1], [0.72, 1]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);

  const flip = interpolate(frame, [flipAt, flipAt + 16], [0, 180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const nextDissolve = interpolate(frame, [nextAt, nextAt + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ perspective: 1800, opacity }}>
      <div
        style={{
          transform: `scale(${entryScale * scale}) rotateX(${rotateX}deg)`,
          transformOrigin: "center",
          position: "relative",
          width,
          height,
          filter: "drop-shadow(0 55px 100px rgba(0,0,0,0.5))",
        }}
      >
        <div
          style={{
            position: "relative",
            width,
            height,
            transformStyle: "preserve-3d",
            transform: `rotateY(${flip}deg)`,
          }}
        >
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden" }}>
            <Img src={staticFile(frontSrc)} style={{ width, height, display: "block", borderRadius: 28 }} />
          </div>
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <Img src={staticFile(backSrc)} style={{ width, height, display: "block", borderRadius: 28 }} />
            <div style={{ position: "absolute", inset: 0, opacity: nextDissolve }}>
              <Img src={staticFile(nextSrc)} style={{ width, height, display: "block", borderRadius: 28 }} />
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

/** Bold staggered-line typography card — pure motion graphics, no screen involved. */
export const TitleCard: React.FC<{
  lines: string[];
  tone?: "light" | "dark" | "lime" | "black";
  color?: string;
  align?: "left" | "center";
  fontSize?: number;
}> = ({ lines, tone = "black", color = "#fff", align = "center", fontSize = 84 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage tone={tone}>
      <div style={{ display: "flex", flexDirection: "column", padding: "0 64px" }}>
        {lines.map((line, i) => {
          const e = spring({ frame: frame - i * 6, fps, config: { damping: 14 } });
          return (
            <div
              key={line}
              style={{
                fontFamily: fonts.ui,
                fontWeight: 700,
                fontSize,
                color,
                lineHeight: 1.05,
                letterSpacing: -2,
                textAlign: align,
                alignSelf: align === "center" ? "center" : i % 2 ? "flex-end" : "flex-start",
                opacity: e,
                transform: `translateY(${interpolate(e, [0, 1], [50, 0])}px)`,
              }}
            >
              {line}
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

const CONFETTI = new Array(26).fill(0).map((_, i) => ({
  id: i,
  x: random(`cx${i}`) * 340 + 25,
  hue: [colors.primary, "#3ddc97", "#ffc857", "#ff7a00"][i % 4],
  delay: random(`cd${i}`) * 8,
  drift: (random(`cr${i}`) - 0.5) * 60,
  size: 8 + random(`cs${i}`) * 8,
}));

/** Decorative confetti burst — sits on top of the real screenshot, never replaces it. */
export const ConfettiOverlay: React.FC<{ startAt: number; fromY?: number }> = ({ startAt, fromY = 120 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {CONFETTI.map((c) => {
        const local = frame - startAt - c.delay;
        if (local < 0) return null;
        const y = interpolate(local, [0, 60], [fromY, fromY + 560]);
        const op = interpolate(local, [0, 6, 50, 60], [0, 1, 1, 0]);
        const rot = local * 12;
        return (
          <div
            key={c.id}
            style={{
              position: "absolute",
              left: c.x + Math.sin(local / 8) * c.drift,
              top: y,
              width: c.size,
              height: c.size * 1.4,
              background: c.hue,
              borderRadius: 2,
              opacity: op,
              transform: `rotate(${rot}deg)`,
            }}
          />
        );
      })}
    </div>
  );
};
