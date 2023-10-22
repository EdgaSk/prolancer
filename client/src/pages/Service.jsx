import styles from "./styles/Service.module.scss";

const Service = () => {
  return (
    <div className={styles.cointainer}>
      <div className={styles.content}>Left</div>
      <div className={styles.sidebar}>right</div>
    </div>
  );
};

export default Service;
