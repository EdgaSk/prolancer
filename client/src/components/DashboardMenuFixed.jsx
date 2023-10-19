import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "../context/UserContext";
import {
  dashBoardAdminLinks,
  dashBoardEmployerLinks,
  dashBoardFreelancerLinks,
} from "../routes/constRoutes";
import { NavLink } from "react-router-dom";
import { getUserbyID } from "../api/users";
import styles from "./styles/DashboardMenuFixed.module.scss";

const DashboardMenuFixed = () => {
  const { t } = useTranslation();
  const { userData, accessToken } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState(null);

  const isFreelancer = userData.roles && userData.roles.freelancer;
  const isEmployer = userData.roles && userData.roles.employer;
  const isAdmin = userData.roles && userData.roles.admin;

  const FreelancerDashboard = () => (
    <>
      {dashBoardFreelancerLinks.map((link) => (
        <NavLink to={`/dashboard${link.path}`} key={link.path}>
          {t(link.nameKey)}
        </NavLink>
      ))}
    </>
  );

  const EmployerDashboard = () => (
    <>
      {dashBoardEmployerLinks.map((link) => (
        <NavLink to={`/dashboard${link.path}`} key={link.path}>
          {t(link.nameKey)}
        </NavLink>
      ))}
    </>
  );

  const AdminDashboard = () => (
    <>
      {dashBoardAdminLinks.map((link) => (
        <NavLink to={`/dashboard${link.path}`} key={link.path}>
          {t(link.nameKey)}
        </NavLink>
      ))}
    </>
  );

  useEffect(() => {
    if (userData.userId && accessToken) {
      getUserData(userData.userId, accessToken);
    }
  }, [userData.userId, accessToken]);

  const getUserData = async (userId, accessToken) => {
    try {
      const user = await getUserbyID(accessToken, userId);
      setUserDetails(user);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };
  return (
    <>
      <div className={styles.mainCointainer}>
        <div className={styles.logRegBox}>
          <div className={styles.logInuser}>
            {userDetails && (
              <div className={styles.userbox}>
                <p className={styles.name}>
                  {userDetails.name}&nbsp;
                  {userDetails.surname}
                </p>
                <p>
                  {Object.keys(userDetails.roles).map((role, index) => (
                    <span key={index}>{t(`roles.${role}`)}</span>
                  ))}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className={styles.linksCointainer}>
          {isFreelancer && <FreelancerDashboard />}
          {isEmployer && <EmployerDashboard />}
          {isAdmin && <AdminDashboard />}
        </div>
      </div>
    </>
  );
};

export default DashboardMenuFixed;
