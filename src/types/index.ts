export type Region = "HN" | "HCM" | "DN";

export interface Branch {
  id: string;
  name: string;
  region: Region;
  address: string;
  hotline: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  parentId?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
}

export interface ProductInventory {
  branchId: string;
  branchName: string;
  region: Region;
  address: string;
  hotline: string;
  quantity: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  color: string;
  ram?: string;
  storage?: string;
  originPrice: number;
  salePrice: number;
  goldCareFee: number;
  inventories?: ProductInventory[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  images: string[];
  description?: string;
  specs?: Record<string, string>;
  condition: "BRAND_NEW" | "LIKE_NEW_99" | "REFURBISHED";
  isHot: boolean;
  isFlashSale: boolean;
  categoryId: string;
  brandId: string;
  categoryName?: string;
  categorySlug?: string;
  brandName?: string;
  brandSlug?: string;
  minPrice?: number;
  maxOriginPrice?: number;
  variants?: ProductVariant[];
}

export interface RepairService {
  id: string;
  deviceModel: string;
  serviceName: string;
  price: number;
  warranty: string;
  duration: string;
  notes?: string;
}
