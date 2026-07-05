import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage, colors, fonts } from "./ui";

const FLOAT_WORDS = [
  { w: "ephemeral", x: 120, y: 260, d: 8 },
  { w: "resilient", x: 720, y: 420, d: 14 },
  { w: "eloquent", x: 90, y: 1400, d: 20 },
  { w: "vivid", x: 780, y: 1300, d: 26 },
  { w: "candor", x: 640, y: 1550, d: 32 },
];

const Letter: React.FC<{ ch: string; delay: number }> = ({ ch, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame: frame - delay, fps, config: { damping: 13 } });
  return (
    <span
      style={{
        display: "inline-block",
        opacity: e,
        transform: `translateY(${interpolate(e, [0, 1], [40, 0])}px)`,
      }}
    >
      {ch}
    </span>
  );
};

export const Splash: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logo = spring({ frame, fps, config: { damping: 11, mass: 0.8 } });
  const logoRot = interpolate(logo, [0, 1], [-25, 0]);
  const glow = interpolate(
    frame,
    [0, 20, 40, 60],
    [0, 0.9, 0.4, 0.7],
    { extrapolateRight: "clamp" },
  );
  const tagline = spring({ frame: frame - 26, fps, config: { damping: 18 } });

  const word = "VocabLock";

  return (
    <Stage tone="light">
      {/* drifting background vocab words (parallax) */}
      {FLOAT_WORDS.map((f) => {
        const fe = interpolate(frame, [f.d, f.d + 30], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const drift = Math.sin((frame + f.d * 6) / 40) * 10;
        return (
          <div
            key={f.w}
            style={{
              position: "absolute",
              left: f.x,
              top: f.y + drift,
              fontFamily: fonts.serifBody,
              fontStyle: "italic",
              fontSize: 40,
              color: "rgba(14,22,37,0.06)",
              opacity: fe,
            }}
          >
            {f.w}
          </div>
        );
      })}

      {/* logo mark */}
      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: 54,
          background: colors.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: fonts.ui,
          fontWeight: 700,
          fontSize: 120,
          color: colors.foreground,
          transform: `scale(${interpolate(logo, [0, 1], [0.4, 1])}) rotate(${logoRot}deg)`,
          opacity: logo,
          boxShadow: `0 30px 80px rgba(162,240,35,${glow * 0.6}), 0 0 ${glow * 90}px rgba(162,240,35,${glow})`,
          marginBottom: 60,
        }}
      >
        V
      </div>

      {/* wordmark, staggered letters */}
      <div
        style={{
          fontFamily: fonts.ui,
          fontWeight: 700,
          fontSize: 96,
          color: colors.foreground,
          letterSpacing: -2,
        }}
      >
        {word.split("").map((ch, i) => (
          <Letter key={i} ch={ch} delay={14 + i * 2.5} />
        ))}
      </div>

      {/* tagline */}
      <div
        style={{
          marginTop: 26,
          fontFamily: fonts.ui,
          fontWeight: 500,
          fontSize: 40,
          color: colors.textMuted,
          opacity: tagline,
          transform: `translateY(${interpolate(tagline, [0, 1], [20, 0])}px)`,
        }}
      >
        Lock the scroll. Learn the word.
      </div>
    </Stage>
  );
};
