<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getUserApi } from '@/apis/auth'
import { deletePostApi } from '@/apis/posts'
import TrashIcon from './components/TrashIcon.vue'
import HeartIcon from './components/HeartIcon.vue'
import EditIcon from './components/Edit.vue'
import AlertComponent from './components/Alert.vue'

const router = useRouter()
const route = useRoute()

const showAlert = ref(false)
const alertType = ref('success')
const alertMessage = ref('')

const handleAlertClose = () => {
  showAlert.value = false
}

// HTML 태그 제거 함수 추가
const removeHtmlTags = (text) => {
  if (!text) return ''
  return text.replace(/<\/?[^>]+(>|$)/g, '')
}

// truncateText 함수 수정
const truncateText = (text, limit) => {
  if (!text) return ''
  const cleanText = removeHtmlTags(text)
  return cleanText.length > limit ? cleanText.slice(0, limit) + '...' : cleanText
}

// 게시판 ID와 게시판 이름 고정 (채널 _id 기준)
const channelIdToPathMap = {
  '67c69541086c304511bcb6f7': 'freeBoardDetail',
  '67c6954d086c304511bcb6fb': 'qnaBoard/detail',
  '67c69538086c304511bcb6f3': 'riderCrewBoardDetail',
}

const posts = ref([])
const questions = ref([])
const postDetail = ref(null)
const userId = ref(null)
const crewPosts = ref([])

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

// 기존 사용자 게시물 목록 불러오기
const loadUserPosts = async () => {
  if (!userId.value) {
    console.error('유저 ID가 없습니다.')
    return
  }
  try {
    const response = await getUserApi(userId.value)
    if (!response.data || !Array.isArray(response.data.posts)) {
      console.error('데이터에서 posts 필드를 찾을 수 없습니다.')
      return
    }
    const userData = response.data
    userData.posts = userData.posts || []

    posts.value = userData.posts
      .filter((post) => {
        const channelId = typeof post.channel === 'object' ? post.channel._id : post.channel
        return channelId in channelIdToPathMap && channelIdToPathMap[channelId] === 'freeBoardDetail'
      })
      .map((post) => {
        let parsedTitle = {}
        try {
          parsedTitle = JSON.parse(post.title)
        } catch (e) {
          console.error(e)
          parsedTitle = { title: post.title, content: post.content || '' }
        }
        return {
          id: post._id,
          title: parsedTitle.title,
          content: parsedTitle.content,
          likes: post.likes?.length || 0,
          image: post.image || '',
          createdAt: post.createdAt,
          channel: typeof post.channel === 'object' ? post.channel._id : post.channel,
        }
      })
      .filter(Boolean)

    questions.value = userData.posts
      .filter((post) => {
        const channelId = typeof post.channel === 'object' ? post.channel._id : post.channel
        return channelId in channelIdToPathMap && channelIdToPathMap[channelId] === 'qnaBoard/detail'
      })
      .map((post) => {
        let parsedTitle = {}
        try {
          parsedTitle = JSON.parse(post.title)
        } catch (e) {
          console.error(e)
          parsedTitle = { title: post.title, content: post.content || '' }
        }
        return {
          id: post._id,
          title: parsedTitle.title,
          content: parsedTitle.content,
          likes: post.likes?.length || 0,
          image: post.image || '',
          createdAt: post.createdAt,
          channel: typeof post.channel === 'object' ? post.channel._id : post.channel,
        }
      })
      .filter(Boolean)

    crewPosts.value = userData.posts
      .filter((post) => {
        const channelId = typeof post.channel === 'object' ? post.channel._id : post.channel
        return channelId in channelIdToPathMap && channelIdToPathMap[channelId] === 'riderCrewBoardDetail'
      })
      .map((post) => {
        let parsedTitle = {}
        try {
          parsedTitle = JSON.parse(post.title)
        } catch (e) {
          console.error(e)
          parsedTitle = { title: post.title, content: post.content || '' }
        }
        return {
          id: post._id,
          title: parsedTitle.title,
          content: parsedTitle.content,
          likes: post.likes?.length || 0,
          image: post.image || '',
          createdAt: post.createdAt,
          channel: typeof post.channel === 'object' ? post.channel._id : post.channel,
        }
      })
      .filter(Boolean)
  } catch (error) {
    console.error('해당 게시물을 불러올 수 없습니다', error)
  }
}

