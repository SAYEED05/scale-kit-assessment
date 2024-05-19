import { useEffect, useMemo, useState, useCallback } from "react";
import styles from "./card.module.css";
import { URL } from "../../utils/constants";
import {
  mergeArraysToObject,
  metricConversion,
  setCurrentPinnedToLocalStorage,
} from "../../utils";
import { ReactComponent as Close } from "./close-circle.svg";
import WeatherTable from "../WeatherTable";
import {
  AdditionalInfoGenerated,
  CardProps,
  SearchData,
  WeatherData,
} from "../../types";
import { useData } from "../../Provider/DataProvider";
import Loading from "./Loading";
import Error from "./Error";

const Card = ({ data, setAdded }: CardProps) => {
  const [details, setDetails] = useState<WeatherData | null>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState<boolean>(false);
  const [isDetailsError, setIsDetailsError] = useState<boolean>(false);

  const [isHovering, setisHovering] = useState<boolean>(false);

  //if should show only one show more,use id to identify and only expand that particular component
  const [showMore, setShowMore] = useState<boolean>(false);
  const { currentMeasurementSystem } = useData();

  const fetchForecastDetails = useCallback(async () => {
    setIsDetailsLoading(true);
    try {
      const res = await fetch(
        `${URL.FORECAST}?latitude=${data.latitude}&longitude=${data.longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum&current=temperature_2m,relative_humidity_2m,is_day,rain,precipitation,weather_code,wind_speed_10m&timezone=auto`
      );
      const result = await res.json();
      setDetails(result);
    } catch (error) {
      console.log(`FETCH_DETAILS_FOR_${data.name}ERROR-->`, error);
      setIsDetailsError(true);
    } finally {
      setIsDetailsLoading(false);
    }
  }, [data]);

  const handleRemove = (): void => {
    setAdded((prev: SearchData[]) => {
      const filtered = prev.filter((item: SearchData) => item.id !== data.id);
      setCurrentPinnedToLocalStorage(JSON.stringify(filtered));
      return filtered;
    });
  };

  useEffect(() => {
    if (!isDetailsError) {
      fetchForecastDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const additionalInfo: AdditionalInfoGenerated[] = useMemo(
    () => (details?.daily ? mergeArraysToObject(details?.daily) : []),
    [details]
  );

  if (isDetailsLoading) return <Loading name={data.name} />;
  if (isDetailsError || !details) return <Error name={data.name} />;

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
          {metricConversion({
            type: "temperature",
            measurementSystem: currentMeasurementSystem,
            val: details?.current?.temperature_2m,
          })}
        </div>
        <div className={styles.other__parameters}>
          <div>
            <span className={styles.other__parameters__values}>
              {metricConversion({
                type: "distance",
                measurementSystem: currentMeasurementSystem,
                val: details?.current?.wind_speed_10m,
              })}
            </span>
            <div>Wind</div>
          </div>
          <div>
            <span className={styles.other__parameters__values}>
              {details?.current?.relative_humidity_2m}%
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
