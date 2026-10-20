import { db, initDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  initDatabase();
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() || "";

  if (!q) {
    return NextResponse.json({ success: false, message: "Vui lòng nhập số IMEI hoặc Số điện thoại" }, { status: 400 });
  }

  const record = db.prepare(`
    SELECT * FROM warranty_records
    WHERE imei = ? OR phone = ?
    LIMIT 1
  `).get(q, q);

  if (!record) {
    return NextResponse.json({ success: false, message: "Không tìm thấy thông tin bảo hành" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: record,
  });
}