// 특정 게시물의 상세 정보를 불러오는 함수 (getUserApi를 활용)
const fetchPostDetail = async (targetPostId) => {
  if (!userId.value) {
    console.error('유저 ID가 없습니다.')
    return
  }
  try {
    const response = await getUserApi(userId.value)
    if (!response.data || !Array.isArray(response.data.posts)) {
      console.error('데이터에서 posts 필드를 찾을 수 없습니다.')
      return
    }
    const userData = response.data
    const foundPost = userData.posts.find(post => post._id === targetPostId)
    if (foundPost) {
      let parsedTitle = {}
      try {
        parsedTitle = JSON.parse(foundPost.title)
      } catch (e) {
        console.error(e)
        parsedTitle = { title: foundPost.title, content: foundPost.content || '' }
      }
      postDetail.value = {
        id: foundPost._id,
        title: parsedTitle.title,
        content: parsedTitle.content,
        likes: foundPost.likes?.length || 0,
        image: foundPost.image || '',
        createdAt: foundPost.createdAt,
        channel: typeof foundPost.channel === 'object' ? foundPost.channel._id : foundPost.channel,
      }
    } else {
      postDetail.value = null
    }
  } catch (e) {
    console.error('상세 데이터 불러오기 실패:', e)
  }
}

// 게시물 상세 페이지로 이동하는 함수
const goToPostDetail = (postId, channel) => {
  const channelId = typeof channel === 'object' ? channel._id : channel
  if (!channelIdToPathMap[channelId]) {
    console.error('잘못된 경로 입니다 다시 시도해주세요', channel)
    return
  }
  const boardPath = channelIdToPathMap[channelId]
  router.push(`/${boardPath}/${postId}`)
}

// 자유게시판 수정
const goToEdit = (postId) => {
  router.push(`/freeBoard/edit/${postId}`)
}

// 질문게시판 수정
const goToQnaEdit = (postId) => {
  router.push(`/qnaBoard/edit/${postId}`)
}

// 모집글 수정
const goToCrewEdit = (postId) => {
  router.push(`/riderCrewBoard/edit/${postId}`)
}

onMounted(() => {
  loadUserId()
  loadUserPosts()
  // 만약 URL에 postId가 있다면 상세 데이터를 불러옴
  if (route.params.postId) {
    fetchPostDetail(route.params.postId)
  }
})

// URL 변경 시 상세 데이터 재요청 (상세 페이지인 경우)
watch(() => route.params.postId, (newPostId, oldPostId) => {
  if (newPostId !== oldPostId) {
    fetchPostDetail(newPostId)
  }
})

const itemsPerPagePosts = ref(2)
const itemsPerPageQuestions = ref(2)
const itemsPerPageCrewPosts = ref(2)

const displayedPosts = computed(() => posts.value.slice(0, itemsPerPagePosts.value))
const displayedQuestions = computed(() => questions.value.slice(0, itemsPerPageQuestions.value))
const displayedCrewPosts = computed(() => crewPosts.value.slice(0, itemsPerPageCrewPosts.value))

const hasMorePosts = computed(() => itemsPerPagePosts.value < posts.value.length)
const hasMoreQuestions = computed(() => itemsPerPageQuestions.value < questions.value.length)
const hasMoreCrewPosts = computed(() => itemsPerPageCrewPosts.value < crewPosts.value.length)
const loadMorePosts = () => {
  itemsPerPagePosts.value += 2
}

const loadMoreQuestions = () => {
  itemsPerPageQuestions.value += 2
}

const loadMoreCrewPosts = () => {
  itemsPerPageCrewPosts.value += 2
}

// 게시글 삭제 기능 
const deletePost = async (id) => {
  if (!confirm("게시글을 정말 삭제하시겠습니까?")) {
    return; 
  }
  try {
    const userString = localStorage.getItem('user')
    if (!userString) {
      throw new Error('로컬 스토리지에 user 정보가 없습니다.')
    }
    const userObj = JSON.parse(userString)
    const rawToken = userObj.token // userObj.token이 실제 토큰 문자열
    if (!rawToken) {
      throw new Error('user 객체에 token이 없습니다.')
    }
    // Bearer 접두사 붙이기
    const token = rawToken.startsWith('Bearer ') ? rawToken : `Bearer ${rawToken}`
    await deletePostApi(id, token)
    alertType.value = 'success'
    alertMessage.value = '게시글이 삭제되었습니다.'
    showAlert.value = true
    posts.value = posts.value.filter((post) => post.id !== id)
  } catch (error) {
    console.error('게시글 삭제 실패:', error)
    alertType.value = 'error'
    alertMessage.value = '게시글 삭제에 실패했습니다.'
    showAlert.value = true
  }
}

