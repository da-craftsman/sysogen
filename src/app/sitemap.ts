import type { MetadataRoute } from "next";

const BASE = "https://sysogen.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/products", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/products/rfp-os", priority: 0.95, changeFrequency: "weekly" as const },
    { url: "/waitlist", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/services/governance", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/services/engineering", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/services/custom-solutions", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/labs", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/labs/provestack", priority: 0.95, changeFrequency: "weekly" as const },
    { url: "/labs/inboxgraph", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/imprint", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
