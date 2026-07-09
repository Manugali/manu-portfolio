import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          borderRadius: 8,
          border: "1px solid #2a2a2a",
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.06em",
            textTransform: "lowercase",
          }}
        >
          m
        </div>
      </div>
    ),
    { ...size }
  );
}
