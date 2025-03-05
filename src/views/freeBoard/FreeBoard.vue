<script setup>
import { onMounted, ref, watch } from 'vue'
import { useFreeBoardStore } from '@/stores/freeBoard'
import BasicFooter from '@/components/BasicFooter.vue'
import BasicHeader from '@/components/BasicHeader.vue'
import FreeBoardListItem from './components/FreeBoardListItem.vue'
import KeywordSearch from '@/components/search/KeywordSearch.vue'
import TagSearch from '@/components/search/TagSearch.vue'
import SortButtons from '@/components/search/SortButtons.vue'

const freeBoardStore = useFreeBoardStore()
const selectedSort = ref('latest')
const searchKeyword = ref('')
const searchTags = ref([])
const filteredPosts = ref([])

const handleSearch = () => {
  filteredPosts.value = freeBoardStore.filterPosts(
    searchKeyword.value,
    searchTags.value,
    selectedSort.value === 'likes' ? 'mostLiked' : selectedSort.value,
  )
}

watch(selectedSort, () => {
  handleSearch()
})

onMounted(async () => {
  await freeBoardStore.fetchPosts()
  handleSearch()
})
</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <BasicHeader />
    <main class="w-[1440px] px-[93px] mx-auto pt-10 flex flex-col gap-8 mb-20">
      <h2 class="text-3xl font-bold text-black9 dark:text-black1">자유게시판</h2>

      <!-- 검색 영역 -->
      <section class="flex flex-col gap-4">
        <KeywordSearch v-model="searchKeyword" @search="handleSearch" />
        <TagSearch v-model="searchTags" @search="handleSearch" />
      </section>

      <!-- 정렬 옵션 & 글쓰기 버튼 -->
      <section class="flex justify-between">
        <SortButtons v-model="selectedSort" />
        <router-link to="/freeBoard/write" class="bg-black6 px-6 py-2 rounded text-black1"
          >글쓰기</router-link
        >
      </section>

      <!-- 게시글 목록 영역 -->
      <section class="grid grid-cols-12 gap-4">
        <FreeBoardListItem v-for="post in filteredPosts" :key="post._id" :post="post" />
      </section>
    </main>
    <BasicFooter />
  </div>
</template>

<style scoped></style>
