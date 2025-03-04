<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUserApi } from '@/apis/auth'
import TrashIcon from './components/TrashIcon.vue'
import HeartIcon from './components/HeartIcon.vue'

const router = useRouter()

const truncateText = (text, limit) => {
  if (!text) return ''
  return text.length > limit ? text.slice(0, limit) + '...' : text
}

// 게시판 ID와 게시판 이름 고정
const channelIdToPathMap = {
  "67c69541086c304511bcb6f7": "freeBoardDetail",
  "67c69693086c304511bcb709": "qnaDetail"
}

const posts = ref([])
const questions = ref([])
const userId = ref(null)

const loadUserId = () => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      userId.value = JSON.parse(storedUser)._id
    } catch (error) {
      console.error('유저 ID 파싱 실패:', error)
    }
  }
}

// ✅ 유저 게시글 불러오기
const loadUserPosts = async () => {
  if (!userId.value) {
    console.error(' 유저 ID가 없습니다.')
    return
  }

  try {
    const response = await getUserApi(userId.value)

    if (!response.data || !Array.isArray(response.data.posts)) {
      console.error(' 데이터에서 posts 필드를 찾을 수 없습니다.')
      return
    }

    const userData = response.data
    userData.posts = userData.posts || []

    posts.value = userData.posts
      .filter(post => post.channel in channelIdToPathMap && channelIdToPathMap[post.channel] === "freeBoardDetail")
      .map(post => {
        try {
          const parsedTitle = JSON.parse(post.title)
          return {
            id: post._id,
            title: parsedTitle.title,
            content: parsedTitle.content,
            likes: post.likes?.length || 0,
            image: post.image || "",
            createdAt: post.createdAt,
            channel: post.channel
          }
        } catch (error) {
          console.error(`title 파싱 실패 (postId: ${post._id})`, error)
          return null
        }
      }).filter(Boolean)

    questions.value = userData.posts
      .filter(post => post.channel in channelIdToPathMap && channelIdToPathMap[post.channel] === "qnaDetail")
      .map(post => {
        try {
          const parsedTitle = JSON.parse(post.title)
          return {
            id: post._id,
            title: parsedTitle.title,
            content: parsedTitle.content,
            likes: post.likes?.length || 0,
            image: post.image || "",
            createdAt: post.createdAt,
            channel: post.channel
          }
        } catch (error) {
          console.error(` title 파싱 실패 (postId: ${post._id})`, error)
          return null
        }
      }).filter(Boolean)

  } catch (error) {
    console.error('해당 게시물을 불러올 수 없습니다', error)
  }
}

const goToPostDetail = (postId, channel) => {
  if (!channelIdToPathMap[channel]) {
    console.error('잘못된 경로 입니다 다시 시도해주세요', channel)
    return
  }
  const boardPath = channelIdToPathMap[channel]
  router.push(`/${boardPath}/${postId}`)
}

// 🔹 페이지 로드 시 실행
onMounted(() => {
  loadUserId()
  loadUserPosts()
})

const itemsPerPagePosts = ref(2)
const itemsPerPageQuestions = ref(2)

const displayedPosts = computed(() => posts.value.slice(0, itemsPerPagePosts.value))
const displayedQuestions = computed(() => questions.value.slice(0, itemsPerPageQuestions.value))

const hasMorePosts = computed(() => itemsPerPagePosts.value < posts.value.length)
const hasMoreQuestions = computed(() => itemsPerPageQuestions.value < questions.value.length)

const loadMorePosts = () => {
  itemsPerPagePosts.value += 2
}

const loadMoreQuestions = () => {
  itemsPerPageQuestions.value += 2
}

// 🔹 게시글 삭제 기능
const deletePost = (id) => {
  alert('게시글이 삭제되었습니다.')
  posts.value = posts.value.filter((post) => post.id !== id)
}

// 🔹 질문 삭제 기능
const deleteQuestion = (id) => {
  alert('질문이 삭제되었습니다.')
  questions.value = questions.value.filter((question) => question.id !== id)
}
</script>



