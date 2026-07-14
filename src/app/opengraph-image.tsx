import { ImageResponse } from "next/og";
import { APP } from "@/lib/site";

// Static social share card (1200×630). Rendered at build time.
export const alt = `${APP.name} — ${APP.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#1a1714",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              border: "6px solid #38302a",
              borderTopColor: "#e0577e",
              borderRightColor: "#e0577e",
            }}
          />
          <span style={{ color: "#897f70", fontSize: 30, letterSpacing: 1 }}>
            Forex Market Hours
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ece3d6",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: 920,
            }}
          >
            Forex market hours, live in your timezone.
          </div>
          <div style={{ color: "#c3b8a9", fontSize: 34, marginTop: 28 }}>
            See which markets are open right now — Sydney, Tokyo, Frankfurt,
            London and New York.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span
            style={{
              color: "#1a1714",
              background: "#e0577e",
              fontSize: 26,
              fontWeight: 600,
              padding: "12px 26px",
              borderRadius: 12,
            }}
          >
            Free live tool — no sign-up
          </span>
          <span style={{ color: "#897f70", fontSize: 24 }}>
            Also on iOS &amp; Android
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
