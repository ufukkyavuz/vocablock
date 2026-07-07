import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { PhoneFrame } from "../components/PhoneFrame";
import { colors, fonts, gradients } from "../tokens";
import { useEnter } from "../utils";

const StatPill: React.FC<{ value: string; label: string; delay: number }> = ({
  value,
  label,
  delay,
}) => {
  const e = useEnter(delay);
  return (
    <div
      style={{
        opacity: e,
        transform: `translateY(${interpolate(e, [0, 1], [16, 0])}px)`,
        flex: 1,
        background: "#fff",
        border: `1px solid ${colors.border}`,
        borderRadius: 18,
        padding: "14px 10px",
        textAlign: "center",
      }}
    >
      <div style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: 26, color: colors.textDark }}>
        {value}
      </div>
      <div style={{ fontFamily: fonts.ui, fontWeight: 500, fontSize: 12, color: colors.textMuted }}>
        {label}
      </div>
    </div>
  );
};

export const Hook: React.FC = () => {
  const title = useEnter(0);
  const headline = useEnter(4);

  return (
    <AbsoluteFill style={{ background: gradients.dark }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 140 }}>
        <div
          style={{
            opacity: headline,
            transform: `translateY(${interpolate(headline, [0, 1], [24, 0])}px)`,
            textAlign: "center",
            marginBottom: 56,
            padding: "0 90px",
          }}
        >
          <div style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: 44, color: "#fff", lineHeight: 1.15 }}>
            Doomscrolling teaches you nothing.
          </div>
        </div>

        <div style={{ opacity: title, transform: `scale(${interpolate(title, [0, 1], [0.92, 1])})` }}>
          <PhoneFrame>
            <div style={{ padding: "56px 20px 0", fontFamily: fonts.ui }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: colors.textDark }}>Your</span>
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: colors.textDark,
                    background: colors.primary,
                    borderRadius: 8,
                    padding: "1px 8px",
                  }}
                >
                  English
                </span>
                <span style={{ fontSize: 18, fontWeight: 700, color: colors.textDark }}>Progress</span>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <StatPill value="15" label="Learned" delay={8} />
                <StatPill value="8" label="Reinforced" delay={12} />
                <StatPill value="5" label="Due" delay={16} />
              </div>

              <div
                style={{
                  marginTop: 16,
                  background: "rgba(220,38,38,0.08)",
                  border: "1px solid rgba(220,38,38,0.25)",
                  borderRadius: 16,
                  padding: "12px 14px",
                  opacity: useEnter(22),
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: colors.destructive }}>
                  5 words due for review
                </div>
                <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>
                  Start a Review session to stay on track
                </div>
              </div>

              <div
                style={{
                  marginTop: 18,
                  fontSize: 11,
                  letterSpacing: 1,
                  fontWeight: 700,
                  color: colors.textMuted,
                  opacity: useEnter(28),
                }}
              >
                FROM INSTAGRAM
              </div>
              <div
                style={{
                  marginTop: 8,
                  background: "#fff",
                  border: `1px solid ${colors.border}`,
                  borderRadius: 16,
                  padding: 14,
                  opacity: useEnter(32),
                  transform: `translateY(${interpolate(useEnter(32), [0, 1], [14, 0])}px)`,
                }}
              >
                <div style={{ fontSize: 12, color: colors.textDark, fontWeight: 600 }}>
                  Tag us on a reel · we'll pull the vocab
                </div>
                <div style={{ display: "flex", gap: 18, marginTop: 10 }}>
                  {[
                    ["20", "Imported"],
                    ["3", "Learned"],
                    ["17", "To learn"],
                    ["4", "Reels"],
                  ].map(([v, l]) => (
                    <div key={l} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: colors.textDark }}>{v}</div>
                      <div style={{ fontSize: 9, color: colors.textMuted }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PhoneFrame>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
