import { db, initDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  initDatabase();
  const branches = db.prepare(`SELECT * FROM branches ORDER BY region ASC, name ASC`).all();
  return NextResponse.json({ success: true, data: branches });
}
