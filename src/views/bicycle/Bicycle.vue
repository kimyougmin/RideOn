<script setup>
import BasicHeader from '@/components/BasicHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
import BicycleBanner from './components/BicycleBanner.vue'
import NewProductSection from './components/NewProductSection.vue'
import BicycleIntroSection from './components/BicycleIntroSection.vue'
import TopBrandSection from './components/TopBrandSection.vue'

import bikeBrand from '../../../public/bike_category_data.json'
import { onMounted, ref } from 'vue'

const groupList = ref([])
const groupedItems = ref([])

onMounted(() => {
  const tempList = []
  for (const item in bikeBrand) {
    if (item !== 'KID') {
      for (let i = 0; i < 4; i++) {
        tempList.push(bikeBrand[item][i])
      }
    }
  }
  groupList.value = tempList
  const chunkedList = []
  for (let i = 0; i < tempList.length; i += 4) {
    chunkedList.push(tempList.slice(i, i + 4))
  }
  groupedItems.value = chunkedList
})
</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <BasicHeader />
    <BicycleBanner />
    <section class="w-[1440px] mx-auto my-[120px] px-[93px] flex flex-col gap-[120px]">
      <NewProductSection :groupedItems="groupedItems" :groupList="groupList" />
      <BicycleIntroSection />
      <TopBrandSection />
    </section>
    <BasicFooter />
  </div>
</template>
