<template>
  <router-link
    v-if="to"
    :to="to"
    class="p-6 block bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] group"
  >
    <slot></slot>
  </router-link>

  <button
    v-else
    class="p-6 w-full bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] group cursor-pointer"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  to: {
    type: Object,
    required: false,
  },
})
</script>
