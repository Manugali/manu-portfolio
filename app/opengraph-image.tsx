import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Manohar Gali — Applications Engineer";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #141414 50%, #0a0a0a 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#a8b4c4",
            marginBottom: 24,
          }}
        >
          Applications Engineer
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Manohar Gali
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#8a8a8a",
            maxWidth: 720,
            lineHeight: 1.5,
          }}
        >
          Full-stack .NET engineer building internal platforms in regulated financial
          environments.
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: 2,
            height: "100%",
            background:
              "linear-gradient(180deg, rgba(168,180,196,0.35) 0%, transparent 60%)",
            transform: "translateX(-50%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
