import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage } from "./ui";
import { colors, fonts } from "../tokens";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = spring({ frame, fps, config: { damping: 12, mass: 0.8 } });
  const tagline = spring({ frame: frame - 14, fps, config: { damping: 18 } });

  return (
    <Stage tone="dark">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            width: 130,
            height: 130,
            opacity: logo,
            transform: `scale(${interpolate(logo, [0, 1], [0.5, 1])})`,
          }}
        >
          <Img src={staticFile("screens/logo.png")} style={{ width: "100%", height: "100%" }} />
        </div>
        <div
          style={{
            marginTop: 22,
            fontFamily: fonts.ui,
            fontWeight: 700,
            fontSize: 52,
            color: "#fff",
            opacity: logo,
            transform: `translateY(${interpolate(logo, [0, 1], [14, 0])}px)`,
          }}
        >
          VocabLock
        </div>
        <div
          style={{
            marginTop: 10,
            fontFamily: fonts.ui,
            fontWeight: 500,
            fontSize: 22,
            color: colors.primary,
            opacity: tagline,
            transform: `translateY(${interpolate(tagline, [0, 1], [14, 0])}px)`,
          }}
        >
          Lock the scroll. Learn the word.
        </div>
      </div>
    </Stage>
  );
};
