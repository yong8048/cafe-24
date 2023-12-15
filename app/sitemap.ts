import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://cafe-24.vercel.app/",
      lastModified: new Date(),
    },
  ];
}
