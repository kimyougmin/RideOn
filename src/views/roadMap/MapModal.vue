<script setup>
import { ref, computed, defineProps, onMounted } from 'vue';

const riderModal = ref(true);
const isLoading = ref(true);
const props = defineProps({ facility: Object });

const facilityImage = computed(() => {
  if (!props.facility) return "/roadMapImage/default.jpg";
  const images = {
    bikeStation: "/roadMapImage/bike.jpg",
    수리시설: "/roadMapImage/repair.jpg",
    공기주입기: "/roadMapImage/airpump.jpg",
    보관소: "/roadMapImage/rack.jpg"
  };
  return images[props.facility.type] || "/roadMapImage/bike.jpg";
});

onMounted(() => {
  setTimeout(() => isLoading.value = false, 1000);
});

const toggleModal = () => {
  riderModal.value = !riderModal.value;
};
</script>

<template>
  <div class="relative">
    <button @click="toggleModal" class="w-12 h-12 bg-black1 text-black1 dark:bg-black10 rounded-full absolute top-8 left-14 shadow-[4px_4px_5px_rgba(0,0,0,0.4)] flex items-center justify-center hover:scale-110 transition-transform duration-200">
      <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
        <path :d="riderModal ? 'M20,5 L10,15 L20,25' : 'M10,5 L20,15 L10,25'" class="stroke-black10 dark:stroke-white" stroke-width="2" fill="none"/>
      </svg>
    </button>

    <div v-if="riderModal" class="absolute pb-5 w-[500px] h-[700px] bg-black1 rounded-3xl dark:bg-black9 left-12 top-28 shadow-[15px_15px_7px_rgba(0,0,0,0.3)] overflow-y-auto">
      <div v-if="isLoading" class="flex items-center justify-center h-full text-lg font-medium text-black10 dark:text-black1">⏳ 정보 불러오는 중...</div>
      <div v-else class="flex flex-col h-full">
        <img :src="facilityImage" class="w-full h-[250px] object-cover"/>
        <div class="flex-2 mt-5 text-sm text-left ml-6 text-black10 dark:text-black1">
          <p class="text-2xl font-extrabold">{{ props.facility.name }}</p>
          <div class="flex justify-between w-[90%]"><p class="w-24 font-normal text-black6 dark:text-black1">📍 주소</p><p class="flex-1 font-medium">{{ props.facility.address }}</p></div>
          <template v-if="props.facility.type === 'bikeStation'">
            <div class="flex justify-between w-[90%]"><p class="w-24 font-normal text-black6 dark:text-black1">🚲 대여 가능</p><p class="flex-1 font-medium">{{ props.facility.availableBikes }}대</p></div>
            <div class="flex justify-between w-[90%]"><p class="w-24 font-normal text-black6 dark:text-black1">🏢 시설 유형</p><p class="flex-1 font-medium">{{ props.facility.facilityType }}</p></div>
            <div class="flex justify-between w-[90%]"><p class="w-24 font-normal text-black6 dark:text-black1">⏳ 운영 시간</p><p class="flex-1 font-medium">{{ props.facility.operatingDays }}</p></div>
          </template>
          <template v-else>
            <div class="flex justify-between w-[90%]"><p class="w-24 font-normal text-black6 dark:text-black1">✅ 사용 가능</p><p class="flex-1 font-medium">{{ props.facility.useYn === '사용' ? '가능' : '❌' }}</p></div>
          </template>
        </div>
        <hr class="border-t border-black4 my-3 ml-6 mr-9">
        <p class="text-base font-semibold ml-6 mt-2 text-black10 dark:text-black1">댓글 (0개)</p>
        <div class="flex items-center space-x-4 mb-48 ml-5">
          <input type="text" placeholder="내용을 입력해주세요." class="border p-2 rounded-lg w-[350px] text-sm dark:placeholder:text-black6 dark:bg-black1">
          <button class="bg-black10 text-white p-2 w-20 rounded-lg hover:bg-black7 hover:scale-110 transition-transform duration-200">등록</button>
        </div>
      </div>
    </div>
  </div>
</template>
