<script setup>
import RiderShopHeader from '@/components/RiderShopHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchLikeCreateApi } from '@/apis/fetchLikeCreateApi.js'
import { fetchLikeRemoveApi } from '@/apis/fetchLikeRemoveApi.js'
import { fetchUserLikesApi } from '@/apis/userLikesApi.js'
import { getNaverItems } from '@/apis/naverSearchApi'

const route = useRoute()
const productData = ref({
  productId: '',
  title: '',
  image: '',
  price: '',
  mallName: '',
  link: '',
  category: '',
  rating: 0,
})
const relevantProducts = ref([])
const productId = ref('')
const item = ref([])
const isLiked = ref(false)
const user = JSON.parse(localStorage.getItem('user'))

const fetchRelevantProducts = async (searchKeyword) => {
  if (!searchKeyword) return
  try {
    const items = await getNaverItems(searchKeyword, 10)
    relevantProducts.value = items.filter((item) => item.productId !== productId.value).slice(0, 3)
  } catch (err) {
    console.error('❌ 관련 상품 가져오기 실패:', err)
  }
}

watch(
  () => route.query,
  (query) => {
    if (!query || !query.productId || !query.title) {
      console.error('❌ 잘못된 접근: 데이터가 부족합니다.')
      return
    }
    productId.value = query.productId || ''
    productData.value = {
      productId: query.productId,
      title: decodeURIComponent(query.title).replace(/<\/?[^>]+(>|$)/g, ''),
      image: decodeURIComponent(query.image),
      price: query.price,
      mallName: decodeURIComponent(query.mallName),
      link: decodeURIComponent(query.link),
      category: decodeURIComponent(query.category),
    }
    fetchRelevantProducts(productData.value.title.slice(0, 4))
    item.value = {
      productId: productId.value,
      cleanTitle: productData.value.title,
      lprice: productData.value.price,
      image: productData.value.image,
      mallName: productData.value.mallName,
      category4: productData.value.category,
    }
  },
  { immediate: true },
)

onMounted(async () => {
  if (user && user._id !== undefined) {
    try {
      const likeData = await fetchUserLikesApi(user._id)
      isLiked.value = likeData.some((e) => e.title === productId.value)
    } catch (error) {
      console.error('❌ 찜한 상품 불러오기 실패:', error)
    }
  }
})

const likeCreateHandler = async () => {
  if (user && user._id !== undefined && item.value) {
    try {
      await fetchLikeCreateApi({
        _id: item.value.productId,
        title: user._id,
        name: item.value.cleanTitle,
        price: item.value.lprice,
        image: item.value.image,
        brand: item.value.mallName,
        category: item.value.category4,
      })
      isLiked.value = true
    } catch (error) {
      console.error('❌ 찜하기 실패:', error)
    }
  }
}

