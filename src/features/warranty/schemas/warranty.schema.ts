import { z } from "zod";

export const warrantyLookupSchema = z.object({
  q: z.string().trim().min(3, "Vui lòng nhập tối thiểu 3 ký tự (IMEI hoặc Số điện thoại)"),
});

export type WarrantyLookupParams = z.infer<typeof warrantyLookupSchema>;
