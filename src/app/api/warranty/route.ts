import { lookupWarrantyRecord } from "@/features/warranty/services/warranty.service";
import { warrantyLookupSchema } from "@/features/warranty/schemas/warranty.schema";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const validation = warrantyLookupSchema.safeParse({
      q: searchParams.get("q")?.trim() || "",
    });

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.issues[0]?.message || "Tham số không hợp lệ",
        },
        { status: 400 },
      );
    }

    const record = lookupWarrantyRecord(validation.data.q);
    if (!record) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy thông tin bảo hành" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: record,
    });
  } catch (error) {
    console.error("Failed to lookup warranty:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
