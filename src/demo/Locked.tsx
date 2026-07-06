import React from "react";
import { Stage, TiltPhone } from "./ui";

export const Locked: React.FC = () => (
  <Stage tone="lime">
    <TiltPhone src="screens/Locked.png" rotateX={2} rotateY={-4} rotateZ={0} shake />
  </Stage>
);
