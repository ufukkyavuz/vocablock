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
import { colors } from "../tokens";

/** Full-frame backdrop behind the device — the real screens sit on top, untouched. */
export const Stage: React.FC<{
  children: React.ReactNode;
  tone?: "light" | "dark";
}> = ({ children, tone = "light" }) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 120], [0, 1], { extrapolateRight: "extend" });
  const angle = 155 + Math.sin(drift * Math.PI * 2) * 8;
  const bg =
    tone === "light"
      ? `linear-gradient(${angle}deg, #edf7dd 0%, #f9fbf8 50%, #f0f5ec 100%)`
      : `linear-gradient(${angle}deg, #16233b 0%, #0e1625 55%, #0a1017 100%)`;
  return (
    <AbsoluteFill style={{ background: bg }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

type KenBurns = {
  fromScale?: number;
  toScale?: number;
  fromX?: number;
  toX?: number;
  fromY?: number;
  toY?: number;
};

/**
 * Renders one real, unmodified app screenshot. The only motion applied is
 * camera-style (entrance spring + Ken Burns pan/zoom) — the screenshot
 * pixels themselves are never redrawn. `children` are positioned in the
 * screenshot's own pixel space (0..width, 0..height) so overlays (tap dots,
 * glows) track the real UI exactly regardless of final on-canvas scale.
 */
export const RealScreen: React.FC<{
  src: string;
  durationInFrames: number;
  width?: number;
  height?: number;
  scale?: number;
  kenBurns?: KenBurns;
  shake?: boolean;
  children?: React.ReactNode;
}> = ({
  src,
  durationInFrames,
  width = 390,
  height = 815,
  scale = 2.3,
  kenBurns,
  shake,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200, mass: 0.7 } });
  const entryScale = interpolate(enter, [0, 1], [0.92, 1]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);

  const kb: KenBurns = { fromScale: 1, toScale: 1.05, fromX: 0, toX: 0, fromY: 0, toY: -8, ...kenBurns };
  const t = interpolate(frame, [0, durationInFrames], [0, 1], { extrapolateRight: "clamp" });
  const kbScale = interpolate(t, [0, 1], [kb.fromScale!, kb.toScale!]);
  const kbX = interpolate(t, [0, 1], [kb.fromX!, kb.toX!]);
  const kbY = interpolate(t, [0, 1], [kb.fromY!, kb.toY!]);
  const shakeX = shake
    ? Math.sin(frame * 1.4) * interpolate(frame, [0, 20], [10, 0], { extrapolateRight: "clamp" })
    : 0;

  return (
    <div style={{ opacity, transform: `translate(${kbX + shakeX}px, ${kbY}px)` }}>
      <div
        style={{
          transform: `scale(${entryScale * scale * kbScale})`,
          transformOrigin: "center",
          position: "relative",
          width,
          height,
          filter: "drop-shadow(0 40px 90px rgba(0,0,0,0.35))",
        }}
      >
        <Img src={staticFile(src)} style={{ width, height, display: "block" }} />
        {children}
      </div>
    </div>
  );
};

/**
 * The "flip" beat: two real full-screen captures (word / definition) joined
 * by a whole-device 3D rotation — a standard mobile transition metaphor, not
 * a redraw of the card. Settles into a crossfade to a third real capture
 * (progress advanced) so the whole beat uses only genuine screenshots.
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
  children?: React.ReactNode;
}> = ({ frontSrc, backSrc, nextSrc, flipAt, nextAt, width = 390, height = 815, scale = 2.3, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200, mass: 0.7 } });
  const entryScale = interpolate(enter, [0, 1], [0.92, 1]);
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
    <div style={{ opacity }}>
      <div
        style={{
          transform: `scale(${entryScale * scale})`,
          transformOrigin: "center",
          position: "relative",
          width,
          height,
          filter: "drop-shadow(0 40px 90px rgba(0,0,0,0.35))",
          perspective: 1800,
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
            <Img src={staticFile(frontSrc)} style={{ width, height, display: "block" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <Img src={staticFile(backSrc)} style={{ width, height, display: "block" }} />
            <div style={{ position: "absolute", inset: 0, opacity: nextDissolve }}>
              <Img src={staticFile(nextSrc)} style={{ width, height, display: "block" }} />
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

/** Decorative tap ripple. x/y are in the screenshot's own pixel space. */
export const TapDot: React.FC<{ x: number; y: number; at: number }> = ({ x, y, at }) => {
  const frame = useCurrentFrame();
  const local = frame - at;
  if (local < 0 || local > 26) return null;
  const press = interpolate(local, [0, 6, 12], [0, 1, 0.85], { extrapolateRight: "clamp" });
  const ripple = interpolate(local, [0, 26], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: x, top: y, pointerEvents: "none" }}>
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
          background: "rgba(14,22,37,0.7)",
          transform: `scale(${press})`,
        }}
      />
    </div>
  );
};

/** Soft lime highlight pulse, screen-blended so it never occludes real content. */
export const PulseGlow: React.FC<{ x: number; y: number; size?: number }> = ({ x, y, size = 260 }) => {
  const frame = useCurrentFrame();
  const pulse = 0.22 + 0.18 * Math.sin(frame / 6);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(162,240,35,${pulse}) 0%, rgba(162,240,35,0) 70%)`,
        mixBlendMode: "screen",
        pointerEvents: "none",
      }}
    />
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
