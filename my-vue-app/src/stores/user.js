import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null,
    loading: false
  }),
  actions: {
    async fetchUser() {
      this.loading = true
      try {
        const res = await axios.get('https://mocki.io/v1/7818104e-1d30-45f3-bd73-fdf20bbd0e1c')
        this.profile = res.data
      } catch (error) {
        console.error('Failed to fetch user', error)
      } finally {
        this.loading = false
      }
    }
  },
  persist: true
})

