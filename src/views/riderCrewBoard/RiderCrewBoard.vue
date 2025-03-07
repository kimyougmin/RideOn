<script setup>
import { ref, onMounted, computed } from 'vue'
import BasicHeader from '@/components/BasicHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
import KeywordSearch from '@/components/search/KeywordSearch.vue'
import SortButtons from '@/components/search/SortButtons.vue'
import LocationFilter from '@/components/search/LocationFilter.vue'
import MemberCountFilter from '@/components/search/MemberCountFilter.vue'

import RiderCrewHeader from './components/RiderCrewHeader.vue'
import RiderCrewFilterMenu from './components/RiderCrewFilterMenu.vue'
import MoveToMap from './components/MoveToMap.vue'
import RiderCrewListItem from './components/RiderCrewListItem.vue'
import { useRiderCrewBoardStore } from '@/stores/riderCrewBoard'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const riderCrewBoardStore = useRiderCrewBoardStore()
const userStore = useUserStore()
const router = useRouter()

const selectedSort = ref('latest')
const selectedStatus = ref('all')

const searchKeyword = ref('')

const selectedLocations = ref([])
const selectedMemberCount = ref([])

const filteredRiderCrews = computed(() => {
  return riderCrewBoardStore.filterPosts(
    searchKeyword.value,
    selectedLocations.value,
    selectedMemberCount.value,
    selectedSort.value === 'likes' ? 'mostLiked' : selectedSort.value,
    selectedStatus.value,
  )
})

const handleWriteClick = () => {
  if (!userStore.isLoggedIn) {
    alert('로그인 후 이용해주세요.')
    router.push('/login')
    return
  }

  router.push('/riderCrewBoard/write')
}

onMounted(async () => {
  try {
    await riderCrewBoardStore.fetchPosts()
  } catch (error) {
    console.error('라이더 크루 목록 조회 실패:', error)
  }
})
</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <BasicHeader />
    <RiderCrewHeader />
    <section class="w-[1440px] px-[198px] mx-auto pt-10 grid grid-cols-10 gap-6 mb-12 items-start">
      <!-- 질문 게시판 - 좌측 영역 -->
      <article class="col-span-2 flex flex-col gap-4">
        <RiderCrewFilterMenu v-model="selectedStatus" />
      </article>

      <!-- 질문 게시판 - 가운데 영역 -->
      <article class="col-span-6 flex flex-col gap-6">
        <!-- 검색 영역 -->
        <section class="flex flex-col gap-6">
          <KeywordSearch v-model="searchKeyword" />
          <LocationFilter v-model="selectedLocations" />
          <MemberCountFilter v-model="selectedMemberCount" />
        </section>

        <!-- 정렬 옵션 & 글쓰기 버튼 -->
        <section class="flex items-center justify-between">
          <SortButtons v-model="selectedSort" />
          <button @click="handleWriteClick" class="bg-black6 px-6 py-2 rounded text-black1">
            글쓰기
          </button>
        </section>

        <!-- 질문 게시판 목록 -->
        <section class="flex flex-col min-h-[512px]">
          <RiderCrewListItem
            v-for="riderCrew in filteredRiderCrews"
            :key="riderCrew.id"
            :riderCrew="riderCrew"
          />
        </section>
      </article>

      <!-- 질문 게시판 - 우측 영역 -->
      <article class="col-span-2">
        <MoveToMap />
      </article>
    </section>
    <BasicFooter />
  </div>
</template>

<style scoped></style>
