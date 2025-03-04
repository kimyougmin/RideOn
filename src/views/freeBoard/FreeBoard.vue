<script setup>
import BasicFooter from '@/components/BasicFooter.vue'
import BasicHeader from '@/components/BasicHeader.vue'
import FreeBoardListItem from './components/FreeBoardListItem.vue'
import { ref } from 'vue'
import KeywordSearch from '@/components/search/KeywordSearch.vue'
import TagSearch from '@/components/search/TagSearch.vue'
import SortButtons from '@/components/search/SortButtons.vue'

const selectedSort = ref('latest')
const searchKeyword = ref('')
const searchTags = ref([])

const handleSearch = () => {
  // 검색 로직 구현
  console.log('검색어:', searchKeyword.value)
  console.log('태그:', searchTags.value)
}

const dummyPosts = [
  {
    id: 1,
    image: 'bicyclePageImage/trekBike.png',
    title: '자전거 입문자 장비 추천해주세요',
    content:
      '로드바이크를 시작하려고 하는데 초보자가 구매하기 좋은 자전거와 필수 장비 추천 부탁드립니다. 예산은 150만원 정도 생각하고 있어요.',
    views: 142,
    likes: 15,
    tags: ['로드바이크', '입문', '장비추천'],
    author: {
      fullName: '바이크초보',
      coverImage: 'https://placehold.co/20x20?text=RideOn',
    },
    createdAt: '2025-01-31T08:27:40.227Z',
  },
  {
    id: 2,
    image: 'bicyclePageImage/trekBike2.png',
    title: '한강 자전거길 후기',
    content:
      '어제 광나루에서 양화까지 한강 자전거길 다녀왔습니다. 벚꽃이 막 피기 시작해서 정말 예쁘네요. 주말에는 사람이 많으니 평일에 가시는 것을 추천드립니다.',
    views: 256,
    likes: 43,
    tags: ['한강', '라이딩코스', '후기'],
    author: {
      fullName: '달리는자전거',
      coverImage: 'https://placehold.co/20x20?text=RideOn',
    },
    createdAt: '2025-02-09T15:17:55.201Z',
  },
  {
    id: 3,
    image: 'https://placehold.co/300x200?text=RideOn',
    title: 'MTB 타이어 교체 문의',
    content:
      '산악자전거 타이어를 교체하려고 하는데 마라톤 플러스와 슈발베 중에서 고민됩니다. 어떤 게 더 좋을까요?',
    views: 89,
    likes: 12,
    tags: ['MTB', '타이어', '질문'],
    author: {
      fullName: '산악라이더',
      coverImage: 'https://placehold.co/20x20?text=RideOn',
    },
    createdAt: '2025-02-10T10:30:20.123Z',
  },
  {
    id: 4,
    image: 'https://placehold.co/300x200?text=RideOn',
    title: '주말 양평 라이딩 모임 공지',
    content:
      '이번 주말 양평 라이딩 함께하실 분 모집합니다. 아침 7시 양평역 집결, 총 80km 예상, 중간에 카페 휴식 있습니다.',
    views: 367,
    likes: 55,
    tags: ['모임', '양평', '라이딩'],
    author: {
      fullName: '라이딩모임장',
      coverImage: 'https://placehold.co/20x20?text=RideOn',
    },
    createdAt: '2025-02-11T12:45:30.123Z',
  },
  {
    id: 5,
    image: 'https://placehold.co/300x200?text=RideOn',
    title: '자전거 정비 꿀팁 공유',
    content:
      '체인 관리와 기어 조정 방법 공유드립니다. 정기적인 체인 청소와 윤활유 도포가 자전거 수명에 정말 중요합니다. 영상과 함께 설명드릴게요.',
    views: 498,
    likes: 125,
    tags: ['정비', '꿀팁', '체인관리'],
    author: {
      fullName: '정비의달인',
      coverImage: 'https://placehold.co/20x20?text=RideOn',
    },
    createdAt: '2025-02-12T14:20:45.123Z',
  },
]
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
        <FreeBoardListItem v-for="post in dummyPosts" :key="post.id" :post="post" />
      </section>
    </main>
    <BasicFooter />
  </div>
</template>

<style scoped></style>
