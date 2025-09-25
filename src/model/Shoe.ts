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
}

export interface ShoeStats {
  runCount: number;
  totalDurationSec: number;
  totalDurationText: string;
  totalDistanceKm: number;
  avgPaceSecPerKm: string;
  avgPace: string;
}

export interface ShoeDetailModel extends ShoeModel {
  mileages?: MileageModel[];
  stats: ShoeStats;
}
