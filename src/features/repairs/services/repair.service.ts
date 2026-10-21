import { db } from "@/shared/lib/db";
import type { RepairServiceItem } from "../types/repair.types";

export function getRepairServices(modelQuery = ""): RepairServiceItem[] {
  let query = `SELECT * FROM repair_services`;
  const params: unknown[] = [];

  if (modelQuery.trim()) {
    query += ` WHERE deviceModel LIKE ?`;
    params.push(`%${modelQuery.trim()}%`);
  }

  query += ` ORDER BY price DESC`;
  return db.prepare(query).all(...params) as RepairServiceItem[];
}

export function getRepairServiceBySlug(slug: string): RepairServiceItem | null {
  const modelName = slug.replace(/-/g, " ");
  const row = db
    .prepare(
      `SELECT * FROM repair_services WHERE LOWER(deviceModel) LIKE LOWER(?) ORDER BY price DESC LIMIT 1`,
    )
    .get(`%${modelName}%`);
  return (row as RepairServiceItem) || null;
}
