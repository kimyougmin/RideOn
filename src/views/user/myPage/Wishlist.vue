<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchUserLikesApi, removeUserLikeApi } from '@/apis/userLikesApi'

// 기본 이미지 URL
const defaultImage = 'https://img.danawa.com/prod_img/500000/437/092/img/28092437_1.jpg?shrink=330:*&_v=20240108170952'

// 로컬스토리지에서 `_id` 가져오기
const userData = JSON.parse(localStorage.getItem('user'))
const userId = userData?._id || null
console.log(userId)

// 찜 목록 데이터
const wishlist = ref([])

// 필터 옵션
const filters = ref([
  { id: 'bike', text: '자전거' },
  { id: 'parts', text: '자전거부품' },
  { id: 'gear', text: '라이더용품' },
])

// 현재 선택된 필터 (기본값: 자전거)
const activeFilter = ref('bike')

// API 호출 후 데이터 세팅
const fetchWishlist = async () => {
  if (!userId) {
    console.error('사용자 ID가 없음 - 없으면 안됨')
    return
  }

  try {
    console.log(' 찜 목록 불러오는 중')
    const data = await fetchUserLikesApi(userId)

    console.log('API 응답 데이터:', data)

    wishlist.value = data.map((item) => ({
      id: item.like_key,
      title: item.title,
      name: item.name,
      price: Number(item.price),
      image: item.image || defaultImage,
      brand: item.brand,
      category: ['MTB', 'KID', '로드', 'HYBRID', 'EBIKE', 'PIXIE'].includes(item.category) ? 'bike' : item.category,
    }))
  } catch (error) {
    console.error('찜 목록 불러오기 실패:', error)
  }
}

// 찜 목록에서 제거하는 함수 (API 호출)
const removeFromWishlist = async (item) => {
  if (!userId || !item.title) return

  try {
    const response = await removeUserLikeApi(item.title, userId)

    if (response?.status === 200) {
      wishlist.value = wishlist.value.filter((w) => w.id !== item.id)
      console.log('찜 삭제 성공:', response.message)
    } else {
      console.error('찜 삭제 실패:', response)
    }
  } catch (error) {
    console.error('찜 삭제 중 오류 발생:', error)
  }
}

// 컴포넌트가 마운트되면 찜 목록 불러오기
onMounted(fetchWishlist)

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
</script>

<template>
  <section class="w-full ml-[10px]">
    <!-- 제목 -->
    <h2 class="text-2xl font-bold text-black9 dark:text-black1 mb-4 flex items-center gap-2">
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
          'bg-black9 text-black1 dark:bg-black1 dark:text-black9': activeFilter === filter.id,
          'hover:bg-black10 dark:hover:bg-black6 dark:text-black1': activeFilter !== filter.id,
        }"
      >
        {{ filter.text }}
      </button>
    </div>

    <p v-if="wishlist.length === 0" class="text-center text-black5 dark:text-black3 mt-[250px]">
      찜 목록이 없습니다.
    </p>

    <!-- 찜 목록 -->
    <div class="grid grid-cols-3 gap-x-[14px] gap-y-[35px]">
      <div
        v-for="item in displayedWishlist"
        :key="item.id"
        class="w-[300px] rounded-lg border border-black3 dark:border-black5"
      >
        <!-- 이미지 박스 -->
        <div class="w-full h-[191px] border-b flex items-center justify-center bg-black1 dark:bg-black1 rounded-t-lg">
          <img
            :src="item.image || defaultImage"
            alt="상품 이미지"
            class="w-[180px] h-auto object-contain"
          />
        </div>

        <!-- 텍스트 박스 -->
        <div class="w-full h-[97px] px-2 py-2 bg-black1 dark:bg-black9 rounded-b-lg relative">
          <!-- 브랜드 -->
          <p class="text-sm text-black5 dark:text-black3 leading-none mb-4">
            {{ item.brand }}
          </p>

          <!-- 상품명 -->
          <p class="sub-title font-bold text-black9 dark:text-black1 leading-tight mb-1">
            {{ item.name }}
          </p>

          <!-- 가격 & 하트 아이콘 -->
          <div class="flex items-center justify-between">
            <p class="sub-title font-bold text-black7 dark:text-black1 leading-tight">
              {{ item.price.toLocaleString() }}원
            </p>
            <img
              src="./images/heart.svg"
              alt="찜 삭제"
              class="w-[16px] h-[15px] cursor-pointer transition-transform hover:scale-110"
              @click="removeFromWishlist(item)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 더보기 버튼 -->
    <div v-if="hasMoreItems" class="flex justify-center mt-[80px] mb-[21px]">
      <button
        @click="loadMore"
        class="w-[300px] h-[56px] border rounded-lg font-semibold transition-all bg-black10 text-black1 dark:bg-black1 dark:text-black7 dark:border-black4 hover:bg-primaryRed hover:text-black1"
      >
        더 보기
      </button>
    </div>
  </section>
</template>
