<script setup>
import ShopHeader from '@/components/ShopHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue';
import { ref, onMounted, computed, watchEffect } from "vue";
import { getNaverItems } from "@/apis/naverSearchApi";

const selectedSort = ref("추천순");
const items = ref([]);
const visibleItems = ref([]); // 화면에 보이는 상품 리스트
const itemsPerPage = 9; // 한 번에 표시할 개수
const isLiked = ref(false); // 좋아요 상태

const sortOptions = [
  { label: "추천순", value: "추천순" },
  { label: "낮은 가격순", value: "낮은 가격순" },
  { label: "높은 가격순", value: "높은 가격순" },
  { label: "판매 많은순", value: "판매 많은순" },
  { label: "리뷰 많은순", value: "리뷰 많은순" },
  { label: "신상품순", value: "신상품순" },
];

// 제목에서 <b>, </b> 태그 제거
const cleanedItems = computed(() => {
  return items.value.map(item => {
    if (typeof item.title !== 'string') return { ...item, cleanTitle: '제목 없음' };
    const cleanTitle = item.title.replace(/<\/?b>/g, ""); // <b>, </b> 제거
    return { ...item, cleanTitle };
  });
});

// `watchEffect`로 자동 업데이트
watchEffect(() => {
  visibleItems.value = cleanedItems.value.slice(0, itemsPerPage);
});

// 더보기 기능
const loadMore = () => {
  const nextItems = cleanedItems.value.slice(visibleItems.value.length, visibleItems.value.length + itemsPerPage);
  visibleItems.value.push(...nextItems);
};

// API 호출 후 데이터 로드
onMounted(async () => {
  items.value = await getNaverItems("자전거부품");

  // 데이터가 들어온 후 바로 visibleItems 업데이트
  visibleItems.value = cleanedItems.value.slice(0, itemsPerPage);
});
</script>

