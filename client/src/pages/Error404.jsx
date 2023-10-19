import styles from "./styles/Error404.module.scss";
import errorimg from "../assets/img/errorrobot.svg";

const Error404 = () => {
  return (
    <div className={styles.cointainer}>
      <div className={styles.left}>
        <img className={styles.imgmain} src={errorimg} alt="" />
      </div>
      <div className={styles.right}>
        <p className={styles.title}>Oops! It looks like youre lost.</p>
        <p className={styles.subtitle}>
          The page youre looking for isnt available. Try to search again or use
          the go to.
        </p>
      </div>
    </div>
  );
};

export default Error404;
