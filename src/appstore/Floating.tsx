import React from "react";
import { colors, fonts } from "../tokens";

/**
 * UI lifted off the screen and floated in front of the device.
 *
 * The device is a long way away by the time it is scaled into a 1320px frame,
 * so the one or two elements that carry the frame's argument get pulled out and
 * enlarged. This is the difference between a screenshot the viewer has to read
 * and one they take in.
 */
export const FloatingCard: React.FC<{
  children: React.ReactNode;
  x?: number | string;
  y: number;
  width?: number;
  tone?: "light" | "dark" | "accent";
  tilt?: number;
  align?: "left" | "center";
}> = ({ children, x = "50%", y, width = 760, tone = "light", tilt = -1.5, align = "left" }) => {
  const tones = {
    light: { bg: "rgba(255,255,255,0.96)", fg: colors.textDark, border: "rgba(255,255,255,1)" },
    dark: { bg: "rgba(14,22,37,0.94)", fg: "#ffffff", border: "rgba(255,255,255,0.14)" },
    accent: { bg: colors.primary, fg: colors.foreground, border: "rgba(255,255,255,0.5)" },
  } as const;
  const t = tones[tone];

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        width,
        transform: `translateX(${x === "50%" ? "-50%" : "0"}) perspective(1800px) rotateZ(${tilt}deg) rotateY(${tilt * 1.6}deg)`,
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.border}`,
        borderRadius: 40,
        padding: "34px 42px",
        boxShadow:
          "0 40px 70px -22px rgba(24,40,20,0.42), 0 8px 20px rgba(24,40,20,0.16), inset 0 1px 0 rgba(255,255,255,0.6)",
        fontFamily: fonts.ui,
        textAlign: align,
      }}
    >
      {children}
    </div>
  );
};

/** The stat pills that hover across the device, one number each. */
export const FloatingPills: React.FC<{
  y: number;
  items: { label: string; value: string }[];
}> = ({ y, items }) => (
  <div
    style={{
      position: "absolute",
      top: y,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      gap: 22,
      padding: "0 40px",
    }}
  >
    {items.map((it, i) => (
      <div
        key={it.label}
        style={{
          background: "rgba(255,255,255,0.94)",
          border: "1px solid rgba(255,255,255,1)",
          borderRadius: 999,
          padding: "22px 34px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          boxShadow:
            "0 30px 54px -18px rgba(24,40,20,0.4), inset 0 1px 0 rgba(255,255,255,0.9)",
          transform: `rotateZ(${(i - (items.length - 1) / 2) * 1.6}deg) translateY(${Math.abs(i - (items.length - 1) / 2) * 12}px)`,
          fontFamily: fonts.ui,
        }}
      >
        <span style={{ fontSize: 34, fontWeight: 600, color: colors.textMuted }}>
          {it.label}
        </span>
        <span style={{ fontSize: 40, fontWeight: 800, color: colors.textDark }}>
          {it.value}
        </span>
      </div>
    ))}
  </div>
);

/** Notification-style card, the shape people recognise from their own phone. */
export const FloatingNotification: React.FC<{
  y: number;
  x?: number | string;
  width?: number;
  title: string;
  body: string;
  tilt?: number;
}> = ({ y, x = "50%", width = 720, title, body, tilt = -1.8 }) => (
  <FloatingCard x={x} y={y} width={width} tilt={tilt}>
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
      <div
        style={{
          width: 78,
          height: 78,
          borderRadius: 22,
          background: colors.foreground,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width={40} height={40} viewBox="0 0 24 24" fill="none">
          <rect x={4} y={10} width={16} height={10.5} rx={3} fill={colors.primary} />
          <path
            d="M7.75 10V7.4a4.25 4.25 0 0 1 8.5 0V10"
            stroke={colors.primary}
            strokeWidth={2.1}
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div style={{ display: "grid", gap: 6 }}>
        <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -0.8 }}>{title}</div>
        <div style={{ fontSize: 32, fontWeight: 500, color: colors.textMuted, lineHeight: 1.3 }}>
          {body}
        </div>
      </div>
    </div>
  </FloatingCard>
);
