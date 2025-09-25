export interface MileageModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  shoeId: string;
  runId: string;
}

export interface ShoeModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  brand: string;
  model: string;
  nickname?: string;
  totalMileage: number;
  userId: string;
  mileages: MileageModel[];
}
