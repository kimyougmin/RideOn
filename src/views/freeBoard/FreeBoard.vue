<script setup>
import BasicFooter from '@/components/BasicFooter.vue'
import BasicHeader from '@/components/BasicHeader.vue'
import FreeBoardListItem from './components/FreeBoardListItem.vue'
import { ref } from 'vue'

const tags = ref([])
const tagInput = ref('')
const selectedSort = ref('latest')

const addTag = (e) => {
  if (e.key === 'Enter' && tagInput.value.trim()) {
    tags.value.push(tagInput.value.trim())
    tagInput.value = ''
  }
}

const removeTag = (index) => {
  tags.value.splice(index, 1)
}

const handleKeydown = (e) => {
  if (e.key === 'Backspace' && tagInput.value === '' && tags.value.length > 0) {
    tags.value.pop()
  }
}

const resetFilters = () => {
  tags.value = []
  tagInput.value = ''
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
        <article class="flex gap-4 items-stretch dark:bg-black8">
          <div class="flex items-center gap-2 border border-black4 px-4 py-3 rounded">
            <label for="keyword_search"
              ><svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 14L19 19"
                  stroke="black-10"
                  class="stroke-black10 dark:stroke-black1"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3 9.5C3 13.0899 5.91015 16 9.5 16C11.2981 16 12.9256 15.27 14.1023 14.0901C15.275 12.9143 16 11.2918 16 9.5C16 5.91015 13.0899 3 9.5 3C5.91015 3 3 5.91015 3 9.5Z"
                  stroke="black-10"
                  class="stroke-black10 dark:stroke-black1"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </label>
            <input
              type="text"
              id="keyword_search"
              class="outline-none bg-transparent dark:caret-black1 dark:text-black1"
              placeholder="제목, 내용, 작성자명으로 검색"
            />
          </div>
          <button
            class="w-32 font-bold bg-black8 py-4 rounded text-black1 dark:bg-black1 dark:text-black9"
          >
            검색
          </button>
        </article>
        <article class="flex gap-4 items-stretch dark:bg-black8">
          <div class="flex items-center gap-2 border border-black4 px-4 py-3 rounded">
            <label for="tag_search">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.33333 3.5L5 18.5"
                  stroke="black-10"
                  class="stroke-black10 dark:stroke-black1"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M17.083 14.334H2.08301"
                  stroke="black-10"
                  class="stroke-black10 dark:stroke-black1"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M18.333 6.83398H3.33301"
                  stroke="black-10"
                  class="stroke-black10 dark:stroke-black1"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M15.0003 3.5L11.667 18.5"
                  stroke="black-10"
                  class="stroke-black10 dark:stroke-black1"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </label>
            <div class="flex flex-wrap gap-2 items-center">
              <span
                v-for="(tag, index) in tags"
                :key="index"
                class="bg-black2 text-black10 px-2 py-1 rounded dark:bg-black7 dark:text-black1"
              >
                {{ tag }}
                <button @click="removeTag(index)" class="text-sm">&times;</button>
              </span>
              <input
                v-model="tagInput"
                type="text"
                id="tag_search"
                @keyup.enter="addTag"
                @keydown="handleKeydown"
                class="py-1 outline-none bg-transparent dark:caret-black1 dark:text-black1 flex-1"
                placeholder="태그로 검색해보세요!"
              />
            </div>
          </div>
          <button
            class="w-32 bg-black2 py-4 rounded text-black9 dark:bg-black7 dark:text-black1"
            @click="resetFilters"
          >
            <div class="flex items-center justify-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.9321 6.66797C16.6461 3.72479 13.7094 1.66797 10.2921 1.66797C5.97106 1.66797 2.4181 4.95687 2 9.16797"
                  stroke="black-10"
                  class="stroke-black10 dark:stroke-black1"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.459 6.66667H18.1256C18.4018 6.66667 18.6257 6.44281 18.6257 6.16667V2.5"
                  stroke="black-10"
                  class="stroke-black10 dark:stroke-black1"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.69336 13.332C3.97929 16.2752 6.91609 18.332 10.3333 18.332C14.6544 18.332 18.2074 15.0431 18.6255 10.832"
                  stroke="black-10"
                  class="stroke-black10 dark:stroke-black1"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.16667 13.332H2.5C2.22386 13.332 2 13.5559 2 13.832V17.4987"
                  stroke="black-10"
                  class="stroke-black10 dark:stroke-black1"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span class="font-bold">초기화</span>
            </div>
          </button>
        </article>
      </section>

      <!-- 정렬 옵션 & 글쓰기 버튼 -->
      <section class="flex justify-between">
        <div class="flex gap-4 font-light">
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
