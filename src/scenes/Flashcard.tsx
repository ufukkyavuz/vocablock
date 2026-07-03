import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { PhoneFrame } from "../components/PhoneFrame";
import { colors, fonts } from "../tokens";
import { useEnter } from "../utils";

const FLIP_START = 34;
const FLIP_END = 46;
const PRESS_AT = 90;

export const Flashcard: React.FC = () => {
  const frame = useCurrentFrame();
  const phone = useEnter(0);

  const flipT = interpolate(frame, [FLIP_START, FLIP_END], [0, 180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const showBack = flipT > 90;

  const progressPct = interpolate(frame, [PRESS_AT, PRESS_AT + 14], [0, 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pressScale = interpolate(frame, [PRESS_AT, PRESS_AT + 6, PRESS_AT + 14], [1, 0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: colors.background }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 150 }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: 56,
            padding: "0 90px",
          }}
        >
          <div style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: 44, color: colors.textDark, lineHeight: 1.15 }}>
            One word at a time.
          </div>
        </div>

        <div style={{ opacity: phone, transform: `scale(${interpolate(phone, [0, 1], [0.92, 1])})` }}>
          <PhoneFrame>
            <div style={{ padding: "48px 24px 0", fontFamily: fonts.ui, display: "flex", flexDirection: "column", height: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, letterSpacing: 1.5, fontWeight: 600, color: colors.textMuted }}>
                  SESSION
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted }}>
                  <b style={{ color: colors.textDark }}>{Math.round(progressPct)}</b> / 50 known
                </span>
              </div>

              <div style={{ marginTop: 14, height: 6, borderRadius: 999, background: "rgba(0,0,0,0.08)", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${(progressPct / 50) * 100}%`,
                    background: colors.primary,
                    borderRadius: 999,
                  }}
                />
              </div>

              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", perspective: 1200 }}>
                <div
                  style={{
                    width: 300,
                    height: 260,
                    position: "relative",
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${flipT}deg)`,
                  }}
                >
                  {/* Front */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      background: colors.card,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 24,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 12,
                    }}
                  >
                    <span style={{ fontSize: 12, letterSpacing: 1.5, fontWeight: 600, color: colors.textMuted }}>
                      WORD
                    </span>
                    <span style={{ fontSize: 42, fontWeight: 600, color: colors.textDark }}>Ephemeral</span>
                    <span style={{ fontSize: 12, color: colors.textMuted }}>· Tap to reveal ·</span>
                  </div>

                  {/* Back */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      background: colors.foreground,
                      borderRadius: 24,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      gap: 12,
                      padding: "0 28px",
                    }}
                  >
                    <span style={{ fontFamily: fonts.mono, fontSize: 12, letterSpacing: 1.5, color: "rgba(255,255,255,0.45)" }}>
                      DEFINITION
                    </span>
                    <span style={{ fontFamily: fonts.serifBody, fontSize: 18, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>
                      Lasting for a very short time
                    </span>
                    <span style={{ fontFamily: fonts.serifBody, fontSize: 13, fontStyle: "italic", color: "rgba(255,255,255,0.5)" }}>
                      "The ephemeral beauty of cherry blossoms draws millions every spring."
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, paddingBottom: 40, opacity: showBack ? 1 : 0.35 }}>
                <div
                  style={{
                    flex: 1,
                    height: 56,
                    borderRadius: 14,
                    background: "rgba(220,38,38,0.1)",
                    color: colors.destructive,
                    fontWeight: 700,
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ✕ Don't Know
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 56,
                    borderRadius: 14,
                    background: colors.primary,
                    color: colors.foreground,
                    fontWeight: 700,
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: `scale(${pressScale})`,
                  }}
                >
                  ✓ Got It!
                </div>
              </div>
            </div>
          </PhoneFrame>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
