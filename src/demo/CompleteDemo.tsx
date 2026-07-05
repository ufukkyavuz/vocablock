import React from "react";
import { interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage, DemoPhone, colors, fonts } from "./ui";

const CONFETTI = new Array(28).fill(0).map((_, i) => ({
  id: i,
  x: random(`x${i}`) * 340 + 25,
  hue: [colors.primary, "#3ddc97", "#ffc857", "#ff7a00"][i % 4],
  delay: random(`d${i}`) * 10,
  drift: (random(`r${i}`) - 0.5) * 60,
  size: 8 + random(`s${i}`) * 8,
}));

export const CompleteDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ring = interpolate(frame, [8, 48], [0, 92], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pct = Math.round(ring);
  const circ = 2 * Math.PI * 70;
  const dash = (ring / 100) * circ;
  const stamp = spring({ frame: frame - 46, fps, config: { damping: 12 } });
  const banner = spring({ frame: frame - 54, fps, config: { damping: 15 } });
  const confettiStart = 44;

  return (
    <Stage tone="light">
      <DemoPhone>
        <div
          style={{
            padding: "80px 22px 0",
            fontFamily: fonts.ui,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 22,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* confetti burst */}
          {CONFETTI.map((c) => {
            const local = frame - confettiStart - c.delay;
            if (local < 0) return null;
            const y = interpolate(local, [0, 60], [340, 900]);
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

          {/* score ring */}
          <svg width={180} height={180} viewBox="0 0 180 180">
            <circle cx={90} cy={90} r={70} fill="none" stroke={colors.border} strokeWidth={14} />
            <circle
              cx={90}
              cy={90}
              r={70}
              fill="none"
              stroke={colors.primary}
              strokeWidth={14}
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circ}`}
              transform="rotate(-90 90 90)"
            />
            <text
              x={90}
              y={84}
              textAnchor="middle"
              fontFamily={fonts.ui}
              fontWeight={700}
              fontSize={40}
              fill={colors.textDark}
            >
              {pct}%
            </text>
            <text
              x={90}
              y={106}
              textAnchor="middle"
              fontFamily={fonts.ui}
              fontWeight={600}
              fontSize={11}
              fill={colors.textMuted}
              letterSpacing={1}
            >
              SCORE
            </text>
          </svg>

          <div
            style={{
              textAlign: "center",
              opacity: stamp,
              transform: `scale(${interpolate(stamp, [0, 1], [0.6, 1])})`,
            }}
          >
            <div
              style={{
                fontSize: 12,
                letterSpacing: 1.5,
                color: colors.textMuted,
                fontWeight: 600,
              }}
            >
              SESSION COMPLETE
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, color: colors.textDark }}>
              Excellent!
            </div>
          </div>

          {/* apps unlocked banner */}
          <div
            style={{
              marginTop: 6,
              background: colors.foreground,
              color: "#fff",
              borderRadius: 16,
              padding: "16px 22px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              opacity: banner,
              transform: `translateY(${interpolate(banner, [0, 1], [24, 0])}px)`,
            }}
          >
            <span style={{ fontSize: 22 }}>🔓</span>
            <span style={{ fontSize: 16, fontWeight: 700 }}>Apps unlocked</span>
          </div>
        </div>
      </DemoPhone>
    </Stage>
  );
};
