<script setup>
import { ref } from 'vue'

const images = ['/main/main_bike_route_2.png', '/main/main_bike_route.png']

const randomImage = ref(images[Math.floor(Math.random() * images.length)])
</script>

<template>
  <article class="grid grid-cols-12 gap-4">
    <div class="col-span-4 flex flex-col gap-[50px]">
      <div class="flex flex-col gap-4">
        <h3 class="text-3xl text-primaryRed font-bold">Bike Routes</h3>
        <h2 class="text-4xl font-bold dark:text-black1 leading-tight">
          최적의 라이딩 경로 찾기 <br />
          RideOn과 함께
        </h2>
        <p class="text-sub-title m-0 dark:text-black1">
          라이딩에 필요한 모든 것! 최적의 경로, 실시간 날씨, 그리고 함께할 라이더까지 한곳에서
          찾으세요.
        </p>
      </div>
      <button class="bg-black8 text-black1 rounded-full py-4 dark:bg-black7">
        라이딩 경로 찾기
      </button>
    </div>
    <div class="col-start-6 col-span-7 overflow-hidden">
      <img :src="randomImage" alt="banner text" class="w-full h-full" />
    </div>
  </article>
</template>
