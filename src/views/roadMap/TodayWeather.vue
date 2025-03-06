<script setup>
import { ref, onMounted } from "vue";
import { fetchWeatherData } from "@/views/roadMap/api/fetchWeatherData";

const weatherModal = ref(false);
const weather = ref(null); // ✅ 초기값을 null로 설정
const isLoading = ref(true); // ✅ 로딩 상태 추가
const errorMessage = ref(""); // ✅ 에러 메시지 상태 추가

onMounted(async () => {
  isLoading.value = true; // ✅ 데이터 로딩 시작
  errorMessage.value = ""; // ✅ 에러 메시지 초기화

  try {
    const lat = 37.5665; // 예제: 서울시청 위도
    const lon = 126.9780; // 예제: 서울시청 경도
    weather.value = await fetchWeatherData(lat, lon);

    if (!weather.value) {
      throw new Error("날씨 데이터를 가져오는 데 실패했습니다.");
    }
  } catch (error) {
    console.error("날씨 데이터 로딩 실패:", error);
    errorMessage.value = "❌ 날씨 데이터를 가져오는 데 실패했습니다.";
  } finally {
    isLoading.value = false; // ✅ 데이터 로딩 완료
  }
});

const toggleModal = () => {
  weatherModal.value = !weatherModal.value;
};
</script>

<template>
  <div class="absolute gap-3 top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
    <div v-if="isLoading" class="text-lg font-medium text-black6 mb-4">⏳ 날씨 데이터를 불러오는 중...</div>

<div v-else-if="errorMessage" class="text-lg font-medium text-red-500">{{ errorMessage }}</div>

<div v-else class="flex items-center gap-3">
  <p class="hover:scale-110 transition-transform duration-200 text-2xl">
    {{ weather.weatherIcon }}
  </p>
  <p class="text-2xl font-semibold dark:text-black1 hover:scale-110 transition-transform duration-200">
    {{ weather.temperature }}℃
  </p>
  <p class="text-lg font-medium dark:text-black1 pl-3">
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
    <div v-if="weatherModal" class="absolute flex bg-black1 dark:bg-black9 z-10 rounded-3xl w-[360px] h-40 top-20 shadow-lg p-4">
    <div class="flex flex-col w-1/2 gap-2">
      <div class="flex w-full h-1/2 gap-2 pt-4">
        <div class="flex items-center pt-2 justify-center w-1/2 ml-3 text-6xl">
          {{ weather.weatherIcon }}
        </div>
        <div class="flex flex-col items-center justify-center w-1/2 rounded-md pr-5 dark:text-black1">
  <span class="text-4xl font-bold pb-1 pt-3">{{ weather.temperature }}</span>
  <span class="font-normal text-lg">{{ weather.weatherText }}</span>
</div>
      </div>
      <div class="flex h-1/2 rounded-md pt-6">
  <div class="flex items-center justify-end w-1/2 rounded-md">
    <p class="pr-2 text-[#1A9EFE] text-3xl font-bold">{{ weather.minTemp }}</p>
    <p class="text-4xl font-medium dark:text-black1">/</p>
  </div>
  <div class="flex items-center justify-start w-1/2 rounded-md">
    <p class="pl-2 text-[#DC3644] text-3xl font-bold">{{ weather.maxTemp }}</p>
  </div>
</div>
    </div>

<div class="flex flex-col items-start justify-center w-1/2 pt-4 pl-2 text-base dark:text-black1">
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
