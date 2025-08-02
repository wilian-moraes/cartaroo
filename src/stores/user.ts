import { defineStore } from 'pinia'
import type { User, UserState } from '@/interfaces/auth'
import type { Card } from '@/interfaces/card'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

const toast = useToast();

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!) as User
      : null,
    cards: null,
  }),
  actions: {
    setUser(token: string, user: User) {
      const plainUser: User = { ...user }
      this.token = token
      this.user = plainUser
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(plainUser))
    },
    logout() {
      this.token = ''
      this.user = null
      this.cards = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },


    async fetchUserCards(forceRefresh = false) {
      if (this.cards && !forceRefresh) {
        return;
      }
      try {
        const res = await api.get<Card[]>('/me/cards');
        this.cards = res.data;
      } catch {
        toast.error('Erro ao buscar cartas do usuário');
      }
    },

    invalidateUserCardsCache() {
      this.cards = null;
    }
  }
})
