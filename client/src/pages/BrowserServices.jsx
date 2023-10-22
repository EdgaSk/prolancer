import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { getAllServicesWithUsers } from "../api/services";
import { SERVICES_UPLOAD_API } from "../api/APIconst";
import styles from "./styles/BrowserServices.module.scss";
import headerImg from "../assets/img/bg-filter.jpg";

const BrowserServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Užkraunam paslaugas su vartotojais
    async function fetchServicesWithUsers() {
      try {
        const data = await getAllServicesWithUsers();
        setServices(data);
      } catch (error) {
        console.error("Klaida gaunant paslaugas su vartotojais: ", error);
      }
    }

    fetchServicesWithUsers();
  }, []);

  return (
    <div className={styles.cointainer}>
      <div className={styles.servicesHeader}>
        <img className={styles.headerImg} src={headerImg} alt="" />
        <div className={styles.titleBox}>
          <h1 className={styles.title}>Services</h1>
        </div>
      </div>
      <div className={styles.cardsBox}>
        {services.map((user) =>
          user.usersServices.map((service) => (
            <Cards
              key={service._id}
              imgUrl={`${SERVICES_UPLOAD_API}/${service.imageUrl}`}
              categories={service.categories}
              title={service.title}
              price={service.price}
              userName={`${user.name} ${user.surname}`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BrowserServices;
