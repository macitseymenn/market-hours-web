import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. A stray package-lock.json exists in
  // the home directory, which otherwise makes Next infer the wrong root.
  turbopack: {
    root: __dirname,
  },
  images: {
    // Allow our own trusted SVG (the placeholder author avatar) through the
    // image optimizer, sandboxed so no scripts can run inside an SVG.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
