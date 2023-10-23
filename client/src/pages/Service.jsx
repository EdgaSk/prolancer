import { useTranslation } from "react-i18next";
import styles from "./styles/Service.module.scss";
import { useEffect, useState } from "react";
import { getAllServicesWithUsersByID } from "../api/services";
import { useParams } from "react-router-dom";
import { SERVICES_UPLOAD_API } from "../api/APIconst";
import { BiCategoryAlt } from "react-icons/bi";
import { BsChatRightText } from "react-icons/bs";

const Service = () => {
  const { t } = useTranslation();
  const [serviceData, setServicedata] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getServiceData = async () => {
      try {
        const response = await getAllServicesWithUsersByID(id);
        setServicedata(response);
      } catch (error) {
        console.error("Klaida gaunant paslaugas su vartotojais: ", error);
      }
    };
    getServiceData();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className={styles.serviceCointainer}>
      {serviceData ? (
        <div className={styles.content}>
          <p className={styles.title}>{serviceData.title}</p>
          <div className={styles.nameDateBox}>
            <p>
              {serviceData.servicesUser.name}&nbsp;
              {serviceData.servicesUser.surname}
            </p>
            <p>
              {t("publishDate")}:&nbsp;{formatDate(serviceData.date)}
            </p>
          </div>
          <div className={styles.topinfoBox}>
            <div className={styles.categories}>
              <BiCategoryAlt className={styles.topIcons} />
              <div>
                <p className={styles.titleInfo}>{t("categories")}</p>
                <p className={styles.subtitleInfo}>
                  {t(serviceData.categories)}
                </p>
              </div>
            </div>
            <div className={styles.categories}>
              <BsChatRightText className={styles.topIcons} />
              <div>
                <p className={styles.titleInfo}>{t("englishLevel")}</p>
                <p className={styles.subtitleInfo}>
                  {t(serviceData.englishlanguageLevel)}
                </p>
              </div>
            </div>
          </div>
          <img
            className={styles.serviceImg}
            src={`${SERVICES_UPLOAD_API}/${serviceData.imageUrl}`}
            alt=""
          />
          <div className={styles.descriptionBox}>
            <p className={styles.descriptionTitle}>{t("descriptionService")}</p>
            <p className={styles.subtitleInfo}>{serviceData.description}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {serviceData && serviceData.servicesUser && (
        <div className={styles.sidebar}>
          <div className={styles.userInfo}>
            <p>
              {serviceData.servicesUser.name}&nbsp;
              {serviceData.servicesUser.surname}
            </p>
            <p>{serviceData.servicesUser.email}</p>
            <div className={styles.skillsBox}>
              <p>
                {t("skills")}
                <span>
                  {serviceData.skills
                    .split(",")
                    .map(
                      (skill) => skill.charAt(0).toUpperCase() + skill.slice(1)
                    )
                    .join(", ")}
                </span>
              </p>
            </div>
            <div className={styles.priceBox}>
              <p className={styles.price}>
                {t("startingPrice")}&nbsp;
                {serviceData.price}$
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
