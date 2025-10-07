import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false
  }),
  actions: {
    toggleDark() {
      this.isDark = !this.isDark
      document.documentElement.setAttribute('data-bs-theme', this.isDark ? 'dark' : 'light')
    }
  },
  persist: true
})