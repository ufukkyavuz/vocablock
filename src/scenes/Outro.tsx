import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { colors, fonts, gradients } from "../tokens";
import { useEnter } from "../utils";

export const Outro: React.FC = () => {
  const logo = useEnter(0, { damping: 12 });
  const tagline = useEnter(14);
  const cta = useEnter(26);

  return (
    <AbsoluteFill
      style={{
        background: gradients.dark,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          opacity: logo,
          transform: `scale(${interpolate(logo, [0, 1], [0.6, 1])})`,
          width: 96,
          height: 96,
          borderRadius: 26,
          background: colors.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: fonts.ui,
          fontWeight: 700,
          fontSize: 44,
          color: colors.foreground,
          marginBottom: 28,
        }}
      >
        V
      </div>

      <div
        style={{
          opacity: logo,
          transform: `translateY(${interpolate(logo, [0, 1], [10, 0])}px)`,
          fontFamily: fonts.ui,
          fontWeight: 700,
          fontSize: 40,
          color: "#fff",
        }}
      >
        VocabLock
      </div>

      <div
        style={{
          opacity: tagline,
          transform: `translateY(${interpolate(tagline, [0, 1], [14, 0])}px)`,
          fontFamily: fonts.ui,
          fontWeight: 500,
          fontSize: 16,
          color: "rgba(255,255,255,0.6)",
          marginTop: 10,
        }}
      >
        Lock the scroll. Learn the word.
      </div>

      <div
        style={{
          opacity: cta,
          transform: `translateY(${interpolate(cta, [0, 1], [14, 0])}px)`,
          marginTop: 36,
          background: colors.primary,
          color: colors.foreground,
          fontFamily: fonts.ui,
          fontWeight: 700,
          fontSize: 16,
          borderRadius: 999,
          padding: "16px 32px",
        }}
      >
        Download VocabLock
      </div>
    </AbsoluteFill>
  );
};
