import React from "react";
import { colors, fonts } from "../../tokens";
import { AppTile, Card, Eyebrow, Screen, Title } from "./ui";

const Toggle: React.FC<{ on: boolean }> = ({ on }) => (
  <div
    style={{
      width: 46,
      height: 28,
      borderRadius: 999,
      background: on ? colors.primary : "rgba(14,22,37,0.14)",
      padding: 3,
      boxSizing: "border-box",
      display: "flex",
      justifyContent: on ? "flex-end" : "flex-start",
      flexShrink: 0,
    }}
  >
    <div
      style={{
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }}
    />
  </div>
);

const Row: React.FC<{
  name: string;
  from: string;
  to: string;
  locked: boolean;
}> = ({ name, from, to, locked }) => (
  <Card
    style={{
      padding: "12px 14px",
      display: "flex",
      alignItems: "center",
      gap: 12,
    }}
  >
    <AppTile from={from} to={to} size={38} />
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: colors.textDark }}>{name}</div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: locked ? colors.destructive : colors.textMuted,
          marginTop: 2,
        }}
      >
        {locked ? "Locked until session" : "Always available"}
      </div>
    </div>
    <Toggle on={locked} />
  </Card>
);

/** Control proof: the lock is selective, which is the objection most blockers lose on. */
export const FocusSetup: React.FC = () => (
  <Screen padding="72px 24px 0">
    <Eyebrow>FOCUS SETUP</Eyebrow>
    <Title>What gets locked</Title>

    <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
      <Row name="Instagram" from="#f0399b" to="#f7b733" locked />
      <Row name="TikTok" from="#26f4ee" to="#fe2c55" locked />
      <Row name="X" from="#3a3a3a" to="#0a0a0a" locked />
      <Row name="YouTube" from="#ff4e45" to="#c4302b" locked={false} />
      <Row name="WhatsApp" from="#5efc8d" to="#1faa59" locked={false} />
      <Row name="Maps" from="#7fd8ff" to="#2f80ed" locked={false} />
    </div>

    <Card style={{ marginTop: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: colors.textDark }}>
          Unlock rule
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            fontWeight: 500,
            color: colors.textDark,
            background: colors.secondary,
            borderRadius: 8,
            padding: "4px 10px",
          }}
        >
          5 words = 15 min
        </div>
      </div>
      <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 8, lineHeight: 1.4 }}>
        Enforced with Apple Screen Time. No way around it — including this app.
      </div>
    </Card>
  </Screen>
);