const likeRemoveHandler = async () => {
  if (user && user._id !== undefined && item.value) {
    try {
      await fetchLikeRemoveApi({
        id: user._id,
        title: item.value.productId,
      })
      isLiked.value = false
    } catch (error) {
      console.error('❌ 찜하기 취소 실패:', error)
    }
  }
}
</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <RiderShopHeader />
    <div class="bg-black2 pt-[37px] pb-[100px] dark:bg-black8">
      <div class="w-[1044px] mx-auto">
        <div class="flex pb-[100px]">
          <img :src="productData?.image" class="border rounded-lg w-[514px] h-[514px]" />
          <div class="pl-8 py-4 grid grid-cols-1 content-between">
            <div>
              <p class="text-sub-title text-black7 dark:text-black3">{{ productData?.mallName }}</p>
              <p class="text-title m-0 dark:text-black1">
                {{ productData?.title.replace(/<\/?[^>]+(>|$)/g, '') }}
              </p>
              <v-rating
                hover
                :length="5"
                :size="20"
                :model-value="rating"
                active-color="#DC3644"
                class="dark:text-black1 mt-8"
              />
            </div>
            <div>
              <p class="font-impact text-right text-3xl dark:text-black1">
                {{ Intl.NumberFormat('ko-KR').format(Number(productData?.price || 0)) }}원
              </p>
              <div class="bg-primaryRed p-2 rounded-lg mb-2">
                <a
                  :href="productData?.link"
                  target="_blank"
                  class="text-black1 mb-0 font-bold text-center block"
                  >구매하러 가기</a
                >
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div
                  v-if="isLiked"
                  @click="likeRemoveHandler"
                  class="flex border border-black7 bg-black1 rounded-lg justify-center align-center py-2"
                >
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 4.09091C16 1.83156 14.1345 0 11.8333 0C10.1128 0 8.63581 1.02389 8 2.48493C7.3642 1.02389 5.88722 0 4.16667 0C1.86548 0 0 1.83156 0 4.09091C0 10.6551 8 15 8 15C8 15 16 10.6551 16 4.09091Z"
                      fill="#DC3644"
                    />
                  </svg>
                  <p class="mb-0 ml-2 text-body1">찜하기</p>
                </div>
                <div
                  v-else
                  @click="likeCreateHandler"
                  class="flex border border-black7 bg-black1 rounded-lg justify-center align-center py-2"
                >
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 5.09091C17 2.83156 15.1345 1 12.8333 1C11.1128 1 9.63581 2.02389 9 3.48493C8.3642 2.02389 6.88722 1 5.16667 1C2.86548 1 1 2.83156 1 5.09091C1 11.6551 9 16 9 16C9 16 17 11.6551 17 5.09091Z"
                      class="dark:stroke-black8"
                      stroke="#2A2A2A"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p class="mb-0 ml-2 text-body1">찜하기</p>
                </div>
                <div
                  class="flex border bg-black1 border-black7 rounded-lg justify-center align-center py-2"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 15 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.3128 13.625H11.6683C12.4343 13.625 13.0202 12.9421 12.9037 12.1849L12.0383 6.55993C11.9445 5.95014 11.4198 5.5 10.8029 5.5H4.19769C3.58072 5.5 3.05604 5.95014 2.96222 6.55993L2.09684 12.1849C1.98034 12.9421 2.56619 13.625 3.3323 13.625H4.68779"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.5 8V12.375M7.5 12.375L9.375 10.5M7.5 12.375L5.625 10.5"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p class="mb-0 ml-2 text-body1">장바구니</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p class="font-impact text-3xl dark:text-black1">관련 상품</p>
          <div class="grid grid-cols-3 gap-8">
            <div v-for="item in relevantProducts" :key="item.productId">
              <div class="w-full">
                <img :src="item.image" class="size-full border mb-2 object-cover" />
              </div>
              <p class="text-body2 mb-1 dark:text-black1">{{ item.mallName }}</p>
              <p class="text-sub-title mb-2 truncate dark:text-black1">
                {{ item.title.replace(/<\/?[^>]+(>|$)/g, '') }}
              </p>
              <p class="font-bold mb-4 text-2xl dark:text-black1">
                {{ Intl.NumberFormat('ko-KR').format(Number(item.lprice || 0)) }}원
              </p>
              <div class="flex bg-black1 justify-center align-center py-2">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.3128 13.625H11.6683C12.4343 13.625 13.0202 12.9421 12.9037 12.1849L12.0383 6.55993C11.9445 5.95014 11.4198 5.5 10.8029 5.5H4.19769C3.58072 5.5 3.05604 5.95014 2.96222 6.55993L2.09684 12.1849C1.98034 12.9421 2.56619 13.625 3.3323 13.625H4.68779"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.5 8V12.375M7.5 12.375L9.375 10.5M7.5 12.375L5.625 10.5"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.75 3.625C8.75 2.93464 8.19037 2.375 7.5 2.375C6.80963 2.375 6.25 2.93464 6.25 3.625"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <a
                  :href="item.link"
                  class="mb-0 ml-1 text-sm">장바구니</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BasicFooter />
  </div>
</template>

<style scoped></style>
