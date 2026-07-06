import React from "react";
import { Stage, RealFlip, TapDot } from "./ui";

export const SessionFlip: React.FC = () => (
  <Stage tone="light">
    <RealFlip
      frontSrc="screens/Session.png"
      backSrc="screens/SessionRevealed.png"
      nextSrc="screens/SessionOnFire.png"
      flipAt={26}
      nextAt={78}
    >
      <TapDot x={195} y={410} at={20} />
      <TapDot x={290} y={748} at={72} />
    </RealFlip>
  </Stage>
);
