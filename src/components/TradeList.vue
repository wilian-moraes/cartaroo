<template>
  <div>
    <SubHeader title="Solicitações de Troca">
      <template #action="slotProps">
        <router-link
          v-if="isAuthenticated"
          :to="{name: 'CreateTrade'}"
          :class="slotProps.classes" >
          Solicitar troca
        </router-link>
      </template>
    </SubHeader>

    <div v-if="isLoading" class="text-center mt-10 text-gray-500">
      Carregando solicitações...
    </div>

    <div v-else>
      <ul class="space-y-6 mt-6">
        <div class="flex justify-end items-center gap-2">
          <label for="rpp" class="text-sm font-medium text-gray-700">Itens por página:</label>
          <select id="rpp" v-model="rpp" class="border-gray-300 rounded-md text-sm">
            <option v-for="option in rppOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <li
          v-for="trade in trades"
          :key="trade.id"
          class="p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
        >
          <div class="flex justify-between items-center">
            <div class="text-sm text-gray-700 mb-2">
              <span class="text-gray-900 font-semibold">{{ trade.user.name }}</span>
            </div>
            <span
              v-if="trade.userId === store.user?.id"
              @click="deleteTrade(trade.id)"
              class="ml-auto text-xs font-semibold text-red-700 bg-red-100 px-2 py-1 cursor-pointer rounded-lg hover:bg-red-300"
            >
              Excluir
            </span>
          </div>
          <div class="flex flex-col md:flex-row gap-6 mb-4">
            <div class="md:w-1/2 md:pl-5">
              <h4 class="font-semibold mb-1">Oferecendo:</h4>
              <ul class="list-disc list-inside text-sm text-gray-800">
                <li
                  v-for="tc in filterCardsByType(trade.tradeCards, 'OFFERING')"
                  :key="tc.id"
                >
                  {{ tc.card.name }}
                </li>
              </ul>
            </div>
            <div class="md:w-1/2 md:border-l md:border-gray-300 md:pl-6 max-md:mt-6">
              <h4 class="font-semibold mb-1">Recebendo:</h4>
              <ul class="list-disc list-inside text-sm text-gray-800">
                <li
                  v-for="tc in filterCardsByType(trade.tradeCards, 'RECEIVING')"
                  :key="tc.id"
                >
                  {{ tc.card.name }}
                </li>
              </ul>
            </div>
          </div>
        </li>
        <div class="flex items-center justify-center mt-4 py-4">
          <div class="flex items-center gap-2">
            <button
              @click="changePage(page - 1)"
              :disabled="page === 1"
              :class="`px-3 py-1 bg-white shadow-md rounded  ${page === 1 ? `opacity-50 cursor-not-allowed` : `cursor-pointer hover:bg-gray-100` }`"
            >
              &lt; Anterior
            </button>

            <span class="text-sm font-semibold text-gray-800">
              Página {{ page }}
            </span>

            <button
              @click="changePage(page + 1)"
              :disabled="!hasMorePages" :class="`px-3 py-1 bg-white shadow-md rounded  ${!hasMorePages ? `opacity-50 cursor-not-allowed` : `cursor-pointer hover:bg-gray-100` }`"
            >
              Próximo &gt;
            </button>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import api from '../services/api'
import { useUserStore } from '../stores/user'
import type { Trade, TradesResponse, TradeCard } from '../interfaces/trade'
import SubHeader from '../components/SubHeader.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const store = useUserStore()
const trades = ref<Trade[]>([])
const page = ref(1)
const rpp = ref(10)
const hasMorePages = ref(true)
const rppOptions = [5, 10, 20, 50, 100]

const isAuthenticated = computed(() => !!store.token)
const isLoading = ref(false)

const fetchTrades = async () => {
  isLoading.value = true

  try {
    const res = await api.get<TradesResponse>('/trades', {
      params: { rpp: rpp.value, page: page.value },
    })
    trades.value = res.data.list
    hasMorePages.value = res.data.list.length === rpp.value;
    isLoading.value = false
  } catch {
    toast.error('Erro ao buscar trocas')
  }
}

const changePage = (newPage: number) => {
  if (newPage < 1) return
  page.value = newPage
  fetchTrades()
}

watch(rpp, () => {
  page.value = 1
  fetchTrades()
})

const filterCardsByType = (cards: TradeCard[], type: 'OFFERING' | 'RECEIVING') => {
  if (!cards) return [];
  return cards.filter(card => card.type === type);
}

const deleteTrade = async (tradeId: string) => {
  try {
    await api.delete(`/trades/${tradeId}`)
    toast.success('Troca removida')
    fetchTrades()
  } catch {
    toast.error('Erro ao remover troca')
  }
}

onMounted(fetchTrades)
</script>
