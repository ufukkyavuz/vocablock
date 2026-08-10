import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, fonts } from "../tokens";
import { SHOT_HEIGHT, SHOT_WIDTH, layout } from "./config";

type Surface = "dark" | "light";

// Caption colors are held to WCAG AA (4.5:1) against their surface. The muted
// grey used inside the app UI (#888) only reaches ~3.5:1 on the light
// background, which is fine at UI scale but not for a gallery caption.
const surfaces: Record<
  Surface,
  { bg: string; headline: string; sub: string; deviceBg: string }
> = {
  dark: {
    bg: colors.foreground,
    headline: "#ffffff",
    sub: "rgba(255,255,255,0.68)",
    deviceBg: colors.background,
  },
  light: {
    bg: colors.background,
    headline: colors.textDark,
    sub: "#5b6470",
    deviceBg: colors.background,
  },
};

/**
 * Renders a headline where segments wrapped in [brackets] take the brand
 * accent, e.g. "Pay [one word] to scroll." One accent phrase per frame keeps a
 * single focal point.
 */
const Headline: React.FC<{ text: string; color: string }> = ({ text, color }) => {
  const parts = text.split(/(\[[^\]]+\])/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        const accent = part.startsWith("[") && part.endsWith("]");
        const content = accent ? part.slice(1, -1) : part;
        return (
          <span key={i} style={{ color: accent ? colors.primary : color }}>
            {content.split("\n").map((line, j, all) => (
              <React.Fragment key={j}>
                {line}
                {j < all.length - 1 ? <br /> : null}
              </React.Fragment>
            ))}
          </span>
        );
      })}
    </>
  );
};

export const Frame: React.FC<{
  surface: Surface;
  headline: string;
  sub?: string;
  children: React.ReactNode;
}> = ({ surface, headline, sub, children }) => {
  const s = surfaces[surface];

  return (
    <AbsoluteFill style={{ background: s.bg, overflow: "hidden" }}>
      {surface === "dark" ? (
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse 80% 40% at 50% 62%, rgba(162,240,35,0.14), transparent 70%)`,
          }}
        />
      ) : null}

      <div
        style={{
          position: "absolute",
          top: layout.captionTop,
          left: layout.gutter,
          right: layout.gutter,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: fonts.ui,
            fontWeight: 700,
            fontSize: layout.headlineSize,
            lineHeight: layout.headlineLeading,
            letterSpacing: -2,
          }}
        >
          <Headline text={headline} color={s.headline} />
        </div>
        {sub ? (
          <div
            style={{
              marginTop: 32,
              fontFamily: fonts.ui,
              fontWeight: 500,
              fontSize: layout.subSize,
              lineHeight: 1.3,
              color: s.sub,
            }}
          >
            {sub}
          </div>
        ) : null}
      </div>

      {children}
    </AbsoluteFill>
  );
};

export const SHOT_DIMENSIONS = { width: SHOT_WIDTH, height: SHOT_HEIGHT };
