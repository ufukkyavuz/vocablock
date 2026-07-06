import React from "react";
import { Stage, RealFlip } from "./ui";

export const SessionFlip: React.FC = () => (
  <Stage tone="dark">
    <RealFlip
      frontSrc="screens/Session.png"
      backSrc="screens/SessionRevealed.png"
      nextSrc="screens/SessionOnFire.png"
      flipAt={20}
      nextAt={60}
      rotateX={2}
    />
  </Stage>
);
