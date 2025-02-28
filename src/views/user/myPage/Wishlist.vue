<template>
  <section class="w-full">
    <!-- 제목 -->
    <h2 class="text-2xl font-bold text-black9 dark:text-white mb-4 flex items-center gap-2">
      찜 목록 📍 <span class="text-lg">({{ filteredWishlist.length }})</span>
    </h2>

    <!-- 필터 버튼 -->
    <div class="flex gap-2 mb-6">
      <button
        v-for="filter in filters"
        :key="filter.id"
        @click="setActiveFilter(filter.id)"
        class="px-4 py-2 border rounded-full text-sm font-medium transition-all"
        :class="{
          'bg-black text-white dark:bg-white dark:text-black': activeFilter === filter.id,
          'hover:bg-black10 dark:hover:bg-black6 dark:text-white': activeFilter !== filter.id,
        }"
      >
        {{ filter.text }}
      </button>
    </div>

    <!-- 찜 목록 -->
    <div class="grid grid-cols-3 gap-x-[14px] gap-y-[35px]">
      <div
        v-for="item in displayedWishlist"
        :key="item.id"
        class="w-[300px] rounded-lg border border-black3 dark:border-black5"
      >
        <!-- 이미지 박스 -->
        <div
          class="w-full h-[191px] border-b dark:b flex items-center justify-center bg-white dark:bg-black1 rounded-t-lg"
        >
          <img
            :src="item.image || defaultImage"
            alt="상품 이미지"
            class="w-[180px] h-auto object-contain"
          />
        </div>

        <!-- 텍스트 박스 -->
        <div
          class="w-full h-[97px] px-2 py-2 bg-white dark:bg-black9 rounded-b-lg flex flex-col justify-between relative"
        >
          <!-- 브랜드 및 상품명 -->
          <div>
            <p class="text-md text-black5 dark:text-black3 leading-none">{{ item.brand }}</p>
            <p class="font-bold text-black9 dark:text-white text-lg leading-tight">
              {{ item.name }}
            </p>
          </div>

          <div class="flex items-center justify-between mt-[-5px] relative">
            <p class="text-lg font-bold text-black7 dark:text-white leading-tight">
              {{ item.price.toLocaleString() }}원
            </p>

            <!-- 하트 아이콘  -->
            <img
              src="./images/heart.svg"
              alt="찜 삭제"
              class="w-[16px] h-[15px] cursor-pointer transition-transform hover:scale-110 absolute right-[5px] bottom-[23px]"
              @click="removeFromWishlist(item.id)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 더보기 버튼 -->
    <div v-if="hasMoreItems" class="flex justify-center mt-[80px] mb-[21px]">
      <button
        @click="loadMore"
        class="w-[300px] h-[56px] border rounded-lg font-semibold transition-all bg-black10 text-white dark:bg-black1 dark:text-black7 dark:border-black4 hover:bg-primaryRed hover:text-white"
      >
        더 보기
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// 기본 이미지 URL
const defaultImage =
  'https://img.danawa.com/prod_img/500000/437/092/img/28092437_1.jpg?shrink=330:*&_v=20240108170952'

// 찜 목록 데이터 임시
const wishlist = ref([
  {
    id: 1,
    name: 'K2바이크 블랙타이판 펜서 R1.4D',
    price: 511000,
    image: '',
    brand: 'K2바이크',
    category: 'bike',
  },
  {
    id: 2,
    name: '자전거 타이어 700C',
    price: 45000,
    image: '',
    brand: 'SCHWALBE',
    category: 'parts',
  },
  { id: 3, name: '라이더 헬멧 고급형', price: 120000, image: '', brand: 'GIRO', category: 'gear' },
  {
    id: 4,
    name: 'K2바이크 블랙타이판 펜서 R1.4D',
    price: 511000,
    image: '',
    brand: 'K2바이크',
    category: 'bike',
  },
  {
    id: 5,
    name: '변속기 SHIMANO 105',
    price: 89000,
    image: '',
    brand: 'SHIMANO',
    category: 'parts',
  },
  {
    id: 6,
    name: '라이더 고글 UV 차단',
    price: 68000,
    image: '',
    brand: 'OAKLEY',
    category: 'gear',
  },
  { id: 7, name: 'TREK 도마니 SL6', price: 3500000, image: '', brand: 'TREK', category: 'bike' },
  {
    id: 8,
    name: 'GIANT TCR ADVANCED',
    price: 3200000,
    image: '',
    brand: 'GIANT',
    category: 'bike',
  },
  { id: 9, name: '스램 RED 12단 체인', price: 55000, image: '', brand: 'SRAM', category: 'parts' },
  {
    id: 10,
    name: '메리다 SCULTURA 5000',
    price: 2700000,
    image: '',
    brand: 'MERIDA',
    category: 'bike',
  },
  { id: 11, name: '라이더 장갑 풀핑거', price: 35000, image: '', brand: 'FOX', category: 'gear' },
  { id: 12, name: '스캇 ADDICT RC', price: 4200000, image: '', brand: 'SCOTT', category: 'bike' },
  {
    id: 13,
    name: '자전거 라이트 전조등',
    price: 24000,
    image: '',
    brand: 'CAT EYE',
    category: 'parts',
  },
  {
    id: 14,
    name: '스페셜라이즈드 ROUBAIX',
    price: 5100000,
    image: '',
    brand: 'SPECIALIZED',
    category: 'bike',
  },
  { id: 15, name: '카본 물통 케이지', price: 15000, image: '', brand: 'ELITE', category: 'parts' },
  { id: 16, name: 'BMC 팀머신 SLR02', price: 4800000, image: '', brand: 'BMC', category: 'bike' },
  {
    id: 17,
    name: '자전거 안장 젤패드',
    price: 32000,
    image: '',
    brand: 'SELLE',
    category: 'parts',
  },
  {
    id: 18,
    name: '라이더 백팩 방수형',
    price: 98000,
    image: '',
    brand: 'DEUTER',
    category: 'gear',
  },
  { id: 19, name: '윌리어 ZERO SLR', price: 6400000, image: '', brand: 'WILIER', category: 'bike' },
  {
    id: 20,
    name: '리들리 FENIX SL DISC',
    price: 4600000,
    image: '',
    brand: 'RIDLEY',
    category: 'bike',
  },
])

// 필터 옵션
const filters = ref([
  { id: 'bike', text: '자전거' },
  { id: 'parts', text: '자전거부품' },
  { id: 'gear', text: '라이더용품' },
])

// 현재 선택된 필터 (기본값: 자전거)
const activeFilter = ref('bike')

// 필터링된 찜 목록
const filteredWishlist = computed(() => {
  return wishlist.value.filter((item) => item.category === activeFilter.value)
})

// 한 번에 표시할 아이템 개수 (초기 9개, 더보기 누를 때 9개씩 추가)
const itemsPerPage = ref(9)
const displayedWishlist = computed(() => filteredWishlist.value.slice(0, itemsPerPage.value))

// 더보기 버튼 활성화 여부
const hasMoreItems = computed(() => itemsPerPage.value < filteredWishlist.value.length)

// 더보기 클릭 시 추가 로드
const loadMore = () => {
  itemsPerPage.value += 9
}

// 필터 변경
const setActiveFilter = (filter) => {
  activeFilter.value = filter
  itemsPerPage.value = 9 // 필터 변경 시 처음 9개만 보이도록 리셋
}

// 찜 목록에서 제거하는 함수
const removeFromWishlist = (id) => {
  wishlist.value = wishlist.value.filter((item) => item.id !== id)
}
</script>
