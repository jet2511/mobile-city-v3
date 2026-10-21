import { z } from "zod";

export const productListQuerySchema = z.object({
  q: z.string().optional().default(""),
  category: z.string().optional(),
  branchId: z.string().optional(),
});

export const commentSubmissionSchema = z.object({
  productId: z.string().min(1, "productId is required"),
  author: z.string().min(2, "Vui lòng nhập họ tên từ 2 ký tự"),
  phone: z.string().optional(),
  content: z.string().min(5, "Nội dung bình luận tối thiểu 5 ký tự"),
  rating: z.coerce.number().min(1).max(5).default(5),
});

export type ProductListQueryParams = z.infer<typeof productListQuerySchema>;
export type CommentSubmissionPayload = z.infer<typeof commentSubmissionSchema>;
