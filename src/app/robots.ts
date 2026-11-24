import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "Google-Extended",
          "ClaudeBot",
          "Applebot-Extended"
        ],
        allow: "/",
      }
    ],
    sitemap: "https://pongofly.com/sitemap.xml",
  };
}
