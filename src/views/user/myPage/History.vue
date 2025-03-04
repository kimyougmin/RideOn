<script setup>
import { ref, computed } from 'vue'
import TrashIcon from './components/TrashIcon.vue'
import HeartIcon from './components/HeartIcon.vue'

const truncateText = (text, limit) => {
  if (!text) return ''
  return text.length > limit ? text.slice(0, limit) + '...' : text
}

// 샘플 데이터 (게시글)
const posts = ref([
  {
    id: 1,
    category: '자유',
    title: '자전거로 에버레스트를 등반하다',
    content: '학교 선배님들이 저에게 자주 하던 말이었습니다...',
    likes: 3,
  },
  {
    id: 2,
    category: '자유',
    title: '첫 로드 자전거 구매 후기 🚴‍♂️',
    content: '드디어 첫 로드 자전거를 구매한 기념으로 후기 남깁니다...',
    likes: 10,
  },
  {
    id: 3,
    category: '팁',
    title: '자전거 체인 유지 보수법',
    content: '체인 오일 어떤 게 좋은지 아시나요?',
    likes: 5,
  },
  {
    id: 4,
    category: '후기',
    title: '자전거 여행: 제주도 한 바퀴',
    content: '제주도를 자전거로 한 바퀴 돌았습니다!',
    likes: 8,
  },
  {
    id: 5,
    category: '자유',
    title: '한강 야간 라이딩 후기 🚴‍♂️🌙',
    content:
      '어제 밤, 친구들과 함께 한강 야간 라이딩을 다녀왔습니다. 바람이 선선하게 불고 도로도 한산해서 정말 기분 좋게 달릴 수 있었어요. 여의도에서 시작해서 뚝섬까지 왕복 20km 정도를 달렸는데, 중간중간 강바람 맞으며 쉬는 시간도 좋았어요. 특히, 반포대교 근처에서 보는 야경은 정말 환상적이었습니다! 다음에는 더 많은 코스를 도전해보고 싶네요. 혹시 추천해주실만한 야간 라이딩 코스 있나요? 🙂',
    likes: 27,
  },
])

// 샘플 데이터 (질문)
const questions = ref([
  {
    id: 1,
    category: '질문',
    title: '자전거 프레임은 어떤걸 써야하나요?',
    content: '알루미늄 vs 카본',
    likes: 1,
  },
  {
    id: 2,
    category: '질문',
    title: '중고 자전거 부품 구매할 때 주의해야 할 점이 있나요?',
    content: '스크래치, 프레임 균열 확인이 필수인가요?',
    likes: 14,
  },
  {
    id: 3,
    category: '질문',
    title: '자전거 브레이크 패드 교체 주기?',
    content: '브레이크 패드 언제 갈아줘야 하나요?',
    likes: 7,
  },
  {
    id: 4,
    category: '질문',
    title: '가성비 좋은 자전거 추천 부탁드립니다.',
    content: '예산 100만 원으로 괜찮은 자전거 있을까요?',
    likes: 3,
  },
])

// 더보기 기능: 게시글과 질문 각각 별도의 개수 상태 사용
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

// **게시글 삭제**
const deletePost = (id) => {
  alert('클릭 되었습니다')
  posts.value = posts.value.filter((post) => post.id !== id)
}

// 질문 삭제 임시
const deleteQuestion = (id) => {
  alert('삭제 되었습니다')
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
      <p class="text-lg font-bold text-black9 dark:text-black1 flex items-center gap-2 mb-4">
        작성한 게시글 ✍️
        <span class="text-lg">({{ displayedPosts.length }})</span>
      </p>

      <div
        v-for="post in displayedPosts"
        :key="post.id"
        class="w-[800px] h-[165px] border p-5 rounded-lg shadow-sm bg-black1 dark:bg-black8 mt-4 relative"
      >
        <!-- 삭제 아이콘 -->
        <button @click="deletePost(post.id)" class="absolute top-5 right-5">
          <TrashIcon class="w-5 h-5 cursor-pointer dark:text-black1" />
        </button>

        <!-- 카테고리, 제목, 하트와 숫자 (baseline 정렬) -->
        <div class="flex items-baseline">
          <!-- 채널 (카테고리) -->
          <span
            :class="post.category === '질문' ? 'text-[#1A9EFE]' : 'text-[#F85900]'"
            class="text-lg font-bold mr-2"
          >
            {{ post.category }}
          </span>
          <!-- 제목 -->
          <p class="text-lg font-bold text-black9 dark:text-black1 mr-2">
            {{ post.title }}
          </p>
          <!-- 좋아요 (하트와 숫자) -->
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

    <div class="mt-6">
      <p class="text-lg font-bold text-black9 dark:text-black1 flex items-center gap-2 mb-4">
        작성한 질문 ❓
        <span class="text-lg">({{ displayedQuestions.length }})</span>
      </p>

      <div
        v-for="question in displayedQuestions"
        :key="question.id"
        class="w-[800px] h-[165px] border p-5 rounded-lg shadow-sm bg-black1 dark:bg-black8 mt-4 relative"
      >
        <button @click="deleteQuestion(question.id)" class="absolute top-5 right-5">
          <TrashIcon class="w-5 h-5 cursor-pointer dark:text-black1" />
        </button>

        <div class="flex items-baseline mb-2">
          <span class="text-lg font-bold mr-2 text-[#1A9EFE]">
            {{ question.category }}
          </span>
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

      <div v-if="hasMoreQuestions" class="flex justify-center mt-4">
        <button
          @click="loadMoreQuestions"
          class="w-[300px] h-[56px] mt-[40px] border rounded-lg font-semibold bg-black10 text-black1 dark:bg-black1 dark:text-black7 dark:border-black4 hover:bg-primaryRed hover:text-black1"
        >
          더보기
        </button>
      </div>
    </div>
  </section>
</template>