import React from "react";
import { colors, fonts } from "../../tokens";
import { Card, Eyebrow, Screen, Title } from "./ui";

const rows: { word: string; due: string; strength: number }[] = [
  { word: "Ephemeral", due: "in 1 day", strength: 0.25 },
  { word: "Ubiquitous", due: "in 3 days", strength: 0.5 },
  { word: "Meticulous", due: "in 1 week", strength: 0.72 },
  { word: "Candid", due: "in 2 weeks", strength: 0.88 },
  { word: "Resilient", due: "in 1 month", strength: 1 },
  { word: "Ambiguous", due: "in 2 months", strength: 1 },
];

const StrengthBar: React.FC<{ value: number }> = ({ value }) => (
  <div
    style={{
      width: 66,
      height: 6,
      borderRadius: 999,
      background: "rgba(14,22,37,0.08)",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        height: "100%",
        width: `${value * 100}%`,
        background: colors.primary,
        borderRadius: 999,
      }}
    />
  </div>
);

/** Spaced-repetition schedule — the retention claim, shown rather than asserted. */
export const ReviewPlan: React.FC = () => (
  <Screen padding="72px 24px 0">
    <Eyebrow>REVIEW PLAN</Eyebrow>
    <Title>Coming back to you</Title>

    <Card style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 14 }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 16,
          background: colors.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          fontWeight: 700,
          color: colors.foreground,
        }}
      >
        21
      </div>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: colors.textDark }}>
          21-day streak
        </div>
        <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>
          412 words in long-term memory
        </div>
      </div>
    </Card>

    <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
      {rows.map((r) => (
        <Card
          key={r.word}
          style={{
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: colors.textDark }}>
              {r.word}
            </div>
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 10,
                letterSpacing: 1.2,
                color: colors.textMuted,
                marginTop: 4,
              }}
            >
              NEXT {r.due.toUpperCase()}
            </div>
          </div>
          <StrengthBar value={r.strength} />
        </Card>
      ))}
    </div>
  </Screen>
);
