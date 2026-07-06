import React from "react";
import { Stage, TiltPhone } from "./ui";

export const FocusSetup: React.FC = () => (
  <Stage tone="dark">
    <TiltPhone src="screens/FocusSetup.png" rotateX={4} rotateY={9} rotateZ={2} />
  </Stage>
);
