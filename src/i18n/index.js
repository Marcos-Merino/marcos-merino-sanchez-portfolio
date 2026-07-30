import { createI18n } from 'vue-i18n'
import { watch } from 'vue'
import es from './locales/es.json'
import en from './locales/en.json'

const i18n = createI18n({
  legacy: false, // Permite el uso de Composition API y $t() en templates
  locale: 'es', // Idioma por defecto
  fallbackLocale: 'en', // Idioma secundario
  globalInjection: true, // Permite usar $t en cualquier template sin importar useI18n
  messages: {
    es,
    en,
  },
})

// Transición suave global para todo el proyecto al cambiar de idioma
watch(
  () => i18n.global.locale.value,
  () => {
    document.body.classList.add('lang-changing')
    setTimeout(() => {
      document.body.classList.remove('lang-changing')
    }, 250)
  }
)

export default i18n
