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
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserbyID(userData.userId, accessToken);
        setUserName(user.username);
      } catch (error) {
        console.error("Failed to fetch user:", error.message);
      }
    };

    fetchUser();
  }, [isAuthenticated, userData.userId, accessToken]);

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
        <div>
          <p>{userName}</p>
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
