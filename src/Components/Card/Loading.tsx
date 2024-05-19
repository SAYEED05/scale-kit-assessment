import styles from "./card.module.css";

const Loading = ({ name }: { name: string }) => {
  return (
    <div className={styles.card__wrapper}>
      <div className={styles.weather__card}>
        Loading Weather Details for {name}
      </div>
    </div>
  );
};

export default Loading;
