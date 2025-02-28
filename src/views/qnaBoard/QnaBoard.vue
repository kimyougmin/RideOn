<script setup>
import BasicHeader from '@/components/BasicHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
import { ref } from 'vue'
import QnaListItem from './components/QnaListItem.vue'
import QnaBoardHeader from './components/QnaBoardHeader.vue'
import QnaFilterMenu from './components/QnaFilterMenu.vue'
import TopWriters from './components/TopWriters.vue'
import KeywordSearch from '@/components/search/KeywordSearch.vue'
import TagSearch from '@/components/search/TagSearch.vue'

const selectedSort = ref('latest')
const selectedFilter = ref('all')

const searchKeyword = ref('')
const searchTags = ref([])

const handleKeywordSearch = (keyword) => {
  // 검색 로직 구현
  console.log('검색어:', keyword)
  console.log('태그:', searchTags.value)
}

const DUMMY_QNAS = [
  {
    id: 1,
    title: '리엑토5000 멕라렌 휠셋브랜드 추천',
    content:
      '이제 60림으로 휠셋은 정했는데 이떤 브랜드 할지 고민이네요. 아비바브가 어울려보이기 한데 다른 브랜드도 있나요?',
    tags: ['휠셋', '멕라렌', '아비바브', '브랜드'],
    author: {
      fullName: '감자머리',
      profileImage: 'https://placehold.co/50x50',
    },
    createdAt: '2025-02-27',
    comments: [
      {
        content: '네, 아비바브가 어울려보이기 한데 다른 브랜드도 있나요?',
        author: {
          fullName: 'John Doe',
          profileImage: 'https://placehold.co/50x50',
        },
        createdAt: '2025-02-27',
      },
    ],
    views: 72,
    like: 100,
    isSolved: false,
  },
  {
    id: 2,
    title: '자전거 프레임 사이즈 고민입니다',
    content: '키 175cm인데 54사이즈와 56사이즈 중 고민이에요. 어떤 걸 선택하는 게 좋을까요?',
    tags: ['프레임', '사이즈', '초보'],
    author: {
      fullName: '바이크러버',
      profileImage: 'https://placehold.co/50x50',
    },
    createdAt: '2025-02-26',
    comments: [],
    views: 45,
    like: 23,
    isSolved: true,
  },
  {
    id: 3,
    title: '첫 로드바이크 구매 조언 부탁드립니다',
    content: '예산 300만원으로 첫 로드바이크 구매하려고 합니다. 추천 부탁드려요!',
    tags: ['구매', '로드바이크', '입문'],
    author: {
      fullName: '뉴비라이더',
      profileImage: 'https://placehold.co/50x50',
    },
    createdAt: '2025-02-25',
    comments: [],
    views: 128,
    like: 56,
    isSolved: false,
  },
  {
    id: 4,
    title: '클리트 위치 조정 문의',
    content: '페달링 시 무릎 통증이 있는데 클리트 위치 조정이 필요할까요?',
    tags: ['클리트', '페달링', '자세'],
    author: {
      fullName: '라이딩고수',
      profileImage: 'https://placehold.co/50x50',
    },
    createdAt: '2025-02-24',
    comments: [],
    views: 89,
    like: 34,
    isSolved: true,
  },
  {
    id: 5,
    title: '겨울철 라이딩 장비 추천',
    content: '겨울철 라이딩을 위한 필수 장비 추천 부탁드립니다.',
    tags: ['겨울라이딩', '장비', '의류'],
    author: {
      fullName: '동계라이더',
      profileImage: 'https://placehold.co/50x50',
    },
    createdAt: '2025-02-23',
    comments: [],
    views: 156,
    like: 78,
    isSolved: false,
  },
]

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
</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <BasicHeader />
    <QnaBoardHeader />
    <section class="w-[1440px] px-[198px] mx-auto pt-10 grid grid-cols-10 gap-6 mb-12 items-start">
      <!-- 질문 게시판 - 좌측 영역 -->
      <article class="col-span-2 flex flex-col gap-4">
        <QnaFilterMenu v-model="selectedFilter" />
        <TopWriters :writers="DUMMY_WRITERS" />
      </article>

      <!-- 질문 게시판 - 가운데 영역 -->
      <article class="col-span-6 flex flex-col gap-6">
        <!-- 검색 영역 -->
        <section class="flex flex-col gap-4">
          <KeywordSearch v-model="searchKeyword" @search="handleKeywordSearch" />
          <TagSearch v-model="searchTags" />
        </section>

        <!-- 정렬 옵션 & 글쓰기 버튼 -->
        <section class="flex items-center justify-between">
          <div class="flex gap-4 text-sub-body1">
            <button
              class="text-black10 dark:text-black1"
              :class="{ 'font-bold': selectedSort === 'latest' }"
              @click="selectedSort = 'latest'"
            >
              최신순
            </button>
            <button
              class="text-black10 dark:text-black1"
              :class="{ 'font-bold': selectedSort === 'popular' }"
              @click="selectedSort = 'popular'"
            >
              인기순
            </button>
            <button
              class="text-black10 dark:text-black1"
              :class="{ 'font-bold': selectedSort === 'views' }"
              @click="selectedSort = 'views'"
            >
              조회순
            </button>
          </div>
          <router-link to="/qnaBoard/write" class="bg-black6 px-6 py-2 rounded text-black1"
            >글쓰기</router-link
          >
        </section>

        <!-- 질문 게시판 목록 -->
        <ul class="flex flex-col list-none p-0 items-start">
          <QnaListItem v-for="qna in DUMMY_QNAS" :key="qna.id" :qna="qna" />
        </ul>
      </article>

      <!-- 질문 게시판 - 우측 영역 -->
      <article class="col-span-2"></article>
    </section>
    <BasicFooter />
  </div>
</template>

<style scoped></style>
