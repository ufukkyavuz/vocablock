import React from "react";
import { Stage, TiltPhone } from "./ui";
import { DEMO_DURATIONS } from "./durations";

export const Home: React.FC = () => (
  <Stage tone="dark" caption="Track every word you've learned.">
    <TiltPhone
      src="screens/Home.png"
      durationInFrames={DEMO_DURATIONS.home}
      scale={1.8}
      anchorY={110}
      rotateX={3}
      rotateY={6}
      zoom={{ from: 1, to: 1.06 }}
      pan={{ from: 0, to: -16 }}
    />
  </Stage>
);
