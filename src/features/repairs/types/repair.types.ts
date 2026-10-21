export interface RepairServiceItem {
  id: string;
  deviceModel: string;
  serviceName: string;
  price: number;
  warranty: string;
  duration: string;
  notes?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface RepairBookingInput {
  fullName: string;
  phone: string;
  deviceModel: string;
  serviceId: string;
  branchId?: string;
  note?: string;
}
