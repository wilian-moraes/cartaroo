<template>
  <div>
    <SubHeader :title="title" />

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      <DashboardCard title="Total de cartas em seu inventário" :is-info-card="true">
        <div v-if="isLoading" class="text-center">
          <span class="text-4xl font-bold text-gray-400">...</span>
        </div>
        <div v-else class="text-center">
          <span class="text-5xl font-bold text-orange-500">{{ totalUserCards }}</span>
        </div>
      </DashboardCard>
      <DashboardCard title="Seus dados" :is-info-card="true">
        <div class="text-lg">
          <div>
            <span class="font-semibold text-gray-500">Nome: </span>
            <span class="font-bold text-orange-500">{{ store.user?.name }}</span>
          </div>
          <div>
            <span class="font-semibold text-gray-500">Email: </span>
            <span class="font-bold text-orange-500">{{ store.user?.email }}</span>
          </div>
        </div>
      </DashboardCard>

      <DashboardCardWrapper :to="{ name: 'MyCards' }">
        <DashboardCard icon="🗃️" title="Minhas Cartas" subtitle="Visualize e gerencie sua coleção" />
      </DashboardCardWrapper>

      <DashboardCardWrapper @click="showAddCards = true">
        <DashboardCard icon="➕" title="Adicionar à Coleção" subtitle="Adquira novas cartas para seu inventário" />
      </DashboardCardWrapper>

      <DashboardCardWrapper :to="{ name: 'Trades' }">
        <DashboardCard icon="🔄" title="Ver Trocas Abertas" subtitle="Explore o marketplace" />
      </DashboardCardWrapper>

      <DashboardCardWrapper :to="{ name: 'CreateTrade' }">
        <DashboardCard icon="✨" title="Criar Nova Troca" subtitle="Ofereça suas cartas para a comunidade" />
      </DashboardCardWrapper>

      <AddCardsModal
        v-if="showAddCards"
        @close="showAddCards = false"
        @added="fetchDashboardData"
      />

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useUserStore } from '../stores/user'
import AddCardsModal from '../components/AddCardsModal.vue'
import SubHeader from '../components/SubHeader.vue'
import DashboardCard from '../components/DashboardCard.vue'
import DashboardCardWrapper from '../components/DashboardCardWrapper.vue'

const store = useUserStore()

const showAddCards = ref(false)

const isLoading = computed(() => store.cards === null)
const totalUserCards = computed(() => store.cards?.length || 0)

const fetchDashboardData = () => {
  store.fetchUserCards(true)
}

const title = computed(() => `Bem vindo, ${store.user?.name || 'Usuário'}`)

onMounted(() => {
  store.fetchUserCards()
})
</script>
