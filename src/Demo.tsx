import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Splash } from "./demo/Splash";
import { SessionConfig } from "./demo/SessionConfig";
import { FocusSetup } from "./demo/FocusSetup";
import { Locked } from "./demo/Locked";
import { SessionFlip } from "./demo/SessionFlip";
import { CompleteDemo } from "./demo/CompleteDemo";
import { PaywallDemo } from "./demo/PaywallDemo";

const T = 12;

export const DEMO_DURATIONS = {
  splash: 66,
  config: 66,
  focus: 72,
  locked: 40,
  flip: 130,
  complete: 78,
  paywall: 84,
};

export const DEMO_TOTAL =
  Object.values(DEMO_DURATIONS).reduce((a, b) => a + b, 0) -
  T * (Object.keys(DEMO_DURATIONS).length - 1);

const timing = linearTiming({ durationInFrames: T });

export const Demo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={DEMO_DURATIONS.splash}>
        <Splash />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={timing} presentation={slide({ direction: "from-right" })} />

      <TransitionSeries.Sequence durationInFrames={DEMO_DURATIONS.config}>
        <SessionConfig />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={timing} presentation={slide({ direction: "from-bottom" })} />

      <TransitionSeries.Sequence durationInFrames={DEMO_DURATIONS.focus}>
        <FocusSetup />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={timing} presentation={fade()} />

      <TransitionSeries.Sequence durationInFrames={DEMO_DURATIONS.locked}>
        <Locked />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={timing} presentation={slide({ direction: "from-right" })} />

      <TransitionSeries.Sequence durationInFrames={DEMO_DURATIONS.flip}>
        <SessionFlip />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={timing} presentation={fade()} />

      <TransitionSeries.Sequence durationInFrames={DEMO_DURATIONS.complete}>
        <CompleteDemo />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={timing} presentation={slide({ direction: "from-bottom" })} />

      <TransitionSeries.Sequence durationInFrames={DEMO_DURATIONS.paywall}>
        <PaywallDemo />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
