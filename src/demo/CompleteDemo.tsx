import React from "react";
import { Stage, TiltPhone, ConfettiOverlay } from "./ui";

export const CompleteDemo: React.FC = () => (
  <Stage tone="lime">
    <TiltPhone src="screens/Complete.png" rotateX={5} rotateY={8} rotateZ={-1}>
      <ConfettiOverlay startAt={8} fromY={140} />
    </TiltPhone>
  </Stage>
);
