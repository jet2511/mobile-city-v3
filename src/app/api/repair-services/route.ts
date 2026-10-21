import { getRepairServices } from "@/features/repairs/services/repair.service";
import { repairQuerySchema } from "@/features/repairs/schemas/repair.schema";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = repairQuerySchema.safeParse({
      model: searchParams.get("model") || undefined,
    });

    const model = parsed.success ? parsed.data.model : "";
    const services = getRepairServices(model);

    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error("Failed to fetch repair services:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
