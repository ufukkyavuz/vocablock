import React from "react";
import { Stage, TiltPhone } from "./ui";

export const Splash: React.FC = () => (
  <Stage tone="lime">
    <TiltPhone src="screens/splash.png" rotateX={4} rotateY={-8} rotateZ={-2} />
  </Stage>
);
