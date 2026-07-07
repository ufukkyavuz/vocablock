import React from "react";
import { Stage, TiltPhone } from "./ui";
import { DEMO_DURATIONS } from "./durations";

export const SessionConfig: React.FC = () => (
  <Stage tone="lime" caption="Pick your pool. Set your pace." captionDark>
    <TiltPhone
      src="screens/SessionConfig.png"
      durationInFrames={DEMO_DURATIONS.config}
      width={390}
      height={886}
      scale={1.65}
      anchorY={110}
      rotateX={-2}
      rotateY={-7}
      zoom={{ from: 1, to: 1.05 }}
      pan={{ from: 10, to: -55 }}
    />
  </Stage>
);
