<template>
  <AuthCard @submit="handleLogin" :error="errorMessage" :is-submitting="isSubmitting" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '../services/api'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import axios from 'axios'
import type { AuthFormData, LoginResponse } from '../interfaces/auth'
import AuthCard from '../components/AuthCard.vue'

const errorMessage = ref('')
const isSubmitting = ref(false)
const store = useUserStore()
const router = useRouter()

const handleLogin = async (formData: AuthFormData) => {
  errorMessage.value = ''
  isSubmitting.value = true

  try {
    const res = await api.post<LoginResponse>('/login', { email: formData.email, password: formData.password })
    store.setUser(res.data.token, res.data.user)

    router.push({name: 'Home'})
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      errorMessage.value = error.response?.data?.message || 'Erro no login'
    } else if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Erro inesperado'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
