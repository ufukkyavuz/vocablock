import React from "react";
import { Stage, RealScreen, PulseGlow } from "./ui";
import { DEMO_DURATIONS } from "./durations";

export const Locked: React.FC = () => (
  <Stage tone="dark">
    <RealScreen
      src="screens/Locked.png"
      durationInFrames={DEMO_DURATIONS.locked}
      shake
      kenBurns={{ fromScale: 1.02, toScale: 1.05 }}
    >
      <PulseGlow x={195} y={272} />
    </RealScreen>
  </Stage>
);
