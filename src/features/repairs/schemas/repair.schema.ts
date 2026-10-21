import { z } from "zod";

export const repairQuerySchema = z.object({
  model: z.string().optional().default(""),
});

export const repairBookingSchema = z.object({
  fullName: z.string().min(2, "Vui lòng nhập họ tên từ 2 ký tự"),
  phone: z.string().regex(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "Số điện thoại không hợp lệ"),
  deviceModel: z.string().min(1, "Vui lòng chọn dòng máy"),
  serviceId: z.string().min(1, "Vui lòng chọn dịch vụ sửa chữa"),
  branchId: z.string().optional(),
  note: z.string().optional(),
});

export type RepairQueryParams = z.infer<typeof repairQuerySchema>;
export type RepairBookingPayload = z.infer<typeof repairBookingSchema>;
