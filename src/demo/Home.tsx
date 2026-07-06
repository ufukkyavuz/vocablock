import React from "react";
import { Stage, TiltPhone } from "./ui";

export const Home: React.FC = () => (
  <Stage tone="dark">
    <TiltPhone src="screens/Home.png" rotateX={5} rotateY={10} rotateZ={1} />
  </Stage>
);
