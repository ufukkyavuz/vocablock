import React from "react";
import { Stage, TiltPhone } from "./ui";
import { DEMO_DURATIONS } from "./durations";

export const Splash: React.FC = () => (
  <Stage tone="lime">
    <TiltPhone
      src="screens/splash.png"
      durationInFrames={DEMO_DURATIONS.splash}
      rotateX={3}
      rotateY={-6}
      zoom={{ from: 1, to: 1.05 }}
    />
  </Stage>
);
