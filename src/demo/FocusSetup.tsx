import React from "react";
import { Stage, TiltPhone } from "./ui";
import { DEMO_DURATIONS } from "./durations";

export const FocusSetup: React.FC = () => (
  <Stage tone="dark" caption="Lock the apps that steal your focus.">
    <TiltPhone
      src="screens/FocusSetup.png"
      durationInFrames={DEMO_DURATIONS.focus}
      scale={1.8}
      anchorY={110}
      rotateX={3}
      rotateY={6}
      zoom={{ from: 1, to: 1.06 }}
      pan={{ from: 0, to: -14 }}
    />
  </Stage>
);
