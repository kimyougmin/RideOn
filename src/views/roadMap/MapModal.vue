<script setup>
import { ref, defineProps } from 'vue';

// 모달 상태를 관리하는 변수
const riderModal = ref(true);

// props로 받은 대여소 정보
const props = defineProps({
  stationName: String,
  availableBikes: String,
  address: String,
  facilityType: String,
  operatingDays: String,
});

// 모달 상태 토글 함수
const toggleModal = () => {
  console.log('모달 상태:', riderModal.value);  // 여기서 로그를 찍어 모달 상태 확인
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

    <div v-if="riderModal">
  <div v-if="props.stationName" class="absolute pb-5 w-[500px] h-[700px] bg-black1 rounded-3xl dark:bg-black9 left-12 top-28 shadow-2xl overflow-y-auto">
    
    <div class="flex flex-col h-full">
  <div class="h-1/3">
    <img src="https://images.unsplash.com/photo-1711333927567-754b6843ab67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="publicbicycle" class="w-full h-full object-cover rounded-t-3xl"/>
  </div>

  <div class="flex-2 mt-4 text-sm text-left ml-6">
    <p class="text-2xl font-extrabold text-left mt-2 mb-5">{{ props.stationName }}</p>
    <p><span class="text-black6 font-medium">주소</span><span class="ml-24"></span><span class="font-medium text-black10">{{ props.address }}</span></p>
    <p><span class="text-black6 font-medium">대여가능 자전거</span><span class="ml-8"></span><span class="font-semibold text-black10">{{ props.availableBikes }}</span></p>
    <p><span class="text-black6 font-medium">시설유형</span><span class="ml-[70px]"></span><span class="font-semibold text-black10">{{ props.facilityType }}</span></p>
    <p><span class="text-black6 font-medium">운영시간</span><span class="ml-[70px]"></span><span class="font-semibold text-black10">{{ props.operatingDays }}</span></p>
  </div>
  <hr class="border-t border-black4 my-3 ml-6 mr-9">
 <!-- 댓글 텍스트 -->
<p class="text-base font-sm font-semibold text-left ml-6 mt-2">댓글</p>

<!-- 댓글 바로 밑에 인풋창과 버튼 -->
<div class="flex items-center space-x-4 mb-40 ml-5">
  <!-- 인풋창 -->
  <input type="text" placeholder="내용을 입력해주세요." class="border border-black4 p-2 rounded-lg w-[350px] text-sm focus:outline-none placeholder:p-2"/>

  <!-- 등록 버튼 -->
  <button class="bg-black text-white p-2 w-20 rounded-lg text-sm hover:bg-gray-800 focus:outline-none">
    등록
  </button>
</div>


</div>


</div>
  </div>
</div>
</template>
