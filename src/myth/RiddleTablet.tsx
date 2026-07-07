import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../tokens";

/** A stone riddle-tablet that flips from a word to its glowing meaning — the myth's flashcard. */
export const RiddleTablet: React.FC<{
  word: string;
  meaning: string;
  flipAt: number;
  width?: number;
  height?: number;
}> = ({ word, meaning, flipAt, width = 340, height = 220 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200, mass: 0.7 } });
  const flip = interpolate(frame, [flipAt, flipAt + 14], [0, 180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity: enter,
        transform: `scale(${interpolate(enter, [0, 1], [0.85, 1])})`,
        perspective: 1200,
      }}
    >
      <div
        style={{
          position: "relative",
          width,
          height,
          transformStyle: "preserve-3d",
          transform: `rotateY(${flip}deg)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            background: "linear-gradient(160deg, #a68b63 0%, #8b7355 100%)",
            borderRadius: 10,
            border: "3px solid #6b5842",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
          }}
        >
          <span
            style={{
              fontFamily: fonts.ui,
              fontWeight: 700,
              fontSize: 40,
              color: "#241d16",
              letterSpacing: -0.5,
            }}
          >
            {word}
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "#0e1625",
            borderRadius: 10,
            border: `3px solid ${colors.primary}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 50px rgba(162,240,35,0.35)`,
          }}
        >
          <span
            style={{
              fontFamily: fonts.ui,
              fontWeight: 700,
              fontSize: 30,
              color: colors.primary,
              textAlign: "center",
              padding: "0 20px",
            }}
          >
            {meaning}
          </span>
        </div>
      </div>
    </div>
  );
};