// 질문 삭제 기능 
const deleteQuestion = async (id) => {
  if (!confirm("질문을 정말 삭제하시겠습니까?")) {
    return; 
  }
  try {
    const userString = localStorage.getItem('user')
    if (!userString) {
      throw new Error('로컬 스토리지에 user 정보가 없습니다.')
    }
    const userObj = JSON.parse(userString)
    const rawToken = userObj.token
    if (!rawToken) {
      throw new Error('user 객체에 token이 없습니다.')
    }
    const token = rawToken.startsWith('Bearer ') ? rawToken : `Bearer ${rawToken}`
    await deletePostApi(id, token)
    alertType.value = 'success'
    alertMessage.value = '질문이 삭제되었습니다.'
    showAlert.value = true
    questions.value = questions.value.filter((question) => question.id !== id)
  } catch (error) {
    console.error('질문 삭제 실패:', error)
    alertType.value = 'error'
    alertMessage.value = '질문 삭제에 실패했습니다.'
    showAlert.value = true
  }
}

// 모집글 삭제 기능 

const deleteCrewPost = async (id) => {
  if (!confirm('모집글을 정말 삭제하시겠습니까?')) return
  try {
    const userString = localStorage.getItem('user')
    if (!userString) {
      throw new Error('로컬 스토리지에 user 정보가 없습니다.')
    }
    const userObj = JSON.parse(userString)
    const rawToken = userObj.token
    if (!rawToken) {
      throw new Error('user 객체에 token이 없습니다.')
    }
    const token = rawToken.startsWith('Bearer ') ? rawToken : `Bearer ${rawToken}`
    
    await deletePostApi(id, token)
    crewPosts.value = crewPosts.value.filter(post => post.id !== id)
    alertType.value = 'success'
    alertMessage.value = '모집글이 삭제되었습니다.'
    showAlert.value = true
  } catch (error) {
    console.error('모집글 삭제 실패:', error)
    alertType.value = 'error'
    alertMessage.value = '모집글 삭제에 실패했습니다.'
    showAlert.value = true
  }
}


onMounted(() => {
  loadUserId()
  loadUserPosts()
})
</script>


