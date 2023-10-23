import soon from "../assets/img/soon.gif";
import styles from "./styles/Soon.module.scss";

const Profile = () => {
  return (
    <div className={styles.cointainer}>
      <h1>Profile</h1>
      <img className={styles.img} src={soon} alt="" />
    </div>
  );
};

export default Profile;
