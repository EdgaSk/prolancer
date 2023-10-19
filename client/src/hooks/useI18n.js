import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../translation/en.json";
import ltTranslations from "../translation/lt.json";

const resources = {
  en: { translation: enTranslations },
  lt: { translation: ltTranslations },
};

const defaultLanguage = localStorage.getItem("selectedLang") || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lang) => {
  localStorage.setItem("selectedLang", lang);
});

export default i18n;