<template>
  <section class="p-6 flex-grow">
    <!-- 활동 내역 제목 -->
    <p class="text-2xl font-bold text-black9 dark:text-black1 mb-2">활동내역</p>
    <p class="text-sm text-black6 dark:text-black3 w-full max-w-[800px] leading-relaxed break-keep mb-8">
      내가 작성한 게시글과 질문들을 한눈에 확인할 수 있습니다. 작성한 글을 수정하거나 삭제할 수 있으며,
      필요한 정보를 빠르게 찾아볼 수 있습니다. 내가 남긴 기록을 관리하며 커뮤니티에서 활발하게 소통해보세요!
    </p>

    <!-- 작성한 게시글 -->
    <div class="mb-12">
      <p class="text-lg font-bold text-black9 dark:text-black1 flex items-center gap-2 mb-4" @click="goToPostDetail(posts._id)">
        작성한 게시글 ✍️
        <span class="text-lg">({{ displayedPosts.length }})</span>
      </p>

      <div v-if="displayedPosts.length === 0" class="text-black6 dark:text-black3 text-center mt-[100px]">
        작성한 게시물이 없습니다.
      </div>

      <div
        v-for="post in displayedPosts"
        :key="post.id"
        @click="goToPostDetail(post.id, post.channel)"
        class="w-[800px] h-[165px] border p-5 rounded-lg shadow-sm bg-black1 dark:bg-black8 mt-4 relative"
      >
        <!-- 삭제 아이콘 -->
        <button @click="deletePost(post.id)" class="absolute top-5 right-5">
          <TrashIcon class="w-5 h-5 cursor-pointer dark:text-black1" />
        </button>

        <!-- 카테고리, 제목, 하트와 숫자 -->
        <div class="flex items-baseline">
          <span class="text-lg font-bold text-[#F85900] mr-2">자유</span>
          <p class="text-lg font-bold text-black9 dark:text-black1 mr-2">
            {{ post.title }}
          </p>
          <span class="flex items-center">
            <HeartIcon class="w-4 h-4 cursor-pointer mr-1 dark:text-black1" />
            <span class="text-sm text-black7 dark:text-black1">{{ post.likes || 0 }}</span>
          </span>
        </div>

        <p class="text-sm text-black7 dark:text-black3 mb-4 break-all">
          {{ truncateText(post.content, 250) }}
        </p>
      </div>

      <div v-if="hasMorePosts" class="flex justify-center mt-4">
        <button
          @click="loadMorePosts"
          class="w-[300px] h-[56px] mt-[40px] border rounded-lg font-semibold bg-black10 text-black1 dark:bg-black1 dark:text-black7 dark:border-black4 hover:bg-primaryRed hover:text-black1"
        >
          더보기
        </button>
      </div>
    </div>

    <!-- 작성한 질문 -->
    <div class="mt-6">
      <p class="text-lg font-bold text-black9 dark:text-black1 flex items-center gap-2 mb-4"
      :class="{ 'mt-[150px]': displayedQuestions.length === 0 }">
        작성한 질문 ❓
        <span class="text-lg">({{ displayedQuestions.length }})</span>
      </p>

      <div v-if="displayedQuestions.length === 0" class=" text-black6 dark:text-black3 text-center mt-[100px]">
        작성한 질문이 없습니다.
      </div>

      <div
        v-for="question in displayedQuestions"
        :key="question.id"
        class="w-[800px] h-[165px] border p-5 rounded-lg shadow-sm bg-black1 dark:bg-black8 mt-4 relative"
      >
        <button @click="deleteQuestion(question.id)" class="absolute top-5 right-5">
          <TrashIcon class="w-5 h-5 cursor-pointer dark:text-black1" />
        </button>

        <div class="flex items-baseline mb-2">
          <span class="text-lg font-bold mr-2 text-[#1A9EFE]">질문</span>
          <p class="text-lg font-bold text-black9 dark:text-black1 mr-2">
            {{ question.title }}
          </p>
          <span class="flex items-center">
            <HeartIcon class="w-4 h-4 cursor-pointer mr-1 dark:text-black1" />
            <span class="text-sm text-black7 dark:text-black1">{{ question.likes || 0 }}</span>
          </span>
        </div>

        <p class="text-sm text-black7 dark:text-black3 mb-4 break-all">
          {{ truncateText(question.content, 250) }}
        </p>
      </div>
    </div>
  </section>
</template>
