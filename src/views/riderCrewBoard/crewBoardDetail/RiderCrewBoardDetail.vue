<script setup>
import BasicHeader from '@/components/BasicHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
import CommentForm from '@/components/comment/CommentForm.vue'
import CommentList from '@/components/comment/CommentList.vue'
import RiderCrewContent from './components/RiderCrewContent.vue'
import AuthorInfo from './components/AuthorInfo.vue'
import ActionButtons from './components/ActionButtons.vue'
import { useRoute, useRouter } from 'vue-router'
import { useRiderCrewBoardStore } from '@/stores/riderCrewBoard'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { RIDEON_RIDERCREW_CHANNEL_ID } from '@/constants/channelId'
import CrewLocationMap from './components/CrewLocationMap.vue'

const DUMMY_RIDER_CREW = {
  id: 1,
  title: '주말 한강 라이딩 크루 모집합니다',
  content:
    '매주 토요일 아침 7시 잠실한강공원에서 출발하는 라이딩 크루 모집합니다. 편하게 30km 정도 달릴 예정이에요. 초보자도 환영합니다!',
  location: '서울',
  memberInfo: {
    current: 3,
    max: 8,
  },
  author: {
    fullName: '라이딩고수',
    profileImage: 'https://placehold.co/40x40?text=RideOn',
  },
  createdAt: '2024-03-27',
  comments: [
    {
      content: '초보자도 참여 가능한가요?',
      author: {
        fullName: '바이크초보',
        coverImage: 'https://placehold.co/40x40?text=RideOn',
      },
      createdAt: '2024-03-27',
    },
  ],
  likes: [],
  status: 'RECRUITING',
}

const route = useRoute()
const router = useRouter()
const crewId = route.params.id

const riderCrewStore = useRiderCrewBoardStore()
const userStore = useUserStore()

const isLiked = ref(false)

const riderCrew = ref(DUMMY_RIDER_CREW)
const isLoading = ref(false)
const isAuthor = ref(false)
const isRecruiting = ref(true)

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

    let updatedPost

    if (!newLikeStatus) {
      const likeId = riderCrew.value.likes.find((like) => like.user === userStore.user._id)._id
      updatedPost = await riderCrewStore.unlikePost(likeId, crewId)
    } else {
      updatedPost = await riderCrewStore.likePost(crewId)
    }

    riderCrew.value = updatedPost
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
    await riderCrewStore.createComment(crewId, newComment)
    riderCrew.value = riderCrewStore.currentPost
  } catch (error) {
    console.error('댓글 생성 중 오류가 발생했습니다:', error)
  } finally {
    isLoading.value = false
  }
}

const handleDeleteComment = async (commentId) => {
  try {
    isLoading.value = true
    await riderCrewStore.deleteComment(commentId, crewId)
    riderCrew.value = riderCrewStore.currentPost
  } catch (error) {
    console.error('댓글 삭제 중 오류가 발생했습니다:', error)
  } finally {
    isLoading.value = false
  }
}

const handleJoin = async () => {
  if (!userStore.isLoggedIn) {
    alert('로그인 후 이용해주세요.')
    router.push('/login')
    return
  }

  try {
    isLoading.value = true
    await riderCrewStore.joinCrew(crewId)
    riderCrew.value = riderCrewStore.currentPost
  } catch (error) {
    console.error('크루 참여 중 오류가 발생했습니다:', error)
  } finally {
    isLoading.value = false
  }
}

const handleCloseRecruiting = async () => {
  try {
    isLoading.value = true

    const crewData = {
      id: riderCrew.value._id,
      title: riderCrew.value.title,
      content: riderCrew.value.content,
      location: riderCrew.value.location,
      channelId: RIDEON_RIDERCREW_CHANNEL_ID,
      image: riderCrew.value.image,
      status: 'COMPLETED',
      memberInfo: riderCrew.value.memberInfo,
    }

    await riderCrewStore.updatePost(crewData)
    riderCrew.value = riderCrewStore.currentPost
    isRecruiting.value = false
  } catch (error) {
    console.error('모집 마감 중 오류가 발생했습니다:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  try {
    isLoading.value = true
    await riderCrewStore.fetchPostById(crewId)
    riderCrew.value = riderCrewStore.currentPost

    userStore.loadUser()

    const hasLiked = riderCrewStore.currentPost.likes.some(
      (like) => like.user === userStore.user._id,
    )
    isLiked.value = hasLiked

    isAuthor.value = userStore.user._id === riderCrewStore.currentPost.author._id

    isRecruiting.value = riderCrewStore.currentPost.status === 'RECRUITING'
  } catch (error) {
    console.error('게시글을 불러오는데 실패했습니다:', error)
    router.push('/riderCrewBoard')
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
          :likes="riderCrew.likes"
          :isLiked="isLiked"
          :isLoading="isLoading"
        />
      </article>
      <article class="col-span-6 flex flex-col gap-8">
        <RiderCrewContent :riderCrew="riderCrew" />
        <CrewLocationMap :location="riderCrew.location" />
        <hr class="border-black3 dark:border-black6" />
        <CommentForm @submit="handleCommentSubmit" :isLoading="isLoading" />
        <CommentList
          :authorId="userStore.user._id"
          :comments="riderCrew.comments"
          :onDelete="handleDeleteComment"
          :isLoading="isLoading"
        />
      </article>
      <article class="col-span-2 flex flex-col gap-4">
        <AuthorInfo :author="riderCrew.author" />
        <button
          v-if="isAuthor"
          class="w-full text-white rounded-lg p-4 text-center"
          :class="{ 'bg-black7': !isRecruiting, 'bg-red-600': isRecruiting }"
          @click="handleCloseRecruiting"
          :disabled="isLoading || !isRecruiting"
        >
          {{ isRecruiting ? '모집 마감하기' : '모집 마감됨' }}
        </button>
        <button
          v-else
          class="w-full text-white rounded-lg p-4 text-center"
          :class="{
            'bg-black7': !isRecruiting,
            'bg-blue-500': isRecruiting,
          }"
          @click="handleJoin"
          :disabled="isLoading || !isRecruiting"
        >
          {{ isRecruiting ? '함께하기' : '모집 마감됨' }}
        </button>
        <router-link
          to="/riderCrewBoard/write"
          class="w-full bg-black6 text-white rounded-lg p-4 text-center"
        >
          크루 모집하기
        </router-link>
      </article>
    </section>
    <BasicFooter />
  </div>
</template>

<style scoped></style>
