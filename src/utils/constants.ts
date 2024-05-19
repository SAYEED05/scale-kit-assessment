import { LabelValueObj } from "../types";

export enum URL {
  SEARCH = "https://geocoding-api.open-meteo.com/v1/search?name=",
  FORECAST = "https://api.open-meteo.com/v1/forecast",
}

export const MEASUREMENT_SYSTEMS: LabelValueObj[] = [
  { label: "Metric", value: "metric" },
  { label: "Imperial", value: "imperial" },
];
