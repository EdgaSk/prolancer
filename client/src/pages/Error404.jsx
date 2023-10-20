import styles from "./styles/Error404.module.scss";
import errorimg from "../assets/img/errorrobot.svg";
import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "../routes/constRoutes";
import { useTranslation } from "react-i18next";

const Error404 = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRedirect = () => {
    navigate(HOME_PATH);
  };

  return (
    <div className={styles.cointainer}>
      <div className={styles.left}>
        <img className={styles.imgmain} src={errorimg} alt="" />
      </div>
      <div className={styles.right}>
        <p className={styles.title}>{t(`errorTitle`)}</p>
        <p className={styles.subtitle}>{t(`errorSubTitle`)}</p>
        <button className={styles.baclkBtn} onClick={handleRedirect}>
          {t(`errorBtnbackhome`)}
        </button>
      </div>
    </div>
  );
};

export default Error404;
