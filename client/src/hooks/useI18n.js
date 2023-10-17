import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../translation/en.json";
import ltTranslations from "../translation/lt.json";

const resources = {
  en: { translation: enTranslations },
  lt: { translation: ltTranslations },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Numatyta kalba
  fallbackLng: "en", // Naudojama, kai vartotojo kalba nepalaikoma
  interpolation: {
    escapeValue: false, // Reikia, jei tekste naudojamos reikšmės
  },
});

export default i18n;
