import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage, DemoPhone, Caption, TapDot, colors, fonts } from "./ui";

const TAP_AT = 20;

const Chip: React.FC<{
  label: string;
  selected: boolean;
  selectAt: number;
  delay: number;
}> = ({ label, selected, selectAt, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - delay, fps, config: { damping: 12 } });
  const sel = selected
    ? spring({ frame: frame - selectAt, fps, config: { damping: 10 } })
    : 0;
  return (
    <div
      style={{
        flex: 1,
        height: 74,
        borderRadius: 18,
        border: `2px solid ${sel > 0.3 ? colors.primary : colors.border}`,
        background:
          sel > 0.3 ? `rgba(162,240,35,${0.16 * sel})` : colors.card,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: pop,
        transform: `translateY(${interpolate(pop, [0, 1], [24, 0])}px) scale(${
          1 + sel * 0.06 * Math.sin(Math.min(sel, 1) * Math.PI)
        })`,
      }}
    >
      <span
        style={{
          fontFamily: fonts.ui,
          fontWeight: 700,
          fontSize: 30,
          color: colors.textDark,
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 11, color: colors.textMuted }}>words</span>
    </div>
  );
};

export const SessionConfig: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = Math.round(
    interpolate(frame, [TAP_AT + 6, TAP_AT + 26], [0, 100], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const minutes = Math.max(1, Math.round(count * 0.12));
  const startPulse =
    1 + 0.04 * Math.sin(Math.max(0, frame - 40) / 4);
  const sourceIn = spring({ frame: frame - 30, fps, config: { damping: 16 } });

  return (
    <Stage tone="light">
      <DemoPhone>
        <div
          style={{
            padding: "70px 22px 0",
            fontFamily: fonts.ui,
            height: "100%",
            position: "relative",
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 700, color: colors.textDark }}>
            New Session
          </div>
          <div style={{ fontSize: 13, color: colors.textMuted, marginTop: 4 }}>
            Pick your pool
          </div>

          {/* pool size */}
          <div
            style={{
              fontSize: 11,
              letterSpacing: 1.4,
              fontWeight: 700,
              color: colors.textMuted,
              marginTop: 28,
              marginBottom: 12,
            }}
          >
            POOL SIZE
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Chip label="50" selected={false} selectAt={0} delay={4} />
            <Chip label="100" selected selectAt={TAP_AT} delay={8} />
            <Chip label="200" selected={false} selectAt={0} delay={12} />
          </div>

          {/* word type segmented */}
          <div
            style={{
              fontSize: 11,
              letterSpacing: 1.4,
              fontWeight: 700,
              color: colors.textMuted,
              marginTop: 26,
              marginBottom: 12,
            }}
          >
            WORD TYPE
          </div>
          <div
            style={{
              display: "flex",
              background: colors.secondary,
              borderRadius: 16,
              padding: 5,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 5,
                left: 5,
                width: "calc(50% - 5px)",
                height: "calc(100% - 10px)",
                borderRadius: 12,
                background: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              }}
            />
            <div
              style={{
                flex: 1,
                textAlign: "center",
                padding: "14px 0",
                fontSize: 15,
                fontWeight: 700,
                color: colors.textDark,
                zIndex: 1,
              }}
            >
              New Words
            </div>
            <div
              style={{
                flex: 1,
                textAlign: "center",
                padding: "14px 0",
                fontSize: 15,
                fontWeight: 600,
                color: colors.textMuted,
                zIndex: 1,
              }}
            >
              Review
            </div>
          </div>

          {/* source cards */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 20,
              opacity: sourceIn,
              transform: `translateY(${interpolate(sourceIn, [0, 1], [20, 0])}px)`,
            }}
          >
            <div
              style={{
                flex: 1,
                borderRadius: 16,
                border: `2px solid ${colors.primary}`,
                background: "rgba(162,240,35,0.12)",
                padding: 14,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: colors.textDark }}>
                📚 Library
              </div>
              <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>
                100 new
              </div>
            </div>
            <div
              style={{
                flex: 1,
                borderRadius: 16,
                border: `1px solid ${colors.border}`,
                background: colors.card,
                padding: 14,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: "#d6336c" }}>
                ✦ Reels
              </div>
              <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>
                17 · 4 reels
              </div>
            </div>
          </div>

          {/* summary + start */}
          <div
            style={{
              position: "absolute",
              left: 22,
              right: 22,
              bottom: 42,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
                fontFamily: fonts.mono,
              }}
            >
              <span style={{ fontSize: 13, color: colors.textMuted }}>
                <b style={{ color: colors.textDark, fontSize: 18 }}>{count}</b>{" "}
                words
              </span>
              <span style={{ fontSize: 13, color: colors.textMuted }}>
                ~{minutes} min
              </span>
            </div>
            <div
              style={{
                height: 58,
                borderRadius: 16,
                background: colors.primary,
                color: colors.foreground,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 18,
                transform: `scale(${startPulse})`,
              }}
            >
              Start Session
            </div>
          </div>

          <TapDot x={195} y={330} at={TAP_AT} />
        </div>
      </DemoPhone>
      <Caption text="Havuzunu seç" delay={10} />
    </Stage>
  );
};
