<template>
  <nav class="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-sm shadow-md z-30">
    <div class="container mx-auto flex justify-between items-center p-4">
      <router-link :to="isAuthenticated ? { name: 'Home' } : { name: 'Marketplace' }" class="font-semibold text-2xl bg-gradient-to-br from-orange-400 via-red-500 to-black text-transparent bg-clip-text">
        Cartaroo
      </router-link>

      <div v-if="isAuthenticated" class="flex items-center gap-4 w-full">
        <div class="hidden md:flex items-center gap-6 text-gray-700 font-medium mx-auto">
          <router-link :to="{name: 'Home'}" class="hover:text-orange-500 transition">Início</router-link>
          <router-link :to="{name: 'MyCards'}" class="hover:text-orange-500 transition">Minhas Cartas</router-link>
          <router-link :to="{name: 'Trades'}" class="hover:text-orange-500 transition">Trocas</router-link>
        </div>

        <div class="hidden md:flex items-center gap-4 text-gray-800 ml-6">
          <span class="font-medium">Olá, {{ userName }}</span>
          <button @click="handleLogout" class="rounded-md text-sm font-semibold cursor-pointer hover:text-orange-500 transition">
            Sair
          </button>
        </div>

        <div class="md:hidden flex ml-auto">
          <button @click="toggleMobileMenu" class="text-gray-800 focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      <div v-else class="flex gap-5 font-semibold text-gray-700">
        <router-link :to="{name: 'Register'}" class="cursor-pointer hover:text-orange-500 transition">Registre-se</router-link>
        <router-link :to="{name: 'Login'}" class="cursor-pointer hover:text-orange-500 transition">Login</router-link>
      </div>
    </div>

    <div v-if="isMobileMenuOpen && isAuthenticated" class="md:hidden bg-white shadow-lg">
      <div class="flex flex-col items-center gap-4 p-4">
        <router-link :to="{name: 'Home'}" @click="toggleMobileMenu" class="hover:text-orange-500 transition w-full text-center py-2">Início</router-link>
        <router-link :to="{name: 'MyCards'}" @click="toggleMobileMenu" class="hover:text-orange-500 transition w-full text-center py-2">Minhas Cartas</router-link>
        <router-link :to="{name: 'Trades'}" @click="toggleMobileMenu" class="hover:text-orange-500 transition w-full text-center py-2">Trocas</router-link>
        <hr class="w-full my-2">
        <div class="flex flex-col items-center gap-4 w-full">
           <span class="font-medium text-gray-800">Olá, {{ userName }}</span>
            <button @click="handleLogout" class="bg-red-500 text-white px-4 py-2 rounded-md w-full">
              Sair
            </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const props = defineProps({
  isAuthenticated: {
    type: Boolean,
    default: false
  }
})

const userStore = useUserStore()
const router = useRouter()

const userName = computed(() => userStore.user?.name || 'Usuário')

const handleLogout = () => {
  userStore.logout()
  router.push({name: 'Marketplace'})
}
</script>
