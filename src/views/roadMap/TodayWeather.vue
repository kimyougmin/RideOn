<script setup>
import { ref, onMounted } from "vue";
import { fetchWeatherData } from "@/views/roadMap/api/fetchWeatherData";

const weatherModal = ref(false);
const weather = ref(null);
const isLoading = ref(true);
const errorMessage = ref("");

onMounted(() => {
  isLoading.value = true;
  errorMessage.value = "";

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        weather.value = await fetchWeatherData(lat, lon);
        if (!weather.value) throw new Error("날씨 데이터를 가져오는 데 실패했습니다.");
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    },
    async (error) => {
      console.error(error);

      try {
        weather.value = await fetchWeatherData(37.5665, 126.9780);
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    }
  );
});


const toggleModal = () => {
  weatherModal.value = !weatherModal.value;
};
</script>

<template>
  <div class="absolute gap-3 top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
    <div v-if="isLoading" class="text-lg font-medium text-black6 mb-4 dark:text-black3">⏳ 날씨 데이터를 불러오는 중...</div>

<div v-else-if="errorMessage" class="text-lg font-medium text-red-500">{{ errorMessage }}</div>

<div v-else class="flex items-center gap-3">
  <p class="hover:scale-110 transition-transform duration-200 text-2xl">
    {{ weather.weatherIcon }}
  </p>
  <p class="text-xl font-semibold dark:text-black1 hover:scale-110 transition-transform duration-200">
    {{ weather.temperature }}℃
  </p>
  <p class="text-lg font-medium dark:text-black1 ml-2">
    {{ weather.weatherMessage }}
  </p>
</div>

    <button @click="toggleModal" class="text-4xl mb-4 hover:scale-110 transition-transform duration-200">
  <span v-if="weatherModal">
    <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
      <path d="M5,20 L15,10 L25,20" class="stroke-black10 dark:stroke-white" stroke-width="2" fill="none"/>
    </svg>
  </span>
  <span v-else>
    <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
      <path d="M5,10 L15,20 L25,10" class="stroke-black10 dark:stroke-white" stroke-width="2" fill="none"/>
    </svg>
  </span>
</button>

<!-- 모달 -->
<div v-if="weatherModal" class="absolute flex bg-black1 dark:bg-black9 z-10 rounded-3xl w-[350px] max-w-none h-44 top-20 shadow-[0px_8px_25px_rgba(50,50,50,0.4)] p-2">
    <div class="flex flex-col w-1/2 gap-2">
      <div class="flex w-full h-1/2 gap-2 pt-3">
        <div class="flex items-center pt-4 justify-center w-1/2 text-6xl animate-[bounce_1s_infinite]">
  {{ weather.weatherIcon }}
</div>
        <div class="flex flex-col items-center justify-center w-1/2 rounded-md dark:text-black1">
  <span class="text-4xl font-bold pb-1 pt-6 pr-5">{{ weather.temperature }}</span>
  <span class="font-normal text-lg whitespace-nowrap pr-5">{{ weather.weatherText }}</span>
</div>
      </div>
      <div class="flex h-1/2 rounded-md pt-4">
  <div class="flex items-center justify-end w-1/2 rounded-md">
    <p class="pr-2 text-[#1A9EFE] text-3xl font-bold">{{ weather.minTemp }}</p>
    <p class="text-4xl font-medium dark:text-black1">/</p>
  </div>
  <div class="flex items-center justify-start w-1/2 rounded-md">
    <p class="pl-2 text-[#DC3644] text-3xl font-bold">{{ weather.maxTemp }}</p>
  </div>
</div>
    </div>
<div class="flex flex-col pl-2 items-start justify-center w-1/2 pt-5 text-lg dark:text-black1">
  <div class="flex w-full gap-x-4">
    <p class="font-bold w-16">습도</p>
    <p>{{ weather.humidity }}%</p>
  </div>
  <div class="flex w-full gap-x-4">
    <p class="font-bold w-16">강수확률 </p>
    <p>{{ weather.rainProbability }}%</p>
  </div>
  <div class="flex w-full gap-x-4">
    <p class="font-bold w-16">강수량 </p>
    <p>{{ weather.precipitation }}</p>
  </div>
</div>

  </div>
  </div>
</template>
