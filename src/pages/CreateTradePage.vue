<template>
  <div>
    <SubHeader title="Criar Solicitação de Troca">
      <template #action="slotProps">
        <button
          @click="goBack"
          :class="slotProps.classes"
        >
          Voltar
        </button>
      </template>
    </SubHeader>

    <div v-if="isLoading" class="grow flex justify-center items-center">
      <p class="text-gray-500">Carregando listas de cartas...</p>
    </div>
    <div v-else class="flex flex-col md:max-h-[calc(100vh-11rem)] p-4">
      <div class="flex flex-col md:flex-row gap-6 grow min-h-0">

        <div class="bg-white rounded-lg shadow-md p-6 md:w-1/2 max-md:max-h-96 flex flex-col">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-gray-800">Cartas para oferecer</h3>
            <div class="flex justify-end items-center gap-2">
              <label for="rpp" class="text-sm font-medium text-gray-700">Itens por página:</label>
              <select id="rpp" v-model="rppOffering" class="border-gray-300 rounded-md text-sm">
                <option v-for="option in rppOptionsOffering" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
          <ul class="grow overflow-y-auto pr-2 space-y-2">
            <li v-for="card in paginatedUserCards" :key="card.id" class="flex items-center">
              <input type="checkbox" :value="card.id" v-model="offering" class="h-4 w-4 mr-3" />
              <span class="font-medium">{{ card.name }}</span>
            </li>
          </ul>
          <div class="flex items-center justify-center mt-4 py-4">
            <div class="flex items-center gap-2">
              <button
                @click="changePage(pageOffering - 1, 'offering')"
                :disabled="pageOffering === 1"
                :class="`px-3 py-1 bg-gray-200 rounded  ${pageOffering === 1 ? `opacity-50 cursor-not-allowed` : `cursor-pointer hover:bg-gray-300` }`"
              >
                &lt; Anterior
              </button>

              <span class="text-sm font-semibold text-gray-800">
                Página {{ pageOffering }}
              </span>

              <button
                @click="changePage(pageOffering + 1, 'offering')"
                :disabled="pageOffering >= totalOfferingPages" :class="`px-3 py-1 bg-gray-200 rounded  ${pageOffering >= totalOfferingPages ? `opacity-50 cursor-not-allowed` : `cursor-pointer hover:bg-gray-300` }`"
              >
                Próximo &gt;
              </button>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 md:w-1/2 max-md:max-h-96 flex flex-col">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-gray-800">Cartas para receber</h3>
            <div class="flex justify-end items-center gap-2">
              <label for="rpp" class="text-sm font-medium text-gray-700">Itens por página:</label>
              <select id="rpp" v-model="rppReceiving" class="border-gray-300 rounded-md text-sm">
                <option v-for="option in rppOptionsReceiving" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
          <ul class="grow overflow-y-auto pr-2 space-y-2">
            <li v-for="card in paginatedAllCards" :key="card.id" class="flex items-center">
              <input type="checkbox" :value="card.id" v-model="receiving" class="h-4 w-4 mr-3" />
              <span class="font-medium">{{ card.name }}</span>
            </li>
          </ul>
          <div class="flex items-center justify-center mt-4 py-4">
            <div class="flex items-center gap-2">
              <button
                @click="changePage(pageReceiving - 1, 'receiving')"
                :disabled="pageReceiving === 1"
                :class="`px-3 py-1 bg-gray-200 rounded  ${pageReceiving === 1 ? `opacity-50 cursor-not-allowed` : `cursor-pointer hover:bg-gray-300` }`"
              >
                &lt; Anterior
              </button>

              <span class="text-sm font-semibold text-gray-800">
                Página {{ pageReceiving }}
              </span>

              <button
                @click="changePage(pageReceiving + 1, 'receiving')"
                :disabled="pageReceiving >= totalReceivingPages" :class="`px-3 py-1 bg-gray-200 rounded  ${pageReceiving >= totalReceivingPages ? `opacity-50 cursor-not-allowed` : `cursor-pointer hover:bg-gray-300` }`"
              >
                Próximo &gt;
              </button>
            </div>
          </div>
        </div>

      </div>

      <div class="flex justify-end pt-6">
        <button
          @click="createTrade"
          :disabled="isSubmitting"
          class="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg cursor-pointer shadow-md hover:bg-orange-600 transition disabled:bg-orange-300 flex gap-x-2"
        >
          <svg v-if="isSubmitting" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>

          <span v-if="!isSubmitting">
            Criar Troca
          </span>
          <span v-else>
            Processando...
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import api from '../services/api'
import SubHeader from '../components/SubHeader.vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useCardStore } from '../stores/card'

const router = useRouter()
const toast = useToast()
const userStore = useUserStore()
const cardStore = useCardStore()

const isLoading = computed(() => userStore.cards === null || cardStore.allCards.length === 0)
const userCards = computed(() => userStore.cards || [])
const allCards = computed(() => cardStore.allCards)

const isSubmitting = ref(false)
const offering = ref<string[]>([])
const receiving = ref<string[]>([])

const pageOffering = ref(1)
const rppOffering = ref(10)
const rppOptionsOffering = [5, 10, 20, 50, 100]

const pageReceiving = ref(1)
const rppReceiving = ref(10)
const rppOptionsReceiving = [5, 10, 20, 50, 100]

const paginatedUserCards = computed(() => {
  const start = (pageOffering.value - 1) * rppOffering.value;
  const end = start + rppOffering.value;
  return userCards.value.slice(start, end);
})

const totalOfferingPages = computed(() => {
  return Math.ceil(userCards.value.length / rppOffering.value)
})

const paginatedAllCards = computed(() => {
  const start = (pageReceiving.value - 1) * rppReceiving.value
  const end = start + rppReceiving.value
  return allCards.value.slice(start, end)
})

const totalReceivingPages = computed(() => Math.ceil(allCards.value.length / rppReceiving.value))

const changePage = (newPage: number, type: "offering" | "receiving") => {
  if (type === 'offering') {
    if (newPage < 1 || newPage > totalOfferingPages.value) return
    pageOffering.value = newPage
  } else if (type === 'receiving') {
    if (newPage < 1 || newPage > totalReceivingPages.value) return
    pageReceiving.value = newPage
  }
}

watch(rppOffering, () => { pageOffering.value = 1 })
watch(rppReceiving, () => { pageReceiving.value = 1 })

const createTrade = async () => {
  if (offering.value.length === 0 || receiving.value.length === 0) {
    toast.error('Selecione cartas para oferecer e receber')
    return
  }

  isSubmitting.value = true

  const cardsToSend = [
    ...offering.value.map((id) => ({ cardId: id, type: 'OFFERING' })),
    ...receiving.value.map((id) => ({ cardId: id, type: 'RECEIVING' })),
  ]

  try {
    await api.post('/trades', { cards: cardsToSend })
    toast.success('Solicitação de troca criada!')
    offering.value = []
    receiving.value = []
  } catch {
    toast.error('Erro ao criar solicitação de troca')
  } finally {
    isSubmitting.value = false
  }
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  userStore.fetchUserCards()
  cardStore.fetchAllCards()
})
</script>
