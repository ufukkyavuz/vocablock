import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile } from "remotion";
import { colors, fonts } from "../tokens";
import { useEnter } from "../utils";

export const OutroV2: React.FC = () => {
  const logo = useEnter(0, { damping: 12 });
  const tagline = useEnter(14);
  const cta = useEnter(26);

  return (
    <AbsoluteFill
      style={{
        background: colors.foreground,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: "50%",
          opacity: logo,
          background: `radial-gradient(circle, ${colors.primary}40 0%, ${colors.primary}00 70%)`,
        }}
      />

      <div
        style={{
          opacity: logo,
          transform: `scale(${interpolate(logo, [0, 1], [0.6, 1])})`,
          width: 96,
          height: 96,
          borderRadius: 26,
          overflow: "hidden",
          marginBottom: 28,
        }}
      >
        <Img src={staticFile("vocablock-logo.svg")} style={{ width: "100%", height: "100%" }} />
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
          fontSize: 18,
          color: "rgba(255,255,255,0.75)",
          marginTop: 10,
        }}
      >
        Learn words. Unlock apps.
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
