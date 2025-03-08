<script setup>
import { ref, onMounted } from 'vue'
import { searchNews, searchBlog } from '@/apis/naverApis'

const newsItems = ref([])
const blogItems = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

const fetchNewsAndBlog = async () => {
  try {
    isLoading.value = true

    // 뉴스와 블로그 데이터를 병렬로 가져옴
    const [newsData, blogData] = await Promise.all([
      searchNews('자전거', 5, 1, 'date'),
      searchBlog('자전거', 5, 1, 'date'),
    ])

    // 데이터 가공 (HTML 태그 제거 및 엔티티 코드 변환)
    newsItems.value = newsData.map((item) => ({
      ...item,
      title: decodeHtmlEntities(removeHtmlTags(item.title)),
      description: decodeHtmlEntities(removeHtmlTags(item.description)),
    }))

    blogItems.value = blogData.map((item) => ({
      ...item,
      title: decodeHtmlEntities(removeHtmlTags(item.title)),
      description: decodeHtmlEntities(removeHtmlTags(item.description)),
    }))
  } catch (error) {
    console.error('뉴스/블로그 데이터 로딩 실패:', error)
    errorMessage.value = '데이터를 불러오는 중 오류가 발생했습니다.'
  } finally {
    isLoading.value = false
  }
}

// HTML 태그 제거 함수
const removeHtmlTags = (text) => {
  return text.replace(/<[^>]*>/g, '')
}

// HTML 엔티티 코드 변환 함수
const decodeHtmlEntities = (text) => {
  const textArea = document.createElement('textarea')
  textArea.innerHTML = text
  return textArea.value
}

// 날짜 포맷 함수
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

onMounted(() => {
  fetchNewsAndBlog()
})
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col gap-4 mb-[50px]">
      <h3 class="text-3xl text-primaryRed font-bold">Cycling News</h3>
      <h2 class="text-4xl font-bold dark:text-black1 leading-tight">
        최신 자전거 뉴스 & 트렌드를 한눈에!
      </h2>
      <!-- <p class="text-sub-title m-0 dark:text-black1">
          라이딩에 필요한 모든 것! 최적의 경로, 실시간 날씨, 그리고 함께할 라이더까지 RideOn에서
          찾으세요.
        </p> -->
    </div>

    <div v-if="isLoading" class="flex justify-center items-center h-40">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="errorMessage" class="text-center text-red-500 py-8">
      {{ errorMessage }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 뉴스 섹션 -->
      <div class="bg-white dark:bg-black8 drop-shadow-custom2 p-6 border-t-4 border-primaryRed">
        <h3 class="text-2xl font-bold mb-8 text-primaryRed flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
            />
          </svg>

          자전거 뉴스
          <span class="ml-2 text-sm font-normal bg-primaryRed text-white px-3 py-1 rounded-full"
            >최신</span
          >
        </h3>
        <ul class="flex flex-col gap-4 list-none p-0">
          <li
            v-for="(item, index) in newsItems"
            :key="index"
            class="border-b border-gray-200 dark:border-black7 last:border-0 hover:bg-gray-50 dark:hover:bg-black7 p-2 rounded transition-colors"
          >
            <a
              :href="item.link"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primaryRed dark:text-gray-200 dark:hover:text-primaryRed flex flex-col"
            >
              <h4 class="font-medium flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-primaryRed"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>{{ item.title }}</span>
              </h4>
              <p class="text-body1 text-gray-600 dark:text-gray-400 truncate m-0 mb-2 mt-1 ml-6">
                {{ item.description }}
              </p>
              <div class="text-body2 text-gray-500 mt-1 ml-6">{{ formatDate(item.pubDate) }}</div>
            </a>
          </li>
        </ul>
      </div>

      <!-- 블로그 섹션 -->
      <div class="bg-white dark:bg-black8 drop-shadow-custom2 p-6 border-t-4 border-blue-500">
        <h3 class="text-2xl font-bold mb-8 text-blue-500 flex items-center">
          <svg
            width="24px"
            height="24px"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#000000"
            class="mr-3"
          >
            <path
              d="M5 19C7.20914 19 9 17.2091 9 15C9 12.7909 7.20914 11 5 11C2.79086 11 1 12.7909 1 15C1 17.2091 2.79086 19 5 19Z"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-blue-500"
            ></path>
            <path
              d="M8.5 7.5L14.5 7.5M19 15L15 7.5L14.5 7.5M14.5 7.5L16.5 4.5M16.5 4.5L14 4.5M16.5 4.5L18.5 4.5"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-blue-500"
            ></path>
            <path
              d="M5 15L8.5 7.5L12 14L15 14"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-blue-500"
            ></path>
            <path
              d="M8.5 7.5C8.16667 6.5 7 4.5 5 4.5"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-blue-500"
            ></path>
            <path
              d="M19 19C21.2091 19 23 17.2091 23 15C23 12.7909 21.2091 11 19 11C16.7909 11 15 12.7909 15 15C15 17.2091 16.7909 19 19 19Z"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-blue-500"
            ></path>
          </svg>
          자전거 블로그
          <span class="ml-2 text-sm font-normal bg-blue-500 text-white px-3 py-1 rounded-full"
            >인기</span
          >
        </h3>
        <ul class="flex flex-col gap-4 list-none p-0">
          <li
            v-for="(item, index) in blogItems"
            :key="index"
            class="border-b border-gray-200 dark:border-black7 last:border-0 hover:bg-gray-50 dark:hover:bg-black7 p-2 rounded transition-colors"
          >
            <a
              :href="item.link"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 flex flex-col"
            >
              <h4 class="font-medium flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                  />
                </svg>

                <span>{{ item.title }}</span>
              </h4>
              <p class="text-body1 text-gray-600 dark:text-gray-400 truncate m-0 mb-2 mt-1 ml-6">
                {{ item.description }}
              </p>
              <div class="text-body2 text-gray-500 mt-1 ml-6">{{ item.bloggername }}</div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>
