<script setup>
import { ref } from 'vue';

const riderModal = ref(true);
const Schedule = ref([]);

const ridingSchedule = () => {
  Schedule.value.push({ id: Schedule.value.length + 1 });
};
</script>

<template>
  <div>
    <button @click="toggleModal" class="w-12 h-12 bg-black1 dark:bg-black9 text-black rounded-full flex items-center justify-center absolute top-20 left-14 shadow-xl hover:scale-110 transition-transform duration-200">
      <span v-if="riderModal">
        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,5 L10,15 L20,25" class="stroke-black dark:stroke-white" stroke-width="2" fill="none"/>
        </svg>
      </span>
      <span v-else>
        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,5 L20,15 L10,25" class="stroke-black dark:stroke-white" stroke-width="2" fill="none"/>
        </svg>
      </span>
    </button>

    <div v-if="riderModal" class="absolute pb-5 w-[500px] h-[700px] bg-black1 rounded-3xl dark:bg-black9 left-12 top-36 shadow-2xl overflow-y-auto">
      <div class="flex gap-x-4 justify-center pt-6">
        <div>
          <input type="date" class="border rounded py-1 px-4" />
        </div>
        <div class="relative">
          <select id="people" name="people" class="border rounded px-12 py-1">
            <option v-for="i in 5" :key="i" :value="i">{{ i }}명</option>
          </select>
        </div>
        <div>
          <select id="location" name="location" class="border rounded px-12 py-1">
            <option>서울</option>
            <option>부산</option>
            <option>대구</option>
            <option>인천</option>
            <option>대전</option>
            <option>울산</option>
            <option>세종</option>
            <option>경기</option>
            <option>강원</option>
            <option>충북</option>
            <option>충남</option>
            <option>전북</option>
            <option>전남</option>
            <option>경북</option>
            <option>경남</option>
            <option>제주</option>
          </select>
        </div>
      </div>

      <div class="flex justify-center mt-4">
        <button @click="ridingSchedule" class="px-40 py-2 bg-black9 text-black1 text-sm rounded-lg hover:bg-black5 transition duration-100">라이딩 일정 생성하기</button>
      </div>
      <div v-for="item in Schedule" :key="item.id" class="mt-4 h-[200px] bg-black2 p-4 mr-8 ml-8 rounded-lg relative">
        <button 
  class="absolute left-[66%] top-[70%] translate-x-[-70%] 
         w-80 py-2 bg-black10 text-black1 text-sm rounded-lg hover:bg-black5 
         transition duration-100">
  함께하기
</button>

</div>

      </div>
    </div>
</template>
