import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
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

export const LockScene: React.FC = () => {
  const headline = useEnter(0);
  const phone = useEnter(6);

  return (
    <AbsoluteFill style={{ background: colors.background }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 150 }}>
        <div
          style={{
            opacity: headline,
            transform: `translateY(${interpolate(headline, [0, 1], [24, 0])}px)`,
            textAlign: "center",
            marginBottom: 56,
            padding: "0 90px",
          }}
        >
          <div style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: 44, color: colors.textDark, lineHeight: 1.15 }}>
            So VocabLock locks them.
          </div>
        </div>

        <div style={{ opacity: phone, transform: `scale(${interpolate(phone, [0, 1], [0.92, 1])})` }}>
          <PhoneFrame>
            <div style={{ padding: "70px 24px 0", fontFamily: fonts.ui }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: colors.textDark }}>Focus Setup</div>
              <div style={{ fontSize: 13, color: colors.textMuted, marginTop: 4 }}>
                Locked until your session is done
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 36, alignItems: "flex-start" }}>
                <AppBadge label="TikTok" delay={10} />
                <AppBadge label="Instagram" delay={16} />
                <AppBadge label="WhatsApp" delay={22} />
              </div>

              <div
                style={{
                  marginTop: 44,
                  background: colors.card,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 20,
                  padding: 20,
                  opacity: useEnter(30),
                }}
              >
                <div style={{ fontSize: 13, color: colors.textMuted, fontWeight: 500 }}>
                  Free apps still available
                </div>
                <div style={{ fontSize: 13, color: colors.textDark, fontWeight: 600, marginTop: 6 }}>
                  X · YouTube · Snapchat
                </div>
              </div>
            </div>
          </PhoneFrame>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
