<template>
  <section class="w-full">
    <!-- 제목 -->
    <h2 class="text-2xl font-bold text-black9 dark:text-white mb-4 flex items-center gap-2">
      찜 목록 📍 <span class="text-lg">({{ filteredWishlist.length }})</span>
    </h2>

    <!-- 필터 버튼 -->
    <div class="flex gap-2 mb-4">
      <button
        v-for="filter in filters"
        :key="filter.id"
        @click="setActiveFilter(filter.id)"
        class="px-4 py-2 border rounded-full text-sm font-medium transition-all"
        :class="{
          'bg-black text-white dark:bg-white dark:text-black': activeFilter === filter.id,
          'hover:bg-black10 dark:hover:bg-black6 dark:text-white': activeFilter !== filter.id
        }"
      >
        {{ filter.text }}
      </button>
    </div>

    <!-- 찜 목록 -->
    <div class="grid grid-cols-3 gap-3">
      <div v-for="item in displayedWishlist" :key="item.id" class="border p-2 rounded-lg shadow-sm bg-white dark:bg-white w-[230px] relative">
        <!-- 상품 이미지 -->
        <div class="w-[210px] h-[140px] mx-auto">
          <img :src="item.image || defaultImage" alt="상품 이미지" class="w-full h-full object-cover rounded-lg">
        </div>

        <!-- 상품 정보 -->
        <div class="mt-3 text-left px-2">
          <p class="text-xs text-black5 dark:text-black4">브랜드 이름</p>
          <p class="font-bold text-black9 dark:text-black">{{ item.name }}</p>
          <p class="text-lg font-semibold text-black7 dark:text-black">{{ item.price.toLocaleString() }}원</p>
        </div>

        <!-- 하트 버튼 -->
        <button @click="removeFromWishlist(item.id)" class="text-red-500 text-base absolute bottom-3 right-3">
          ❤️
        </button>
      </div>
    </div>

    <!-- 더보기 버튼 -->
    <div v-if="hasMoreItems" class="flex justify-center mt-6">
      <button
        @click="loadMore"
        class="px-6 py-2 border rounded-lg font-semibold transition-all bg-black10 text-white dark:bg-black1 dark:text-white dark:border-black4 hover:bg-primaryRed hover:text-white"
      >
        더 보기
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

// 기본 이미지 URL
const defaultImage = 'https://img.danawa.com/prod_img/500000/437/092/img/28092437_1.jpg?shrink=330:*&_v=20240108170952';

// 찜 목록 데이터
const wishlist = ref([
  { id: 1, name: 'K2바이크 블랙타이판 펜서 R1.4D', price: 511000, image: '', brand: 'K2바이크', category: 'bike' },
  { id: 2, name: '자전거 타이어 700C', price: 45000, image: '', brand: 'SCHWALBE', category: 'parts' },
  { id: 3, name: '라이더 헬멧 고급형', price: 120000, image: '', brand: 'GIRO', category: 'gear' },
  { id: 4, name: '변속기 SHIMANO 105', price: 89000, image: '', brand: 'SHIMANO', category: 'parts' },
  { id: 5, name: '라이더 장갑 풀핑거', price: 35000, image: '', brand: 'FOX', category: 'gear' }
]);

// 필터 옵션
const filters = ref([
  { id: 'bike', text: '자전거' },
  { id: 'parts', text: '자전거부품' },
  { id: 'gear', text: '라이더용품' }
]);

// 현재 선택된 필터
const activeFilter = ref('bike');

// 필터링된 찜 목록
const filteredWishlist = computed(() => {
  return wishlist.value.filter(item => item.category === activeFilter.value);
});

// 한 번에 표시할 아이템 개수 (초기 9개, 더보기 누를 때 9개씩 추가)
const itemsPerPage = ref(9);
const displayedWishlist = computed(() => filteredWishlist.value.slice(0, itemsPerPage.value));

// 더보기 버튼 활성화 여부
const hasMoreItems = computed(() => itemsPerPage.value < filteredWishlist.value.length);

// 더보기 클릭 시 추가 로드
const loadMore = () => {
  itemsPerPage.value += 9;
};

// 필터 변경
const setActiveFilter = (filter) => {
  activeFilter.value = filter;
  itemsPerPage.value = 9;
};

// 찜 삭제 기능
const removeFromWishlist = (id) => {
  wishlist.value = wishlist.value.filter(item => item.id !== id);
};
</script>
