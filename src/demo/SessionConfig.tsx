import React from "react";
import { Stage, RealScreen, TapDot } from "./ui";
import { DEMO_DURATIONS } from "./durations";

export const SessionConfig: React.FC = () => (
  <Stage tone="light">
    <RealScreen
      src="screens/SessionConfig.png"
      durationInFrames={DEMO_DURATIONS.config}
      width={390}
      height={886}
      scale={2.1}
      kenBurns={{ fromScale: 1, toScale: 1.07, toY: -18 }}
    >
      <TapDot x={77} y={430} at={14} />
      <TapDot x={195} y={828} at={68} />
    </RealScreen>
  </Stage>
);
