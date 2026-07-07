import React from "react";
import { Stage, RealFlip } from "./ui";
import { DEMO_DURATIONS } from "./durations";

export const SessionFlip: React.FC = () => (
  <Stage tone="dark" caption="Flip it. Lock it in.">
    <RealFlip
      frontSrc="screens/Session.png"
      backSrc="screens/SessionRevealed.png"
      nextSrc="screens/SessionOnFire.png"
      flipAt={26}
      nextAt={68}
      durationInFrames={DEMO_DURATIONS.flip}
      scale={1.8}
      anchorY={110}
      rotateX={1}
      zoom={{ from: 1, to: 1.05 }}
    />
  </Stage>
);
