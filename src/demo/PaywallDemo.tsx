import React from "react";
import { Stage, TiltPhone } from "./ui";

export const PaywallDemo: React.FC = () => (
  <Stage tone="lime">
    <TiltPhone src="screens/Paywall.png" rotateX={-4} rotateY={-10} rotateZ={1} />
  </Stage>
);
