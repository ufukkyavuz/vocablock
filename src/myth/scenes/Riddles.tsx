import React from "react";
import { NightStage, MythCaption } from "../ui";
import { RiddleTablet } from "../RiddleTablet";

const WORDS: Array<[string, string, number, number, number]> = [
  // word, meaning, x, y, flipAt
  ["EPHEMERAL", "kısa ömürlü", 90, 470, 14],
  ["SANGUINE", "iyimser", 640, 470, 36],
  ["RESILIENT", "dirençli", 90, 760, 58],
  ["ELOQUENT", "güzel konuşan", 640, 760, 80],
];

export const Riddles: React.FC = () => (
  <NightStage>
    {WORDS.map(([word, meaning, x, y, flipAt]) => (
      <div key={word} style={{ position: "absolute", left: x, top: y }}>
        <RiddleTablet word={word} meaning={meaning} flipAt={flipAt} />
      </div>
    ))}
    <MythCaption text="Cevapsız geçiş yok." delay={4} bottom={false} />
  </NightStage>
);
