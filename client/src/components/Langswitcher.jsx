import { useTranslation } from "react-i18next";
import i18n from "../hooks/useI18n";
import { useState } from "react";

import styles from "./styles/LangSwitcher.module.scss";
import { MdKeyboardArrowDown } from "react-icons/md";

const LangSwitcher = () => {
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLang(lang);
    toggleDropdown();
  };

  return (
    <div className={styles.cointainer}>
      <button className={styles.button} onClick={toggleDropdown}>
        {selectedLang === "lt" ? (
          <img src="/ltu.png" alt="Lietuvių vėliava" />
        ) : selectedLang === "en" ? (
          <img src="/eng.png" alt="English flag" />
        ) : (
          <img src="/china.png" alt="Chinese flag" />
        )}
        <span>
          {t(
            selectedLang === "lt"
              ? "Lietuvių"
              : selectedLang === "en"
              ? "English"
              : "中文"
          )}
          <MdKeyboardArrowDown />
        </span>
      </button>

      {isDropdownOpen && (
        <div className={styles.dropdownContent}>
          <button
            className={styles.langBtn}
            onClick={() => changeLanguage("en")}
          >
            <img src="/eng.png" alt="English flag" />
            <span>{t("english")}</span>
          </button>
          <button
            className={styles.langBtn}
            onClick={() => changeLanguage("lt")}
          >
            <img src="/ltu.png" alt="Lietuvių vėliava" />
            <span>{t("lithuanian")}</span>
          </button>
          <button
            className={styles.langBtn}
            onClick={() => changeLanguage("zh")}
          >
            <img src="/china.png" alt="Chinese flag" />
            <span>{t("chinese")}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LangSwitcher;
