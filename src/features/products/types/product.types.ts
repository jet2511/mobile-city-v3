export interface ProductSummary {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  condition: string;
  isHot: number;
  isFlashSale: number;
  brandName: string;
  brandSlug: string;
  categoryName: string;
  categorySlug: string;
  minPrice: number;
  maxOriginPrice: number;
}

export interface InventoryDetail {
  quantity: number;
  branchId: string;
  branchName: string;
  region: string;
  address: string;
  hotline: string;
}

export interface ProductVariantDetail {
  id: string;
  productId: string;
  sku: string;
  color: string;
  ram?: string | null;
  storage?: string | null;
  originPrice: number;
  salePrice: number;
  goldCareFee: number;
  inventories: InventoryDetail[];
}

export interface ProductDetail extends ProductSummary {
  description?: string | null;
  images: string[];
  specs: Record<string, string>;
  variants: ProductVariantDetail[];
}

export interface ProductCommentItem {
  id: string;
  productId: string;
  author: string;
  phone?: string | null;
  content: string;
  rating: number;
  reply?: string | null;
  isStaffReply: number;
  createdAt: string;
}
