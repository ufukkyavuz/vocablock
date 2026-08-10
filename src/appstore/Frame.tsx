import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, fonts } from "../tokens";
import { Ground, Shards } from "./Atmosphere";
import { SHOT_HEIGHT, SHOT_WIDTH, layout, socialProof } from "./config";

const INK = "#0d1420";

/**
 * Headline with weight contrast rather than colour contrast: segments wrapped
 * in *asterisks* are set heavy, the rest regular. One ink colour means the
 * caption still reads as a sentence at thumbnail size, where a two-colour
 * headline turns into stripes.
 */
const Headline: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        const heavy = part.startsWith("*") && part.endsWith("*");
        return (
          <span key={i} style={{ fontWeight: heavy ? 800 : 400 }}>
            {heavy ? part.slice(1, -1) : part}
          </span>
        );
      })}
    </>
  );
};

const RatingBadge: React.FC = () => {
  if (!socialProof.enabled || !socialProof.rating) return null;
  return (
    <div
      style={{
        position: "absolute",
        bottom: 68,
        left: 0,
        right: 0,
        textAlign: "center",
        fontFamily: fonts.ui,
        color: INK,
      }}
    >
      <div style={{ fontSize: 52, fontWeight: 800, letterSpacing: -1 }}>
        {socialProof.rating} <span style={{ letterSpacing: 2 }}>★★★★★</span>
      </div>
      <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: 1 }}>
        {socialProof.ratingCount}
      </div>
    </div>
  );
};

export const Frame: React.FC<{
  headline: string;
  seed: number;
  badge?: boolean;
  children: React.ReactNode;
}> = ({ headline, seed, badge, children }) => (
  <AbsoluteFill style={{ overflow: "hidden" }}>
    <Ground />
    <Shards seed={seed} layer="back" />

    <div
      style={{
        position: "absolute",
        top: layout.captionTop,
        left: layout.gutter,
        right: layout.gutter,
        textAlign: "center",
        fontFamily: fonts.ui,
        fontSize: layout.headlineSize,
        lineHeight: layout.headlineLeading,
        letterSpacing: -3.6,
        color: INK,
        textWrap: "balance",
      }}
    >
      <Headline text={headline} />
    </div>

    {children}

    <Shards seed={seed} layer="front" />
    {badge ? <RatingBadge /> : null}
  </AbsoluteFill>
);

export const SHOT_DIMENSIONS = { width: SHOT_WIDTH, height: SHOT_HEIGHT };
export const FRAME_INK = INK;
export const FRAME_ACCENT = colors.primary;
