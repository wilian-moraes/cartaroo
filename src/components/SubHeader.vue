<template>
  <div class="flex justify-between items-center mb-8">
    <h2 class="text-lg font-bold tracking-wide">{{ title }}</h2>

    <div>
      <slot name="action" :classes="actionClasses"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      required: true
    }
  })

  const actionClasses = "px-4 py-3 bg-white shadow-md rounded-md cursor-pointer hover:bg-orange-100 transition-colors"
</script>
