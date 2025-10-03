export interface WeatherData {
  name: string;
  dt: number;
  weather: { main: string; description: string; icon: string };
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
}

export interface ForecastDay {
  dt: number; // unix UTC
  temp: { min: number; max: number };
  weather: { main: string; description: string; icon: string };
  humidity: number;
  wind_speed: number;
  pop?: number;
}

export interface WeeklyForecast {
  timezone_offset: number; // seconds
  daily: ForecastDay[];
  source: "onecall" | "forecast5";
  city?: string;
}
