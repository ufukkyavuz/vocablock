import React from "react";
import { Stage, RealScreen, TapDot } from "./ui";
import { DEMO_DURATIONS } from "./durations";

export const FocusSetup: React.FC = () => (
  <Stage tone="light">
    <RealScreen
      src="screens/FocusSetup.png"
      durationInFrames={DEMO_DURATIONS.focus}
      kenBurns={{ fromScale: 1, toScale: 1.06, toY: -14 }}
    >
      <TapDot x={330} y={218} at={16} />
      <TapDot x={195} y={775} at={68} />
    </RealScreen>
  </Stage>
);
