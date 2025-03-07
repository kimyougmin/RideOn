<script setup>
import RiderShopHeader from '@/components/RiderShopHeader.vue';
import BasicFooter from '@/components/BasicFooter.vue';
import { ref, onMounted, watch } from 'vue';
import { getNaverItems } from '@/apis/naverSearchApi';
import { useRouter, useRoute } from 'vue-router';
import ProductItem from './components/ProductItem.vue';
import { fetchUserLikesApi } from '@/apis/userLikesApi.js';
import { fetchLikeCreateApi } from '@/apis/fetchLikeCreateApi.js';
import { fetchLikeRemoveApi } from '@/apis/fetchLikeRemoveApi.js';

const route = useRoute();
const selectedSort = ref('sim');
const items = ref([]);
const visibleItems = ref([]);
const itemsPerPage = 9;
const searchQuery = ref(route.query.keyword || '자전거부품');
const router = useRouter();
const user = JSON.parse(localStorage.getItem('user'));
const likedItems = ref([]);
const relatedItems = ref([]);

const sortOptions = [
  { label: '추천순', value: 'sim' },
  { label: '낮은 가격순', value: 'asc' },
  { label: '높은 가격순', value: 'dsc' },
  { label: '신상품순', value: 'date' },
]

const searchItems = async () => {
  if (!searchQuery.value.trim()) {
    console.warn("⚠️ 검색어가 비어있음");
    return;
  }
  try {
    const results = await getNaverItems(searchQuery.value, 100, selectedSort.value);
    if (results.length > 0) {
      items.value = results;
      visibleItems.value = items.value.slice(0, itemsPerPage);
    } else {
      console.warn("⚠️ 검색 결과 없음");
      items.value = [];
      visibleItems.value = [];
    }
  } catch (error) {
    console.error("❌ 네이버 API 검색 오류:", error);
  }
};

watch(
  () => route.query.keyword,
  async (newKeyword) => {
    searchQuery.value = newKeyword ? decodeURIComponent(newKeyword) : '자전거부품';
    await searchItems();
  },
  { immediate: true }
);

watch(selectedSort, async () => {
  await searchItems()
})

const loadMore = () => {
  const nextItems = items.value.slice(
    visibleItems.value.length,
    visibleItems.value.length + itemsPerPage,
  )
  visibleItems.value.push(...nextItems)
}

watch(selectedSort, async () => {
  await searchItems()
})

watch(searchQuery, async () => {
  await searchItems()
})

const toggleLike = async (product) => {
  if (!user || !user._id) return;

  const isLiked = likedItems.value.includes(product.productId);

  if (isLiked) {
    try {
      await fetchLikeRemoveApi({ id: user._id, title: product.productId });
      likedItems.value = likedItems.value.filter((id) => id !== product.productId);
    } catch (error) {
      console.error('❌ 찜하기 취소 실패:', error);
    }
  } else {
    try {
      await fetchLikeCreateApi({
        _id: product.productId,
        title: user._id,
        name: product.title,
        price: product.lprice,
        image: product.image,
        brand: product.mallName,
        category: product.category4 || '자전거부품',
      });

      likedItems.value.push(product.productId);
    } catch (error) {
      console.error('❌ 찜하기 실패:', error);
    }
  }
};

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
      category: encodeURIComponent(item.category4 || '자전거부품'),
    },
  })
}

onMounted(async () => {
  await searchItems();
  if (user && user._id) {
    try {
      const likeData = await fetchUserLikesApi(user._id);
      likedItems.value = likeData.map((e) => e.title);
    } catch (error) {
      console.error("❌ 찜한 상품 불러오기 실패:", error);
    }
  }
});
</script>

