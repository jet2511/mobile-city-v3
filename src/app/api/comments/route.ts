import {
  getProductComments,
  addProductComment,
} from "@/features/products/services/product.service";
import { commentSubmissionSchema } from "@/features/products/schemas/product.schema";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ success: false, message: "Thiếu productId" }, { status: 400 });
    }

    const comments = getProductComments(productId);
    return NextResponse.json({ success: true, data: comments });
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = commentSubmissionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.issues[0]?.message || "Dữ liệu không hợp lệ",
        },
        { status: 400 },
      );
    }

    const comment = addProductComment(validation.data);
    return NextResponse.json({ success: true, data: comment }, { status: 201 });
  } catch (error) {
    console.error("Failed to create comment:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
