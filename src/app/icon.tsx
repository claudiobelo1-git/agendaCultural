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
          background: "#0a0a0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 48 48">
          <g fill="none" stroke="#ffffff" strokeWidth="2">
            <path d="M24 6 42 16v16L24 42 6 32V16Z" />
            <path d="M24 6v36M6 16l18 10 18-10M6 32l18-10 18 10" />
          </g>
        </svg>
      </div>
    ),
    { ...size },
  );
}
