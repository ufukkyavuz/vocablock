import React from "react";
import { Stage, RealScreen, ConfettiOverlay } from "./ui";
import { DEMO_DURATIONS } from "./durations";

export const CompleteDemo: React.FC = () => (
  <Stage tone="light">
    <RealScreen
      src="screens/Complete.png"
      durationInFrames={DEMO_DURATIONS.complete}
      kenBurns={{ fromScale: 1.02, toScale: 1.07, toY: -12 }}
    >
      <ConfettiOverlay startAt={10} fromY={140} />
    </RealScreen>
  </Stage>
);
