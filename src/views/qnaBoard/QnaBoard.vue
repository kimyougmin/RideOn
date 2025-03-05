<script setup>
import BasicHeader from '@/components/BasicHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
import { useQnaBoardStore } from '@/stores/qnaBoard'
import { ref, onMounted, computed } from 'vue'
import QnaListItem from './components/QnaListItem.vue'
import QnaBoardHeader from './components/QnaBoardHeader.vue'
import QnaFilterMenu from './components/QnaFilterMenu.vue'
import TopWriters from './components/TopWriters.vue'
import KeywordSearch from '@/components/search/KeywordSearch.vue'
import TagSearch from '@/components/search/TagSearch.vue'
import PopularTags from './components/PopularTags.vue'
import SortButtons from '@/components/search/SortButtons.vue'

const DUMMY_WRITERS = [
  {
    id: 1,
    fullName: '신짱구',
    profileImage: 'https://placehold.co/50x50',
    postCount: 20,
  },
  {
    id: 2,
    fullName: '김철수',
    profileImage: 'https://placehold.co/50x50',
    postCount: 15,
  },
  {
    id: 3,
    fullName: '한유리',
    profileImage: 'https://placehold.co/50x50',
    postCount: 10,
  },
]

const qnaBoardStore = useQnaBoardStore()
const searchKeyword = ref('')
const searchTags = ref([])
const selectedSort = ref('latest')
const selectedStatus = ref('all')

const filteredQnas = computed(() => {
  return qnaBoardStore.filterPosts(
    searchKeyword.value,
    searchTags.value,
    selectedSort.value === 'likes' ? 'mostLiked' : selectedSort.value,
    selectedStatus.value,
  )
})

onMounted(async () => {
  try {
    await qnaBoardStore.fetchPosts()
  } catch (error) {
    console.error('게시글 목록 조회 실패:', error)
  }
})
</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <BasicHeader />
    <QnaBoardHeader />
    <section class="w-[1440px] px-[198px] mx-auto pt-10 grid grid-cols-10 gap-6 mb-12 items-start">
      <!-- 질문 게시판 - 좌측 영역 -->
      <article class="col-span-2 flex flex-col gap-4">
        <QnaFilterMenu v-model="selectedStatus" />
        <TopWriters :writers="DUMMY_WRITERS" />
      </article>

      <!-- 질문 게시판 - 가운데 영역 -->
      <article class="col-span-6 flex flex-col gap-6">
        <!-- 검색 영역 -->
        <section class="flex flex-col gap-4">
          <KeywordSearch v-model="searchKeyword" />
          <TagSearch v-model="searchTags" />
        </section>

        <!-- 정렬 옵션 & 글쓰기 버튼 -->
        <section class="flex items-center justify-between">
          <SortButtons v-model="selectedSort" />
          <router-link to="/qnaBoard/write" class="bg-black6 px-6 py-2 rounded text-black1"
            >질문하기</router-link
          >
        </section>

        <!-- 질문 게시판 목록 -->
        <section class="flex flex-col items-start">
          <QnaListItem v-for="qna in filteredQnas" :key="qna.id" :qna="qna" />
        </section>
      </article>

      <!-- 질문 게시판 - 우측 영역 -->
      <article class="col-span-2">
        <PopularTags />
      </article>
    </section>
    <BasicFooter />
  </div>
</template>

<style scoped></style>
