import { MetadataRoute } from "next";
import { db, initDatabase } from "@/lib/db";

export default function sitemap(): MetadataRoute.Sitemap {
  initDatabase();

  const baseUrl = "https://mobilecity.vn";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sua-chua`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dien-thoai`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const products = db.prepare(`SELECT slug, updatedAt FROM products`).all() as {
    slug: string;
    updatedAt: string;
  }[];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/dien-thoai/${p.slug}`,
    lastModified: new Date(p.updatedAt || Date.now()),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
