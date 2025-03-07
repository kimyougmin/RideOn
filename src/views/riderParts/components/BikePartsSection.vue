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
  <article class="w-full flex flex-col gap-16">
    <!-- 상단 -->
    <div class="w-full flex flex-col justify-center items-center gap-4">
      <div class="w-full flex items-center gap-8">
        <div class="w-full h-[1px] bg-black6"></div>
        <p class="w-96 text-title font-bold m-0 text-primaryRed">Bike Parts</p>
        <div class="w-full h-[1px] bg-black6"></div>
      </div>
      <p class="text-4xl font-bold m-0 dark:text-black1">라이딩의 즐거움을 더할 최상의 선택</p>
      <p class="text-sub-title text-center m-0 dark:text-black1">
        라이딩에 필요한 모든 장비 <br />
        내구성 높은 부품, 편안한 라이딩을 위한 용품, 그리고 스타일을 더할 액세서리까지
      </p>
    </div>
    <section class="grid grid-cols-2 gap-8">
      <article class="relative bg-primaryRed p-8">
        <h3 class="text-[28px] font-bold text-left text-black1">자전거 부품</h3>
        <p class="text-body2 text-left text-black1 mt-2">
          <span @click="goToSearch('자전거타이어')" class="cursor-pointer hover:underline">타이어</span> /
          <span @click="goToSearch('자전거안장')" class="cursor-pointer hover:underline">안장</span> /
          <span @click="goToSearch('자전거핸들')" class="cursor-pointer hover:underline">핸들</span> /
          <span @click="goToSearch('자전거그립')" class="cursor-pointer hover:underline">그립</span> /
          <span @click="goToSearch('자전거테이프')" class="cursor-pointer hover:underline">테이프</span> /
          <span @click="goToSearch('자전거페달')" class="cursor-pointer hover:underline">페달</span> /
          <span @click="goToSearch('자전거속도계')" class="cursor-pointer hover:underline">속도계</span> <br />
          <span @click="goToSearch('자전거핸들바')" class="cursor-pointer hover:underline">핸들바</span> /
          <span @click="goToSearch('자전거변속기')" class="cursor-pointer hover:underline">변속기</span> /
          <span @click="goToSearch('자전거크랭크')" class="cursor-pointer hover:underline">크랭크</span> /
          <span @click="goToSearch('자전거체인')" class="cursor-pointer hover:underline">체인</span> /
          <span @click="goToSearch('자전거라이트')" class="cursor-pointer hover:underline">라이트</span> /
          <span @click="goToSearch('자전거브레이크')" class="cursor-pointer hover:underline">브레이크</span> <br />
          <span @click="goToSearch('자전거백미러')" class="cursor-pointer hover:underline">백미러</span> /
          <span @click="goToSearch('자전거셀프정비')" class="cursor-pointer hover:underline">셀프정비</span>
        </p>
        <div class="absolute -bottom-1 right-0">
          <img src="/riderPageImage/bikeParts_1.png" class="size-full" />
        </div>
      </article>
      <article class="relative bg-black6 p-8">
        <div class="absolute top-2 left-14">
          <img src="/riderPageImage/bikeParts_2.png" class="size-full" />
        </div>
        <div class="flex flex-col gap-2 absolute top-6 right-10">
          <h3 class="text-[28px] font-bold text-left text-black1">라이더 용품</h3>
          <p class="text-body2 text-left text-black1 mt-2">
            <span @click="goToSearch('자전거헬멧')" class="cursor-pointer hover:underline">헬멧</span> /
            <span @click="goToSearch('자전거모자')" class="cursor-pointer hover:underline">모자</span> /
            <span @click="goToSearch('자전거두건')" class="cursor-pointer hover:underline">두건</span> /
            <span @click="goToSearch('자전거자전거장갑')" class="cursor-pointer hover:underline">자전거장갑</span> /
            <span @click="goToSearch('자전거자전거슈즈')" class="cursor-pointer hover:underline">자전거슈즈</span> <br />
            <span @click="goToSearch('자전거슈커버')" class="cursor-pointer hover:underline">슈커버</span> /
            <span @click="goToSearch('자전거토커버')" class="cursor-pointer hover:underline">토커버</span> /
            <span @click="goToSearch('자전거자전거양말')" class="cursor-pointer hover:underline">자전거양말</span> /
            <span @click="goToSearch('자전거상의세트')" class="cursor-pointer hover:underline">상의세트</span> <br />
            <span @click="goToSearch('자전거상의')" class="cursor-pointer hover:underline">상의</span> /
            <span @click="goToSearch('자전거저지')" class="cursor-pointer hover:underline">저지</span> /
            <span @click="goToSearch('자전거하의')" class="cursor-pointer hover:underline">하의</span> /
            <span @click="goToSearch('자전거빕')" class="cursor-pointer hover:underline">빕</span> <br />
            <span @click="goToSearch('자전거이너웨어')" class="cursor-pointer hover:underline">이너웨어</span> /
            <span @click="goToSearch('자전거보호대')" class="cursor-pointer hover:underline">보호대</span>
          </p>
        </div>
      </article>
    </section>
  </article>
</template>
