import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Hook } from "./scenes/Hook";
import { LockScene } from "./scenes/LockScene";
import { Flashcard } from "./scenes/Flashcard";
import { Complete } from "./scenes/Complete";
import { Unlocked } from "./scenes/Unlocked";
import { Paywall } from "./scenes/Paywall";
import { Outro } from "./scenes/Outro";

const TRANSITION_FRAMES = 15;

export const SCENE_DURATIONS = {
  hook: 90,
  lock: 75,
  flashcard: 120,
  complete: 90,
  unlocked: 60,
  paywall: 90,
  outro: 90,
};

export const TOTAL_DURATION =
  Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0) -
  TRANSITION_FRAMES * (Object.keys(SCENE_DURATIONS).length - 1);

export const Promo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.hook}>
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        presentation={fade()}
      />
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.lock}>
        <LockScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        presentation={fade()}
      />
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.flashcard}>
        <Flashcard />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        presentation={fade()}
      />
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.complete}>
        <Complete />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        presentation={fade()}
      />
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.unlocked}>
        <Unlocked />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        presentation={fade()}
      />
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.paywall}>
        <Paywall />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        presentation={fade()}
      />
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.outro}>
        <Outro />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
