import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { HOME_PATH, navLinks } from "../routes/constRoutes";
import Langswitcher from "./Langswitcher";
import styles from "./styles/NavBar.module.scss";
import Logo from "../assets/logo/prolancerBlack.png";
import { useEffect, useState } from "react";
import DropMenu from "./DropMenu";
import LogReg from "./LogReg";

const NavBar = () => {
  const { t } = useTranslation();
  const [showLangswitcher, setShowLangswitcher] = useState(false);
  const [showloginreg, setshowloginreg] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowLangswitcher(window.innerWidth >= 768);
      setshowloginreg(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className={styles.cointainer}>
      <div className={styles.left}>
        <div className={styles.logoCointainer}>
          <Link to={HOME_PATH}>
            <img className={styles.logo} src={Logo} alt="" />
          </Link>
        </div>
        <div className={styles.linksCointainer}>
          {navLinks.map((link) => (
            <NavLink to={link.path} key={link.path}>
              {t(link.nameKey)}
            </NavLink>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.menuCointainer}>
          <DropMenu />
        </div>

        {showLangswitcher && <Langswitcher />}
        {showloginreg && <LogReg />}
      </div>
    </nav>
  );
};

export default NavBar;
