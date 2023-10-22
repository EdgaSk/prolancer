import PropTypes from "prop-types";
import styles from "./styles/Cards.module.scss";
import { useTranslation } from "react-i18next";

const Cards = (props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.cointainer}>
      <img className={styles.img} src={props.imgUrl} alt="" />
      <div className={styles.infoBox}>
        <p className={styles.categories}>{t(props.categories)}</p>
        <p className={styles.title}>{props.title}</p>
      </div>
      <div className={styles.bottom}>
        <p>{props.userName}</p>
        <p className={styles.price}>
          <span>{t("startingPrice")}</span>
          {props.price}$
        </p>
      </div>
    </div>
  );
};

Cards.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  categories: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default Cards;
