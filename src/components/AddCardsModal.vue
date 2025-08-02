<template>
  <Transition
    enter-from-class="opacity-0"
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-active-class="transition-opacity duration-200 ease-in"
    leave-to-class="opacity-0"
  >
    <div class="fixed inset-0 bg-black/50 flex justify-center items-center">
      <Transition
        appear
        enter-from-class="opacity-0 scale-95"
        enter-active-class="transition-all duration-300 ease-out"
        enter-to-class="opacity-100 scale-100"
        leave-from-class="opacity-100 scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-to-class="opacity-0 scale-95"
      >
        <div class="bg-white p-4 rounded-lg max-h-[80vh] overflow-y-auto w-full max-w-lg" @click.stop>
          <div class="flex justify-between items-center px-3 text-lg font-semibold mb-4">
            <h3>Adicionar Cartas</h3>
            <h3 class="text-xl hover:text-gray-500 cursor-pointer" @click="$emit('close')">X</h3>
          </div>

          <div v-if="isLoading" class="text-center p-8 text-gray-500">
            Carregando cartas...
          </div>

          <div v-else>

            <div class="flex justify-end items-center gap-2">
              <label for="rpp" class="text-sm font-medium text-gray-700">Itens por página:</label>
              <select id="rpp" v-model="rpp" class="border-gray-300 rounded-md text-sm">
                <option v-for="option in rppOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
            <ul>
              <li v-for="card in paginatedAllCards" :key="card.id" :class="{ 'opacity-50 pointer-events-none': userOwnedCardIds.has(card.id) }">
                <label class="flex items-center cursor-pointer mb-2">

                  <input
                    type="checkbox"
                    :value="card.id"
                    v-model="selectedCards"
                    class="mr-2 h-4 w-4"
                    :disabled="userOwnedCardIds.has(card.id)"
                  />

                  <img :src="card.imageUrl" :alt="card.name" class="w-10 h-16 object-cover mr-3 rounded" />

                  <span class="font-medium">{{ card.name }}</span>

                  <span
                    v-if="userOwnedCardIds.has(card.id)"
                    class="ml-auto text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full"
                  >
                    Já possui
                  </span>

                </label>
              </li>
            </ul>

            <div class="flex items-center justify-center mt-4 py-4">
              <div class="flex items-center gap-2">
                <button
                  @click="changePage(page - 1)"
                  :disabled="page === 1"
                  :class="`px-3 py-1 bg-gray-200 rounded  ${page === 1 ? `opacity-50 cursor-not-allowed` : `cursor-pointer hover:bg-gray-300` }`"
                >
                  &lt; Anterior
                </button>

                <span class="text-sm font-semibold text-gray-800">
                  Página {{ page }}
                </span>

                <button
                  @click="changePage(page + 1)"
                  :disabled="page >= totalPages" :class="`px-3 py-1 bg-gray-200 rounded  ${page >= totalPages ? `opacity-50 cursor-not-allowed` : `cursor-pointer hover:bg-gray-300` }`"
                >
                  Próximo &gt;
                </button>
              </div>
            </div>
          </div>
          <div class="flex justify-between space-x-2 mt-4 px-5">
            <button
              @click="addSelectedCards"
              :disabled="isSubmitting"
              class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 cursor-pointer disabled:bg-orange-300 flex gap-x-2"
            >
              <svg v-if="isSubmitting" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>

              <span v-if="!isSubmitting">
                Adicionar
              </span>
              <span v-else>
                Processando...
              </span>
            </button>
            <button @click="$emit('close')" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer">Fechar</button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import api from '../services/api'
import { useToast } from 'vue-toastification'
import { useUserStore } from '../stores/user'
import { useCardStore } from '../stores/card'

const toast = useToast()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'added'): void
}>()

const isLoading = ref(true)
const isSubmitting = ref(false)

const userStore = useUserStore()
const cardStore = useCardStore()

const allCards = computed(() => cardStore.allCards)
const selectedCards = ref<string[]>([])
const userOwnedCardIds = computed(() => new Set(userStore.cards?.map(c => c.id) || []))
const page = ref(1)
const rpp = ref(10)
const rppOptions = [5, 10, 20, 50, 100]

const totalPages = computed(() => Math.ceil(allCards.value.length / rpp.value))
const paginatedAllCards = computed(() => {
  const start = (page.value - 1) * rpp.value
  const end = start + rpp.value
  return allCards.value.slice(start, end)
})

const changePage = (newPage: number) => {
  if (newPage < 1 || newPage > totalPages.value) return
  page.value = newPage
}


watch(rpp, () => {
  page.value = 1
})

const addSelectedCards = async () => {
  if (selectedCards.value.length === 0) {
    toast.error('Selecione pelo menos uma carta.')
    return
  }

  isSubmitting.value = true
  try {
    await api.post('/me/cards', { cardIds: selectedCards.value })
    toast.success('Cartas adicionadas com sucesso!')
    selectedCards.value = []

    userStore.invalidateUserCardsCache()

    emit('added')
    emit('close')
  } catch {
    toast.error('Erro ao adicionar cartas')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(async () => {
  isLoading.value = true
  await Promise.all([
    userStore.fetchUserCards(),
    cardStore.fetchAllCards()
  ])
  isLoading.value = false
})

</script>
