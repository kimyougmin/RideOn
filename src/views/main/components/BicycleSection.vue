<template>
  <article class="flex flex-col gap-12">
    <div class="flex flex-col gap-4">
      <h3 class="text-3xl text-primaryRed font-bold">Bicycle</h3>
      <h2 class="text-4xl font-bold dark:text-black1">나에게 딱 맞는 자전거 찾기</h2>
      <p class="text-sub-title m-0 dark:text-black1">
        브랜드별, 카테고리별 자전거 정보를 한곳에서! <br />
        Trek, Specialized 등 인기 브랜드부터 아동용, E-BIKE, 로드, 픽시, MTB까지 다양한 자전거
        정보를 확인하세요.
      </p>
    </div>
    <div class="grid grid-cols-12 gap-8">
      <router-link to="/bicycle" class="col-span-6">
        <img src="/main/main_bike_brand.png" alt="bike facility" class="mb-4" />
      </router-link>
      <router-link to="/bicycle" class="col-span-6">
        <img src="/main/main_bike_category.png" alt="bike facility" class="mb-4" />
      </router-link>
    </div>
  </article>
</template>

<script></script>
