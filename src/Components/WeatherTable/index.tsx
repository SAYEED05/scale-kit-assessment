import { formatTime } from "../../utils";
import styles from "./table.module.css";

const WeatherTable = ({ data }: any) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Time</th>
          <th>Max Temp (°C)</th>
          <th>Min Temp (°C)</th>
          <th>Sunrise</th>
          <th>Sunset</th>
          <th>Rain Sum (mm)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry: any, index: any) => (
          <tr key={index}>
            <td>{entry.time}</td>
            <td>{entry.temperature_2m_max}</td>
            <td>{entry.temperature_2m_min}</td>
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
