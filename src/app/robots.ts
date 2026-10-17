import type { MetadataRoute } from "next";

// Demo build — keep out of search until the client signs.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