<template>
  <div class="w-full h-full block dark:bg-black9">
    <ShopHeader :searchValue="searchValue" @update:receiveHandler="receiveHandler($event)"/>
    <div class="h-full max-w-[1256px] mx-auto dark:bg-black9">
      <!-- 연관 검색어 부분 -->
      <div class="flex justify-start items-center w-[1261px] relative overflow-hidden gap-4 mt-[35px]">
        <p class="flex-grow-0 flex-shrink-0 text-2xl font-bold text-left dark:text-black1">연관</p>
        <div class="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[1196px] gap-2">
          <div class="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-1 px-3 py-1.5 rounded-[50px] bg-[#fffffe] border border-[#e8e8e8]">
            <img src="/riderPageImage/gear.svg" class="flex-grow-0 flex-shrink-0 w-[20px] h-[20px] rounded-[50px] object-cover"/>
            <p class="flex-grow-0 flex-shrink-0 text-base text-left text-black">자전거기어</p>
          </div>
          <div class="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2 px-4 py-3 rounded-[50px] bg-[#fffffe] border border-[#e8e8e8]">
            <img src="/riderPageImage/gear.svg" class="flex-grow-0 flex-shrink-0 w-[30px] h-[30px] rounded-[50px] object-cover"/>
            <p class="flex-grow-0 flex-shrink-0 text-xl text-left text-black">자전거기어</p>
          </div>
          <div class="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2 px-4 py-3 rounded-[50px] bg-[#fffffe] border border-[#e8e8e8]">
            <img src="/riderPageImage/pedal.svg" class="flex-grow-0 flex-shrink-0 w-[30px] h-[30px] rounded-[50px] object-cover"/>
            <p class="flex-grow-0 flex-shrink-0 text-xl text-left text-black">자전거페달</p>
          </div>
          <div class="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2 px-4 py-3 rounded-[50px] bg-[#fffffe] border border-[#e8e8e8]">
            <img src="/riderPageImage/wheel.svg" class="flex-grow-0 flex-shrink-0 w-[30px] h-[30px] rounded-[50px] object-cover"/>
            <p class="flex-grow-0 flex-shrink-0 text-xl text-left text-black">자전거스템</p>
          </div>
        </div>
      </div>
      <!-- 밑에 바로 이미지 -->
      <div class="flex flex-col justify-start items-start w-[1256px] relative gap-8 mt-[35px]">
        <div class="flex-grow-0 flex-shrink-0 w-[628px] h-[94px] relative">
          <p class="absolute left-0 top-16 text-2xl text-left dark:text-black1">
            소모품부터 부품까지 쉽고 빠르게 검색하세요.
          </p>
          <p class="absolute left-0 top-0 text-[40px] text-left dark:text-black1">Find Your Perfect Part</p>
        </div>
        <div class="self-stretch flex-grow-0 flex-shrink-0 h-[400px] relative">
          <img
            src="../../../../public/riderPageImage/chain.svg"
            class="w-[620px] h-[400px] absolute left-[-1.5px] top-[-1.5px] object-cover border-2 border-[#979797]"
          /><img
            src="../../../../public/riderPageImage/chain2.svg"
            class="w-[620px] h-[200px] absolute left-[634.5px] top-[198.5px] object-none border-2 border-[#979797]"
          /><img
            src="../../../../public/riderPageImage/seat.svg"
            class="w-[620px] h-[180px] absolute left-[634.5px] top-[-1.5px] object-none border-2 border-[#979797]"
          />
        </div>
      </div>
      <!-- 추천순 부터 -->
      <div class="flex flex-col justify-start items-start w-[1256px] gap-8 mt-10">
        <div class="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-4">
          <div class="flex flex-col justify-start items-start w-[1256px] gap-8 mt-[35px]">
            <div class="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-4">
              <!-- <p
                v-for="sort in sortOptions"
                :key="sort.value"
                class="flex-grow-0 flex-shrink-0 w-[97px] text-xl text-left cursor-pointer transition-colors duration-200"
                :class="[
                  selectedSort === sort.value ? 'text-black font-bold' : 'text-[#979797]',
                  sort.value === '추천순' ? 'w-14' : 'w-[97px]'
                ]"
                @click="selectedSort = sort.value"
              >
                {{ sort.label }}
              </p> -->
              <p
                v-for="sort in sortOptions"
                :key="sort.value"
                class="flex-grow-0 flex-shrink-0 text-xl text-left cursor-pointer transition-colors duration-200 text-black6"
                :class="{
                  'w-14': sort.value === '추천순', // 🔥 추천순이면 w-14 적용
                  'w-[97px]': sort.value !== '추천순', // 나머지는 기본 w-[97px]
                  'text-black font-bold': selectedSort === sort.value, // 선택된 항목이면 강조
                  'text-[#979797]': selectedSort !== sort.value // 선택되지 않은 항목 스타일
                }"
                @click="selectedSort = sort.value"
              >
                {{ sort.label }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 검색된 상품 필드 -->
      <div class="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative">
        <svg
          width="1100"
          height="2"
          viewBox="0 0 1100 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="flex-grow-0 flex-shrink-0"
          preserveAspectRatio="none"
        >
          <line y1="1" x2="1100" y2="1" stroke="black"></line>
        </svg>
        <svg
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="flex-grow-0 flex-shrink-0 w-[18px] h-[18px] relative"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M8.73332 1.69224C8.89981 1.60259 9.10019 1.60259 9.26668 1.69224L16.5792 5.62973C16.7614 5.72784 16.875 5.91807 16.875 6.125C16.875 6.33193 16.7614 6.52216 16.5792 6.62027L9.26668 10.5578C9.10019 10.6474 8.89981 10.6474 8.73332 10.5578L1.42082 6.62027C1.23862 6.52216 1.125 6.33193 1.125 6.125C1.125 5.91807 1.23862 5.72784 1.42082 5.62973L8.73332 1.69224Z"
            fill="#0F172A"
          ></path>
          <path
            d="M2.44851 8.45135L8.19996 11.5483C8.69942 11.8172 9.30058 11.8172 9.80004 11.5483L15.5515 8.45135L16.5792 9.00473C16.7614 9.10283 16.875 9.29306 16.875 9.49999C16.875 9.70693 16.7614 9.89715 16.5792 9.99526L9.26668 13.9328C9.10019 14.0224 8.89981 14.0224 8.73332 13.9328L1.42082 9.99526C1.23862 9.89715 1.125 9.70693 1.125 9.49999C1.125 9.29306 1.23862 9.10283 1.42082 9.00473L2.44851 8.45135Z"
            fill="#0F172A"
          ></path>
          <path
            d="M8.19996 14.9233L2.44851 11.8264L1.42082 12.3797C1.23862 12.4778 1.125 12.6681 1.125 12.875C1.125 13.0819 1.23862 13.2722 1.42082 13.3703L8.73332 17.3078C8.89981 17.3974 9.10019 17.3974 9.26668 17.3078L16.5792 13.3703C16.7614 13.2722 16.875 13.0819 16.875 12.875C16.875 12.6681 16.7614 12.4778 16.5792 12.3797L15.5515 11.8264L9.80004 14.9233C9.30058 15.1922 8.69942 15.1922 8.19996 14.9233Z"
            fill="#0F172A"
          ></path>
        </svg>
        <p class="flex-grow-0 flex-shrink-0 text-base text-left text-black">
          <span class="flex-grow-0 flex-shrink-0 text-base font-light text-left dark:text-black1">검색된 상품 </span>
          <span class="flex-grow-0 flex-shrink-0 text-base font-semibold text-left dark:text-black1">{{ items.length }}</span>
          <span class="flex-grow-0 flex-shrink-0 text-base font-light text-left dark:text-black1">개</span>
        </p>
      </div>
      <!-- 글 상자 -->
      <div class="mt-[32px]">
        <!-- 상품 목록 -->
          <div class="grid grid-cols-3 gap-6">
            <div
              v-for="(item, index) in visibleItems"
              :key="index"
              class="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[408px] relative "
            >
              <img
                :src="item.image"
                :alt="item.cleanTitle"
                class="w-full h-[300px] object-cover border border-[#979797] rounded"
              />
              <div class="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-3 px-8 py-6 bg-[#fefefe] border border-[#979797]">
                <div class="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[316px] relative gap-3">
                  <p class="self-stretch flex-grow-0 flex-shrink-0 w-[316px] text-base text-left text-black">
                    {{ item.mallName }}
                  </p>
                  <p class="self-stretch flex-grow-0 flex-shrink-0 w-[316px] text-xl font-bold text-left text-black ellipsis-multiline">
                    {{ item.cleanTitle }}
                  </p>
                  <p class="self-stretch flex-grow-0 flex-shrink-0 w-[316px] text-2xl font-bold text-left text-black">
                    {{ item.lprice ? Number(item.lprice).toLocaleString("ko-KR") + "원" : "가격 없음" }}
                  </p>
                </div>
                <img
                  :src="isLiked ? '/riderPageImage/fullHeart.svg' : '/riderPageImage/emptyHeart.svg'"
                  alt="하트"
                  class="w-[18px] h-[17px] transition-all duration-200"
                />
              </div>
            </div>
          </div>
      </div>
      <!-- 더보기 -->
      <div
        v-if="visibleItems.length < items.length"
        @click="loadMore"
        class="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[300px] relative gap-8 p-4 rounded bg-[#202020] mt-[32px] mx-[478px] cursor-pointer hover:bg-[#303030] transition-all"
      >
        <p class="flex-grow-0 flex-shrink-0 text-xl font-bold text-center text-white">
          더보기
        </p>
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
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-title {
  font-size: 16px;
  font-weight: bold;
}
</style>
