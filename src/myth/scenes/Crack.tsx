import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { NightStage, MythCaption } from "../ui";
import { Gate, Sphinx } from "../Characters";
import { MYTH_DURATIONS } from "../durations";

export const Crack: React.FC = () => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, MYTH_DURATIONS.crack], [0, 1], { extrapolateRight: "clamp" });
  const flicker = 0.9 + 0.1 * Math.sin(frame / 3);

  return (
    <NightStage>
      <div style={{ position: "absolute", left: "50%", top: 560, transform: "translateX(-50%)" }}>
        <Gate crack={Math.min(1, t * flicker)} open={0} />
      </div>
      <div style={{ position: "absolute", left: "50%", top: 1120, transform: "translateX(-46%)" }}>
        <Sphinx awe={t * 0.7} />
      </div>
      <MythCaption text="Her kelime, kilide bir çatlak." delay={6} />
    </NightStage>
  );
};
