import { db, initDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(request: Request) {
  initDatabase();
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ success: false, message: "Thiếu productId" }, { status: 400 });
  }

  const comments = db.prepare(`
    SELECT * FROM product_comments
    WHERE productId = ?
    ORDER BY createdAt DESC
  `).all(productId);

  return NextResponse.json({ success: true, data: comments });
}

export async function POST(request: Request) {
  initDatabase();
  try {
    const body = await request.json();
    const { productId, author, phone, content, rating } = body;

    if (!productId || !author || !content) {
      return NextResponse.json({ success: false, message: "Vui lòng nhập đủ thông tin" }, { status: 400 });
    }

    const id = crypto.randomUUID();
    db.prepare(`
      INSERT INTO product_comments (id, productId, author, phone, content, rating, reply, isStaffReply)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      productId,
      author,
      phone || null,
      content,
      rating || 5,
      "Chào bạn! Cảm ơn bạn đã quan tâm. Sản phẩm này hiện đang sẵn hàng tại tất cả chi nhánh MobileCity. Bạn có thể ghé trực tiếp hoặc đặt giữ hàng nhé!",
      1
    );

    return NextResponse.json({ success: true, message: "Gửi câu hỏi thành công!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Lỗi hệ thống" }, { status: 500 });
  }
}
