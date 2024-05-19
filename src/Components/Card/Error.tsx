import styles from "./card.module.css";

const Error = ({ name }: { name: string }) => {
  return (
    <div className={styles.card__wrapper}>
      <div className={styles.weather__card}>
        Error Fetching Weather Details for {name}
      </div>
    </div>
  );
};

export default Error;
