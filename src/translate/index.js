import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import pt from "translate/pt.json";
import en from "translate/en.json";

import countries from "i18n-iso-countries";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/pt.json"));

i18n.use(initReactI18next).init({
    resources: {
        en: en,
        pt: pt
    },
    lng: "en",

    fallbackLng: {
        pt: ["en"]
    },

    keySeparator: "/",

    interpolation: {
        escapeValue: false
    }
});

export default i18n;
