<template>
  <div>
    <SubHeader title="Minhas Cartas">
      <template #action="slotProps">
        <button
          @click="showAddCards = true"
          :class="slotProps.classes" >
          Adicionar cartas
        </button>
      </template>
    </SubHeader>

    <div v-if="isLoading" class="text-center mt-10 text-gray-500">
      Carregando sua coleção...
    </div>

    <div v-else>
      <div v-if="userCards.length === 0" class="text-center mt-10 p-6 bg-white rounded-lg shadow-sm">
        <h3 class="font-semibold text-gray-800">Nenhuma carta encontrada</h3>
        <p class="text-gray-500 mt-2">Você ainda não adicionou nenhuma carta à sua coleção.</p>
      </div>

      <ul v-else class="grid grid-cols-1 sm:grid-cols-5 mt-6 gap-y-5">
        <li v-for="card in userCards" :key="card.id" class="flex flex-col items-center">
          <img :src="card.imageUrl" :alt="card.name" class="w-40 rounded-lg shadow-md hover:-translate-y-1 transition-transform" />
          <span class="bg-white/80 p-2 mt-2 rounded-md border-1 border-red-500 font-semibold text-center text-sm">
            {{ card.name }}
          </span>
        </li>
      </ul>
    </div>

    <AddCardsModal
      v-if="showAddCards"
      @close="showAddCards = false"
      @added="fetchUserCards"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '../stores/user'
import AddCardsModal from '../components/AddCardsModal.vue'
import SubHeader from '../components/SubHeader.vue'

const store = useUserStore()

const userCards = computed(() => store.cards || [])

const isLoading = computed(() => store.cards === null)

const showAddCards = ref(false)

const fetchUserCards = () => {
  store.fetchUserCards(true)
}

onMounted(() => {
  store.fetchUserCards()
})
</script>
