import i18n, { use } from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEN from './en/translation.json'
import translationVN from './vi/translation.json'

const defaultLng = localStorage.getItem('language') || 'vi'

const resources = {
  en: {
    translation: translationEN
  },
  vi: {
    translation: translationVN
  }
}

use(initReactI18next).init({
  resources,
  lng: defaultLng,
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
})

export default i18n
