import React from "react";
import { Stage, RealScreen, TapDot } from "./ui";
import { DEMO_DURATIONS } from "./durations";

export const Home: React.FC = () => (
  <Stage tone="light">
    <RealScreen
      src="screens/Home.png"
      durationInFrames={DEMO_DURATIONS.home}
      kenBurns={{ fromScale: 1, toScale: 1.07, toY: -16 }}
    >
      <TapDot x={195} y={758} at={68} />
    </RealScreen>
  </Stage>
);
