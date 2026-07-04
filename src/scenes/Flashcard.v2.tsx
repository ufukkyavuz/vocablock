import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { PhoneFrame } from "../components/PhoneFrame";
import { colors, fonts } from "../tokens";
import { useEnter } from "../utils";

const WORDS = [
  { en: "hesitate", tr: "tereddüt etmek" },
  { en: "focus", tr: "odaklanmak" },
  { en: "improve", tr: "geliştirmek" },
];

const CARD_STARTS = [0, 46, 92];
const FLIP_START = 14;
const FLIP_END = 22;
const FLIP_MID = (FLIP_START + FLIP_END) / 2;

const activeCardIndex = (frame: number) => {
  for (let i = CARD_STARTS.length - 1; i >= 0; i -= 1) {
    if (frame >= CARD_STARTS[i]) return i;
  }
  return 0;
};

export const FlashcardV2: React.FC = () => {
  const frame = useCurrentFrame();
  const phone = useEnter(0);

  const cardIndex = activeCardIndex(frame);
  const localFrame = frame - CARD_STARTS[cardIndex];
  const word = WORDS[cardIndex];

  const flipT = interpolate(localFrame, [FLIP_START, FLIP_END], [0, 180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const showBack = localFrame >= FLIP_MID;

  const stepsDone = cardIndex + (showBack ? 1 : 0);
  const progressPct = (stepsDone / WORDS.length) * 100;

  const pressScale = interpolate(
    localFrame,
    [FLIP_END, FLIP_END + 4, FLIP_END + 10],
    [1, 0.94, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ background: colors.foreground }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 150 }}>
        <div style={{ textAlign: "center", marginBottom: 48, padding: "0 90px" }}>
          <div style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: 40, color: "#fff", lineHeight: 1.15 }}>
            Learn it in seconds.
          </div>
        </div>

        <div style={{ opacity: phone, transform: `scale(${interpolate(phone, [0, 1], [0.92, 1])})` }}>
          <PhoneFrame>
            <div style={{ padding: "48px 24px 0", fontFamily: fonts.ui, display: "flex", flexDirection: "column", height: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, letterSpacing: 1.5, fontWeight: 600, color: colors.textMuted }}>
                  SESSION
                </span>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: colors.primary,
                    boxShadow: `0 0 8px 2px ${colors.primary}88`,
                  }}
                />
              </div>

              <div style={{ marginTop: 14, height: 6, borderRadius: 999, background: "rgba(0,0,0,0.08)", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${progressPct}%`,
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
                    <span style={{ fontSize: 42, fontWeight: 600, color: colors.textDark }}>{word.en}</span>
                    <span style={{ fontSize: 12, color: colors.textMuted }}>· Tap to reveal ·</span>
                  </div>

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
                      TRANSLATION
                    </span>
                    <span style={{ fontFamily: fonts.serifBody, fontSize: 26, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>
                      {word.tr}
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
                    transform: `scale(${showBack ? pressScale : 1})`,
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
