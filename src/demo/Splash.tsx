import React from "react";
import { Stage, RealScreen } from "./ui";
import { DEMO_DURATIONS } from "./durations";

export const Splash: React.FC = () => (
  <Stage tone="dark">
    <RealScreen
      src="screens/splash.png"
      durationInFrames={DEMO_DURATIONS.splash}
      kenBurns={{ fromScale: 1, toScale: 1.05, toY: -8 }}
    />
  </Stage>
);
