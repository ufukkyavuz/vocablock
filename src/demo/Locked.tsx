import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage, DemoPhone, colors, fonts } from "./ui";

export const Locked: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // quick shake right after it appears (a denied tap)
  const shake =
    frame < 22 ? Math.sin(frame * 1.4) * interpolate(frame, [0, 22], [10, 0]) : 0;
  const lock = spring({ frame, fps, config: { damping: 9, mass: 0.8 } });
  const pulse = 1 + 0.12 * Math.sin(frame / 5);
  const ringOpacity = 0.35 + 0.35 * Math.sin(frame / 5);
  const textIn = spring({ frame: frame - 12, fps, config: { damping: 18 } });

  return (
    <Stage tone="dark">
      <div style={{ transform: `translateX(${shake}px)` }}>
        <DemoPhone>
          <div
            style={{
              height: "100%",
              background: "#0b1220",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: fonts.ui,
              padding: "0 30px",
            }}
          >
            {/* pulsing lock */}
            <div style={{ position: "relative", marginBottom: 44 }}>
              <div
                style={{
                  position: "absolute",
                  width: 170,
                  height: 170,
                  marginLeft: -85,
                  marginTop: -85,
                  left: "50%",
                  top: "50%",
                  borderRadius: "50%",
                  border: `3px solid rgba(239,67,67,${ringOpacity})`,
                  transform: `scale(${pulse})`,
                }}
              />
              <div
                style={{
                  width: 130,
                  height: 130,
                  borderRadius: "50%",
                  background: "rgba(239,67,67,0.14)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 66,
                  transform: `scale(${interpolate(lock, [0, 1], [0.3, 1])})`,
                }}
              >
                🔒
              </div>
            </div>

            <div
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: "#fff",
                opacity: textIn,
                transform: `translateY(${interpolate(textIn, [0, 1], [16, 0])}px)`,
                textAlign: "center",
              }}
            >
              TikTok is locked
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 16,
                color: "rgba(255,255,255,0.55)",
                textAlign: "center",
                opacity: textIn,
              }}
            >
              Finish your 50 words to unlock
            </div>

            {/* mini progress hint */}
            <div
              style={{
                marginTop: 30,
                width: 220,
                height: 8,
                borderRadius: 999,
                background: "rgba(255,255,255,0.12)",
                overflow: "hidden",
                opacity: textIn,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${interpolate(frame, [18, 40], [0, 24], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  })}%`,
                  background: colors.primary,
                  borderRadius: 999,
                }}
              />
            </div>
          </div>
        </DemoPhone>
      </div>
    </Stage>
  );
};
