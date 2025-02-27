<script setup>
import BasicHeader from '@/components/BasicHeader.vue';
import BasicFooter from '@/components/BasicFooter.vue';
import bikeBrand from '../../../public/bike_category_data.json';
import { onMounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import  './swiperCss.css'
import { Pagination, Navigation } from 'swiper/modules';

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
<!--<script>-->
<!--import { Swiper, SwiperSlide } from 'swiper/vue';-->
<!--import 'swiper/css';-->
<!--import 'swiper/css/pagination';-->
<!--import 'swiper/css/navigation';-->
<!--import  './swiperCss.css'-->
<!--import { Pagination, Navigation } from 'swiper/modules';-->
<!--export default {-->
<!--  components: {-->
<!--    Swiper,-->
<!--    SwiperSlide,-->
<!--  },-->
<!--  setup() {-->
<!--    return {-->
<!--      modules: [Pagination, Navigation],-->
<!--    };-->
<!--  },-->
<!--};-->
<!--</script>-->

<template>
  <div class="w-full block h-full dark:bg-black9">
    <BasicHeader/>
    <div class="h-full dark:bg-black9">
      <img class="w-full" src="../../../public/bicyclePageImage/ridePageHero.png">
      <div class="relative -top-[350px] left-[92px]">
        <div class="absolute">
          <p class="text-black1 text-[32px] font-sans">Embrace the journey, unleash your spirit.</p>
          <p class="text-black1 text-[60px] font-impact">Wherever you want, RideOn</p>
          <div class="w-[160px] h-[48px] border-2 border-black1 rounded-3xl text-black1">
            <p class="m-auto w-[84px] mt-2 h-[24px] text-black1 text-[20px] text-sub-title">See More</p>
          </div>
        </div>
      </div>
      <div class="mt-[130px] w-[1440px] mx-auto">
        <div class="flex justify-between mx-[44px]">
          <div>
            <p class="text-primaryRed font-impact mb-1">New</p>
            <p class="font-impact text-primaryRed">Product</p>
          </div>
          <div class="w-full border border-black4 h-0 mt-[22px] mx-[20px] "></div>
          <div class="flex bg-black9 dark:bg-black1 w-[164px] h-[46px] rounded-3xl justify-center items-center">
            <p class="text-black1 font-impact dark:text-black9 mb-0">구매하러 가기</p>
            <svg width="22" height="21" viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5938 7.375L18.875 10.5M18.875 10.5L15.5938 13.625M18.875 10.5H3.125" class="stroke-black1 dark:stroke-black9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <swiper
          v-if="groupList.length > 0"
          :slidesPerView="1"
          :spaceBetween="30"
          :loop="true"
          :pagination="{clickable: true,}"
          :navigation="true"
          :modules="modules"
          class="mySwiper px-11 dark:bg-black9 pb-1"
        >
          <swiper-slide v-for="(group, index) in groupedItems" :key="index">
            <div class="grid grid-cols-4 gap-4 dark:bg-black9">
              <div v-for="(item, i) in group" :key="i" class="p-4">
                <img :src="item.image" alt="Bike Image" class="w-full h-auto border">
                <p class="text-sm font-sans mb-1 mt-1 text-left dark:text-black3">{{ item.brand }}</p>
                <p class="font-impact text-left mb-2 dark:text-black1">{{ item.name }}</p>
                <p class="font-impact text-left dark:text-black1 ">{{ item.price }}원</p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="border-2 flex w-[1352px] h-[660px] mt-[120px] mx-auto">
        <div class="w-[630px]">
          <div class="ml-8 mt-8">
            <p class="mb-1 font-impact text-2xl dark:text-black1">역대급으로 빠르고,</p>
            <p class="font-impact text-2xl dark:text-black1">역대급으로 가벼운</p>
            <p class="font-sans dark:text-black1">가장 가볍고 빠른 슈퍼바이크의 놀라운 조합으로 완전히 새롭게 탄생한 마돈 8세대를 타고 질주해 보세요.</p>
            <div class=" border-2 rounded-full w-[160px] border-black9 dark:border-black1 mb-10">
              <p class="text-center font-impact my-2 dark:text-black1">더 알아보기</p>
            </div>
          </div>
          <img src="../../../public/bicyclePageImage/trekBike.png"/>
        </div>
        <div class="border-l-2">
          <img class="h-1/2" src="../../../public/bicyclePageImage/trekBike2.png">
          <div class="w-[297px] mx-auto mt-8">
            <p class="font-sans text-[11px] leading-5 mb-[130px] dark:text-black1">가벼운 500 시리즈 OCLV 카본이 더욱 빠른 속도를 위해 새롭게 디자인 된 에어로 튜브 형태와 페어링되어 역대급으로 가벼운 마돈 SL 디스크 에어로 클라이밍 바이크로 탄생했습니다.</p>
            <p class="font-sans dark:text-black1">(마돈 7세대 보다)</p>
            <p class="font-impact text-3xl dark:text-black1">320g 더 가볍게</p>
          </div>
        </div>
        <div>
          <div class="w-[297px] mx-auto mt-8">
            <p class="font-impact text-3xl mb-2 dark:text-black1">77s 더 빠르게</p>
            <p class="font-sans mb-[160px] dark:text-black1">(에몬다 보다)</p>
            <p class="font-sans text-[11px] leading-5 mb-7 dark:text-black1">빠른 스피드와 에어로함을 재정의하는 혁신적인 풀시스템 에어로 튜브 모양이 바이크 전체의 공기역학적 성능을 최적화합니다.</p>
          </div>
          <img class="h-1/2" src="../../../public/bicyclePageImage/SLImage.png">
        </div>
      </div>
      <div class="w-[1352px] mt-[120px] mx-auto">
        <p class="text-primaryRed font-impact text-2xl">TOP BRAND</p>
        <div class="flex justify-between">
          <img src="../../../public/bicyclePageImage/K2.png">
          <img src="../../../public/bicyclePageImage/elfama.png">
          <img src="../../../public/bicyclePageImage/sam.png">
          <img src="../../../public/bicyclePageImage/twitter.png">
        </div>
      </div>
    </div>
    <BasicFooter />
  </div>
</template>

<style>
.swiper-button-next, .swiper-button-prev {
  @apply text-black10 dark:text-black1;
}
.swiper-pagination-bullet-active {
  @apply bg-black10 dark:bg-black1;
}
</style>