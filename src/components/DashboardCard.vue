<template>
  <div v-if="!isInfoCard" class="flex flex-col justify-center items-center text-center h-full">
    <span class="text-2xl mb-2">{{ icon }}</span>
    <span class="font-bold text-lg text-gray-800 group-hover:text-orange-500 transition-colors">{{ title }}</span>
    <span class="text-sm text-gray-500">{{ subtitle }}</span>
  </div>

  <div v-else class="p-6 bg-white rounded-lg shadow-lg flex flex-col justify-around h-40">
    <span class="font-semibold text-gray-600">{{ title }}</span>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  icon: String,
  title: String,
  subtitle: String,
  isInfoCard: {
    type: Boolean,
    required: false
  }
})
</script>
