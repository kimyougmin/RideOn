<script setup>
</script>

<template>
  <article class="w-full flex flex-col gap-8">
    <p class="text-primaryRed text-title font-bold">TOP BRAND</p>
    <div class="w-full grid grid-cols-4 gap-6">
      <router-link :to="{ name: `bicycleSearch`, params:{id: 111}, query: {brand: `K2바이크`}}">
        <img src="/bicyclePageImage/K2.png" />
      </router-link>
      <router-link :to="{ name: `bicycleSearch`, params:{id: 111}, query: {brand: `elfama`}}">
        <img src="/bicyclePageImage/elfama.png" />
      </router-link>
      <router-link :to="{ name: `bicycleSearch`, params:{id: 111}, query: {brand: `삼천리자전거`}}">
        <img src="/bicyclePageImage/sam.png" />
      </router-link>
      <router-link :to="{ name: `bicycleSearch`, params:{id: 111}, query: {brand: `twitter`}}">
        <img src="/bicyclePageImage/twitter.png" />
      </router-link>
    </div>
  </article>
</template>
