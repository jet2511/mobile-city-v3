import { getProductList } from "@/features/products/services/product.service";
import { productListQuerySchema } from "@/features/products/schemas/product.schema";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = productListQuerySchema.safeParse({
      q: searchParams.get("q") || undefined,
      category: searchParams.get("category") || undefined,
      branchId: searchParams.get("branchId") || undefined,
    });

    const params = parsed.success ? parsed.data : {};
    const products = getProductList(params);

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
