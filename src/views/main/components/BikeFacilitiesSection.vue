<template>
  <article class="flex flex-col gap-[50px]">
    <div class="flex flex-col gap-4">
      <h3 class="text-3xl text-primaryRed font-bold">Bike Facilities</h3>
      <h2 class="text-4xl font-bold dark:text-black1">
        언제 어디서나 안심 라이딩! 편의시설 한눈에
      </h2>
    </div>
    <div class="grid grid-cols-12 gap-8">
      <router-link to="/roadMap" class="col-span-3">
        <img src="/main/main_bike_facility_1.png" alt="bike facility" class="mb-4" />
        <h4 class="text-2xl font-semibold text-center dark:text-black1">공공자전거</h4>
      </router-link>
      <router-link to="/roadMap" class="col-span-3">
        <img src="/main/main_bike_facility_2.png" alt="bike facility" class="mb-4" />
        <h4 class="text-2xl font-semibold text-center dark:text-black1">수리 시설</h4>
      </router-link>
      <router-link to="/roadMap" class="col-span-3">
        <img src="/main/main_bike_facility_3.png" alt="bike facility" class="mb-4" />
        <h4 class="text-2xl font-semibold text-center dark:text-black1">공기주입기</h4>
      </router-link>
      <router-link to="/roadMap" class="col-span-3">
        <img src="/main/main_bike_facility_4.png" alt="bike facility" class="mb-4" />
        <h4 class="text-2xl font-semibold text-center dark:text-black1">보관소</h4>
      </router-link>
    </div>
  </article>
</template>

<script setup></script>
