import { useContext, useEffect, useState } from "react";
import styles from "./styles/LogReg.module.scss";
import RegModal from "./RegModal";
import LogModal from "./LoginModal";
import { useTranslation } from "react-i18next";
import { AiOutlineUserAdd, AiOutlineLogin } from "react-icons/ai";
import { UserContext } from "../context/UserContext";
import { getUserbyID } from "../api/users";

const LogReg = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { t } = useTranslation();
  const { isAuthenticated, userData, accessToken } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState(null);

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

  return (
    <>
      {isAuthenticated ? (
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
