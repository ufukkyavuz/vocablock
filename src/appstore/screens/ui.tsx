import React from "react";
import { colors, fonts } from "../../tokens";

/** Shared primitives for the static app screens used in the screenshot set. */

export const Screen: React.FC<{
  children: React.ReactNode;
  background?: string;
  padding?: string;
}> = ({ children, background = colors.background, padding = "72px 24px 0" }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background,
      fontFamily: fonts.ui,
      padding,
      boxSizing: "border-box",
    }}
  >
    {children}
  </div>
);

export const Eyebrow: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = colors.textMuted,
}) => (
  <div
    style={{
      fontFamily: fonts.mono,
      fontSize: 11,
      letterSpacing: 1.6,
      fontWeight: 500,
      color,
    }}
  >
    {children}
  </div>
);

export const Title: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = colors.textDark,
}) => (
  <div style={{ fontSize: 24, fontWeight: 700, color, marginTop: 6, letterSpacing: -0.4 }}>
    {children}
  </div>
);

export const Card: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      background: colors.card,
      border: `1px solid ${colors.border}`,
      borderRadius: 20,
      padding: 16,
      ...style,
    }}
  >
    {children}
  </div>
);

export const PrimaryButton: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      height: 56,
      borderRadius: 16,
      background: colors.primary,
      color: colors.foreground,
      fontWeight: 700,
      fontSize: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </div>
);

export const Stat: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div style={{ flex: 1, textAlign: "center" }}>
    <div style={{ fontSize: 22, fontWeight: 700, color: colors.textDark }}>{value}</div>
    <div style={{ fontSize: 10, fontWeight: 500, color: colors.textMuted, marginTop: 2 }}>
      {label}
    </div>
  </div>
);

export const Chip: React.FC<{
  children: React.ReactNode;
  tone?: "accent" | "neutral" | "dark";
}> = ({ children, tone = "neutral" }) => {
  const tones = {
    accent: { bg: colors.primary, fg: colors.foreground, border: "transparent" },
    neutral: { bg: colors.card, fg: colors.textDark, border: colors.border },
    dark: { bg: colors.foreground, fg: "#fff", border: "transparent" },
  } as const;
  const t = tones[tone];
  return (
    <div
      style={{
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.border}`,
        borderRadius: 999,
        padding: "8px 14px",
        fontSize: 13,
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      {children}
    </div>
  );
};

export const LockGlyph: React.FC<{ size?: number; color?: string }> = ({
  size = 22,
  color = colors.foreground,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x={4} y={10} width={16} height={10.5} rx={3} fill={color} />
    <path
      d="M7.75 10V7.4a4.25 4.25 0 0 1 8.5 0V10"
      stroke={color}
      strokeWidth={2.1}
      strokeLinecap="round"
    />
  </svg>
);

export const CheckGlyph: React.FC<{ size?: number; color?: string }> = ({
  size = 16,
  color = colors.primary,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M4.5 12.5 10 18 19.5 6.5"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Rounded app tile stand-in — abstract on purpose, no third-party marks. */
export const AppTile: React.FC<{ from: string; to: string; size?: number }> = ({
  from,
  to,
  size = 40,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.28,
      background: `linear-gradient(135deg, ${from}, ${to})`,
      flexShrink: 0,
    }}
  />
);
