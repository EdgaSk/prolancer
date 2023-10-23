import { useContext, useEffect, useState } from "react";
import styles from "./styles/LogReg.module.scss";
import RegModal from "./RegModal";
import LogModal from "./LoginModal";
import { useTranslation } from "react-i18next";
import { AiOutlineUserAdd, AiOutlineLogin } from "react-icons/ai";
import { UserContext } from "../context/UserContext";
import { getUserbyID } from "../api/users";
import {
  dashBoardAdminLinks,
  dashBoardEmployerLinks,
  dashBoardFreelancerLinks,
} from "../routes/constRoutes";
import { NavLink } from "react-router-dom";

const LogReg = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { t } = useTranslation();
  const { isAuthenticated, userData, accessToken } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState(null);
  const [isDropMenuVisible, setDropMenuVisible] = useState(false);

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
    if (isAuthenticated) {
      if (userData.userId && accessToken) {
        getUserData(userData.userId, accessToken);
      }
    }
  }, [isAuthenticated, userData.userId, accessToken]);

  const getUserData = async (userId, accessToken) => {
    try {
      const user = await getUserbyID(accessToken, userId);
      setUserDetails(user);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
  };

  const toggleDropMenu = () => {
    setDropMenuVisible(!isDropMenuVisible);
  };

  return (
    <>
      {isAuthenticated ? (
        <div className={styles.logInuser}>
          {userDetails && (
            <div className={styles.userbox} onClick={toggleDropMenu}>
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
          {isDropMenuVisible && (
            <div className={styles.dropMenuUser}>
              <div className={styles.linksCointainer} onClick={toggleDropMenu}>
                {isFreelancer && <FreelancerDashboard />}
                {isEmployer && <EmployerDashboard />}
                {isAdmin && <AdminDashboard />}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.cointainerBtn}>
          <button className={styles.btn} onClick={handleOpenLoginModal}>
            <AiOutlineLogin className={styles.icon} />
            {t(`loginBtn`)}
          </button>
          <button className={styles.btn} onClick={handleOpenRegisterModal}>
            <AiOutlineUserAdd className={styles.icon} />
            {t(`registerBtn`)}
          </button>
          <RegModal
            isOpen={isRegisterModalOpen}
            handleClose={handleCloseModal}
          />
          <LogModal isOpen={isLoginModalOpen} handleClose={handleCloseModal} />
        </div>
      )}
    </>
  );
};

export default LogReg;
