import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#050505",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            marginBottom: 24,
          }}
        >
          <span style={{ color: "#ffffff" }}>Pongo</span>
          <span style={{ color: "#8B5CF6" }}>fly.</span>
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(255, 255, 255, 0.7)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Digital Behavior Engineers â€¢ Custom Software &amp; Built-In AI SEO
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
