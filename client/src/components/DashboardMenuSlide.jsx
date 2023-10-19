import Drawer from "@mui/material/Drawer";
import { BiMenu } from "react-icons/bi";
import styles from "./styles/DropMenu.module.scss";
import LangSwitcher from "./Langswitcher";
import { AiOutlineClose } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { dashBoardLinks } from "../routes/constRoutes";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { getUserbyID } from "../api/users";
import { useEffect } from "react";

const DashboardMenuSlide = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { userData, accessToken } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState(null);

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

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <div>
      <BiMenu className={styles.hamburgerIcon} onClick={toggleDrawer(true)} />
      <Drawer
        anchor={"left"}
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{ style: { width: "80%" } }}
      >
        <div className={styles.mainCointainer}>
          <div className={styles.top}>
            <div className={styles.closeCointainer}>
              <AiOutlineClose
                className={styles.closeBtn}
                onClick={toggleDrawer(false)}
              />
            </div>
            <LangSwitcher />
          </div>
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
            {dashBoardLinks.map((link) => (
              <NavLink to={`/dashboard${link.path}`} key={link.path}>
                {t(link.nameKey)}
              </NavLink>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default DashboardMenuSlide;
