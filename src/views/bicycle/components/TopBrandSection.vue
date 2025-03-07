<script setup>
</script>

<template>
  <article class="w-full flex flex-col gap-8">
    <p class="text-primaryRed text-title font-bold">TOP BRAND</p>
    <div class="w-full grid grid-cols-4 gap-6">
      <router-link :to="{ name: `bicycleSearch`, params:{id: 111}, query: {brand: `K2바이크`}}">
        <img src="/bicyclePageImage/K2.png" />
      </router-link>
      <img src="/bicyclePageImage/elfama.png" />
      <img src="/bicyclePageImage/sam.png" />
      <img src="/bicyclePageImage/twitter.png" />
    </div>
  </article>
</template>
