import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    preload: ['en-US', 'de'],
    fallbackLng: "en-US",
    resources: {
      "en-US": {
        translation: {
          home: {
            title: "Here to help find the resources for you!",
            subtitle: "Tap \"Help My Search\" to answer questions and get personalized resoure results.",
            helpMySearch: "Help My Search",
            trendingNearYou: "Trending Near You",
            resourceDirectory: "Resource Directory",
            earlyChildhood: "Early Childhood",
            cashAssistance: "Cash Assistance",
            healthcare: "Healthcare",
            housing: "Housing",
            food: "Food",
            youngParents: "Young Parents"
          }
        },
      },
      "fr": {
        translation: {
          home: {
            trendingNearYou: "French"
          }
        },
      },
    },
  });

export default i18n;
