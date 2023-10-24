import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useTranslation } from "react-i18next";
import styles from "./styles/Buttons.module.scss";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <button className={styles.lougout} onClick={handleLogout}>
      {t("logout")}
    </button>
  );
};

export default LogoutButton;
