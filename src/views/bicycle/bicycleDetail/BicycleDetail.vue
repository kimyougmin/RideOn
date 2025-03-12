<script setup>
import ShopHeader from '@/components/ShopHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
import { useRoute } from 'vue-router'
import bikeCategory from '../../../../public/bike_category_data.json'
import { onMounted, ref } from 'vue'
import { fetchLikeCreateApi } from '@/apis/fetchLikeCreateApi.js'
import { fetchLikeRemoveApi } from '@/apis/fetchLikeRemoveApi.js'
import { fetchUserLikesApi } from '@/apis/userLikesApi.js'

const relevantProduct = ref([])
const union = ref([])
const route = useRoute()
const { id, category, name, price, image, rating, brand } = route.query
const user = JSON.parse(localStorage.getItem('user'))

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
onMounted(async () => {
  if (user._id !== undefined) {
    const date = await fetchUserLikesApi(user._id)
    union.value = date.map((e) => e.title)
  }
  const tempList = []
  for (const item in bikeCategory) {
    if (item === category) {
      for (let i = 0; i < 3; i++) {
        tempList.push(bikeCategory[item][getRandomInt(bikeCategory[item].length)])
      }
    }
  }
  relevantProduct.value = tempList
})
const likeCreateHandler = async () => {
  if (user._id !== undefined) {
    union.value = [...union.value, `${id}`]
    await fetchLikeCreateApi({
      _id: id,
      title: user._id,
      name: name,
      price: price,
      image: image,
      brand: brand,
      category: category,
    })
  }
}
const likeRemoveHandler = async () => {
  if (user._id !== undefined) {
    union.value = union.value.filter((e) => e !== `${id}`)
    await fetchLikeRemoveApi({ id: user._id, title: id })
  }
}

const formatPrice = (price) => {
  if (typeof price === 'string') {
    return price
  } else {
    return Intl.NumberFormat('ko-KR').format(price)
  }
}
</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <ShopHeader />
    <div class="bg-black2 pt-[37px] pb-[100px] dark:bg-black8">
      <div class="w-[1044px] mx-auto">
        <div class="flex pb-[100px]">
          <img :src="image" class="border rounded-lg w-[514px] h-[514px]" />
          <div class="pl-8 py-4 grid grid-cols-1 content-between">
            <div>
              <p class="text-sub-title text-black7 dark:text-black3">{{ brand }}</p>
              <p class="text-title m-0 dark:text-black1">{{ name }}</p>
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
                {{ formatPrice(price) }}원
              </p>
              <div class="bg-primaryRed p-2 rounded-lg mb-2">
                <p class="text-black1 mb-0 font-bold text-center">구매하러 가기</p>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div
                  v-if="union.includes(`${id}`)"
                  @click="likeRemoveHandler"
                  class="flex border border-black7 bg-black1 rounded-lg justify-center align-center py-2"
                >
                  <!-- 찜 -->
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
                  <!-- 채워진찜 -->
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
                  <!--   장바구니    -->
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
                  <p class="mb-0 ml-2 text-body1">장바구니</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p class="font-impact text-3xl dark:text-black1">관련 상품</p>
          <div class="grid grid-cols-3 gap-8">
            <div v-for="item in relevantProduct" :key="item.id">
              <div class="w-full">
                <img :src="item.image" class="size-full border mb-2 object-cover" />
              </div>
              <p class="text-body2 mb-1 dark:text-black1">{{ item.brand }}</p>
              <p class="text-sub-title mb-2 truncate dark:text-black1">{{ item.name }}</p>
              <p class="font-bold mb-4 text-2xl dark:text-black1">
                {{ Intl.NumberFormat('ko-KR').format(Number(item.price || 0)) }}원
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
                <p class="mb-0 ml-1 text-sm">장바구니</p>
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
