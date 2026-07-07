import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { NightStage, MythCaption, LightBurst, LaurelWreath, colors, fonts } from "../ui";
import { Gate, Sphinx } from "../Characters";

export const Triumph: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const open = interpolate(frame, [10, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const burst = interpolate(frame, [12, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sphinxFade = interpolate(frame, [20, 50], [1, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const gateFade = interpolate(frame, [45, 65], [1, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const wreath = interpolate(frame, [38, 68], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scoreIn = spring({ frame: frame - 44, fps, config: { damping: 200, mass: 0.7 } });

  return (
    <NightStage>
      <div style={{ position: "absolute", left: "50%", top: 560, transform: "translateX(-50%)", opacity: gateFade }}>
        <Gate crack={1} open={open} />
      </div>
      <div style={{ position: "absolute", left: "50%", top: 1120, transform: "translateX(-46%)", opacity: sphinxFade }}>
        <Sphinx awe={1} />
      </div>
      <LightBurst progress={burst} x={540} y={870} />

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 780,
          transform: "translateX(-50%)",
        }}
      >
        <LaurelWreath progress={wreath} size={340} />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(-50%,-50%) scale(${interpolate(scoreIn, [0, 1], [0.6, 1])})`,
            textAlign: "center",
            opacity: scoreIn,
          }}
        >
          <div style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: 64, color: colors.primary }}>92%</div>
          <div style={{ fontFamily: fonts.ui, fontWeight: 600, fontSize: 20, color: "#cfd8e6", marginTop: 4 }}>
            KAPI AÇILDI
          </div>
        </div>
      </div>

      <MythCaption text="Elli kelime. Bir kapı. Sınırsız zaman." delay={52} />
    </NightStage>
  );
};
