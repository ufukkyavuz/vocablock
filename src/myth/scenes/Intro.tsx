import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { NightStage } from "../ui";
import { fonts } from "../../tokens";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame, fps, config: { damping: 200, mass: 0.8 } });
  return (
    <NightStage>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: fonts.serifBody,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 52,
            color: "#cfd8e6",
            opacity: e,
            transform: `translateY(${interpolate(e, [0, 1], [20, 0])}px)`,
            textAlign: "center",
            padding: "0 90px",
          }}
        >
          Bir varmış, bir yokmuş...
        </div>
      </div>
    </NightStage>
  );
};
