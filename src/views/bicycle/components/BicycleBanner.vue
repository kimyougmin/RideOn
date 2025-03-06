<script setup></script>

<template>
  <section class="w-full h-[600px] bg-black2 relative">
    <img
      src="/bicyclePageImage/ridePageHero.png"
      alt="banner text"
      class="w-full h-full object-cover"
    />
    <div class="absolute w-[1440px] px-[93px] bottom-20 left-1/2 -translate-x-1/2">
      <p class="text-black1 text-title font-light m-0">Embrace the journey, unleash your spirit.</p>
      <p class="text-black1 text-[60px] font-impact mb-4">Wherever you want, RideOn</p>
      <router-link
        to="bicycleSearch"
        class="text-black1 text-sub-title px-6 py-2 border border-black1 rounded-full"
      >
        See More
      </router-link>
    </div>
  </section>
</template>
