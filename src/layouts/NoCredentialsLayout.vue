<script setup lang="ts">
import NavHeader from '../components/NavHeader.vue'
</script>

<template>
  <div class="relative min-h-screen bg-stone-100">
    <div class="fixed inset-0 bg-[url('/background.png')] bg-cover bg-center opacity-10"></div>
    <NavHeader />

    <main class="relative z-10 container mx-auto pt-24 p-4">
      <router-view />
    </main>
  </div>
</template>
