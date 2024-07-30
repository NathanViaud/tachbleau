import { ref, onMounted } from 'vue'

export function useCookieConsent() {
  const showCookieConsent = ref(false)

  const checkCookieConsent = (): void => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted')
    if (cookiesAccepted) {
      const expirationDate = new Date(cookiesAccepted)
      if (expirationDate > new Date()) {
        showCookieConsent.value = false
      } else {
        localStorage.removeItem('cookiesAccepted')
        showCookieConsent.value = true
      }
    } else {
      showCookieConsent.value = true
    }
  }

  const acceptCookies = (): void => {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 7)
    localStorage.setItem('cookiesAccepted', expirationDate.toISOString())
    showCookieConsent.value = false
  }

  onMounted(() => {
    checkCookieConsent()
  })

  return {
    showCookieConsent,
    acceptCookies
  }
}