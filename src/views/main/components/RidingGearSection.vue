<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const DUMMY_ITEMS = [
  {
    productId: '49478362788',
    title: '락브로스 자외선차단 쿨마스크 귀걸이타입 WB-003 210 x 350 mm 블랙 1개',
    image: 'https://shopping-phinf.pstatic.net/main_4947836/49478362788.9.jpg',
    lprice: '147030',
    mallName: '쿠팡',
    link: 'https://link.coupang.com/re/PCSNAVERPCSDP?pageKey=5563111028&ctag=5563111028&lptag=V90391357613&itemId=8831461436&vendorItemId=90391357613&spec=10305199',
  },
  {
    productId: '24582291867',
    title: '락브로스 라이딩 방한장갑 S091-2BK',
    image: 'https://shopping-phinf.pstatic.net/main_2458229/24582291867.20231128152052.jpg',
    lprice: '17960',
    mallName: '네이버',
    link: 'https://search.shopping.naver.com/catalog/24582291867',
  },
  {
    productId: '86116574853',
    title: '레빗 하이퍼스피드 오토바이 바이크 스쿠터 레이싱 수트 블랙 네온레드 HYPERSPEED',
    image: 'https://shopping-phinf.pstatic.net/main_8611657/86116574853.jpg',
    lprice: '1280000',
    mallName: '바이크몬스터',
    link: 'https://smartstore.naver.com/main/products/8572074530',
  },
  {
    productId: '83607391385',
    title:
      '2022 Northwave X-Celsius Artic GTX Winter Shoes (노스웨이브 엑스 셀시우스 아틱 지티엑스 윈터 슈즈)',
    image: 'https://shopping-phinf.pstatic.net/main_8360739/83607391385.jpg',
    lprice: '345000',
    mallName: '수바이크',
    link: 'https://smartstore.naver.com/main/products/6062891897',
  },
  {
    productId: '88982069268',
    title: '락브로스 어반 캐주얼 자전거 헬멧 WT-09',
    image: 'https://shopping-phinf.pstatic.net/main_8898206/88982069268.jpg',
    lprice: '31900',
    mallName: '고르고타고',
    link: 'https://smartstore.naver.com/main/products/11437558903',
  },
]

const goToDetail = (item) => {
  if (!item || !item.productId) return

  router.push({
    path: `/riderPartsDetail`,
    query: {
      keyword: encodeURIComponent(item.title.replace(/<\/?[^>]+(>|$)/g, '')),
      productId: item.productId,
      title: encodeURIComponent(item.title.replace(/<\/?[^>]+(>|$)/g, '')),
      image: encodeURIComponent(item.image),
      price: item.lprice || item.hprice || '0',
      mallName: encodeURIComponent(item.mallName || ''),
      link: encodeURIComponent(item.link || ''),
    },
  })
}
</script>
<template>
  <article class="flex flex-col gap-[50px]">
    <div class="flex flex-col text-center gap-4">
      <h3 class="text-3xl text-primaryRed font-bold">Rider Gear</h3>
      <h2 class="text-4xl font-bold dark:text-black1">당신의 라이딩을 위한 완벽한 선택</h2>
    </div>
    <div class="grid grid-cols-10">
      <!-- 첫번째 컬럼 -->
      <div
        @click="goToDetail(DUMMY_ITEMS[0])"
        class="col-span-2 border-r pl-4 border-black4 dark:border-black4 cursor-pointer"
      >
        <div class="border-b border-black4 pr-4 pb-4">
          <img src="/main/main_riding_gear_1.png" alt="riding gear" class="w-full object-cover" />
        </div>
        <span class="block text-sub-title pt-3 pr-2 truncate dark:text-black1"
          >락브로스 쿨 마스크 블랙 WB-003</span
        >
      </div>
      <!-- 두번째 컬럼 -->
      <div @click="goToDetail(DUMMY_ITEMS[1])" class="col-span-2 pl-4 pt-5 cursor-pointer">
        <span
          class="block text-sub-title pb-3 pr-2 border-r border-black4 dark:border-black4 dark:text-black1 truncate"
          >락브로스 방한 자전거장갑 S091-2</span
        >
        <div class="h-[340px] pr-4 pt-5 border-r border-t border-black4 dark:border-black4">
          <img src="/main/main_riding_gear_2.png" alt="riding gear" class="w-full object-cover" />
        </div>
      </div>
      <!-- 세번째 컬럼 -->
      <div
        @click="goToDetail(DUMMY_ITEMS[2])"
        class="col-span-2 border-r pl-4 border-black4 dark:border-black4 cursor-pointer"
      >
        <div class="border-b border-black4 pr-4 pb-4">
          <img src="/main/main_riding_gear_3.png" alt="riding gear" class="w-full object-cover" />
        </div>
        <span class="block text-sub-title pt-3 pr-2 truncate dark:text-black1"
          >레빗 하이퍼스피드 레이싱 슈트</span
        >
      </div>

      <!-- 네번째 컬럼 -->
      <div @click="goToDetail(DUMMY_ITEMS[3])" class="col-span-2 pl-4 pt-5 cursor-pointer">
        <span
          class="block text-sub-title pb-3 pr-2 border-r border-black4 dark:border-black4 dark:text-black1 truncate"
          >노스웨이브 엑스 셀시우스 아틱 GTX</span
        >
        <div class="h-[340px] pr-4 pt-5 border-r border-t border-black4 dark:border-black4">
          <img src="/main/main_riding_gear_4.png" alt="riding gear" class="w-full object-cover" />
        </div>
      </div>
      <!-- 다섯번째 컬럼 -->
      <div
        @click="goToDetail(DUMMY_ITEMS[4])"
        class="col-span-2 border-r pl-4 border-black4 dark:border-black4 cursor-pointer"
      >
        <div class="border-b border-black4 pr-4 pb-4">
          <img src="/main/main_riding_gear_5.png" alt="riding gear" class="w-full object-cover" />
        </div>
        <span class="block text-sub-title pt-3 pr-2 truncate dark:text-black1"
          >락브로스 어반 캐주얼 헬멧 그레이 WT-09</span
        >
      </div>
    </div>
  </article>
</template>
