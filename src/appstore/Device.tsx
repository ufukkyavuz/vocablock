import React from "react";
import { DEVICE_SCALE, SCREEN_H, SCREEN_W, layout } from "./config";

export const DEVICE_W = SCREEN_W * DEVICE_SCALE + layout.deviceBorder * 2;

/**
 * Device mockup for the screenshot set.
 *
 * Children are authored in iPhone points and scaled by `DEVICE_SCALE`, so a
 * screen written here looks the same as the one written for the promo video.
 * CSS transforms scale vectors and text, not pixels, so type stays crisp at
 * 1320x2868.
 */
export const Device: React.FC<{
  children: React.ReactNode;
  background: string;
  statusBarTint?: "dark" | "light";
}> = ({ children, background, statusBarTint = "dark" }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: layout.deviceTop,
        left: "50%",
        transform: "translateX(-50%)",
        width: DEVICE_W,
        borderTopLeftRadius: layout.deviceRadius,
        borderTopRightRadius: layout.deviceRadius,
        border: `${layout.deviceBorder}px solid #0a0f19`,
        borderBottom: "none",
        boxShadow: "0 60px 120px rgba(0,0,0,0.38)",
        overflow: "hidden",
        background,
      }}
    >
      <div
        style={{
          width: SCREEN_W * DEVICE_SCALE,
          // Tall enough to fill past the bottom edge of the shot.
          height: SCREEN_H * DEVICE_SCALE,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: SCREEN_W,
            height: SCREEN_H,
            transform: `scale(${DEVICE_SCALE})`,
            transformOrigin: "top left",
          }}
        >
          <StatusBar tint={statusBarTint} />
          {children}
        </div>
      </div>
    </div>
  );
};

const StatusBar: React.FC<{ tint: "dark" | "light" }> = ({ tint }) => {
  const color = tint === "dark" ? "#0e1625" : "#ffffff";
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 54,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        zIndex: 20,
        fontFamily: "Outfit",
        fontWeight: 600,
        fontSize: 15,
        color,
      }}
    >
      <span>9:41</span>
      {/* Dynamic Island */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          width: 112,
          height: 32,
          borderRadius: 999,
          background: "#0a0f19",
        }}
      />
      <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <Bars color={color} />
        <Battery color={color} />
      </span>
    </div>
  );
};

const Bars: React.FC<{ color: string }> = ({ color }) => (
  <svg width={18} height={12} viewBox="0 0 18 12">
    {[0, 1, 2, 3].map((i) => (
      <rect
        key={i}
        x={i * 4.6}
        y={11 - (i + 1) * 2.6}
        width={3}
        height={(i + 1) * 2.6}
        rx={1}
        fill={color}
      />
    ))}
  </svg>
);

const Battery: React.FC<{ color: string }> = ({ color }) => (
  <svg width={25} height={12} viewBox="0 0 25 12">
    <rect
      x={0.5}
      y={0.5}
      width={21}
      height={11}
      rx={3.2}
      fill="none"
      stroke={color}
      strokeOpacity={0.45}
    />
    <rect x={2.5} y={2.5} width={15} height={7} rx={1.8} fill={color} />
    <rect x={23} y={4} width={2} height={4} rx={1} fill={color} fillOpacity={0.45} />
  </svg>
);
