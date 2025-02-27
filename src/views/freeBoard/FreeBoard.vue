<script setup>
import BasicFooter from '@/components/BasicFooter.vue'
import BasicHeader from '@/components/BasicHeader.vue'
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
</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <BasicHeader />
    <main class="w-[1440px] px-[93px] mx-auto pt-10 flex flex-col gap-8">
      <h2 class="text-3xl font-bold text-black9 dark:text-black1">자유게시판</h2>

      <!-- 검색 영역 -->
      <section class="flex flex-col gap-4">
        <article class="flex gap-4 items-stretch dark:bg-black8">
          <div class="flex items-center gap-2 border border-black4 px-4 py-3 rounded-md">
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
            class="w-32 font-bold bg-black8 py-4 rounded-md text-black1 dark:bg-black1 dark:text-black9"
          >
            검색
          </button>
        </article>
        <article class="flex gap-4 items-stretch dark:bg-black8">
          <div class="flex items-center gap-2 border border-black4 px-4 py-3 rounded-md">
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
                class="bg-black2 text-black10 px-2 py-1 rounded-md dark:bg-black7 dark:text-black1"
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
            class="w-32 bg-black2 py-4 rounded-md text-black9 dark:bg-black7 dark:text-black1"
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
        <button class="bg-black6 px-6 py-2 rounded-md text-black1">글쓰기</button>
      </section>

      <!-- 게시글 목록 영역 -->
      <section class="grid grid-cols-12 gap-4">
        <article class="col-span-3 flex flex-col shadow-md rounded-lg overflow-hidden">
          <div class="flex items-center gap-2 rounded-t-lg overflow-hidden">
            <img
              src="https://placehold.co/300x200?text=RideOn"
              alt="placeholder"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex flex-col gap-2 p-4">
            <h3 class="font-bold">최고의 자전거 찾기</h3>
            <p class="text-sm line-clamp-3 mb-8">
              자전거에 입문한지 30년째.. 이제는 자전거를 보내줘야 할 때가 온 것 같다. 바퀴가 헛돌고
              핸들도 녹이 슬었다. 새로운 친구를 만나러 시장에 간다..
            </p>
            <div class="flex items-center gap-2">
              <div class="w-5 h-5 rounded-full overflow-hidden">
                <img
                  src="https://placehold.co/20x20?text=RideOn"
                  alt="placeholder"
                  class="w-full h-full object-cover"
                />
              </div>
              <span class="text-sm">작성자 이름</span>
            </div>
          </div>
        </article>
      </section>
    </main>
    <BasicFooter />
  </div>
</template>

<style scoped></style>
