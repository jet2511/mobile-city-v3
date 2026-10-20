import { db, initDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  initDatabase();
  const { searchParams } = new URL(request.url);
  const model = searchParams.get("model") || "";

  let query = `SELECT * FROM repair_services`;
  const params: unknown[] = [];

  if (model) {
    query += ` WHERE deviceModel LIKE ?`;
    params.push(`%${model}%`);
  }

  query += ` ORDER BY price DESC`;
  const services = db.prepare(query).all(...params);

  return NextResponse.json({ success: true, data: services });
}
