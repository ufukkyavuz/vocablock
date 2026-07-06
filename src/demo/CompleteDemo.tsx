import React from "react";
import { Stage, TiltPhone, ConfettiOverlay } from "./ui";
import { DEMO_DURATIONS } from "./durations";

export const CompleteDemo: React.FC = () => (
  <Stage tone="lime" caption="Every session, sharper." captionDark>
    <TiltPhone
      src="screens/Complete.png"
      durationInFrames={DEMO_DURATIONS.complete}
      scale={1.8}
      anchorY={110}
      rotateX={3}
      rotateY={5}
      zoom={{ from: 1.02, to: 1.08 }}
    >
      <ConfettiOverlay startAt={8} fromY={140} />
    </TiltPhone>
  </Stage>
);
