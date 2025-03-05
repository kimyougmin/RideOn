<script setup>
import { ref, defineProps } from 'vue';

const riderModal = ref(true);

const props = defineProps({
  stationName: String,
  availableBikes: String,
  address: String,
  facilityType: String,
  operatingDays: String,
});

const toggleModal = () => {
  riderModal.value = !riderModal.value;
};
</script>

<template>
  <div class="relative">
    <button @click="toggleModal" class="w-12 h-12 bg-black1 dark:bg-black9 text-black 
    rounded-full flex items-center justify-center absolute top-8 left-14 shadow-xl
     hover:scale-110 transition-transform duration-200">
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

    <div v-if="riderModal" class="relative">
  <div v-if="props.stationName" class="absolute pb-5 w-[500px] h-[700px] bg-black1 rounded-3xl dark:bg-black9 left-12 top-28 shadow-2xl overflow-y-auto">
    
    <div class="flex flex-col h-full">
  <div class="h-1/3">
    <img src="https://images.unsplash.com/photo-1711333927567-754b6843ab67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="publicbicycle" class="w-full h-full object-cover rounded-t-3xl"/>
  </div>

  <div class="flex-2 mt-4 text-sm text-left ml-6 dark:text-black1">
    <p class="text-2xl font-extrabold text-left mt-2 mb-5">{{ props.stationName }}</p>
    <p><span class="text-black6 dark:text-black1 font-medium">주소</span><span class="ml-24"></span><span class="font-medium text-black10 dark:text-black1">{{ props.address }}</span></p>
    <p><span class="text-black6 dark:text-black1 font-medium">대여가능 자전거</span><span class="ml-8"></span><span class="font-semibold text-black10 dark:text-black1">{{ props.availableBikes }}</span></p>
    <p><span class="text-black6 dark:text-black1 font-medium">시설유형</span><span class="ml-[70px]"></span><span class="font-semibold text-black10 dark:text-black1">{{ props.facilityType }}</span></p>
    <p><span class="text-black6 dark:text-black1 font-medium">운영시간</span><span class="ml-[70px]"></span><span class="font-semibold text-black10 dark:text-black1">{{ props.operatingDays }}</span></p>
  </div>
  <hr class="border-t border-black4 my-3 ml-6 mr-9">
<p class="text-base font-sm font-semibold text-left ml-6 mt-2 dark:text-black1">댓글</p>

<div class="flex items-center space-x-4 mb-40 ml-5">
  <input type="text" placeholder="내용을 입력해주세요." class="border border-black4 dark:bg-black1 dark:placeholder:text-black6 p-2 rounded-lg w-[350px] text-sm focus:outline-none placeholder:p-2"/>

  <button class="bg-black dark:bg-black1 text-black1 dark:text-black10 p-2 w-20 font-medium rounded-lg text-sm hover:bg-black5 dark:hover:bg-black5 focus:outline-none">
    등록
  </button>
</div>


</div>


</div>
  </div>
</div>
</template>
