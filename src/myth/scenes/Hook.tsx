import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { NightStage, MythCaption } from "../ui";
import { CitySkyline } from "../Characters";
import { Vortex } from "../Vortex";
import { MYTH_DURATIONS } from "../durations";

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const intensity = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp" });
  const fade = interpolate(
    frame,
    [0, 14, MYTH_DURATIONS.hook - 14, MYTH_DURATIONS.hook],
    [0, 1, 1, 1]
  );

  return (
    <NightStage>
      <div style={{ opacity: fade }}>
        <Vortex cx={540} cy={640} intensity={intensity} />
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, opacity: fade }}>
        <CitySkyline />
      </div>
      <MythCaption text="Geceler, ekranların girdabında kayboluyordu." delay={16} />
    </NightStage>
  );
};