<template>
  <section class="p-6 flex-grow">
    <!-- 만약 URL에 postId가 있으면 상세 페이지 표시 -->
    <div v-if="route.params.postId && postDetail">
      <h1 class="text-2xl font-bold">{{ postDetail.title }}</h1>
      <p class="mt-4">{{ postDetail.content }}</p>
      <p class="text-sm text-gray-500 mt-2">작성일: {{ postDetail.createdAt }}</p>
      <!-- 상세 페이지에서 목록으로 돌아가기 버튼 -->
      <button
        @click="router.push('/freeBoardDetail')"
        class="mt-4 px-4 py-2 border rounded-lg bg-black10 text-black1 dark:bg-black1 dark:text-black7"
      >
        목록으로
      </button>
    </div>

    <!-- 상세 게시물이 없으면 목록을 표시 -->
    <div v-else>
      <!-- 활동 내역 제목 -->
      <p class="text-2xl font-bold text-black9 dark:text-black1 mb-2">활동내역</p>
      <p class="text-sm text-black6 dark:text-black3 w-full max-w-[800px] leading-relaxed break-keep mb-8">
        내가 작성한 게시글과 질문들을 한눈에 확인할 수 있습니다. 작성한 글을 수정하거나 삭제할 수 있으며, 필요한 정보를 빠르게 찾아볼 수 있습니다. 내가 남긴 기록을 관리하며 커뮤니티에서 활발하게 소통해보세요!
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
          <button @click.stop="goToEdit(post.id)" class="absolute top-5 right-14">
            <EditIcon class="w-5 h-5 cursor-pointer dark:text-black1" />
          </button>
          <!-- 삭제 아이콘 -->
          <button @click.stop="deletePost(post.id)" class="absolute top-5 right-5">
            <TrashIcon class="w-5 h-5 cursor-pointer dark:text-black1" />
          </button>

          <!-- 카테고리, 제목, 하트와 숫자 -->
          <div class="flex items-baseline">
            <span class="text-lg font-bold text-[#F85900] mr-2">자유</span>
            <p class="text-lg font-bold text-black9 dark:text-black1 mr-2">
              {{ removeHtmlTags(post.title) }}
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
        <p class="text-lg font-bold text-black9 dark:text-black1 flex items-center gap-2 mb-4" :class="{ 'mt-[150px]': displayedQuestions.length === 0 }">
          작성한 질문 ❓
          <span class="text-lg">({{ displayedQuestions.length }})</span>
        </p>

        <div v-if="displayedQuestions.length === 0" class="text-black6 dark:text-black3 text-center mt-[100px]">
          작성한 질문이 없습니다.
        </div>

        <div
          v-for="question in displayedQuestions"
          :key="question.id"
          class="w-[800px] h-[165px] border p-5 rounded-lg shadow-sm bg-black1 dark:bg-black8 mt-4 relative"
        >
          <button @click.stop="goToQnaEdit(question.id)" class="absolute top-5 right-14">
            <EditIcon class="w-5 h-5 cursor-pointer dark:text-black1" />
          </button>
          <button @click.stop="deleteQuestion(question.id)" class="absolute top-5 right-5">
            <TrashIcon class="w-5 h-5 cursor-pointer dark:text-black1" />
          </button>

          <div class="flex items-baseline mb-2" @click="goToPostDetail(question.id, question.channel)">
            <span class="text-lg font-bold mr-2 text-[#1A9EFE]">질문</span>
            <p class="text-lg font-bold text-black9 dark:text-black1 mr-2">
              {{ removeHtmlTags(question.title) }}
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
        <div v-if="hasMoreQuestions" class="flex justify-center mt-4">
          <button
            @click="loadMoreQuestions"
            class="w-[300px] h-[56px] mt-[40px] border rounded-lg font-semibold bg-black10 text-black1 dark:bg-black1 dark:text-black7 dark:border-black4 hover:bg-primaryRed hover:text-black1"
          >
            더보기
          </button>
        </div>
      </div>

      <!-- 작성한 모집글 -->
      <div class="mt-6">
        <p class="text-lg font-bold text-black9 dark:text-black1 flex items-center gap-2 mb-4" :class="{ 'mt-[150px]': displayedCrewPosts.length === 0 }">
          작성한 모집글 🚲
          <span class="text-lg">({{ displayedCrewPosts.length }})</span>
        </p>

        <div v-if="displayedCrewPosts.length === 0" class="text-black6 dark:text-black3 text-center mt-[100px]">
          작성한 모집글이 없습니다.
        </div>

        <div
          v-for="crewPost in displayedCrewPosts"
          :key="crewPost.id"
          class="w-[800px] h-[165px] border p-5 rounded-lg shadow-sm bg-black1 dark:bg-black8 mt-4 relative"
        >
          <button @click.stop="goToCrewEdit(crewPost.id)" class="absolute top-5 right-14">
            <EditIcon class="w-5 h-5 cursor-pointer dark:text-black1" />
          </button>
          <button @click.stop="deleteCrewPost(crewPost.id)" class="absolute top-5 right-5">
            <TrashIcon class="w-5 h-5 cursor-pointer dark:text-black1" />
          </button>

          <div class="flex items-baseline mb-2" @click="goToPostDetail(crewPost.id, crewPost.channel)">
            <span class="text-lg font-bold mr-2 text-[#00B207]">모집</span>
            <p class="text-lg font-bold text-black9 dark:text-black1 mr-2">
              {{ removeHtmlTags(crewPost.title) }}
            </p>
            <span class="flex items-center">
              <HeartIcon class="w-4 h-4 cursor-pointer mr-1 dark:text-black1" />
              <span class="text-sm text-black7 dark:text-black1">{{ crewPost.likes || 0 }}</span>
            </span>
          </div>

          <p class="text-sm text-black7 dark:text-black3 mb-4 break-all">
            {{ truncateText(crewPost.content, 250) }}
          </p>
        </div>

        <div v-if="hasMoreCrewPosts" class="flex justify-center mt-4">
          <button
            @click="loadMoreCrewPosts"
            class="w-[300px] h-[56px] mt-[40px] border rounded-lg font-semibold bg-black10 text-black1 dark:bg-black1 dark:text-black7 dark:border-black4 hover:bg-primaryRed hover:text-black1"
          >
            더보기
          </button>
        </div>
      </div>
    </div>
  </section>
  <!-- alert -->
  <AlertComponent
    :type="alertType"
    :message="alertMessage"
    :visible="showAlert"
    @close="handleAlertClose"
  />
</template>
