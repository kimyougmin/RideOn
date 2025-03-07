<script setup>
import RiderShopHeader from "@/components/RiderShopHeader.vue";
import BasicFooter from "@/components/BasicFooter.vue";
import { ref, onMounted, watch } from "vue";
import { getNaverItems } from "@/apis/naverSearchApi";
import { useRouter, useRoute } from 'vue-router';


const route = useRoute();
const selectedSort = ref("sim");
const items = ref([]);
const visibleItems = ref([]);
const itemsPerPage = 9;
const searchQuery = ref(route.query.keyword || "자전거부품");
const router = useRouter();


const sortOptions = [
  { label: "추천순", value: "sim" },
  { label: "낮은 가격순", value: "asc" },
  { label: "높은 가격순", value: "dsc" },
  { label: "신상품순", value: "date" },
];

const searchItems = async () => {
  if (!searchQuery.value.trim()) return;

  try {
    const results = await getNaverItems(searchQuery.value, 100, selectedSort.value);
    if (results.length > 0) {
      items.value = results;
      visibleItems.value = items.value.slice(0, itemsPerPage);
    } else {
      console.warn("검색 결과 없음");
      items.value = [];
      visibleItems.value = [];
    }
  } catch (error) {
    console.error("네이버 API 검색 오류", error);
  }
};

watch(() => route.query.keyword, async (newKeyword) => {
  searchQuery.value = newKeyword ? decodeURIComponent(newKeyword) : "자전거부품";
  await searchItems();
}, { immediate: true });

watch(selectedSort, async () => {
  await searchItems();
});

const loadMore = () => {
  const nextItems = items.value.slice(visibleItems.value.length, visibleItems.value.length + itemsPerPage);
  visibleItems.value.push(...nextItems);
};

watch(selectedSort, async () => {
  await searchItems();
});

watch(searchQuery, async () => {
  await searchItems();
});

const goToDetail = (item) => {
  if (!item || !item.productId) return;

  router.push({
    path: `/riderPartsDetail`,
    query: {
      keyword: encodeURIComponent(item.title.replace(/<\/?[^>]+(>|$)/g, "")),
      productId: item.productId,
      title: encodeURIComponent(item.title.replace(/<\/?[^>]+(>|$)/g, "")),
      image: encodeURIComponent(item.image),
      price: item.lprice|| item.hprice || "0",
      mallName: encodeURIComponent(item.mallName || ""),
      link: encodeURIComponent(item.link || ""),
    },
  });
};

onMounted(async () => {
  await searchItems();
});
</script>

<template>
  <div class="w-full min-h-screen flex flex-col dark:bg-black9">
    <RiderShopHeader/>
    <div class="h-full max-w-[1256px] mx-auto dark:bg-black9">
      <!-- 연관 검색어 부분 -->
      <div class="flex items-center w-[1261px] gap-4 mt-[35px] relative overflow-hidden dark:bg-black9">
        <p class="text-2xl font-bold dark:text-black1 pt-4 m-0">연관</p>
        <div class="flex items-center gap-2">
          <div v-for="(icon, index) in relatedItems" :key="index" class="flex items-center gap-1 px-3 py-1.5 w-auto h-[54px] rounded-[50px] bg-[#fffffe] border border-[#e8e8e8]">
            <img :src="icon.img" class="w-[20px] h-[20px] object-cover"/>
            <p class="text-base text-black pt-3 m-0">{{ icon.label }}</p>
          </div>
        </div>
      </div>
      <!-- 검색 안내 문구 및 이미지 -->
      <div class="flex flex-col w-[1256px] gap-2 mt-[35px] dark:bg-black9">
          <p class="text-[40px] dark:text-black1 m-0">Find Your Perfect Part</p>
          <p class="text-2xl dark:text-black1 m-0">소모품부터 부품까지 쉽고 빠르게 검색하세요.</p>
        <div class="relative h-[400px]">
          <img src="/riderPageImage/chain.svg" class="w-[620px] h-[400px] absolute left-0 top-0 object-cover border-2 border-black1"/>
          <img src="/riderPageImage/chain2.svg" class="w-[620px] h-[200px] absolute left-[634.5px] top-[198.5px] object-none border-2 border-black1"/>
          <img src="/riderPageImage/seat.svg" class="w-[620px] h-[180px] absolute left-[634.5px] top-0 object-none border-2 border-black1"/>
        </div>
      </div>
      <!-- 정렬 옵션 -->
      <div class="flex flex-col w-[1256px] gap-8 mt-10 dark:bg-black9">
        <div class="flex gap-4">
          <p v-for="sort in sortOptions" :key="sort.value" class="text-xl cursor-pointer transition-colors duration-200 m-0" :class="{
            'w-14': sort.value === 'sim',
            'w-[97px]': sort.value !== 'sim',
            'text-black font-bold dark:text-black1': selectedSort === sort.value,
            'text-black6 dark:text-black4': selectedSort !== sort.value
          }" @click="selectedSort = sort.value">
            {{ sort.label }}
          </p>
        </div>
      </div>
      <!-- 검색된 상품 수 -->
      <div class="flex justify-between items-center dark:bg-black9">
        <img src="/riderPageImage/blackLine.svg" alt="Line" class="w-[1100px] h-[2px] dark:hidden"/>
        <img src="/riderPageImage/whiteLine.svg" alt="Line" class="w-[1100px] h-[2px] hidden dark:block"/>
        <p class="text-base text-black pt-4 dark:text-black1 m-0">검색된 상품 {{ visibleItems.length }}개</p>
      </div>
      <!-- 상품 목록 -->
      <div class="mt-[32px] dark:bg-black9">
        <!-- 상품 목록 -->
        <div class="grid grid-cols-3 gap-6">
          <div
            v-for="(item, index) in visibleItems"
            :key="index"
            class="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[408px] relative cursor-pointer"
            @click="goToDetail(item)"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-[300px] object-cover border border-[#979797]"
            />
            <div class="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-3 px-8 py-6 bg-[#fefefe] border border-[#979797]">
              <div class="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[316px] relative gap-3">
                <p class="self-stretch flex-grow-0 flex-shrink-0 w-[316px] text-base text-left text-black">
                  {{ item.mallName }}
                </p>
                <p class="self-stretch flex-grow-0 flex-shrink-0 w-[316px] text-xl font-bold text-left text-black ellipsis-multiline">
                  {{ item.title.replace(/<\/?[^>]+(>|$)/g, '') }}
                </p>
                <p class="self-stretch flex-grow-0 flex-shrink-0 w-[316px] text-2xl font-bold text-left text-black">
                  {{ Intl.NumberFormat('ko-KR').format(Number(item?.lprice || 0)) }}원
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
      <div class="p-[40px] flex items-center justify-center">
        <div
        v-if="visibleItems.length < items.length"
        @click="loadMore"
        class="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[300px] h-[56px] relative gap-8 p-4 rounded-[4px] bg-black9 mt-[32px] mx-[478px] cursor-pointer hover:bg-[#303030] transition-all dark:bg-black1"
        >
          <p class="flex-grow-0 flex-shrink-0 text-xl font-bold text-center text-white dark:text-black10 pt-3">
            더보기
          </p>
        </div>
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
