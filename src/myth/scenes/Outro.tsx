import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { NightStage, LaurelWreath, colors, fonts } from "../ui";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = spring({ frame, fps, config: { damping: 12, mass: 0.8 } });
  const wreath = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const tagline = spring({ frame: frame - 20, fps, config: { damping: 18 } });

  return (
    <NightStage>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "relative", width: 260, height: 260 }}>
          <div style={{ position: "absolute", inset: 0 }}>
            <LaurelWreath progress={wreath} size={260} />
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 108,
              height: 108,
              marginLeft: -54,
              marginTop: -54,
              opacity: logo,
              transform: `scale(${interpolate(logo, [0, 1], [0.5, 1])})`,
            }}
          >
            <Img src={staticFile("screens/logo.png")} style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
        <div
          style={{
            marginTop: 18,
            fontFamily: fonts.ui,
            fontWeight: 700,
            fontSize: 50,
            color: "#fff",
            opacity: logo,
            transform: `translateY(${interpolate(logo, [0, 1], [14, 0])}px)`,
          }}
        >
          VocabLock
        </div>
        <div
          style={{
            marginTop: 8,
            fontFamily: fonts.ui,
            fontWeight: 500,
            fontSize: 21,
            color: colors.primary,
            opacity: tagline,
            transform: `translateY(${interpolate(tagline, [0, 1], [14, 0])}px)`,
          }}
        >
          Lock the scroll. Learn the word.
        </div>
      </div>
    </NightStage>
  );
};
