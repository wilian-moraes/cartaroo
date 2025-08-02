import { defineStore } from 'pinia'
import api from '@/services/api'
import type { CardStoreState, CardsResponse } from '@/interfaces/card'
import { useToast } from 'vue-toastification'

const CACHE_DURATION = 60 * 60 * 1000
const toast = useToast()

export const useCardStore = defineStore('card', {
  state: (): CardStoreState => {
    const cached = localStorage.getItem('allCardsCache')
    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < CACHE_DURATION) {
        return { allCards: data, lastFetched: timestamp }
      }
    }
    return {
      allCards: [],
      lastFetched: null,
    }
  },

  actions: {
    async fetchAllCards() {
      if (this.lastFetched && Date.now() - this.lastFetched < CACHE_DURATION) {
        return
      }
      try {
        const res = await api.get<CardsResponse>('/cards', { params: { rpp: 500, page: 1 } });

        this.allCards = res.data.list
        this.lastFetched = Date.now()

        const cacheData = { data: this.allCards, timestamp: this.lastFetched }
        localStorage.setItem('allCardsCache', JSON.stringify(cacheData))

      } catch {
        toast.error('Erro ao buscar todas as cartas')
      }
    },
  },
})
