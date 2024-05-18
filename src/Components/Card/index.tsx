import { useEffect, useMemo, useState } from "react";
import styles from "./card.module.css";
import { URL } from "../../utils/constants";
import {
  mergeArraysToObject,
  setCurrentPinnedToLocalStorage,
} from "../../utils";
import { ReactComponent as Close } from "./close-circle.svg";
import WeatherTable from "../WeatherTable";
const Card = ({ data, setAdded }: any) => {
  const [details, setDetails] = useState<any>({});
  const [isHovering, setisHovering] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchForecastDetails = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${URL.FORECAST}?latitude=${data.latitude}&longitude=${data.longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum&current=temperature_2m,relative_humidity_2m,is_day,rain,precipitation,weather_code,wind_speed_10m&timezone=auto`
      );
      const result = await res.json();
      setDetails(result);
    } catch (error) {
      console.log("FETCH_DETAILS_ERROR-->", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = (): void => {
    setAdded((prev: any) => {
      const filtered = prev.filter((item: any) => item.id !== data.id);
      setCurrentPinnedToLocalStorage(JSON.stringify(filtered));
      return filtered;
    });
  };

  useEffect(() => {
    fetchForecastDetails();
  }, []);

  const additionalInfo = useMemo(
    () => (details?.daily ? mergeArraysToObject(details?.daily) : []),
    [details]
  );

  if (isLoading) return <div>Loading Weather Details for {data.name}</div>;
  if (!details) return null;

  return (
    <div className={styles.card__wrapper}>
      <div
        className={styles.weather__card}
        onMouseEnter={() => setisHovering(true)}
        onMouseLeave={() => setisHovering(false)}
        onClick={() => setShowMore(!showMore)}
      >
        <div className={styles.place__name}>{data.name}</div>
        <div className={styles.temprature}>
          {details?.current?.temperature_2m}&deg;C
        </div>
        <div className={styles.other__parameters}>
          <div>
            <span className={styles.other__parameters__values}>
              {details?.current?.wind_speed_10m} km/h
            </span>
            <div>Wind</div>
          </div>
          <div>
            <span className={styles.other__parameters__values}>
              {details?.current?.relative_humidity_2m}
            </span>
            <div>Humidity</div>
          </div>
          <div>
            <span className={styles.other__parameters__values}>
              {details?.current?.precipitation}mm
            </span>
            <div>precipitation</div>
          </div>
        </div>
        {isHovering && (
          <button className={styles.remove__button} onClick={handleRemove}>
            <Close />
          </button>
        )}
      </div>
      {showMore && (
        <div className={styles.show__more__card}>
          {!!additionalInfo.length && <WeatherTable data={additionalInfo} />}
        </div>
      )}
    </div>
  );
};

export default Card;
