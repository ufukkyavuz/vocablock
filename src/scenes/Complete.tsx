import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { PhoneFrame } from "../components/PhoneFrame";
import { colors, fonts, gradients } from "../tokens";
import { useEnter } from "../utils";

export const Complete: React.FC = () => {
  const frame = useCurrentFrame();
  const phone = useEnter(0);
  const ring = interpolate(frame, [10, 55], [0, 90], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pct = Math.round(ring);
  const circumference = 2 * Math.PI * 70;
  const dash = (ring / 100) * circumference;
  const stampIn = useEnter(58);

  return (
    <AbsoluteFill style={{ background: gradients.light }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 150 }}>
        <div style={{ textAlign: "center", marginBottom: 56, padding: "0 90px" }}>
          <div style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: 44, color: colors.textDark, lineHeight: 1.15 }}>
            Every session, sharper.
          </div>
        </div>

        <div style={{ opacity: phone, transform: `scale(${interpolate(phone, [0, 1], [0.92, 1])})` }}>
          <PhoneFrame>
            <div
              style={{
                padding: "70px 24px 0",
                fontFamily: fonts.ui,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
              }}
            >
              <svg width={170} height={170} viewBox="0 0 170 170">
                <circle cx={85} cy={85} r={70} fill="none" stroke={colors.border} strokeWidth={14} />
                <circle
                  cx={85}
                  cy={85}
                  r={70}
                  fill="none"
                  stroke={colors.primary}
                  strokeWidth={14}
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${circumference}`}
                  transform="rotate(-90 85 85)"
                />
                <text
                  x={85}
                  y={78}
                  textAnchor="middle"
                  fontFamily={fonts.ui}
                  fontWeight={700}
                  fontSize={36}
                  fill={colors.textDark}
                >
                  {pct}%
                </text>
                <text
                  x={85}
                  y={100}
                  textAnchor="middle"
                  fontFamily={fonts.ui}
                  fontWeight={600}
                  fontSize={11}
                  fill={colors.textMuted}
                  letterSpacing={1}
                >
                  SCORE
                </text>
              </svg>

              <div
                style={{
                  opacity: stampIn,
                  transform: `translateY(${interpolate(stampIn, [0, 1], [14, 0])}px)`,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 12, letterSpacing: 1.5, color: colors.textMuted, fontWeight: 600 }}>
                  SESSION COMPLETE
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: colors.textDark, marginTop: 4 }}>
                  Excellent!
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 18,
                  marginTop: 8,
                  opacity: stampIn,
                }}
              >
                {[
                  ["18", "Correct"],
                  ["2", "Missed"],
                  ["50", "Pool"],
                ].map(([v, l]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: colors.textDark }}>{v}</div>
                    <div style={{ fontSize: 10, color: colors.textMuted }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </PhoneFrame>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
