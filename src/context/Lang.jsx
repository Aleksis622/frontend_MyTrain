import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <LangContext.Provider value={{ lang, changeLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
