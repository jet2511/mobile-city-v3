import { db } from "@/shared/lib/db";
import type { WarrantyRecord } from "../types/warranty.types";

export function lookupWarrantyRecord(query: string): WarrantyRecord | null {
  const q = query.trim();
  if (!q) return null;

  const row = db
    .prepare(
      `
    SELECT * FROM warranty_records
    WHERE imei = ? OR phone = ?
    LIMIT 1
  `,
    )
    .get(q, q);

  return (row as WarrantyRecord) || null;
}
