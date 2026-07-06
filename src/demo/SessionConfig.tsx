import React from "react";
import { Stage, TiltPhone } from "./ui";

export const SessionConfig: React.FC = () => (
  <Stage tone="lime">
    <TiltPhone
      src="screens/SessionConfig.png"
      width={390}
      height={886}
      scale={2.1}
      rotateX={-3}
      rotateY={-12}
      rotateZ={-1}
    />
  </Stage>
);
