<script setup>
import ShopHeader from "@/components/ShopHeader.vue";
import BasicFooter from "@/components/BasicFooter.vue";
import { ref, onMounted, watch, computed } from "vue";
import { getNaverItems } from "@/apis/naverSearchApi";
import { useRouter } from 'vue-router';
import { useItemStore } from "@/stores/riderItemStore";

const selectedSort = ref("sim");
const items = ref([]);
const visibleItems = ref([]);
const itemsPerPage = 9;
const searchQuery = ref("");
const router = useRouter();
const itemStore = useItemStore();

const sortOptions = [
  { label: "추천순", value: "sim" },
  { label: "낮은 가격순", value: "asc" },
  { label: "높은 가격순", value: "dsc" },
  { label: "신상품순", value: "date" },
];

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

const searchItems = async () => {
  if (!searchQuery.value.trim()) return;
  const results = await getNaverItems(searchQuery.value, 100, selectedSort.value);
  items.value = results;
  visibleItems.value = cleanedItems.value.slice(0, itemsPerPage);
};

const loadMore = () => {
  const nextItems = cleanedItems.value.slice(visibleItems.value.length, visibleItems.value.length + itemsPerPage);
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
      keyword: searchQuery.value,
      productId: item.productId,
    },
  });
};

onMounted(async () => {
  searchQuery.value = "자전거부품";
  await searchItems();
  console.log('🔍 API 응답 데이터:', visibleItems.value);
});
</script>

<template>
  <div class="w-full min-h-screen flex flex-col dark:bg-black9">
    <ShopHeader :searchValue="searchValue" @update:receiveHandler="receiveHandler($event)"/>
    <div class="h-full flex-gow max-w-[1256px] mx-auto dark:bg-black9">
      <!-- 연관 검색어 부분 -->
      <div class="flex justify-start items-center w-[1261px] relative overflow-hidden gap-4 mt-[35px]  dark:bg-black9">
        <p class="flex-grow-0 flex-shrink-0 text-2xl font-bold text-left dark:text-black1 pt-4">연관</p>
        <div class="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[1196px] gap-2">
          <div class="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-1 px-3 py-1.5 w-auto h-[54px] rounded-[50px] bg-[#fffffe] border border-[#e8e8e8]">
            <img src="/riderPageImage/gear.svg" class="flex-grow-0 flex-shrink-0 w-[20px] h-[20px] rounded-[50px] object-cover"/>
            <p class="flex-grow-0 flex-shrink-0 text-base text-left text-black pt-3">자전거기어</p>
          </div>
          <div class="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-1 px-3 py-1.5 w-auto h-[54px] rounded-[50px] bg-[#fffffe] border border-[#e8e8e8]">
            <img src="/riderPageImage/pedal.svg" class="flex-grow-0 flex-shrink-0 w-[20px] h-[20px] rounded-[50px] object-cover"/>
            <p class="flex-grow-0 flex-shrink-0 text-base text-left text-black pt-3">자전거페달</p>
          </div>
          <div class="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-1 px-3 py-1.5 w-auto h-[54px] rounded-[50px] bg-[#fffffe] border border-[#e8e8e8]">
            <img src="/riderPageImage/wheel.svg" class="flex-grow-0 flex-shrink-0 w-[20px] h-[20px] rounded-[50px] object-cover"/>
            <p class="flex-grow-0 flex-shrink-0 text-base text-left text-black pt-3">자전거스템</p>
          </div>
        </div>
      </div>
      <!-- 밑에 바로 이미지 -->
      <div class="flex flex-col justify-start items-start w-[1256px] relative gap-8 mt-[35px] dark:bg-black9">
        <div class="flex-grow-0 flex-shrink-0 w-[628px] h-[94px] relative">
          <p class="absolute left-0 top-16 text-2xl text-left dark:text-black1">
            소모품부터 부품까지 쉽고 빠르게 검색하세요.
          </p>
          <p class="absolute left-0 top-0 text-[40px] text-left dark:text-black1">Find Your Perfect Part</p>
        </div>
        <div class="self-stretch flex-grow-0 flex-shrink-0 h-[400px] relative">
          <img
            src="../../../../public/riderPageImage/chain.svg"
            class="w-[620px] h-[400px] absolute left-[-1.5px] top-[-1.5px] object-cover border-2 border-black1"
          /><img
            src="../../../../public/riderPageImage/chain2.svg"
            class="w-[620px] h-[200px] absolute left-[634.5px] top-[198.5px] object-none border-2 border-black1"
          /><img
            src="../../../../public/riderPageImage/seat.svg"
            class="w-[620px] h-[180px] absolute left-[634.5px] top-[-1.5px] object-none border-2  border-black1"
          />
        </div>
      </div>
      <!-- 추천순 부터 -->
      <div class="flex flex-col justify-start items-start w-[1256px] gap-8 mt-10 dark:bg-black9">
        <div class="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-4">
          <div class="flex flex-col justify-start items-start w-[1256px] gap-8 mt-[35px]">
            <div class="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-4">
              <p
                v-for="sort in sortOptions"
                :key="sort.value"
                class="flex-grow-0 flex-shrink-0 text-xl text-left cursor-pointer transition-colors duration-200 text-black6"
                :class="{
                  'w-14': sort.value === 'sim',
                  'w-[97px]': sort.value !== 'sim',
                  'text-black font-bold dark:text-black1': selectedSort === sort.value,
                  'text-black6 dark:text-black4': selectedSort !== sort.value
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
      <div class="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative  dark:bg-black9">
          <img
            src="/riderPageImage/blackLine.svg"
            alt="Line"
            class="w-[1100px] h-[2px] flex-grow-0 flex-shrink-0 relative dark:hidden"
          />
          <img
            src="/riderPageImage/whiteLine.svg"
            alt="Line"
            class="w-[1100px] h-[2px] flex-grow-0 flex-shrink-0 relative hidden dark:block"
          />
          <img
            src="/riderPageImage/data.svg"
            alt="dataIcon"
            class="w-[18px] h-[18px] flex-grow-0 flex-shrink-0 relative dark:hidden"
          />
          <img
            src="/riderPageImage/whiteData.svg"
            alt="dataIcon"
            class="w-[18px] h-[18px] flex-grow-0 flex-shrink-0 relative hidden dark:block"
          />
        <p class="flex-grow-0 flex-shrink-0 text-base text-left text-black pt-4  dark:bg-black9">
          <span class="flex-grow-0 flex-shrink-0 text-base font-light text-left dark:text-black1">검색된 상품 </span>
          <span class="flex-grow-0 flex-shrink-0 text-base font-semibold text-left dark:text-black1">{{ visibleItems.length }}</span>
          <span class="flex-grow-0 flex-shrink-0 text-base font-light text-left dark:text-black1">개</span>
        </p>
      </div>
      <!-- 글 상자 -->
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
              :alt="item.cleanTitle"
              class="w-full h-[300px] object-cover border border-[#979797]"
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
                  {{ item.lprice ? Number(item.lprice).toLocaleString('ko-KR') + '원' : '가격 없음' }}
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
