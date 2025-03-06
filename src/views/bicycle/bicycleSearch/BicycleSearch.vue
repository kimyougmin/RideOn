<script setup>

import ShopHeader from '@/components/ShopHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
import { onMounted, ref, watch } from 'vue'
import bikeCategory from '../../../../public/bike_category_data.json'
import bikeBrand from '../../../../public/bike_brand_data.json'
import { fetchUserLikesApi } from '@/apis/userLikesApi.js'
import { fetchLikeCreateApi } from '@/apis/fetchLikeCreateApi.js'
import { fetchLikeRemoveApi } from '@/apis/fetchLikeRemoveApi.js'

const groupList = ref([]);
const groupListShot = ref([]);
const selectOption = ref([]);
const union = [];
const seeMore = ref(true);
const searchValue = ref("");

const receiveHandler = (newValue) => {
  searchValue.value = newValue;
}

const onSelectAddHandler = (e) => {
  const value = e.target.value;
  if (selectOption.value.includes(value)) {
    selectOption.value = selectOption.value.filter(item => item !== value);
  } else {
      selectOption.value = [...selectOption.value, value.toUpperCase()]
  }
};
const onSelectDeleteHandler = (e) => {
  selectOption.value = selectOption.value.filter(item => item !== e);
};

onMounted(async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if(user._id !== undefined){
    const date = await fetchUserLikesApi(user._id);
    date.forEach((e) => {
      union.push(e.title);
    })
    console.log(date, union);
  }

  const tempList = [];
  for(const item in bikeCategory) {
    if(item !== "KID") {
      for(let i = 0; i < 4; i++) {
        console.log(i, union, `${bikeCategory[item][i].id}`, union.includes(`${bikeCategory[item][i].id}`));
        tempList.push(bikeCategory[item][i])
      }
    }
  }
  groupList.value = tempList;
  const temp =[];
  for(let i = 0; i < 6; i++) {
    temp.push(tempList[i]);
  }
  groupListShot.value = temp;
});