<template>
  <div class="w-full min-h-screen flex flex-col dark:bg-black9">
    <RiderShopHeader />
    <div class="max-w-[1256px] mx-auto dark:bg-black9">
      <!-- 연관 검색어 부분 -->
      <div class="w-full flex items-center gap-4 dark:bg-black9">
        <p class="text-2xl font-bold dark:text-black1 py-3 m-0">연관</p>
        <div class="flex items-center gap-2 grow-0">
          <div
            v-for="(icon, index) in relatedItems"
            :key="index"
            class="flex items-center gap-2 px-4 py-2 rounded-full bg-black1 drop-shadow-custom cursor-pointer"
          >
            <div class="w-5 h-5 rounded-full overflow-hidden">
              <img :src="icon.img" class="size-full object-cover" />
            </div>
            <p class="text-black9 m-0">{{ icon.label }}</p>
          </div>
        </div>
      </div>
      <!-- 검색 안내 문구 및 이미지 -->
      <div class="flex flex-col w-[1256px] mt-8 dark:bg-black9">
        <p class="text-[40px] font-impact font-light dark:text-black1 m-0 mb-2">
          Find Your Perfect Part
        </p>
        <p class="text-2xl dark:text-black1 m-0 mb-8">
          소모품부터 부품까지 쉽고 빠르게 검색하세요.
        </p>
        <div class="grid grid-cols-2 gap-4">
          <img src="/riderPageImage/chain.svg" class="object-cover border-2 border-black1" />
          <div class="grid grid-rows-2">
            <img src="/riderPageImage/seat.svg" class="border-2 border-black1" />
            <img src="/riderPageImage/chain2.svg" class="border-2 border-black1" />
          </div>
        </div>
      </div>

      <!-- 정렬 옵션 -->
      <div class="flex flex-col w-[1256px] gap-8 mt-10 dark:bg-black9">
        <div class="flex gap-4">
          <p
            v-for="sort in sortOptions"
            :key="sort.value"
            class="text-xl cursor-pointer transition-colors duration-200 m-0"
            :class="{
              'w-14': sort.value === 'sim',
              'w-[97px]': sort.value !== 'sim',
              'text-black font-bold dark:text-black1': selectedSort === sort.value,
              'text-black6 dark:text-black4': selectedSort !== sort.value,
            }"
            @click="selectedSort = sort.value"
          >
            {{ sort.label }}
          </p>
        </div>
      </div>

      <!-- 검색된 상품 수 -->
      <div class="flex justify-between items-center gap-6 dark:bg-black9 mt-3">
        <hr class="w-full h-[2px] border-black4" />
        <div class="flex items-center gap-2">
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.73332 1.69224C8.89981 1.60259 9.10019 1.60259 9.26668 1.69224L16.5792 5.62973C16.7614 5.72784 16.875 5.91807 16.875 6.125C16.875 6.33193 16.7614 6.52216 16.5792 6.62027L9.26668 10.5578C9.10019 10.6474 8.89981 10.6474 8.73332 10.5578L1.42082 6.62027C1.23862 6.52216 1.125 6.33193 1.125 6.125C1.125 5.91807 1.23862 5.72784 1.42082 5.62973L8.73332 1.69224Z"
              fill="#0F172A"
              class="dark:fill-black1"
            />
            <path
              d="M2.44851 8.45135L8.19996 11.5483C8.69942 11.8172 9.30058 11.8172 9.80004 11.5483L15.5515 8.45135L16.5792 9.00473C16.7614 9.10283 16.875 9.29306 16.875 9.49999C16.875 9.70693 16.7614 9.89715 16.5792 9.99526L9.26668 13.9328C9.10019 14.0224 8.89981 14.0224 8.73332 13.9328L1.42082 9.99526C1.23862 9.89715 1.125 9.70693 1.125 9.49999C1.125 9.29306 1.23862 9.10283 1.42082 9.00473L2.44851 8.45135Z"
              fill="#0F172A"
              class="dark:fill-black1"
            />
            <path
              d="M8.19996 14.9233L2.44851 11.8264L1.42082 12.3797C1.23862 12.4778 1.125 12.6681 1.125 12.875C1.125 13.0819 1.23862 13.2722 1.42082 13.3703L8.73332 17.3078C8.89981 17.3974 9.10019 17.3974 9.26668 17.3078L16.5792 13.3703C16.7614 13.2722 16.875 13.0819 16.875 12.875C16.875 12.6681 16.7614 12.4778 16.5792 12.3797L15.5515 11.8264L9.80004 14.9233C9.30058 15.1922 8.69942 15.1922 8.19996 14.9233Z"
              fill="#0F172A"
              class="dark:fill-black1"
            />
          </svg>

          <p class="w-28 text-black dark:text-black1 m-0">
            검색된 상품 {{ visibleItems.length }}개
          </p>
        </div>
      </div>

      <!-- 상품 목록 -->
      <div class="grid grid-cols-3 gap-6 mt-8">
        <ProductItem
          v-for="(item, index) in visibleItems"
          :key="index"
          :item="item"
          :isLiked="likedItems.includes(item.productId)"
          :goToDetail="goToDetail"
          @toggle-like="toggleLike"
        />
      </div>

      <!-- 더보기 -->
      <div class="flex justify-center items-center">
        <button
          v-if="visibleItems.length < items.length"
          @click="loadMore"
          class="px-32 py-4 text-sub-title rounded bg-black9 text-black1 mt-8 mb-16 mx-auto cursor-pointer hover:bg-black6 transition-all dark:bg-black1 dark:text-black10 dark:hover:bg-black3"
        >
          더보기
        </button>
      </div>
    </div>
    <BasicFooter />
  </div>
</template>
