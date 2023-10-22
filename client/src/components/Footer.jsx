import styles from "./styles/Footer.module.scss";
import { BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <div className={styles.cointainer}>
      <div>
        <p className={styles.copyright}>© 2023 - Created by Edgaras</p>
      </div>
      <div className={styles.iconBox}>
        <BsFacebook className={styles.icon} />
        <AiFillTwitterCircle className={styles.icon} />
        <AiFillInstagram className={styles.icon} />
      </div>
    </div>
  );
};

export default Footer;
