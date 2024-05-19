export type SearchData = {
  admin1: string;
  admin1_id: number;
  admin2: string;
  admin2_id: number;
  country: string;
  country_code: string;
  country_id: number;
  elevation: number;
  feature_code: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  timezone: string;
};

export type CardProps = {
  data: SearchData;
  setAdded: React.Dispatch<React.SetStateAction<SearchData[]>>;
};

export type DailyObj = {
  [key: string]: string[] | number[];
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
  rain_sum: number[];
};
export interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    is_day: string;
    rain: string;
    precipitation: string;
    weather_code: string;
    wind_speed_10m: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    is_day: number;
    rain: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily_units: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    sunrise: string;
    sunset: string;
    rain_sum: string;
  };
  daily: DailyObj;
}

export type AdditionalInfoGenerated = {
  rain_sum: number;
  sunrise: string;
  sunset: string;
  temperature_2m_max: number;
  temperature_2m_min: number;
  time: string;
};

export type WeatherTableProps = {
  data: AdditionalInfoGenerated[];
};

export type SearchProps = {
  added: SearchData[];
  setAdded: React.Dispatch<React.SetStateAction<SearchData[]>>;
};

export type LabelValueObj = {
  label: string;
  value: string;
};

export type MeasurementSystemtypes = "imperial" | "metric";

export type MeasurementSystemSelectProps = {
  currentMeasurementSystem: MeasurementSystemtypes;
  setCurrentMeasurementSystem: React.Dispatch<
    React.SetStateAction<MeasurementSystemtypes>
  >;
};

export type MetricConversionArgs = {
  type: "distance" | "temperature";
  val: number;
  measurementSystem: MeasurementSystemtypes;
};
