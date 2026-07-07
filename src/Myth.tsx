import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Intro } from "./myth/scenes/Intro";
import { Hook } from "./myth/scenes/Hook";
import { GateScene } from "./myth/scenes/GateScene";
import { Riddles } from "./myth/scenes/Riddles";
import { Crack } from "./myth/scenes/Crack";
import { Triumph } from "./myth/scenes/Triumph";
import { Outro } from "./myth/scenes/Outro";
import { MYTH_DURATIONS } from "./myth/durations";

const T = 18;
const timing = linearTiming({ durationInFrames: T });

export const MYTH_TOTAL =
  Object.values(MYTH_DURATIONS).reduce((a, b) => a + b, 0) -
  T * (Object.keys(MYTH_DURATIONS).length - 1);

export const Myth: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={MYTH_DURATIONS.title}>
        <Intro />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={timing} presentation={fade()} />

      <TransitionSeries.Sequence durationInFrames={MYTH_DURATIONS.hook}>
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={timing} presentation={fade()} />

      <TransitionSeries.Sequence durationInFrames={MYTH_DURATIONS.gate}>
        <GateScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={timing} presentation={fade()} />

      <TransitionSeries.Sequence durationInFrames={MYTH_DURATIONS.riddles}>
        <Riddles />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={timing} presentation={fade()} />

      <TransitionSeries.Sequence durationInFrames={MYTH_DURATIONS.crack}>
        <Crack />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={timing} presentation={fade()} />

      <TransitionSeries.Sequence durationInFrames={MYTH_DURATIONS.triumph}>
        <Triumph />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition timing={timing} presentation={fade()} />

      <TransitionSeries.Sequence durationInFrames={MYTH_DURATIONS.outro}>
        <Outro />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
