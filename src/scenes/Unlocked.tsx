import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { colors, fonts, gradients } from "../tokens";
import { useEnter } from "../utils";

const AppChip: React.FC<{ label: string; delay: number }> = ({ label, delay }) => {
  const e = useEnter(delay);
  return (
    <div
      style={{
        opacity: e,
        transform: `scale(${interpolate(e, [0, 1], [0.7, 1])})`,
        background: "#fff",
        border: `1px solid ${colors.border}`,
        color: colors.textDark,
        fontFamily: fonts.ui,
        fontWeight: 600,
        fontSize: 16,
        borderRadius: 999,
        padding: "12px 22px",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <span style={{ fontSize: 15, color: colors.primary }}>✓</span>
      {label}
    </div>
  );
};

export const Unlocked: React.FC = () => {
  const headline = useEnter(0);
  const badge = useEnter(10, { damping: 12 });

  return (
    <AbsoluteFill style={{ background: gradients.dark, alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          opacity: badge,
          transform: `scale(${interpolate(badge, [0, 1], [0.5, 1])})`,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: colors.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 64,
          marginBottom: 40,
        }}
      >
        🔓
      </div>

      <div
        style={{
          opacity: headline,
          transform: `translateY(${interpolate(headline, [0, 1], [20, 0])}px)`,
          textAlign: "center",
          marginBottom: 34,
        }}
      >
        <div style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: 40, color: "#fff" }}>
          Apps unlocked.
        </div>
      </div>

      <div style={{ display: "flex", gap: 14 }}>
        <AppChip label="TikTok" delay={26} />
        <AppChip label="Instagram" delay={32} />
        <AppChip label="WhatsApp" delay={38} />
      </div>
    </AbsoluteFill>
  );
};
