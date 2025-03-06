<script setup>
import ShopHeader from '@/components/ShopHeader.vue';
import BasicFooter from '@/components/BasicFooter.vue';
import { ref, onMounted, watch} from 'vue';
import { useItemStore } from '@/stores/riderItemStore';
import { useRoute } from 'vue-router';
import { fetchLikeCreateApi } from '@/apis/fetchLikeCreateApi.js'
import { fetchLikeRemoveApi } from '@/apis/fetchLikeRemoveApi.js'
import { fetchUserLikesApi } from '@/apis/userLikesApi.js'

const route = useRoute();
const itemStore = useItemStore();
const item = ref(null);
const union = ref([]);
const isLiked = ref(false);
const user = JSON.parse(localStorage.getItem('user'));

onMounted(async () => {
  const productId = route.params.productId;
  if (!productId) {
    console.warn("⚠️ productId가 없습니다!");
    return;
  }

  if (user && user._id !== undefined) {
    try {
      const likeData = await fetchUserLikesApi(user._id);
      union.value = likeData.map((e) => e.title);

      // 2️⃣ 현재 상품이 찜한 목록에 있는지 확인
      isLiked.value = union.value.includes(productId);
      console.log("✅ 현재 상품 찜 상태:", isLiked.value);
    } catch (error) {
      console.error("❌ 찜한 상품 불러오기 실패:", error);
    }
  }

  if (itemStore.selectedItem && itemStore.selectedItem.productId === productId) {
    item.value = itemStore.selectedItem;
  } else {
    itemStore.restoreItem();
    item.value = itemStore.selectedItem;
    if (!item.value) {
      const savedItem = localStorage.getItem("selectedItem");
      if (savedItem) {
        const parsedItem = JSON.parse(savedItem);
        if (parsedItem.productId === productId) {
          item.value = parsedItem;
          itemStore.setSelectedItem(parsedItem);
        } else {
          console.warn("⚠️ LocalStorage에 일치하는 productId 없음!");
        }
      } else {
        console.warn("⚠️ LocalStorage에서 데이터를 찾을 수 없습니다!");
      }
    }
  }
});

const likeCreateHandler = async () => {
  if (user && user._id !== undefined && item.value) {
    const requestData = {
      _id: user._id,
      title: item.value.productId,
      name: item.value.cleanTitle,
      price: item.value.lprice,
      image: item.value.image,
      brand: item.value.mallName,
      category: item.value.category4
    };

    console.log("📡 API 요청 데이터:", requestData); // 요청 데이터 출력

    try {
      const response = await fetchLikeCreateApi(requestData);
      console.log("✅ API 응답 데이터:", response); // 응답 데이터 출력
      alert("✅ 찜하기 성공!");
    } catch (error) {
      console.error("❌ API 요청 실패:", error);
      alert("⚠️ 찜하기 중 오류 발생!");
    }
  }
};
const likeRemoveHandler = async () => {
  if (user && user._id !== undefined && item.value) {
    console.log("💔 찜하기 취소 버튼 클릭됨!");  // ✅ 실행 확인 로그
    try {
      const { productId } = item.value;

      await fetchLikeRemoveApi({
        id: user._id,   // ✅ API 요청 ID 확인
        title: productId
      });

      console.log("💔 찜하기 취소 성공!", productId);  // ✅ 성공 로그

      // 상태 변경
      union.value = union.value.filter((e) => e !== productId);
      isLiked.value = false; // ✅ UI 업데이트
    } catch (error) {
      console.error("❌ 찜하기 취소 실패:", error);
    }
  } else {
    console.warn("⚠️ User ID 또는 item이 없습니다!");
  }
};


watch(() => itemStore.selectedItem, (newItem) => {
  if (newItem) {
    item.value = newItem;
  }
});
</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <ShopHeader/>
    <div class="bg-black2 pt-[37px] pb-[100px] dark:bg-black8">
      <div class="w-[1044px] mx-auto">
        <div v-if="item" class="flex pb-[100px]">
          <img v-if="item.image" :src="item.image" class="border rounded-lg w-[514px] h-[514px]" alt="itemImage"/>
          <div class="p-4 grid grid-cols-1 content-between">
            <div>
              <p class="font-sans dark:text-black1">{{ item.mallName }}</p>
              <p class="font-impact text-3xl w-[440px] h-[72px] dark:text-black1 mb-15">{{ item.cleanTitle }}</p>
              <v-rating hover :length="5" :size="20" :model-value="rating" active-color="#DC3644" class="dark:text-black1"/>
            </div>
            <div>
              <p class="font-impact text-right text-3xl dark:text-black1">
                {{ item.lprice ? Number(item.lprice).toLocaleString("ko-KR") + "원" : "가격 없음" }}
              </p>
              <div class="bg-primaryRed p-2 rounded-lg mb-2">
                <a :href="item.link"><p class="text-black1 mb-0 font-bold text-center">구매하러 가기</p></a>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex border border-black7 bg-black1 rounded-lg justify-center align-center py-2" @click="isLiked ? likeRemoveHandler() : likeCreateHandler()">
                  <img :src="isLiked ? '/riderPageImage/fullHeart.svg' : '/riderPageImage/emptyHeart.svg'" />
                  <p class="mb-0 ml-2 font-impact">찜하기</p>
                </div>
                <div class="flex border bg-black1 border-black7 rounded-lg justify-center align-center py-2">
                  <svg width="17" height="17" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.3128 13.625H11.6683C12.4343 13.625 13.0202 12.9421 12.9037 12.1849L12.0383 6.55993C11.9445 5.95014 11.4198 5.5 10.8029 5.5H4.19769C3.58072 5.5 3.05604 5.95014 2.96222 6.55993L2.09684 12.1849C1.98034 12.9421 2.56619 13.625 3.3323 13.625H4.68779" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.5 8V12.375M7.5 12.375L9.375 10.5M7.5 12.375L5.625 10.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.75 3.625C8.75 2.93464 8.19037 2.375 7.5 2.375C6.80963 2.375 6.25 2.93464 6.25 3.625" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <p class="mb-0 ml-2 font-impact">장바구니</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p v-else class="text-center text-xl dark:text-white">🔄 로딩 중...</p>
      </div>
    </div>
    <BasicFooter/>
  </div>
</template>

<style scoped>

</style>
