import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { BiMenu } from "react-icons/bi";
import styles from "./styles/DropMenu.module.scss";
import LangSwitcher from "./Langswitcher";
import { AiOutlineClose } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { navLinks } from "../routes/constRoutes";
import { NavLink } from "react-router-dom";
import LogReg from "./LogReg";

const DropMenu = () => {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

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
              <NavLink href={link.path} key={link.path}>
                {t(link.nameKey)}
              </NavLink>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default DropMenu;
