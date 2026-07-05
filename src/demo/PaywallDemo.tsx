import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage, DemoPhone, colors, fonts } from "./ui";

const Feature: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame: frame - delay, fps, config: { damping: 16 } });
  return (
    <div
      style={{
        opacity: e,
        transform: `translateX(${interpolate(e, [0, 1], [-18, 0])}px)`,
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontSize: 15,
        color: colors.textDark,
        fontWeight: 500,
      }}
    >
      <span style={{ color: colors.primary, fontWeight: 700, fontSize: 18 }}>✓</span>
      {text}
    </div>
  );
};

export const PaywallDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const badge = spring({ frame: frame - 30, fps, config: { damping: 9 } });
  const cardIn = spring({ frame: frame - 24, fps, config: { damping: 16 } });
  const ctaPulse = 1 + 0.045 * Math.sin(Math.max(0, frame - 40) / 4);

  return (
    <Stage tone="light">
      <DemoPhone>
        <div style={{ padding: "60px 22px 0", fontFamily: fonts.ui, height: "100%" }}>
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: colors.textDark,
              textAlign: "center",
            }}
          >
            VocabLock Pro
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              marginTop: 22,
            }}
          >
            <Feature text="Unlimited word pools & sessions" delay={4} />
            <Feature text="Focus lock — block distracting apps" delay={9} />
            <Feature text="Full history & spaced repetition" delay={14} />
            <Feature text="Import vocab from Instagram Reels" delay={19} />
          </div>

          {/* yearly highlighted */}
          <div
            style={{
              marginTop: 26,
              opacity: cardIn,
              transform: `translateY(${interpolate(cardIn, [0, 1], [18, 0])}px)`,
              border: `2px solid ${colors.primary}`,
              borderRadius: 20,
              padding: 18,
              position: "relative",
              background: "rgba(162,240,35,0.08)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -14,
                right: 18,
                background: colors.primary,
                color: colors.foreground,
                fontSize: 11,
                fontWeight: 700,
                borderRadius: 999,
                padding: "4px 12px",
                opacity: badge,
                transform: `scale(${interpolate(badge, [0, 1], [0.4, 1])})`,
              }}
            >
              BEST VALUE · SAVE 88%
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: colors.textDark }}>
              Yearly
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: colors.textDark, marginTop: 2 }}>
              $49.99
              <span style={{ fontSize: 13, color: colors.textMuted, fontWeight: 500 }}>
                /year
              </span>
            </div>
            <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>
              3-day free trial, then $49.99/year
            </div>
          </div>

          <div
            style={{
              marginTop: 12,
              border: `1px solid ${colors.border}`,
              borderRadius: 20,
              padding: 16,
              opacity: cardIn,
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, color: colors.textDark }}>
              Weekly
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: colors.textDark }}>
              $7.99
              <span style={{ fontSize: 12, color: colors.textMuted, fontWeight: 500 }}>
                /week
              </span>
            </div>
          </div>

          <div
            style={{
              marginTop: 22,
              height: 60,
              borderRadius: 16,
              background: colors.primary,
              color: colors.foreground,
              fontWeight: 700,
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${ctaPulse})`,
            }}
          >
            Start free trial
          </div>
        </div>
      </DemoPhone>
    </Stage>
  );
};
