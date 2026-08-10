import React from "react";
import { colors, fonts } from "../../tokens";
import { Card, Eyebrow, Screen, Stat } from "./ui";

const R = 62;
const C = 2 * Math.PI * R;
const SCORE = 90;

const week = [
  { day: "M", value: 0.5 },
  { day: "T", value: 0.75 },
  { day: "W", value: 0.4 },
  { day: "T", value: 0.9 },
  { day: "F", value: 0.65 },
  { day: "S", value: 1 },
  { day: "S", value: 0.8 },
];

/** Outcome frame: the numbers that tell the user the habit is working. */
export const Progress: React.FC = () => (
  <Screen padding="72px 24px 0">
    <Eyebrow>YOUR ENGLISH</Eyebrow>

    <div
      style={{
        marginTop: 14,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <svg width={152} height={152} viewBox="0 0 152 152">
        <circle cx={76} cy={76} r={R} fill="none" stroke={colors.border} strokeWidth={13} />
        <circle
          cx={76}
          cy={76}
          r={R}
          fill="none"
          stroke={colors.primary}
          strokeWidth={13}
          strokeLinecap="round"
          strokeDasharray={`${(SCORE / 100) * C} ${C}`}
          transform="rotate(-90 76 76)"
        />
        <text
          x={76}
          y={72}
          textAnchor="middle"
          fontFamily={fonts.ui}
          fontWeight={700}
          fontSize={38}
          fill={colors.textDark}
        >
          {SCORE}%
        </text>
        <text
          x={76}
          y={94}
          textAnchor="middle"
          fontFamily={fonts.mono}
          fontWeight={500}
          fontSize={10}
          letterSpacing={1.4}
          fill={colors.textMuted}
        >
          RECALL
        </text>
      </svg>
    </div>

    <Card style={{ marginTop: 18, display: "flex", padding: "16px 8px" }}>
      <Stat value="412" label="Learned" />
      <Stat value="86" label="Reinforced" />
      <Stat value="21" label="Day streak" />
    </Card>

    <div style={{ marginTop: 20 }}>
      <Eyebrow>SESSIONS THIS WEEK</Eyebrow>
      <Card style={{ marginTop: 10, padding: "18px 16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            height: 96,
          }}
        >
          {week.map((d, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                flex: 1,
              }}
            >
              <div
                style={{
                  width: 22,
                  height: Math.round(d.value * 74),
                  borderRadius: 8,
                  background: i === week.length - 2 ? colors.primary : "rgba(162,240,35,0.35)",
                }}
              />
              <div style={{ fontSize: 11, fontWeight: 600, color: colors.textMuted }}>
                {d.day}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>

    <Card
      style={{
        marginTop: 16,
        background: colors.foreground,
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Screen time traded</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>
          this month
        </div>
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, color: colors.primary }}>9h 40m</div>
    </Card>
  </Screen>
);
