<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import { useRouter } from 'vue-router'

defineProps({
  groupedItems: {
    type: Array,
    required: true,
  },
  groupList: {
    type: Array,
    required: true,
  },
})

const router = useRouter()
const swiperRef = ref(null)
const isBeginning = ref(true)
const isEnd = ref(false)
const modules = [Pagination, Navigation]

const handleNext = () => {
  if (swiperRef.value) {
    swiperRef.value.slideNext()
  }
}

const handlePrev = () => {
  if (swiperRef.value) {
    swiperRef.value.slidePrev()
  }
}

const handleSlideChange = (swiper) => {
  isBeginning.value = swiper.isBeginning
  isEnd.value = swiper.isEnd
}

const goToDetail = (item) => {
  if (!item || !item.productId) return

  router.push({
    path: `/riderPartsDetail`,
    query: {
      keyword: encodeURIComponent(item.title.replace(/<\/?[^>]+(>|$)/g, "")),
      productId: item.productId,
      title: encodeURIComponent(item.title.replace(/<\/?[^>]+(>|$)/g, '')),
      image: encodeURIComponent(item.image),
      price: item.lprice|| item.hprice || "0",
      mallName: encodeURIComponent(item.mallName || ""),
      link: encodeURIComponent(item.link || ""),
      category: encodeURIComponent(item.category4 || '자전거부품'),
    },
  })
}
</script>

<template>
  <article class="w-full flex flex-col gap-8">
    <div class="flex items-center gap-8">
      <h3 class="text-primaryRed text-title font-bold">
        Best <br />
        Product
      </h3>
      <hr class="w-full border-black4" />
      <router-link
        to="riderPartsSearch"
        class="flex gap-1 justify-center items-center text-sub-title text-black1 bg-black9 dark:bg-black1 dark:text-black9 min-w-44 px-4 py-2 rounded-3xl"
      >
        구매하러 가기
        <svg width="22" height="21" viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.5938 7.375L18.875 10.5M18.875 10.5L15.5938 13.625M18.875 10.5H3.125"
            class="stroke-black1 dark:stroke-black9"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </router-link>
    </div>
    <div class="relative">
      <div
        class="p-[14px] w-[53px] h-[53px] rounded-full border border-black7 dark:border-black1 absolute top-[150px] -left-[80px] z-50 flex items-center justify-center cursor-pointer"
        :class="{ hidden: isBeginning }"
        @click="handlePrev"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 19L8 12L15 5"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="dark:stroke-black1"
          />
        </svg>
      </div>
      <div
        class="p-[14px] w-[53px] h-[53px] rounded-full border border-black7 dark:border-black1 absolute top-[150px] -right-[80px] z-50 flex items-center justify-center cursor-pointer"
        :class="{ hidden: isEnd }"
        @click="handleNext"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 5L16 12L9 19"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="dark:stroke-black1"
          />
        </svg>
      </div>

      <swiper
        v-if="groupList.length > 0"
        :slidesPerView="1"
        :spaceBetween="30"
        :loop="true"
        :pagination="{ clickable: true }"
        :modules="modules"
        class="mySwiper dark:bg-black9 pb-1"
        @swiper="swiperRef = $event"
        @slideChange="handleSlideChange"
        :navigation="false"
      >
        <swiper-slide v-for="(group, index) in groupedItems" :key="index">
          <div class="grid grid-cols-4 gap-4 dark:bg-black9">
            <div
              v-for="(item, i) in group"
              :key="i"
              class="flex flex-col"
              @click="goToDetail(item)"
            >
              <div class="flex flex-col gap-1">
                <div class="w-full h-[280px] border mb-1 cursor-pointer">
                  <img :src="item.image" alt="Bike Image" class="size-full object-cover" />
                </div>
                <p class="text-body1 text-left dark:text-black3 m-0">
                  {{ item.mallName || item.brand }}
                </p>
                <p class="text-sub-title font-bold text-left dark:text-black1 truncate mb-4">
                  {{ item.title.replace(/<\/?[^>]+(>|$)/g, '') }}
                </p>
              </div>
              <p class="text-2xl text-left font-bold dark:text-black1">
                {{ Intl.NumberFormat('ko-KR').format(Number(item.lprice || item.hprice)) }}원
              </p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </article>
</template>

<style>
.swiper-button-next,
.swiper-button-prev {
  display: none !important;
}

.swiper-pagination-bullet {
  @apply bg-black7 dark:bg-black5;
}

.swiper-pagination-bullet-active {
  @apply bg-black10 dark:bg-black1;
}

.swiper-pagination {
  position: relative !important;
  margin-top: 20px !important;
  bottom: 0 !important;
}

.swiper-pagination-bullet {
  margin: 0 5px !important;
  width: 12px !important;
  height: 12px !important;
}
</style>
