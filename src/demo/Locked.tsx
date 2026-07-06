import React from "react";
import { Stage, TiltPhone } from "./ui";
import { DEMO_DURATIONS } from "./durations";

export const Locked: React.FC = () => (
  <Stage tone="lime" caption="No shortcuts. Finish to unlock." captionDark>
    <TiltPhone
      src="screens/Locked.png"
      durationInFrames={DEMO_DURATIONS.locked}
      scale={1.8}
      anchorY={110}
      rotateX={1}
      rotateY={-3}
      zoom={{ from: 1.02, to: 1.07 }}
      shake
    />
  </Stage>
);
