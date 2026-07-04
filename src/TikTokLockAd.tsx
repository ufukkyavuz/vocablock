import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { TapApp } from "./scenes/TapApp";
import { LockSceneV2 } from "./scenes/LockScene.v2";
import { FlashcardV2 } from "./scenes/Flashcard.v2";
import { CompleteUnlockV2 } from "./scenes/CompleteUnlock.v2";
import { OutroV2 } from "./scenes/Outro.v2";

const TRANSITION_FRAMES = 15;

export const AD_SCENE_DURATIONS = {
  tap: 70,
  lock: 70,
  flashcards: 140,
  unlock: 70,
  outro: 70,
};

export const AD_TOTAL_DURATION =
  Object.values(AD_SCENE_DURATIONS).reduce((a, b) => a + b, 0) -
  TRANSITION_FRAMES * (Object.keys(AD_SCENE_DURATIONS).length - 1);

export const TikTokLockAd: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={AD_SCENE_DURATIONS.tap}>
        <TapApp />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        presentation={fade()}
      />
      <TransitionSeries.Sequence durationInFrames={AD_SCENE_DURATIONS.lock}>
        <LockSceneV2 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        presentation={fade()}
      />
      <TransitionSeries.Sequence durationInFrames={AD_SCENE_DURATIONS.flashcards}>
        <FlashcardV2 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        presentation={fade()}
      />
      <TransitionSeries.Sequence durationInFrames={AD_SCENE_DURATIONS.unlock}>
        <CompleteUnlockV2 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        presentation={fade()}
      />
      <TransitionSeries.Sequence durationInFrames={AD_SCENE_DURATIONS.outro}>
        <OutroV2 />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
