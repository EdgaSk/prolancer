import soon from "../assets/img/soon.gif";
import styles from "./styles/Soon.module.scss";

const SubmissionJob = () => {
  return (
    <div className={styles.cointainer}>
      <h1>Submission Job</h1>
      <img className={styles.img} src={soon} alt="" />
    </div>
  );
};

export default SubmissionJob;