watch(selectOption, async (newQuestion, oldQuestion) => {
  const category = [];
  const brand = [];
  const tempList = [];

  newQuestion.forEach((e) => {
    e === "아동용" ? category.push("KID") : null;
    e === "MTB" ? category.push("MTB") : null;
    e === "로드자전거" ? category.push("LOAD") : null;
    e === "픽시" ? category.push("PIXIE") : null;
    e === "전기자전거" ? category.push("E-BKIE") : null;
    e === "하이브리드" ? category.push("HYBRID") : null;
  });
  newQuestion.forEach((e) => {
    if (['삼천리자전거', 'TREK', 'K2바이크', 'ELFAMA', 'MERIDA'].includes(e)) {
      brand.push(e)
    }
  });
  if(category.length === 0 && brand.length === 0) {
    const tempList = [];
    for(const item in bikeCategory) {
      if(item !== "KID") {
        for(let i = 0; i < 4; i++) {
          tempList.push(bikeCategory[item][i])
        }
      }
    }
    groupList.value = tempList;
    const temp =[];
    for(let i = 0; i < 6; i++) {
      temp.push(tempList[i]);
    }
    seeMore.value = true;
    groupListShot.value = temp;
    return;
  }
  if(category.length > 0) {
    for(const item in bikeCategory) {
      if(category.includes(item)) {
        for(let i = 0; i < bikeCategory[item].length; i++) {
          if(brand.length > 0 && brand.includes(bikeCategory[item][i].brand)) {
            tempList.push(bikeCategory[item][i])
          } else if (brand.length === 0) {
            tempList.push(bikeCategory[item][i])
          }
        }
      }
    }
  } else {
    for(const item in bikeBrand) {
      if(brand.includes(item)) {
        for(let i = 0; i < bikeBrand[item].length; i++) {
          if(brand.length > 0 && brand.includes(bikeBrand[item][i].brand)) {
            tempList.push(bikeBrand[item][i])
          } else if (brand.length === 0) {
            tempList.push(bikeBrand[item][i])
          }
        }
      }
    }
  }
  if(tempList.length > 6) {
    seeMore.value = true;
    const temp =[];
    for(let i = 0; i < 6; i++) {
      temp.push(tempList[i]);
    }
    groupListShot.value = temp;
  } else {
    seeMore.value = false;
  }
  groupList.value = tempList;
});
watch(searchValue, async (newQuestion) => {
  const tempList = [];
  groupList.value.forEach((e) => {
    if(e.name.includes(newQuestion)){
      tempList.push(e)
    }
  })
  if(tempList.length > 6) {
    seeMore.value = true;
    const temp =[];
    for(let i = 0; i < 6; i++) {
      temp.push(tempList[i]);
    }
    groupListShot.value = temp;
  } else {
    seeMore.value = false;
  }
  groupList.value = tempList;
})
const likeCreateHandler = async (item) => {
  console.log("like start");
  const user = JSON.parse(localStorage.getItem('user'));
  if(user._id !== undefined){
    const date = await fetchLikeCreateApi({_id: item.id, title: user._id, name: item.name, price: item.price, image: item.image, brand: item.brand, category: item.category})
    console.log(date);
    union.push(item.id);
  }
}
const likeRemoveHandler = async (item) => {
  console.log("like remove");
  const temp = union.filter()
  const user = JSON.parse(localStorage.getItem('user'));
  if(user._id !== undefined){
    const date = await fetchLikeRemoveApi({_id: item.id, title: user._id, name: item.name, price: item.price, image: item.image, brand: item.brand, category: item.category})
    console.log(date);
  }
}
</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <ShopHeader :searchValue="searchValue" @update:receiveHandler="receiveHandler($event)"/>
    <div class="bg-black2 h-full dark:bg-black8">
      <div class="flex w-[1440px] px-[93px] mx-auto pt-[32px]">
        <div class="w-[300px] rounded-lg bg-white drop-shadow-custom h-fit dark:bg-black9">
          <div class="">
            <div class="border-b dark:border-b-black1">
              <div class="p-6">
                <div class="flex justify-between">
                  <p class="font-impact text-lg dark:text-black1">선택된 옵션</p>
                  <svg width="16" height="16" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.9441 7.25C10.5822 9.65565 8.5065 11.5 6 11.5C3.23857 11.5 1 9.2614 1 6.5C1 3.73857 3.23857 1.5 6 1.5C8.0503 1.5 9.8124 2.73409 10.5839 4.5" stroke="#979797" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.5 4.5H10.7C10.8657 4.5 11 4.36568 11 4.2V2" stroke="#979797" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="flex flex-wrap">
                  <div v-for="select in selectOption" :key="select" class="flex bg-black10 rounded-full flex-0-0 w-fit p-1 px-3 mb-2 mr-2 dark:bg-black1">
                    <p class="font-impact text-black1 mb-0 mr-1 dark:text-black10">{{ select }}</p>
                    <div class="mt-1">
                      <svg @click="onSelectDeleteHandler(select)" width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.14551 9.85475L6.00038 5.9999M6.00038 5.9999L9.85524 2.14502M6.00038 5.9999L2.14551 2.14502M6.00038 5.9999L9.85524 9.85475" class="stroke-black1 pt-2 dark:stroke-black10" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="border-b dark:border-b-black1">
              <div class="p-6">
                <p class="font-impact text-lg dark:text-black1">브랜드</p>
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

                <div v-for="brand in ['삼천리자전거', 'TREK', 'K2바이크', 'ELFAMA', 'MERIDA']" :key="brand" class="flex hover:bg-black2 p-2 rounded-lg dark:hover:bg-black4">
                  <input class="mr-2 accent-black10" type="checkbox" :value="brand" :checked="selectOption.includes(brand)" @change="onSelectAddHandler">
                  <p class="mb-0 font-sans dark:text-black1 hover:text-black10">{{ brand }}</p>
                </div>
              </div>
            </div>
          </div>

          <div >
            <div class="p-6">
              <p class="font-impact text-lg dark:text-black1">카테고리</p>
              <div v-for="category in ['MTB', '아동용', '로드자전거', '하이브리드', '전기자전거', '픽시']" :key="category" class="flex hover:bg-black2 dark:hover:bg-black4 p-2 mb-2 rounded-lg">
                <input class="mr-2 accent-black10 dark:accent-black1" :value="category" :checked="selectOption.includes(category)" @change="onSelectAddHandler" type="checkbox">
                <p class="mb-0 font-sans dark:text-black1">{{ category }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="ml-4 bg-white w-[1120px] max-w-[1120px] p-4 drop-shadow-custom rounded-lg dark:bg-black8">
          <div v-if="seeMore" class="grid grid-cols-2 gap-4">
            <div  v-for="item in groupListShot" :key="item.id" class="flex">
              <router-link :to="{ name: `bicycleDetail`, params: {id: item.id}, query: { id: item.id, rating: item.rating, brand: item.brand, category: item.category, name: item.name, price: item.price, image: item.image }}">
                <img :src="item.image" class="border rounded-lg w-[200px] h-[200px] mr-4">
              </router-link>
              <div>
                <div class="flex justify-between">
                  <p class="mb-0 font-sans dark:text-black1">{{ item.brand }}</p>
                  <!-- 찜 -->
                  <svg v-if="!union.includes(`${item.id}`)" @click="likeCreateHandler(item)" width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 5.09091C17 2.83156 15.1345 1 12.8333 1C11.1128 1 9.63581 2.02389 9 3.48493C8.3642 2.02389 6.88722 1 5.16667 1C2.86548 1 1 2.83156 1 5.09091C1 11.6551 9 16 9 16C9 16 17 11.6551 17 5.09091Z" class="dark:stroke-black1" stroke="#2A2A2A" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <!-- 채워진 찜 -->
                  <svg v-if="union.includes(`${item.id}`)" @click="likeRemoveHandler(item)" width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4.09091C16 1.83156 14.1345 0 11.8333 0C10.1128 0 8.63581 1.02389 8 2.48493C7.3642 1.02389 5.88722 0 4.16667 0C1.86548 0 0 1.83156 0 4.09091C0 10.6551 8 15 8 15C8 15 16 10.6551 16 4.09091Z" fill="#DC3644"/>
                  </svg>
                </div>
                <p class="my-[9px] font-impact truncate h-[24px] w-[220px] dark:text-black1">{{ item.name }}</p>
                <v-rating
                  hover
                  :length="5"
                  :size="32"
                  :model-value="item.rating"
                  active-color="#DC3644"
                  class="dark:text-black1"
                />
                <p class="mb-1 mt-8 font-impact dark:text-black1">{{ item.price }}원</p>
                <div class="rounded-full bg-black3 flex align-center text-center py-1 dark:bg-black2">
                  <!--   장바구니    -->
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
          <div v-if="!seeMore" class="grid grid-cols-2 gap-4">
            <div  v-for="item in groupList" :key="item.id" class="flex">
              <router-link :to="{ name: `bicycleDetail`, params: {id: item.id}, query: { id: item.id, rating: item.rating, category: item.category, name: item.name, price: item.price, image: item.image }}">
                <img :src="item.image" class="border rounded-lg w-[200px] h-[200px] mr-4">
              </router-link>
              <div>
                <div class="flex justify-between">
                  <p class="mb-0 font-sans dark:text-black1">{{ item.brand }}</p>
                  <!-- 찜 -->
                  <svg v-if="!union.includes(`${item.id}`)" @click="likeCreateHandler(item)" width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 5.09091C17 2.83156 15.1345 1 12.8333 1C11.1128 1 9.63581 2.02389 9 3.48493C8.3642 2.02389 6.88722 1 5.16667 1C2.86548 1 1 2.83156 1 5.09091C1 11.6551 9 16 9 16C9 16 17 11.6551 17 5.09091Z" class="dark:stroke-black1" stroke="#2A2A2A" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <!-- 채워진 찜 -->
                  <svg v-if="union.includes(`${item.id}`)" @click="likeRemoveHandler(item)" width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4.09091C16 1.83156 14.1345 0 11.8333 0C10.1128 0 8.63581 1.02389 8 2.48493C7.3642 1.02389 5.88722 0 4.16667 0C1.86548 0 0 1.83156 0 4.09091C0 10.6551 8 15 8 15C8 15 16 10.6551 16 4.09091Z" fill="#DC3644"/>
                  </svg>
                </div>
                <p class="my-[9px] font-impact truncate h-[24px] w-[220px] dark:text-black1">{{ item.name }}</p>
                <v-rating
                  hover
                  :length="5"
                  :size="32"
                  :model-value="item.rating"
                  active-color="#DC3644"
                  class="dark:text-black1"
                />
                <p class="mb-1 mt-8 font-impact dark:text-black1">{{ item.price }}원</p>
                <div class="rounded-full bg-black3 flex align-center text-center py-1 dark:bg-black2">
                  <!--   장바구니    -->
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
          <div v-if="seeMore && groupList.length > 6" class="text-center mt-6 mb-2">
            <button @click="seeMore = false" class="w-[300px] rounded-lg py-3 text-black1 bg-black9 dark:bg-black2 dark:text-black font-impact">더 보기</button>

          </div>
        </div>
      </div>
    </div>
    <BasicFooter/>
  </div>
</template>

<style scoped>

</style>