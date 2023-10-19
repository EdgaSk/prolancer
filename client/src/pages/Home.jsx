import { useTranslation } from "react-i18next";
import styles from "./styles/Home.module.scss";
import heroImg from "../assets/img/heroImage.png";
import {
  AiOutlineSafetyCertificate,
  AiOutlineStar,
  AiOutlineSmile,
} from "react-icons/ai";
import amazon from "../assets/img/amazon.png";
import amd from "../assets/img/amd.png";
import logitech from "../assets/img/logitech.png";
import { BsPeople, BsRocketTakeoff } from "react-icons/bs";
import { GoNote } from "react-icons/go";

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.cointainer}>
      <section className={styles.heroBox}>
        <div className={styles.left}>
          <h1 className={styles.title}>{t("heroTitle")}</h1>
          <p className={styles.subtitle}>{t("herosubTitle")}</p>
          <div className={styles.brandCointainer}>
            <p className={styles.trustedBy}>{t("trustedBy")}</p>
            <div className={styles.brandBox}>
              <img className={styles.brandLogo} src={amazon} alt="" />
              <img className={styles.brandLogo} src={amd} alt="" />
              <img className={styles.brandLogo} src={logitech} alt="" />
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.imageBox}>
            <img src={heroImg} className={styles.heroImg} alt="" />
            <div className={styles.labelSafe}>
              <AiOutlineSafetyCertificate className={styles.secureIcon} />
              <p>{t("safeLabel")}</p>
            </div>
            <div className={styles.labelProof}>
              <AiOutlineStar className={styles.secureIcon} />
              <p>{t("proofLabel")}</p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.statsBox}>
        <div className={styles.collumBox}>
          <BsPeople className={styles.statsIcons} />
          <p className={styles.statsTitle}>1M</p>
          <p className={styles.statsSubTitle}> {t(`totalFreelancer`)}</p>
        </div>
        <div className={styles.collumBox}>
          <AiOutlineSmile className={styles.statsIcons} />
          <p className={styles.statsTitle}>4M</p>
          <p className={styles.statsSubTitle}>{t(`positivereviews`)}</p>
        </div>
        <div className={styles.collumBox}>
          <GoNote className={styles.statsIcons} />
          <p className={styles.statsTitle}>1.5M</p>
          <p className={styles.statsSubTitle}>{t(`ordersrecieved`)}</p>
        </div>
        <div className={styles.collumBox}>
          <BsRocketTakeoff className={styles.statsIcons} />
          <p className={styles.statsTitle}>5M</p>
          <p className={styles.statsSubTitle}>{t(`projectCompleted`)}</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
