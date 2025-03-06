<script setup></script>

<template>
  <article class="border-2 flex">
    <div class="w-[630px]">
      <div class="mx-8 mt-8">
        <p class="mb-1 font-impact text-2xl dark:text-black1">역대급으로 빠르고,</p>
        <p class="font-impact text-2xl dark:text-black1">역대급으로 가벼운</p>
        <p class="text-body1 dark:text-black1">
          가장 가볍고 빠른 슈퍼바이크의 놀라운 조합으로 완전히 새롭게 탄생한 마돈 8세대를 타고
          질주해 보세요.
        </p>
        <router-link to="bicycleSearch">
          <div class="border-2 rounded-full w-[160px] border-black9 dark:border-black1 mb-10">
            <p class="text-center font-impact my-2 dark:text-black1">더 알아보기</p>
          </div>
        </router-link>
      </div>
      <img src="/bicyclePageImage/trekBike.png" />
    </div>
    <div class="border-l-2">
      <img class="h-1/2" src="/bicyclePageImage/trekBike2.png" />
      <div class="w-[297px] mx-auto mt-8">
        <p class="text-body2 font-light leading-loose mb-[80px] dark:text-black1">
          가벼운 500 시리즈 OCLV 카본이 더욱 빠른 속도를 위해 새롭게 디자인 된 에어로 튜브 형태와
          페어링되어 역대급으로 가벼운 마돈 SL 디스크 에어로 클라이밍 바이크로 탄생했습니다.
        </p>
        <p class="dark:text-black1">(마돈 7세대 보다)</p>
        <p class="font-impact text-3xl dark:text-black1">320g 더 가볍게</p>
      </div>
    </div>
    <div>
      <div class="w-[297px] mx-auto mt-8">
        <p class="font-impact text-3xl mb-2 dark:text-black1">77s 더 빠르게</p>
        <p class="mb-[115px] dark:text-black1">(에몬다 보다)</p>
        <p class="text-body2 font-light leading-loose mb-7 dark:text-black1">
          빠른 스피드와 에어로함을 재정의하는 혁신적인 풀시스템 에어로 튜브 모양이 바이크 전체의
          공기역학적 성능을 최적화합니다.
        </p>
      </div>
      <img class="h-1/2" src="/bicyclePageImage/SLImage.png" />
    </div>
  </article>
</template>
