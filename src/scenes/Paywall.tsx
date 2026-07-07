import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { PhoneFrame } from "../components/PhoneFrame";
import { colors, fonts, gradients } from "../tokens";
import { useEnter } from "../utils";

const Feature: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const e = useEnter(delay);
  return (
    <div
      style={{
        opacity: e,
        transform: `translateX(${interpolate(e, [0, 1], [-14, 0])}px)`,
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 13,
        color: colors.textDark,
        fontWeight: 500,
      }}
    >
      <span style={{ color: colors.primary, fontWeight: 700 }}>✓</span>
      {text}
    </div>
  );
};

export const Paywall: React.FC = () => {
  const phone = useEnter(0);
  const plan = useEnter(24);

  return (
    <AbsoluteFill style={{ background: gradients.light }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 150 }}>
        <div style={{ textAlign: "center", marginBottom: 56, padding: "0 90px" }}>
          <div style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: 40, color: colors.textDark, lineHeight: 1.15 }}>
            Unlock your full vocabulary.
          </div>
        </div>

        <div style={{ opacity: phone, transform: `scale(${interpolate(phone, [0, 1], [0.92, 1])})` }}>
          <PhoneFrame>
            <div style={{ padding: "56px 24px 0", fontFamily: fonts.ui }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: colors.textDark, textAlign: "center" }}>
                VocabLock Pro
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
                <Feature text="Unlimited word pools and sessions" delay={4} />
                <Feature text="Focus lock — block distracting apps" delay={9} />
                <Feature text="Full history & spaced repetition" delay={14} />
                <Feature text="Import vocab from Instagram Reels" delay={19} />
              </div>

              <div
                style={{
                  marginTop: 26,
                  opacity: plan,
                  transform: `translateY(${interpolate(plan, [0, 1], [16, 0])}px)`,
                  border: `2px solid ${colors.primary}`,
                  borderRadius: 18,
                  padding: 16,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    right: 16,
                    background: colors.primary,
                    color: colors.foreground,
                    fontSize: 10,
                    fontWeight: 700,
                    borderRadius: 999,
                    padding: "3px 10px",
                  }}
                >
                  BEST VALUE
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: colors.textDark }}>Yearly</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: colors.textDark, marginTop: 2 }}>
                  $49.99<span style={{ fontSize: 12, color: colors.textMuted, fontWeight: 500 }}>/year</span>
                </div>
              </div>

              <div
                style={{
                  marginTop: 12,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 18,
                  padding: 16,
                  opacity: plan,
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 700, color: colors.textDark }}>Weekly</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: colors.textDark, marginTop: 2 }}>
                  $3.99<span style={{ fontSize: 12, color: colors.textMuted, fontWeight: 500 }}>/week</span>
                </div>
              </div>

              <div
                style={{
                  marginTop: 20,
                  height: 56,
                  borderRadius: 14,
                  background: colors.primary,
                  color: colors.foreground,
                  fontWeight: 700,
                  fontSize: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: plan,
                }}
              >
                Continue
              </div>
            </div>
          </PhoneFrame>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
