import { useData } from "../../Provider/DataProvider";
import { AdditionalInfoGenerated, WeatherTableProps } from "../../types";
import { formatTime, metricConversion } from "../../utils";
import styles from "./table.module.css";

const WeatherTable = ({ data }: WeatherTableProps) => {
  const { isMetric, currentMeasurementSystem } = useData();
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Time</th>
          <th>Max Temp ({isMetric ? "°C" : "°F"})</th>
          <th>Min Temp ({isMetric ? "°C" : "°F"})</th>
          <th>Sunrise</th>
          <th>Sunset</th>
          <th>Rain Sum (mm)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry: AdditionalInfoGenerated, index: number) => (
          <tr key={index}>
            <td>{entry.time}</td>
            <td>
              {metricConversion({
                type: "temperature",
                measurementSystem: currentMeasurementSystem,
                val: entry.temperature_2m_max,
              })}
            </td>
            <td>
              {metricConversion({
                type: "temperature",
                measurementSystem: currentMeasurementSystem,
                val: entry.temperature_2m_min,
              })}
            </td>
            <td>{formatTime(entry.sunrise)}</td>
            <td>{formatTime(entry.sunset)}</td>
            <td>{entry.rain_sum}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WeatherTable;
