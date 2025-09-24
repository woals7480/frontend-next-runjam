export type RunPayload = {
  runAt: string; // "YYYY-MM-DD HH:mm"
  distance: string; // "30.3"
  duration: string; // "HH:MM:SS"
  note?: string;
};

export type RunInitial = {
  id: string;
  runAt: string;
  distance: string;
  duration: string;
  note?: string;
};
