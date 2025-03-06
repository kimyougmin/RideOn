<script setup>
import BasicHeader from '@/components/BasicHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
import QnaContent from './components/QnaContent.vue'
import CommentForm from '@/components/comment/CommentForm.vue'
import CommentList from '@/components/comment/CommentList.vue'
import AuthorInfo from './components/AuthorInfo.vue'
import { useRoute, useRouter } from 'vue-router'
import { useQnaBoardStore } from '@/stores/qnaBoard'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { RIDEON_QNA_CHANNEL_ID } from '@/constants/channelId'
import ActionButtons from './components/ActionButtons.vue'

const DUMMY_QNA = {
  id: 1,
  title: '리엑토5000 멕라렌 휠셋브랜드 추천',
  content:
    '이제 60림으로 휠셋은 정했는데 이떤 브랜드 할지 고민이네요. 아비바브가 어울려보이기 한데 다른 브랜드도 있나요?',
  tags: ['휠셋', '멕라렌', '아비바브', '브랜드'],
  author: {
    fullName: '감자머리',
    profileImage: 'https://placehold.co/40x40?text=RideOn',
    postCount: 10,
  },
  createdAt: '2025-02-27',
  comments: [
    {
      id: 1,
      content:
        '도전하는 모습이 정말 멋지네요! 결국 중요한 건 어려운 게 아니라, 해낼 수 있느냐의 문제라는 말이 인상 깊어요. 저도 제 한계를 시험해보고 싶어졌습니다!',
      likes: 15,
      author: {
        fullName: '바이크초보',
        coverImage: 'https://placehold.co/40x40?text=RideOn',
      },
      createdAt: '2025-01-31T08:27:40.227Z',
    },
    {
      id: 2,
      content:
        '에베레스팅이라는 도전 정말 대단하네요! 저도 언젠가 한번 도전해보고 싶습니다. 어떤 코스로 도전하셨는지 궁금해요.',
      likes: 8,
      author: {
        fullName: '산악라이더',
        coverImage: 'https://placehold.co/40x40?text=RideOn',
      },
      createdAt: '2025-01-31T09:15:22.227Z',
    },
  ],
  views: 72,
  likes: [
    {
      _id: '1',
      user: '1',
    },
    {
      _id: '2',
      user: '2',
    },
  ],
  isSolved: false,
}

const route = useRoute()
const router = useRouter()
const qnaId = route.params.id

const qnaStore = useQnaBoardStore()
const userStore = useUserStore()

const isLiked = ref(false)

const qna = ref(DUMMY_QNA)
const isLoading = ref(false)
const isAuthor = ref(false)
const isSolved = ref(false)

const handleShare = () => {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => {
      alert('링크가 클립보드에 복사되었습니다.')
    })
    .catch((err) => {
      console.error('클립보드 복사 실패:', err)
      alert('링크 복사에 실패했습니다.')
    })
}

const handleLike = async () => {
  if (!userStore.isLoggedIn) {
    alert('로그인 후 이용해주세요.')
    router.push('/login')
    return
  }

  try {
    isLoading.value = true
    const newLikeStatus = !isLiked.value

    const qnaData = {
      id: qna.value._id,
      title: qna.value.title,
      content: qna.value.content,
      tags: qna.value.tags,
      channelId: RIDEON_QNA_CHANNEL_ID,
      image: qna.value.image,
    }

    let updatedPost

    if (!newLikeStatus) {
      const likeId = qna.value.likes.find((like) => like.user === userStore.user._id)._id
      updatedPost = await qnaStore.unlikePost(likeId, qnaData)
    } else {
      updatedPost = await qnaStore.likePost(qna.value._id, qnaData)
    }

    qna.value = updatedPost
    isLiked.value = newLikeStatus
  } catch (error) {
    console.error('좋아요 처리 중 오류가 발생했습니다:', error)
  } finally {
    isLoading.value = false
  }
}

const handleCommentSubmit = async (newComment) => {
  try {
    isLoading.value = true
    const qnaData = {
      id: qna.value._id,
      title: qna.value.title,
      content: qna.value.content,
      tags: qna.value.tags,
      channelId: RIDEON_QNA_CHANNEL_ID,
      image: qna.value.image,
    }

    await qnaStore.createComment(qnaId, newComment, qnaData)
    qna.value = qnaStore.currentPost
  } catch (error) {
    console.error('댓글 생성 중 오류가 발생했습니다:', error)
  } finally {
    isLoading.value = false
  }
}

const handleDeleteComment = async (commentId) => {
  try {
    isLoading.value = true
    const qnaData = {
      id: qna.value._id,
      title: qna.value.title,
      content: qna.value.content,
      tags: qna.value.tags,
      channelId: RIDEON_QNA_CHANNEL_ID,
      image: qna.value.image,
    }

    await qnaStore.deleteComment(commentId, qnaData)
    qna.value = qnaStore.currentPost
  } catch (error) {
    console.error('댓글 삭제 중 오류가 발생했습니다:', error)
  } finally {
    isLoading.value = false
  }
}

const handleSolve = async () => {
  try {
    isLoading.value = true

    const qnaData = {
      id: qna.value._id,
      title: qna.value.title,
      content: qna.value.content,
      tags: qna.value.tags,
      channelId: RIDEON_QNA_CHANNEL_ID,
      image: qna.value.image,
      status: 'SOLVED',
    }

    await qnaStore.updatePost(qnaData)
    qna.value = qnaStore.currentPost
    isSolved.value = true
  } catch (error) {
    console.error('게시글 해결 중 오류가 발생했습니다:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  try {
    isLoading.value = true
    await qnaStore.fetchPostById(qnaId)
    qna.value = qnaStore.currentPost

    userStore.loadUser()

    const hasLiked = qnaStore.currentPost.likes.some((like) => like.user === userStore.user._id)
    isLiked.value = hasLiked

    isAuthor.value = userStore.user._id === qnaStore.currentPost.author._id

    isSolved.value = qnaStore.currentPost.status === 'SOLVED'
  } catch (error) {
    console.error('게시글을 불러오는데 실패했습니다:', error)
    router.push('/qnaBoard')
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <BasicHeader />
    <section class="w-[1440px] px-[240px] mx-auto pt-10 grid grid-cols-9 gap-6 mb-12 items-start">
      <article class="col-span-1">
        <ActionButtons
          :onShare="handleShare"
          :onLike="handleLike"
          :likes="qna.likes"
          :isLiked="isLiked"
          :isLoading="isLoading"
        />
      </article>
      <article class="col-span-6 flex flex-col gap-8">
        <QnaContent :qna="qna" />
        <hr class="border-black3 dark:border-black6" />
        <CommentForm @submit="handleCommentSubmit" :isLoading="isLoading" />
        <CommentList
          :authorId="userStore.user._id"
          :comments="qna.comments"
          :onDelete="handleDeleteComment"
          :isLoading="isLoading"
        />
      </article>
      <article class="col-span-2 flex flex-col gap-4">
        <AuthorInfo :author="qna.author" />
        <button
          v-if="isAuthor"
          class="w-full text-white rounded-lg p-4 text-center"
          :class="{ 'bg-black7': isSolved, 'bg-green-600': !isSolved }"
          @click="handleSolve"
          :disabled="isLoading || isSolved"
        >
          {{ isSolved ? '해결완료' : '해결' }}
        </button>
        <router-link
          to="/qnaBoard/write"
          class="w-full bg-black6 text-white rounded-lg p-4 text-center"
        >
          질문하기
        </router-link>
      </article>
    </section>
    <BasicFooter />
  </div>
</template>

<style scoped></style>
