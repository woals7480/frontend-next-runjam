export interface Run {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  runAt: Date;
  distance: number;
  note?: string;
  durationText: string;
  pacePerKm: string;
}

export interface RunProps {
  items: Run[];
  pageInfo: {
    hasNextPage: boolean;
    nextCursor: string | null;
    take: number;
  };
  totalDistance: number;
}
