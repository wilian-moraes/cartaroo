<template>
  <AuthCard :is-register="true" @submit="handleRegister" :error="errorMessage" :is-submitting="isSubmitting" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'
import axios from 'axios'
import AuthCard from '../components/AuthCard.vue'
import type { AuthFormData } from '../interfaces/auth'
import { useToast } from 'vue-toastification'

const toast = useToast()
const isSubmitting = ref(false)
const errorMessage = ref('')
const router = useRouter()

const handleRegister = async (formData: AuthFormData) => {
  errorMessage.value = ''
  isSubmitting.value = true

  try {
    await api.post('/register', { name: formData.name, email: formData.email, password: formData.password })

    toast.success('Cadastro realizado!')

    router.push({name: 'Login'})
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      errorMessage.value = error.response?.data?.message || 'Erro no registro'
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
