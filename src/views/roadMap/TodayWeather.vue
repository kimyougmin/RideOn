<script setup>
import { ref } from 'vue';

// 모달의 표시 여부를 관리하는 변수
const weatherModal = ref(false);

// 모달을 토글하는 함수
const toggleModal = () => {
  weatherModal.value = !weatherModal.value;
};
</script>

<template>
  <!-- 날씨 정보와 버튼 -->
  <div class="absolute gap-3 left-1/2 transform -translate-x-1/2 top-[1.5%] flex justify-center items-center">
    <p class="text-3xl">
      ☀️
    </p>
    <p class="text-2xl font-semibold dark:text-black1">
      12℃
    </p>
    <p class="text-lg font-normal dark:text-black1 pl-3">
      오늘은 라이딩하기 좋은 날씨예요.
    </p>
    
    <!-- 🔻 또는 🔺 버튼을 클릭하면 모달을 토글함 -->
    <button @click="toggleModal" class="text-4xl pb-4">
      <!-- 모달이 열리면 🔺, 닫히면 🔻 -->
      <span v-if="weatherModal">🔺</span>
      <span v-else>🔻</span>
    </button>
  </div>

  <!-- 모달 창 -->
  <div v-if="weatherModal" class="absolute bg-black1 dark:bg-black9 z-10 top-[10%] left-1/2 transform -translate-x-1/2 shadow-lg p-6 rounded-3xl w-[20%] h-[20%]">
    <p class="text-lg font-semibold">모달창 내용</p>
    <p class="text-sm">여기에 모달의 상세 내용을 추가할 수 있습니다.</p>
  </div>
</template>
