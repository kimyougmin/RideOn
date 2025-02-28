<script setup>

import ShopHeader from '@/components/ShopHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
import { onMounted, ref } from 'vue'
import { Navigation, Pagination } from 'swiper/modules'
import bikeBrand from '../../../../public/bike_category_data.json'
const groupList = ref([]);
const modules = [Pagination, Navigation];
const groupedItems = ref([]);

onMounted(() => {
  const tempList = [];
  for(const item in bikeBrand) {
    if(item !== "KID") {
      for(let i = 0; i < 4; i++) {
        tempList.push(bikeBrand[item][i])
      }
    }
  }
  groupList.value = tempList;
  const chunkedList = [];
  for (let i = 0; i < tempList.length; i += 4) {
    chunkedList.push(tempList.slice(i, i + 4));
  }
  groupedItems.value = chunkedList;
})

</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <ShopHeader/>
    <div class="bg-black2 h-full dark:bg-black8">
      <div class="flex w-[1440px] px-[93px] mx-auto pt-[32px]">
        <div class="w-1/4 rounded-lg bg-white drop-shadow-custom h-fit">
          <div class="">
            <div class="border-b">
              <div class="p-6">
                <div class="flex justify-between">
                  <p class="font-impact text-lg">선택된 옵션</p>
                  <svg width="16" height="16" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.9441 7.25C10.5822 9.65565 8.5065 11.5 6 11.5C3.23857 11.5 1 9.2614 1 6.5C1 3.73857 3.23857 1.5 6 1.5C8.0503 1.5 9.8124 2.73409 10.5839 4.5" stroke="#979797" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.5 4.5H10.7C10.8657 4.5 11 4.36568 11 4.2V2" stroke="#979797" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div class="flex bg-black10 rounded-full w-fit p-1 px-3">
                    <p class="font-impact text-black1 mb-0 mr-1">메리다</p>
                    <div class="mt-1">
                      <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.14551 9.85475L6.00038 5.9999M6.00038 5.9999L9.85524 2.14502M6.00038 5.9999L2.14551 2.14502M6.00038 5.9999L9.85524 9.85475" class="stroke-black1 pt-2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="border-b">
              <div class="p-6">
                <p class="font-impact text-lg">브랜드</p>
                <div class="mb-6">
                  <label class="flex h-full border-2 border-black4  rounded-lg p-2 pl-3 pr-3">
                    <!--  검색 아이콘   -->
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 14L19 19" class="stroke-black4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M3 9.5C3 13.0899 5.91015 16 9.5 16C11.2981 16 12.9256 15.27 14.1023 14.0901C15.275 12.9143 16 11.2918 16 9.5C16 5.91015 13.0899 3 9.5 3C5.91015 3 3 5.91015 3 9.5Z" class="stroke-black4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <input class="focus:outline-none dark:text-black1 ml-2" placeholder="브랜드 입력"/>
                  </label>
                </div>
                <div class="flex hover:bg-black2 p-2 rounded-lg">
                  <input class="mr-2 accent-black10" type="checkbox">
                  <p class="mb-0 font-sans">삼천리자전거</p>
                </div>
              </div>
            </div>
          </div>

          <div >
            <div class="p-6">
              <p class="font-impact text-lg">카테고리</p>
              <div class="flex hover:bg-black2 p-2 mb-2 rounded-lg">
                <input class="mr-2 accent-black10" type="checkbox">
                <p class="mb-0 font-sans">MTB</p>
              </div>
              <div class="flex hover:bg-black2 p-2 mb-2 rounded-lg">
                <input class="mr-2 accent-black10" type="checkbox">
                <p class="mb-0 font-sans">아동용</p>
              </div>
              <div class="flex hover:bg-black2 p-2 mb-2 rounded-lg">
                <input class="mr-2 accent-black10" type="checkbox">
                <p class="mb-0 font-sans">로드자전거</p>
              </div>
              <div class="flex hover:bg-black2 p-2 mb-2 rounded-lg">
                <input class="mr-2 accent-black10" type="checkbox">
                <p class="mb-0 font-sans">하이브리드</p>
              </div>
              <div class="flex hover:bg-black2 p-2 mb-2 rounded-lg">
                <input class="mr-2 accent-black10" type="checkbox">
                <p class="mb-0 font-sans">전기자전거</p>
              </div>
              <div class="flex hover:bg-black2 p-2 mb-2 rounded-lg">
                <input class="mr-2 accent-black10" type="checkbox">
                <p class="mb-0 font-sans">픽시</p>
              </div>
            </div>
          </div>
        </div>

        <div class="ml-4 bg-white w-4/5 p-4 drop-shadow-custom rounded-lg">
          <div class="grid grid-cols-2 gap-4">
            <div v-for="item in groupList" :key="item.id" class="flex">
              <img :src="item.image" class="border rounded-lg w-[200px] h-[200px] mr-4">
              <div>
                <div class="flex justify-between">
                  <p class="mb-0 font-sans">{{ item.brand }}</p>
                  <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 5.09091C17 2.83156 15.1345 1 12.8333 1C11.1128 1 9.63581 2.02389 9 3.48493C8.3642 2.02389 6.88722 1 5.16667 1C2.86548 1 1 2.83156 1 5.09091C1 11.6551 9 16 9 16C9 16 17 11.6551 17 5.09091Z" stroke="#2A2A2A" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <p class="my-[9px] font-impact truncate h-[24px] w-[220px]">{{ item.name }}</p>
                <v-rating
                  hover
                  :length="5"
                  :size="32"
                  :model-value="item.rating"
                  active-color="#DC3644"
                />
                <p class="mb-1 mt-8 font-impact">{{ item.price }}원</p>
                <div class="rounded-full bg-black2 flex align-center text-center py-1">
                  <svg class="ml-auto" width="17" height="17" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.3128 13.625H11.6683C12.4343 13.625 13.0202 12.9421 12.9037 12.1849L12.0383 6.55993C11.9445 5.95014 11.4198 5.5 10.8029 5.5H4.19769C3.58072 5.5 3.05604 5.95014 2.96222 6.55993L2.09684 12.1849C1.98034 12.9421 2.56619 13.625 3.3323 13.625H4.68779" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.5 8V12.375M7.5 12.375L9.375 10.5M7.5 12.375L5.625 10.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.75 3.625C8.75 2.93464 8.19037 2.375 7.5 2.375C6.80963 2.375 6.25 2.93464 6.25 3.625" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <p class="font-sans mb-0 mr-auto">장바구니</p>
                </div>
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