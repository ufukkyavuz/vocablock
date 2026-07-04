import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { PhoneFrame } from "../components/PhoneFrame";
import { colors, fonts } from "../tokens";
import { useEnter } from "../utils";

const GRID = Array.from({ length: 24 }, (_, i) => i);
const TAP_ICON_INDEX = 9;
const TAP_FRAME = 46;

const AppIcon: React.FC<{ tapped: boolean }> = ({ tapped }) => {
  const frame = useCurrentFrame();
  const jitterX = tapped && frame >= TAP_FRAME && frame < TAP_FRAME + 8 ? ((frame % 2) * 2 - 1) * 1.5 : 0;
  const bounce = interpolate(frame, [TAP_FRAME, TAP_FRAME + 4, TAP_FRAME + 10], [1, 0.88, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: 16,
        background: tapped ? "linear-gradient(160deg, #1a2236, #0b0f1a)" : "rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: tapped ? `translateX(${jitterX}px) scale(${bounce})` : undefined,
      }}
    >
      {tapped && (
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: "10px solid transparent",
            borderBottom: "10px solid transparent",
            borderLeft: `16px solid ${colors.primary}`,
            marginLeft: 4,
          }}
        />
      )}
    </div>
  );
};

export const TapApp: React.FC = () => {
  const frame = useCurrentFrame();

  const rippleT = interpolate(frame, [TAP_FRAME, TAP_FRAME + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rippleOpacity = interpolate(frame, [TAP_FRAME, TAP_FRAME + 4, TAP_FRAME + 16], [0, 0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const desaturate = interpolate(
    frame,
    [TAP_FRAME, TAP_FRAME + 4, TAP_FRAME + 10],
    [0, 0.7, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const text = useEnter(TAP_FRAME + 10);

  return (
    <AbsoluteFill style={{ background: colors.foreground }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 150 }}>
        <div style={{ filter: `grayscale(${desaturate})` }}>
          <PhoneFrame background="#0b0f1a">
            <div
              style={{
                padding: "70px 24px 0",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 22,
                justifyItems: "center",
              }}
            >
              {GRID.map((i) => (
                <div key={i} style={{ position: "relative" }}>
                  <AppIcon tapped={i === TAP_ICON_INDEX} />
                  {i === TAP_ICON_INDEX && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: 56 + rippleT * 90,
                        height: 56 + rippleT * 90,
                        marginLeft: -(56 + rippleT * 90) / 2,
                        marginTop: -(56 + rippleT * 90) / 2,
                        borderRadius: "50%",
                        border: `3px solid ${colors.primary}`,
                        opacity: rippleOpacity,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </PhoneFrame>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 220,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: text,
            transform: `translateY(${interpolate(text, [0, 1], [18, 0])}px)`,
            padding: "0 80px",
          }}
        >
          <div style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: 40, color: "#fff", lineHeight: 1.2 }}>
            Want to open TikTok?
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
