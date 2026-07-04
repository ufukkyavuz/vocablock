import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { PhoneFrame } from "../components/PhoneFrame";
import { colors, fonts } from "../tokens";
import { useEnter } from "../utils";

const RING_END = 20;
const SWAP_START = 18;
const SWAP_END = 30;

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
        fontSize: 15,
        borderRadius: 999,
        padding: "10px 18px",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span style={{ fontSize: 13, color: colors.primary }}>✓</span>
      {label}
    </div>
  );
};

export const CompleteUnlockV2: React.FC = () => {
  const frame = useCurrentFrame();
  const phone = useEnter(0);

  const ring = interpolate(frame, [0, RING_END], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const circumference = 2 * Math.PI * 70;
  const dash = (ring / 100) * circumference;

  const phoneLayerOpacity = interpolate(frame, [SWAP_START, SWAP_END], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const unlockLayerOpacity = interpolate(frame, [SWAP_START, SWAP_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const unlockBounce = interpolate(
    frame,
    [SWAP_START, SWAP_START + 5, SWAP_START + 10],
    [0.6, 1.1, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const headline = useEnter(SWAP_END);

  return (
    <AbsoluteFill style={{ background: colors.foreground }}>
      <AbsoluteFill style={{ opacity: phoneLayerOpacity, alignItems: "center", justifyContent: "flex-start", paddingTop: 150 }}>
        <div style={{ opacity: phone, transform: `scale(${interpolate(phone, [0, 1], [0.92, 1])})` }}>
          <PhoneFrame>
            <div
              style={{
                padding: "90px 24px 0",
                fontFamily: fonts.ui,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              <svg width={170} height={170} viewBox="0 0 170 170">
                <circle cx={85} cy={85} r={70} fill="none" stroke={colors.border} strokeWidth={14} />
                <circle
                  cx={85}
                  cy={85}
                  r={70}
                  fill="none"
                  stroke={colors.primary}
                  strokeWidth={14}
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${circumference}`}
                  transform="rotate(-90 85 85)"
                />
                <text x={85} y={78} textAnchor="middle" fontFamily={fonts.ui} fontWeight={700} fontSize={36} fill={colors.textDark}>
                  {Math.round(ring)}%
                </text>
                <text x={85} y={100} textAnchor="middle" fontFamily={fonts.ui} fontWeight={600} fontSize={11} fill={colors.textMuted} letterSpacing={1}>
                  SESSION
                </text>
              </svg>
            </div>
          </PhoneFrame>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: unlockLayerOpacity, alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${colors.primary}55 0%, ${colors.primary}00 70%)`,
            transform: "translateY(-70px)",
          }}
        />
        <div
          style={{
            transform: `scale(${unlockBounce}) translateY(-70px)`,
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
            marginBottom: 30,
          }}
        >
          <div style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: 38, color: "#fff" }}>
            Apps unlocked now.
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, opacity: headline }}>
          <AppChip label="TikTok" delay={SWAP_END + 4} />
          <AppChip label="Instagram" delay={SWAP_END + 8} />
          <AppChip label="WhatsApp" delay={SWAP_END + 12} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
