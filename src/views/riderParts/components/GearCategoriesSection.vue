<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToSearch = (query) => {
  if(!query) return;

  router.push({
    path: '/riderPartsSearch',
    query: { keyword: query },
  });
}
</script>

<template>
  <article class="w-full flex flex-col gap-8">
    <p class="text-primaryRed text-title font-bold">Gear Categories</p>
    <div class="w-full grid grid-cols-6 gap-4">
      <div class="flex flex-col items-center gap-5" @click="goToSearch('자전거헬멧')">
        <img src="/riderPageImage/category_helmat.png" />
        <p class="text-sub-title font-bold m-0 dark:text-black1">헬멧</p>
      </div>
      <div class="flex flex-col items-center gap-5" @click="goToSearch('자전거라이트')">
        <img src="/riderPageImage/category_light.png" />
        <p class="text-sub-title font-bold m-0 dark:text-black1">라이트</p>
      </div>
      <div class="flex flex-col items-center gap-5" @click="goToSearch('물통 + 물통케이지')">
        <img src="/riderPageImage/category_waterBottle.png" />
        <p class="text-sub-title font-bold m-0 dark:text-black1">물통 & 물통케이지</p>
      </div>
      <div class="flex flex-col items-center gap-5" @click="goToSearch('자물쇠')">
        <img src="/riderPageImage/category_lock.png" />
        <p class="text-sub-title font-bold m-0 dark:text-black1">자물쇠</p>
      </div>
      <div class="flex flex-col items-center gap-5" @click="goToSearch('자전거휴대폰거치대')">
        <img src="/riderPageImage/category_phoneStand.png" />
        <p class="text-sub-title font-bold m-0 dark:text-black1">휴대폰거치대</p>
      </div>
      <div class="flex flex-col items-center gap-5" @click="goToSearch('자전거펌프')">
        <img src="/riderPageImage/category_pump.png" />
        <p class="text-sub-title font-bold m-0 dark:text-black1">펌프</p>
      </div>
    </div>
  </article>
</template>
