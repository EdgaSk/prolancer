import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { getAllServicesPublic } from "../api/services";
import { SERVICES_UPLOAD_API } from "../api/APIconst";
import styles from "./styles/BrowserServices.module.scss";
import { getUsersbyIDpublic } from "../api/users";

const BrowserServices = () => {
  const [services, setServices] = useState([]);
  const [userDetails, setUserDetails] = useState({}); // Išsaugokite vartotojo duomenis čia

  return (
    <div>
      <h1>Browser Services</h1>
      <div className={styles.cardsBox}>
        {servicesWithUserDetails.map((service) => (
          <Cards
            key={service._id}
            imgUrl={`${SERVICES_UPLOAD_API}/${service.imageUrl}`}
            categories={service.categories}
            title={service.title}
            price={service.price}
            userName={service.userName}
          />
        ))}
      </div>
    </div>
  );
};

export default BrowserServices;
