export interface WarrantyRecord {
  id: string;
  imei: string;
  phone: string;
  customerName: string;
  productName: string;
  variantInfo: string;
  branchName: string;
  purchaseDate: string;
  expiryDate: string;
  isGoldCare: number;
  status: "ACTIVE" | "EXPIRED" | string;
}
