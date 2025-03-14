<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchUserLikesApi } from '@/apis/userLikesApi'
import { fetchLikeRemoveApi } from '@/apis/fetchLikeRemoveApi'
import AlertMessage from './components/Alert.vue'
import bikeCategoryData from '@/../public/bike_category_data.json'
import { getNaverItems } from '@/apis/naverSearchApi'
import { useRouter } from 'vue-router'
const router = useRouter()


// 알림창 상태
const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref('success')

// 기본 이미지 URL
const defaultImage =
  'https://img.danawa.com/prod_img/500000/437/092/img/28092437_1.jpg?shrink=330:*&_v=20240108170952'

const userData = JSON.parse(localStorage.getItem('user'))
const userId = userData?._id || null

// 찜 목록 데이터
const wishlist = ref([])

const filters = ref([
  { id: 'bike', text: '자전거' },
  { id: 'parts', text: '자전거부품' },
  { id: 'gear', text: '라이더용품' },
])

const activeFilter = ref('bike')

// 기존 카테고리 매핑 함수 (알고있는 카테고리가 있다면 추가해주세요!)
const mapCategory = (category) => {
  const bikeCategories = ['MTB', 'KID', '로드', 'HYBRID', 'EBIKE', 'PIXIE'] // 자전거
  const partsCategories = ['기타자전거 부품', '자전거 부품', '부품', '자전거부품'] // 자전거 부품

  if (bikeCategories.includes(category)) {
    return 'bike'
  }
  if (partsCategories.includes(category)) {
    return 'parts'
  }

  return 'gear'
}

const findRatingForItem = (wishlistItem) => {
  for (const category in bikeCategoryData) {
    const product = bikeCategoryData[category].find((prod) => {
      const prodName = prod.name.trim().toLowerCase()
      const wishName = wishlistItem.name.trim().toLowerCase()
      return prodName.includes(wishName) || wishName.includes(prodName)
    })
    if (product) {
      return product.rating !== undefined ? product.rating : ''
    }
  }
  return ''
}

const findProductDetails = (wishlistItem) => {
  for (const cat in bikeCategoryData) {
    const product = bikeCategoryData[cat].find((prod) => {
      const prodName = prod.name.trim().toLowerCase()
      const wishName = wishlistItem.name.trim().toLowerCase()
      return prodName.includes(wishName) || wishName.includes(prodName)
    })
    if (product) {
      return product
    }
  }
  return null
}

const fetchWishlist = async () => {
  if (!userId) {
    console.error('사용자 ID가 없음 - 없으면 안됨')
    return
  }

  try {
    const data = await fetchUserLikesApi(userId)

    wishlist.value = data.map((item) => {
      const mappedItem = {
        id: item.like_key,
        title: item.title,
        name: item.name,
        price: Number(item.price),
        image: item.image || defaultImage,
        brand: item.brand,
        category: mapCategory(item.category),
        rating: item.rating !== undefined ? item.rating : '',
      }
      if (mappedItem.rating === '' || mappedItem.rating === 0) {
        mappedItem.rating = findRatingForItem(mappedItem) || ''
      }
      return mappedItem
    })
  } catch (error) {
    console.error('찜 목록 불러오기 실패:', error)
  }
}

// 찜 목록에서 제거하는 함수 (API 호출)
const removeFromWishlist = async (item) => {
  if (!userId || !item.title) {
    console.error('실패')
    return
  }

  try {
    const response = await fetchLikeRemoveApi({ title: item.title, id: userId })

    if (response?.status === 200) {
      wishlist.value = wishlist.value.filter((w) => w.id !== item.id)

      alertMessage.value = '찜 목록에서 제거되었습니다.'
      alertType.value = 'success'
      showAlert.value = true
      setTimeout(() => {
        showAlert.value = false
      }, 1000)
    } else {
      console.error(' 찜 삭제 실패:', response.message || response)
    }
  } catch (error) {
    console.error(' 찜 삭제 중 오류 발생:', error)
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
  itemsPerPage.value = 9
}


function tripleEncode(value) {
  return encodeURIComponent(String(value))
}

const goToDetailPage = async (item) => {
  if (!item) return
  const fallbackId = item.productId || item.id
  if (!fallbackId) return

  // HTML 태그를 제거하는 함수
  const removeHtmlTags = (str) => {
    return str.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '')
  }

  // 부품 계열 카테고리: parts, gear, 부품
  if (item.category === 'parts' || item.category === 'gear' || item.category === '부품') {
    try {
      const results = await getNaverItems(item.name, 1)
      let naverProductId = ''
      let naverTitle = ''
      if (results && results.length > 0) {
        naverProductId = results[0].productId || results[0].itemId
        naverTitle = results[0].title || item.name
      }
      if (!naverProductId) {
        naverProductId = fallbackId
      }
      if (!naverTitle) {
        naverTitle = item.name
      }
      
      // HTML 태그와 HTML 엔티티를 모두 제거
      const cleanTitle = removeHtmlTags(naverTitle)
      const cleanMallName = removeHtmlTags(item.mallName || '')

      router.push({
        path: '/riderPartsDetail',
        query: {
          keyword: tripleEncode(cleanTitle),
          productId: naverProductId,
          title: tripleEncode(cleanTitle),
          image: tripleEncode(item.image),
          price: item.lprice || item.hprice || '0',
          mallName: tripleEncode(cleanMallName),
          link: tripleEncode(item.link || ''),
        },
      })
      return
    } catch (error) {
      console.error('네이버 API 호출 에러:', error)
      router.push({
        path: '/riderPartsDetail',
        query: {
          keyword: tripleEncode(removeHtmlTags(item.name)),
          productId: fallbackId,
          title: tripleEncode(removeHtmlTags(item.name)),
          image: tripleEncode(item.image),
          price: item.lprice || item.hprice || '0',
          mallName: tripleEncode(removeHtmlTags(item.mallName || '')),
          link: tripleEncode(item.link || ''),
        },
      })
      return
    }
  }
  // parts/gear가 아닌 경우 기존 로직 사용
  const productDetails = findProductDetails(item)
  if (productDetails) {
    router.push({
      path: `/bicycleDetail/${productDetails.id}`,
      query: {
        id: productDetails.id,
        rating: productDetails.rating,
        brand: productDetails.brand,
        category: productDetails.category,
        name: productDetails.name,
        price: productDetails.price,
        image: productDetails.image,
      },
    })
  }
}

// truncatedName 함수만 남기고 removeHtmlTags 함수 제거
const truncatedName = (name) => {
  const maxLength = 22
  // HTML 태그 제거
  const cleanName = name.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '')
  return cleanName.length > maxLength ? cleanName.slice(0, maxLength) + '...' : cleanName
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
        <div
          class="w-full h-[191px] border-b flex items-center justify-center bg-black1 dark:bg-black1 rounded-t-lg"
        >
          <img
            :src="item.image || defaultImage"
            alt="상품 이미지"
            class="w-[180px] h-auto object-contain"
            @click="goToDetailPage(item)"
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
            {{ truncatedName(item.name) }}
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
  <AlertMessage
    :message="alertMessage"
    :type="alertType"
    :visible="showAlert"
    @close="showAlert = false"
  />
</template>
