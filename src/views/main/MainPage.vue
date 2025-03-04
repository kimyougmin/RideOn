<script setup>
import BasicHeader from '@/components/BasicHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
import MainBanner from './components/MainBanner.vue'
import BicycleSection from './components/BicycleSection.vue'
import RidingGearSection from './components/RidingGearSection.vue'
import BikeFacilitiesSection from './components/BikeFacilitiesSection.vue'
import BikeRoutesSection from './components/BikeRoutesSection.vue'
</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <BasicHeader />
    <section>
      <MainBanner />
    </section>
    <section class="w-[1440px] mx-auto my-[120px] px-[93px] flex flex-col gap-[120px]">
      <BikeRoutesSection />
      <BikeFacilitiesSection />
      <BicycleSection />
      <RidingGearSection />
    </section>

    <BasicFooter />
  </div>
</template>

<style scoped></style>
