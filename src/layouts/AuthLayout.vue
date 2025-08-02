<template>
  <div class="relative min-h-screen">
    <div class="fixed inset-0 bg-[url('/background.png')] bg-cover bg-center"></div>
    <div className="absolute inset-0 bg-stone-200/70"></div>
    <main class="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
      <div className="mb-10">
        <span className="font-semibold text-7xl bg-gradient-to-br from-orange-200 via-red-600 to-black text-transparent bg-clip-text">
          Cartaroo
        </span>
      </div>
      <router-view />
    </main>
  </div>
</template>
