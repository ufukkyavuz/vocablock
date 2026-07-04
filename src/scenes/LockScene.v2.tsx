import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { PhoneFrame } from "../components/PhoneFrame";
import { colors, fonts } from "../tokens";
import { useEnter } from "../utils";

const AppBadge: React.FC<{ label: string; delay: number }> = ({ label, delay }) => {
  const e = useEnter(delay);
  return (
    <div
      style={{
        opacity: e,
        transform: `scale(${interpolate(e, [0, 1], [0.7, 1])})`,
        background: colors.foreground,
        color: "#fff",
        fontFamily: fonts.ui,
        fontWeight: 600,
        fontSize: 14,
        borderRadius: 999,
        padding: "10px 18px",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span style={{ fontSize: 14 }}>🔒</span>
      {label}
    </div>
  );
};

export const LockSceneV2: React.FC = () => {
  const frame = useCurrentFrame();
  const sheet = useEnter(0, { damping: 200, mass: 0.8 });
  const halo = useEnter(6);
  const pulse = 1 + Math.sin(frame / 10) * 0.04;

  return (
    <AbsoluteFill style={{ background: colors.foreground }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            position: "absolute",
            top: 90,
            opacity: halo,
            width: 200,
            height: 200,
            borderRadius: "50%",
            transform: `scale(${pulse})`,
            background: `radial-gradient(circle, ${colors.primary}55 0%, ${colors.primary}00 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 150,
            opacity: halo,
            fontSize: 72,
          }}
        >
          🔒
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            opacity: sheet,
            transform: `translateY(${interpolate(sheet, [0, 1], [PHONE_SHEET_OFFSET, 0])}px)`,
          }}
        >
          <PhoneFrame>
            <div style={{ padding: "70px 24px 0", fontFamily: fonts.ui }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: colors.textDark }}>Focus Setup</div>
              <div style={{ fontSize: 13, color: colors.textMuted, marginTop: 4 }}>
                Locked until your session is done
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 32, alignItems: "flex-start" }}>
                <AppBadge label="TikTok" delay={16} />
                <AppBadge label="Instagram" delay={22} />
                <AppBadge label="WhatsApp" delay={28} />
              </div>
            </div>
          </PhoneFrame>
        </div>

        <div
          style={{
            position: "absolute",
            top: 640,
            opacity: useEnter(20),
            textAlign: "center",
            padding: "0 90px",
          }}
        >
          <div style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: 40, color: "#fff", lineHeight: 1.2 }}>
            Learn 10 words first.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const PHONE_SHEET_OFFSET = 520;
