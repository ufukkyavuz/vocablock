import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage, DemoPhone, Caption, TapDot, colors, fonts } from "./ui";

const FLIP_AT = 30;
const GOT_IT_AT = 92;

export const SessionFlip: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flip = interpolate(frame, [FLIP_AT, FLIP_AT + 16], [0, 180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const showBack = flip > 90;

  const known = Math.round(
    interpolate(frame, [GOT_IT_AT, GOT_IT_AT + 12], [11, 12], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const progress = interpolate(
    frame,
    [0, 8, GOT_IT_AT, GOT_IT_AT + 12],
    [0, 22, 22, 24],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const gotScale =
    1 -
    0.08 *
      Math.max(0, Math.sin(interpolate(frame, [GOT_IT_AT, GOT_IT_AT + 8], [0, Math.PI], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));
  const flame = spring({ frame: frame - GOT_IT_AT, fps, config: { damping: 10 } });

  return (
    <Stage tone="light">
      <DemoPhone>
        <div
          style={{
            padding: "60px 22px 0",
            fontFamily: fonts.ui,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {/* header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 12,
                letterSpacing: 1.4,
                fontWeight: 700,
                color: colors.textMuted,
              }}
            >
              SESSION
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted }}>
              <b style={{ color: colors.textDark }}>{known}</b> / 50 known
            </span>
          </div>

          {/* progress bar */}
          <div
            style={{
              marginTop: 14,
              height: 8,
              borderRadius: 999,
              background: "rgba(0,0,0,0.07)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(progress / 50) * 100}%`,
                background: colors.primary,
                borderRadius: 999,
              }}
            />
          </div>

          {/* streak flame */}
          <div
            style={{
              marginTop: 12,
              display: "flex",
              justifyContent: "flex-end",
              opacity: flame,
              transform: `scale(${interpolate(flame, [0, 1], [0.4, 1])})`,
            }}
          >
            <div
              style={{
                background: "rgba(255,122,0,0.12)",
                color: "#ff7a00",
                borderRadius: 999,
                padding: "5px 12px",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              🔥 On fire
            </div>
          </div>

          {/* the flipping card */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              perspective: 1400,
            }}
          >
            <div
              style={{
                width: 300,
                height: 280,
                position: "relative",
                transformStyle: "preserve-3d",
                transform: `rotateY(${flip}deg)`,
              }}
            >
              {/* front */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  background: colors.card,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 26,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 14,
                  boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    letterSpacing: 1.5,
                    fontWeight: 700,
                    color: colors.textMuted,
                  }}
                >
                  WORD
                </span>
                <span style={{ fontSize: 46, fontWeight: 600, color: colors.textDark }}>
                  Ephemeral
                </span>
                <span style={{ fontSize: 12, color: colors.textMuted }}>
                  · tap to reveal ·
                </span>
              </div>

              {/* back */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  background: colors.foreground,
                  borderRadius: 26,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  gap: 14,
                  padding: "0 30px",
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 12,
                    letterSpacing: 1.5,
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  🇹🇷 TÜRKÇE
                </span>
                <span
                  style={{
                    fontFamily: fonts.serifBody,
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  kısa ömürlü
                </span>
                <span
                  style={{
                    fontFamily: fonts.serifBody,
                    fontSize: 14,
                    fontStyle: "italic",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  "The ephemeral beauty of cherry blossoms."
                </span>
              </div>
            </div>
          </div>

          {/* action buttons */}
          <div
            style={{
              display: "flex",
              gap: 12,
              paddingBottom: 40,
              opacity: showBack ? 1 : 0.35,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 60,
                borderRadius: 16,
                background: "rgba(220,38,38,0.1)",
                color: colors.destructive,
                fontWeight: 700,
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕ Don't Know
            </div>
            <div
              style={{
                flex: 1,
                height: 60,
                borderRadius: 16,
                background: colors.primary,
                color: colors.foreground,
                fontWeight: 700,
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${gotScale})`,
              }}
            >
              ✓ Got It!
            </div>
          </div>

          <TapDot x={195} y={330} at={FLIP_AT - 6} />
          <TapDot x={290} y={720} at={GOT_IT_AT - 4} />
        </div>
      </DemoPhone>
      <Caption text="Bildikçe kilit açılıyor" delay={GOT_IT_AT} />
    </Stage>
  );
};
