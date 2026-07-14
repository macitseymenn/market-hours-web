import type { MetadataRoute } from "next";
import { APP } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP.name,
    short_name: APP.shortName,
    description: APP.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fbf3e9",
    theme_color: "#fbf3e9",
    categories: ["finance", "productivity"],
    icons: [
      { src: "/icon.webp", sizes: "400x400", type: "image/webp" },
    ],
  };
}
