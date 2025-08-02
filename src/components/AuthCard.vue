<template>
  <div class="bg-white border-2 border-red-200 rounded-2xl shadow-lg p-8 w-full max-w-md">

    <h2 class="text-center text-xl font-bold text-orange-500 mb-6">{{ isRegister ? 'Registrar' : 'Login' }}</h2>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <div v-if="isRegister">
        <input v-model="name" type="text" placeholder="Nome" class="bg-transparent border-b-2 border-gray-300 p-2 w-full focus:outline-none focus:border-orange-500 transition-colors"/>
        <p v-if="nameError" class="text-red-500 text-xs mt-1 h-4">{{ nameError }}</p>
      </div>

      <div>
        <input v-model="email" type="email" placeholder="Email" class="bg-transparent border-b-2 border-gray-300 p-2 w-full focus:outline-none focus:border-orange-500 transition-colors"/>
        <p v-if="emailError" class="text-red-500 text-xs mt-1 h-4">{{ emailError }}</p>
      </div>
      <div>
        <input v-model="password" type="password" placeholder="Senha" class="bg-transparent border-b-2 border-gray-300 p-2 w-full focus:outline-none focus:border-orange-500 transition-colors"/>
        <p v-if="passwordError" class="text-red-500 text-xs mt-1 h-4">{{ passwordError }}</p>
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="mt-4 flex items-center justify-center gap-2 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition cursor-pointer disabled:bg-orange-300"
      >
        <svg v-if="isSubmitting" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>

        <span v-if="!isSubmitting">
          {{ isRegister ? 'Registrar' : 'Entrar' }}
        </span>
        <span v-else>
          Processando...
        </span>
      </button>
    </form>

    <div class="flex justify-between mt-5">
      <router-link v-if="isRegister" :to="{name: 'Login'}" class="text-sm text-orange-500 hover:underline">Já tem conta? Faça login</router-link>
      <router-link v-else :to="{name: 'Register'}" class="text-sm text-orange-500 hover:underline">Criar uma conta</router-link>
      <router-link :to="{name: 'Marketplace'}" class="text-sm text-orange-500 hover:underline">Página principal</router-link>
    </div>

    <div v-if="error" class="text-red-700 text-center font-semibold px-4 py-2 text-sm mt-3">
      <p>{{ error }}</p>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  isRegister: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  isSubmitting: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit'])

const name = ref('')
const email = ref('')
const password = ref('')

const nameError = ref('')
const emailError = ref('')
const passwordError = ref('')

const validateForm = () => {
  nameError.value = ''
  emailError.value = ''
  passwordError.value = ''
  let isValid = true

  if (props.isRegister && !name.value) {
    nameError.value = 'O nome é obrigatório'
    isValid = false
  }

  if (!email.value) {
    emailError.value = 'O e-mail é obrigatório'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = 'Formato de e-mail inválido'
    isValid = false
  }

  if (!password.value) {
    passwordError.value = 'A senha é obrigatória'
    isValid = false
  } else if (password.value.length < 6) {
    passwordError.value = 'A senha deve ter pelo menos 6 caracteres'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', { name: name.value, email: email.value, password: password.value })
  }
}

watch(name, () => { nameError.value = '' })
watch(email, () => { emailError.value = '' })
watch(password, () => { passwordError.value = '' })

</script>
