import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import lv from "./lv";
import en from "./en";
import ru from "./ru";

const savedLang = localStorage.getItem("lang") || "lv";

i18n.use(initReactI18next).init({
  resources: {
    lv: { translation: lv },
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: savedLang,
  fallbackLng: "en",
});

export default i18n;
