import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { getAllServicesPublic } from "../api/services";
import { SERVICES_UPLOAD_API } from "../api/APIconst";
import styles from "./styles/BrowserServices.module.scss";
import { getAllPublicUsers, getUsersbyIDpublic } from "../api/users";
import { t } from "i18next";

const BrowserServices = () => {
  const [services, setServices] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  // Set it initially to avoid the missing dependency issue

  useEffect(() => {
    try {
      getAllServicesPublic().then((res) => {
        setServices(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <h1>Browser Services</h1>
      <div className={styles.cardsBox}>
        {services.map((service) => (
          <Cards
            key={service._id}
            imgUrl={`${SERVICES_UPLOAD_API}/${service.imageUrl}`}
            categories={service.categories}
            title={service.title}
            price={service.price}
            userName={userDetails.name}
          />
        ))}
      </div>
    </div>
  );
};

export default BrowserServices;
