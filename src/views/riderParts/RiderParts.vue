<script setup>
import BasicHeader from '@/components/BasicHeader.vue';
import BasicFooter from '@/components/BasicFooter.vue';
import { ref, onMounted, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';
import { getNaverItems } from '../../apis/naverSearchApi';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import  './swiperCss.css';

const query = ref('자전거용품');
const items = ref([]);

const fetchNaverDatas = async () => {
  console.log(query.value);
  if(!query.value) return;
  try {
    items.value = await getNaverItems(query.value);
  } catch (error) {
    console.error('검색 오류 : ', error);
  }
}

const cleanedItems = computed(() => {
  return items.value.map(item => {
    if (typeof item.title !== 'string') return { ...item, cleanTitle: '제목 없음' };

    const parts = item.title.split('<b>');
    let cleanTitle = parts[0].trim();
    if (!cleanTitle && parts.length > 1) {
      cleanTitle = parts[1].split('</b>')[1]?.trim() || parts[1].replace('</b>', '').trim();
    }

    return { ...item, cleanTitle };
  });
});



onMounted(() => {
  fetchNaverDatas();
});
</script>


<template>
  <div class="w-full block h-full dark:bg-black9">
    <BasicHeader/>
    <div class="h-full dark:bg-black9">
      <img class="w-full object-cover" src="/riderPageImage/ridersPageHero.svg">
      <div class="relative -top-[350px] left-[92px]">
        <div class="abdolute">
          <p class="text-black1 text-[32px] font-sans">Equip Yourself, Elevate Your Ride.</p>
          <p class="text-black1 text-[60px] font-impact">Gear Up, Ride Strong</p>
          <router-link to="RiderPartsSearch">
            <div class="w-[160px] h-[48px] border-2 border-black1 rounded-3xl text-black1 flex justify-center">
                <p class="m-auto mt-2 h-[24px] text-[20px] text-sub-title text-black1">See More</p>
            </div>
          </router-link>
        </div>
      </div>
      <div class="w-[1352px] mx-auto">
        <p class="text-primaryRed font-impact mb-30 text-2xl">
          Gear Categories
        </p>
      </div>
      <div class="flex justify-center items-center gap-4 mb-24">
        <div class="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 h-[242px] w-[196px] relative gap-5">
          <div class="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[196px] w-[196px] relative gap-2.5 px-[26px] py-[30px] rounded-[150px] border-black9 bg-black1">
            <img src="/riderPageImage/helmat.svg" class="flex-grow-0 flex-shrink-0 w-[150px] h-[148px] rounded-[106px] object-none"/>
          </div>
          <p class="self-stretch flex-grow-0 flex-shrink-0 w-[196px] text-2xl font-bold text-center dark:text-black1">
            헬멧
          </p>
        </div>
        <div class="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 h-[242px] w-[196px] relative gap-5">
          <div class="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[196px] w-[196px] relative gap-2.5 px-[26px] py-[30px] rounded-[150px] bg-black1">
            <img src="/riderPageImage/light.svg" class="flex-grow-0 flex-shrink-0 w-[150px] h-[148px] rounded-[106px] object-cover"/>
          </div>
          <p class="self-stretch flex-grow-0 flex-shrink-0 w-[196px] text-2xl font-bold text-center dark:text-black1">
            라이트
          </p>
        </div>
        <div class="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 h-[242px] w-[196px] relative gap-5">
          <div class="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[196px] w-[196px] relative gap-2.5 px-[26px] py-[30px] rounded-[150px] bg-black1">
            <img src="/riderPageImage/waterBottle.svg" class="flex-grow-0 flex-shrink-0 w-[150px] h-[148px] rounded-[106px] object-cover"/>
          </div>
          <p class="self-stretch flex-grow-0 flex-shrink-0 w-[196px] text-2xl font-bold text-center dark:text-black1">
            물통 &#x26; 물통케이지
          </p>
        </div>
        <div class="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 h-[242px] w-[196px] relative gap-5">
          <div class="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[196px] w-[196px] relative gap-2.5 px-[26px] py-[30px] rounded-[150px] bg-black1">
            <img src="/riderPageImage/lock.svg" class="flex-grow-0 flex-shrink-0 w-[150px] h-[148px] rounded-[106px] object-cover"/>
          </div>
          <p class="self-stretch flex-grow-0 flex-shrink-0 w-[196px] text-2xl font-bold text-center dark:text-black1">
            자물쇠
          </p>
        </div>
        <div class="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 h-[242px] w-[196px] relative gap-5">
          <div class="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[196px] w-[196px] relative gap-2.5 px-[26px] py-[30px] rounded-[150px] bg-black1">
            <img src="/riderPageImage/phoneStand.svg" class="flex-grow-0 flex-shrink-0 w-[150px] h-[148px] rounded-[106px] object-cover"/>
          </div>
          <p class="self-stretch flex-grow-0 flex-shrink-0 w-[196px] text-2xl font-bold text-center dark:text-black1">
            휴대폰 거치대
          </p>
        </div>
        <div class="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 h-[242px] w-[196px] relative gap-5">
          <div class="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[196px] w-[196px] relative gap-2.5 px-[26px] py-[30px] rounded-[150px] bg-black1">
            <img src="/riderPageImage/pump.svg" class="flex-grow-0 flex-shrink-0 w-[150px] h-[148px] rounded-[106px] object-cover"/>
          </div>
          <p class="self-stretch flex-grow-0 flex-shrink-0 w-[196px] text-2xl font-bold text-center dark:text-black1">
            펌프
          </p>
        </div>
      </div>
      <div class="flex flex-col justify-center items-start  w-[1256px] mx-auto gap-8">
        <div class="flex flex-col justify-center items-center self-center gap-4">
          <div class="flex justify-center items-center gap-10">
            <svg width="514" height="2" viewBox="0 0 514 2" fill="none" xmlns="http://www.w3.org/2000/svg" class="flex-grow-0 flex-shrink-0" preserveAspectRatio="none">
              <line x1="0.5" y1="1.25" x2="513.5" y2="1.25" stroke="#979797" stroke-width="1.5"></line>
              <line x1="0.5" y1="1.25" x2="513.5" y2="1.25" stroke="black" stroke-opacity="0.2" stroke-width="1.5"></line>
              <line x1="0.5" y1="1.25" x2="513.5" y2="1.25" stroke="black" stroke-opacity="0.2" stroke-width="1.5"></line>
              <line x1="0.5" y1="1.25" x2="513.5" y2="1.25" stroke="black" stroke-opacity="0.2" stroke-width="1.5"></line>
              <line x1="0.5" y1="1.25" x2="513.5" y2="1.25" stroke="black" stroke-opacity="0.2" stroke-width="1.5"></line>
              <line x1="0.5" y1="1.25" x2="513.5" y2="1.25" stroke="black" stroke-opacity="0.2" stroke-width="1.5"></line>
            </svg>
            <p class="flex-grow-0 flex-shrink-0 text-[32px] font-bold text-left text-primaryRed">
              Bike Parts
            </p>
            <svg width="513" height="2" viewBox="0 0 513 2" fill="none" xmlns="http://www.w3.org/2000/svg" class="flex-grow-0 flex-shrink-0" preserveAspectRatio="none">
              <line x1="0.5" y1="1.25" x2="512.5" y2="1.25" stroke="#979797" stroke-width="1.5"></line>
              <line x1="0.5" y1="1.25" x2="512.5" y2="1.25" stroke="black" stroke-opacity="0.2" stroke-width="1.5"></line>
              <line x1="0.5" y1="1.25" x2="512.5" y2="1.25" stroke="black" stroke-opacity="0.2" stroke-width="1.5"></line>
              <line x1="0.5" y1="1.25" x2="512.5" y2="1.25" stroke="black" stroke-opacity="0.2" stroke-width="1.5"></line>
              <line x1="0.5" y1="1.25" x2="512.5" y2="1.25" stroke="black" stroke-opacity="0.2" stroke-width="1.5"></line>
              <line x1="0.5" y1="1.25" x2="512.5" y2="1.25" stroke="black" stroke-opacity="0.2" stroke-width="1.5"></line>
            </svg>
          </div>
          <p class="self-stretch flex-grow-0 flex-shrink-0 w-[1256px] text-[40px] font-bold text-center dark:text-black1">
            라이딩의 즐거움을 더할 최상의 선택
          </p>
          <p class="flex-grow-0 flex-shrink-0 w-[641px] text-xl font-medium text-center dark:text-black1">
            <span class="flex-grow-0 flex-shrink-0 w-[641px] text-xl font-medium text-center dark:text-black1">
              라이딩에 필요한 모든 장비
            </span>
            <br/>
            <span class="flex-grow-0 flex-shrink-0 w-[641px] text-xl font-medium text-center text-black">
              내구성 높은 부품, 편안한 라이딩을 위한 용품, 그리고 스타일을 더할 액세서리까지
            </span>
          </p>
        </div>
        <div class="self-stretch flex-grow-0 flex-shrink-0 h-[255px] relative">
          <div class="w-[620px] h-[226.43px]">
            <svg width="621" height="190" viewBox="0 0 621 190" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute left-[-0.5px] top-[37.24px]" preserveAspectRatio="none">
              <path d="M0.5 0.739105H620.5V189.435H0.5V0.739105Z" class="fill-primaryRed"></path>
            </svg>
            <p class="absolute left-[32.43px] top-[70px] text-[28px] font-bold text-left text-black1">
              자전거 부품
            </p>
            <img src="/riderPageImage/ridersDefaultImg1.svg" class="w-[325.63px] h-[231.43px] absolute left-[274.46px] top-[-0.5px] object-none"/>
            <p class="absolute left-8 top-[115.37px] text-xs font-semibold text-left text-black1">
              <span class="text-xs font-semibold text-left text-black1">타이어 / 안장 / 핸들 / 그립 / 테이프 / 페달 / 속도계</span>
              <br />
              <span class="text-xs font-semibold text-left text-white">핸들바 / 변속기 / 크랭크 / 체인 / 라이트 / 브레이크</span>
              <br />
              <span class="text-xs font-semibold text-left text-white">패드 / 프레임 / 휴대폰거치대 / 자전거자물쇠</span>
              <br />
              <span class="text-xs font-semibold text-left text-white">백미러 / 셀프정비 </span>
            </p>
          </div>
          <div class="w-[619px] h-[217px]">
            <div class="w-[619px] h-[188.39px] absolute left-[636.5px] top-[37.5px] bg-black6"></div>
            <p class="absolute left-[1096px] top-[92.6px] text-[28px] font-bold text-right text-black1">
              라이더 용품
            </p>
            <p class="absolute left-[1020px] top-[137.51px] text-xs font-semibold text-right text-white">
              <span class="text-xs font-semibold text-right text-white">헬멧 / 모자 / 두건 / 자전거장갑 /자전거슈즈</span>
              <br />
              <span class="text-xs font-semibold text-right text-white"> 슈커버 / 토커버 / 자전거양말 / 상하의세트</span>
              <br />
              <span class="text-xs font-semibold text-right text-white">상의 / 저지 / 하의 / 빕 </span>
              <br />
              <span class="text-xs font-semibold text-right text-white">이너웨어 /보호대</span>
            </p>
            <img src="/riderPageImage/ridersDefaultImg2.svg" class="w-[188px] h-[213px] absolute left-[700.5px] top-[41.5px] object-none"/>
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
          <router-link to="RiderPartsSearch">
            <div class="flex bg-black9 dark:bg-black1 w-[164px] h-[46px] rounded-3xl justify-center items-center">
              <p class="text-black1 font-impact dark:text-black9 mb-0">구매하러 가기</p>
              <svg width="22" height="21" viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5938 7.375L18.875 10.5M18.875 10.5L15.5938 13.625M18.875 10.5H3.125" class="stroke-black1 dark:stroke-black9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </router-link>
        </div>
        <swiper
          v-if="items.length > 0"
          :slidesPerView="4"
          :spaceBetween="30"
          :loop="true"
          :pagination="{ clickable: true }"
          :navigation="true"
          :modules="modules"
          class="mySwiper px-11 dark:bg-black9 pb-1"
        >
          <swiper-slide v-for="(item, index) in cleanedItems" :key="index">
            <div class="p-4">
              <img :src="item.image" alt="Bike Image" class="w-[302px] h-[302px] object-cover border mx-auto">
              <p class="text-sm font-sans mb-1 mt-1 text-left">{{ item.mallName }}</p>
              <p class="font-impact text-left mb-2 ellipsis-multiline">{{ item.cleanTitle }}</p>
              <p class="font-impact text-left">{{ item.lprice }}원</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <BasicFooter/>
  </div>
</template>

<style scoped>
.ellipsis-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
}

.ellipsis-multiline {
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 최대 2줄까지만 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-title {
  font-size: 16px;
  font-weight: bold;
}
</style>
