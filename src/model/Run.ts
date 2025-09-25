export interface Run {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  runAt: Date;
  distance: number;
  durationSec: number;
  note?: string;
  durationText: string;
  pacePerKm: string;
}

export interface RunModel {
  items: Run[];
  pageInfo: {
    hasNextPage: boolean;
    nextCursor: string | null;
    take: number;
  };
  totalDistance: number;
}
