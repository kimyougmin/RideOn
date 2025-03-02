<script setup>
import ShopHeader from '@/components/ShopHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
const propsEx = {
  "id": 196,
  "name": "알톤스포츠 자비스 14D (2024년형)",
  "price": 328000,
  "brand": "알톤스포츠",
  "category": "LOAD",
  "rating": 4,
  "reviews": 4.7,
  "url": "https://prod.danawa.com/info/?pcode=41421230&cate=133438",
  "image": "https://img.danawa.com/prod_img/500000/230/421/img/41421230_1.jpg?shrink=330:*&_v=20240314122240"
}

</script>

<template>
<div class="w-full block h-full dark:bg-black9">
  <ShopHeader/>
  <div class="bg-black2 pt-[37px] pb-[100px] dark:bg-black8">
    <div class="w-[1044px] mx-auto">
      <div class="flex pb-[100px]">
        <img :src="propsEx.image" class="border rounded-lg w-[514px] h-[514px]"/>
        <div class="p-4 grid grid-cols-1 content-between">
          <div>
            <p class="font-sans text-sm dark:text-black1">{{ propsEx.brand }}</p>
            <p class="font-impact text-3xl w-[440px] h-[72px] dark:text-black1">{{ propsEx.name }}</p>
            <v-rating
              hover
              :length="5"
              :size="20"
              :model-value="propsEx.rating"
              active-color="#DC3644"
              class="dark:text-black1"
            />
          </div>
          <div>
            <p class="font-impact text-right text-3xl dark:text-black1">{{ propsEx.price }}원</p>
            <div class="bg-primaryRed p-2 rounded-lg mb-2">
              <p class="text-black1 mb-0 font-bold text-center">구매하러 가기</p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex border border-black7 bg-black1 rounded-lg justify-center align-center py-2">
                <!-- 찜 -->
                <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 5.09091C17 2.83156 15.1345 1 12.8333 1C11.1128 1 9.63581 2.02389 9 3.48493C8.3642 2.02389 6.88722 1 5.16667 1C2.86548 1 1 2.83156 1 5.09091C1 11.6551 9 16 9 16C9 16 17 11.6551 17 5.09091Z" class="dark:stroke-black1" stroke="#2A2A2A" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p class="mb-0 ml-2 font-impact">찜하기</p>
              </div>
              <div class="flex border bg-black1 border-black7 rounded-lg justify-center align-center py-2">
                <!--   장바구니    -->
                <svg width="17" height="17" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.3128 13.625H11.6683C12.4343 13.625 13.0202 12.9421 12.9037 12.1849L12.0383 6.55993C11.9445 5.95014 11.4198 5.5 10.8029 5.5H4.19769C3.58072 5.5 3.05604 5.95014 2.96222 6.55993L2.09684 12.1849C1.98034 12.9421 2.56619 13.625 3.3323 13.625H4.68779" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7.5 8V12.375M7.5 12.375L9.375 10.5M7.5 12.375L5.625 10.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8.75 3.625C8.75 2.93464 8.19037 2.375 7.5 2.375C6.80963 2.375 6.25 2.93464 6.25 3.625" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p class="mb-0 ml-2 font-impact">장바구니</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="font-impact text-3xl dark:text-black1">관련 사품</p>
        <div class="grid grid-cols-3 gap-8">
          <div>
            <img :src="propsEx.image" class="border mb-2"/>
            <p class="text-sm mb-1 dark:text-black1">{{ propsEx.brand }}</p>
            <p class="font-impact mb-2 dark:text-black1">{{ propsEx.name }}</p>
            <p class="font-impact mb-1 text-2xl dark:text-black1">{{ propsEx.price }}원</p>
            <div class="flex bg-black1 justify-center align-center py-2">
              <svg width="17" height="17" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.3128 13.625H11.6683C12.4343 13.625 13.0202 12.9421 12.9037 12.1849L12.0383 6.55993C11.9445 5.95014 11.4198 5.5 10.8029 5.5H4.19769C3.58072 5.5 3.05604 5.95014 2.96222 6.55993L2.09684 12.1849C1.98034 12.9421 2.56619 13.625 3.3323 13.625H4.68779" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.5 8V12.375M7.5 12.375L9.375 10.5M7.5 12.375L5.625 10.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.75 3.625C8.75 2.93464 8.19037 2.375 7.5 2.375C6.80963 2.375 6.25 2.93464 6.25 3.625" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p class="mb-0 ml-1 text-sm ">장바구니</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BasicFooter/>
</div>
</template>

<style scoped>

</style>