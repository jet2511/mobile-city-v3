export interface CartItem {
  variantId: string;
  productId: string;
  productName: string;
  productSlug: string;
  thumbnail: string;
  color: string;
  storage?: string | null;
  price: number;
  quantity: number;
  hasGoldCare?: boolean;
  goldCareFee?: number;
}
