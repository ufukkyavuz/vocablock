import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { NightStage, MythCaption } from "../ui";
import { Gate, Sphinx, Traveler } from "../Characters";

export const GateScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200, mass: 0.8 } });

  const walkT = interpolate(frame, [0, 55], [0, 1], { extrapolateRight: "clamp" });
  const travelerX = interpolate(walkT, [0, 1], [-140, 250]);

  return (
    <NightStage>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 560,
          transform: `translateX(-50%) scale(${interpolate(enter, [0, 1], [0.85, 1])})`,
          opacity: enter,
        }}
      >
        <Gate crack={0} open={0} />
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 1120,
          transform: `translateX(-46%) scale(${interpolate(enter, [0, 1], [0.85, 1])})`,
          opacity: enter,
        }}
      >
        <Sphinx awe={0} />
      </div>
      <div style={{ position: "absolute", left: `calc(50% + ${travelerX}px)`, top: 1250 }}>
        <Traveler walk={frame} />
      </div>
      <MythCaption text="Şehrin kapısını bir bilmece bekliyordu." delay={20} />
    </NightStage>
  );
};
