<script setup>
import { ref } from 'vue'
const weatherModal = ref(false);

const toggleModal = () => {
  weatherModal.value = !weatherModal.value;
};
</script>

<template>
  <div class="absolute gap-3 top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
    <p class="text-3xl">
      ☀️
    </p>
    <p class="text-2xl font-semibold dark:text-black1">
      12℃
    </p>
    <p class="text-lg font-normal dark:text-black1 pl-3">
      오늘은 라이딩하기 좋은 날씨예요.
    </p>

    <button @click="toggleModal" class="text-4xl mb-4 hover:scale-110 transition-transform duration-200">
  <span v-if="weatherModal">
    <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
      <path d="M5,20 L15,10 L25,20" class="stroke-black dark:stroke-white" stroke-width="2" fill="none"/>
    </svg>
  </span>
  <span v-else>
    <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
      <path d="M5,10 L15,20 L25,10" class="stroke-black dark:stroke-white" stroke-width="2" fill="none"/>
    </svg>
  </span>
</button>

    <!-- 모달창 위치 수정 -->
    <div v-if="weatherModal" class="absolute bg-black1 dark:bg-black9 z-10 rounded-3xl w-96 h-48 top-16 shadow-lg">
      <p class="text-lg font-semibold">모달창 내용</p>
      <p class="text-sm">어쩌고저쩌고 기온</p>
    </div>
  </div>
</template>
