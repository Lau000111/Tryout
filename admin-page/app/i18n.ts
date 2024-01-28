import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
// import { DateTime } from 'luxon';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: 'de', // Standard-Sprache
        fallbackLng: 'en',
        // ns: ['common'], // deine Namespaces
        // defaultNS: 'common',
    });

export default i18n;
