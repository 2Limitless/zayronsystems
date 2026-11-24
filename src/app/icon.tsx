import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          fontWeight: 800,
          background: "#050505",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#8B5CF6",
          borderRadius: 8,
          border: "1px solid rgba(139,92,246, 0.4)",
          fontFamily: "sans-serif",
        }}
      >
        P
      </div>
    ),
    {
      ...size,
    }
  );
}
