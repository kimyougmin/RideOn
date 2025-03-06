<script setup>
import BasicHeader from '@/components/BasicHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
import RiderPartsBanner from './components/RiderPartsBanner.vue'
import GearCategoriesSection from './components/GearCategoriesSection.vue'
import { ref, onMounted } from 'vue'
import { getNaverItems } from '../../apis/naverSearchApi'
import BikePartsSection from './components/BikePartsSection.vue'
import BestProductSection from './components/BestProductSection.vue'
const query = ref('자전거부품')
const items = ref([])
const groupedItems = ref([])
const groupList = ref([])

const fetchNaverDatas = async () => {
  if (!query.value) return
  try {
    items.value = await getNaverItems(query.value)
    console.log('✅ API 응답 데이터:', items)

    // API 응답 후 바로 그룹화 로직 실행
    const tempList = []
    if (items.value && items.value.length > 0) {
      for (let i = 0; i < Math.min(items.value.length, 16); i++) {
        tempList.push(items.value[i])
      }
    }

    groupList.value = tempList
    const chunkedList = []
    for (let i = 0; i < tempList.length; i += 4) {
      chunkedList.push(tempList.slice(i, i + 4))
    }
    groupedItems.value = chunkedList
  } catch (error) {
    console.error('검색 오류 : ', error)
  }
}

// const cleanedItems = computed(() => {
//   return items.value.map((item) => {
//     if (typeof item.title !== 'string') return { ...item, cleanTitle: '제목 없음' }
//     const parts = item.title.split('<b>')
//     let cleanTitle = parts[0].trim()
//     if (!cleanTitle && parts.length > 1) {
//       cleanTitle = parts[1].split('</b>')[1]?.trim() || parts[1].replace('</b>', '').trim()
//     }
//     return { ...item, cleanTitle }
//   })
// })

onMounted(() => {
  fetchNaverDatas()
})
</script>

<template>
  <div class="w-full dark:bg-black9">
    <BasicHeader />
    <RiderPartsBanner />
    <section class="w-[1440px] mx-auto my-[120px] px-[93px] flex flex-col gap-[120px]">
      <GearCategoriesSection />
      <BikePartsSection />
      <BestProductSection :groupedItems="groupedItems" :groupList="groupList" />
    </section>
    <BasicFooter />
  </div>
</template>
