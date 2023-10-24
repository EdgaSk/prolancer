import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { BiMenu } from "react-icons/bi";
import styles from "./styles/DropMenu.module.scss";
import LangSwitcher from "./Langswitcher";
import { AiOutlineClose } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import {
  dashBoardAdminLinks,
  dashBoardEmployerLinks,
  dashBoardFreelancerLinks,
  navLinks,
} from "../routes/constRoutes";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import LogReg from "./LogReg";
import LogoutButton from "./Buttons";

const DropMenu = () => {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const { userData, isAuthenticated } = useContext(UserContext);

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
        anchor={"right"}
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
            <LogReg />
          </div>
          <div className={styles.linksCointainer}>
            {navLinks.map((link) => (
              <NavLink to={link.path} key={link.path}>
                {t(link.nameKey)}
              </NavLink>
            ))}
          </div>
          {isAuthenticated && (
            <>
              <div className={styles.linksCointainer}>
                {isFreelancer && <FreelancerDashboard />}
                {isEmployer && <EmployerDashboard />}
                {isAdmin && <AdminDashboard />}
              </div>
              <LogoutButton />
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default DropMenu;
