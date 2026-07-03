import React from "react";
import { colors } from "../tokens";

export const PHONE_W = 390;
export const PHONE_H = 844;

export const PhoneFrame: React.FC<{
  children: React.ReactNode;
  background?: string;
}> = ({ children, background = colors.background }) => {
  return (
    <div
      style={{
        width: PHONE_W,
        height: PHONE_H,
        borderRadius: 56,
        border: "10px solid #0e1625",
        boxShadow: "0 40px 80px rgba(0,0,0,0.35)",
        overflow: "hidden",
        position: "relative",
        background,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 28,
          background: "#0e1625",
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
          zIndex: 10,
        }}
      />
      {children}
    </div>
  );
};
