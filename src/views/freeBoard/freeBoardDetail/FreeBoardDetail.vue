<script setup>
import { useRoute, useRouter } from 'vue-router'
import BasicHeader from '@/components/BasicHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
import CommentForm from '@/components/comment/CommentForm.vue'
import CommentList from '@/components/comment/CommentList.vue'
import { useFreeBoardStore } from '@/stores/freeBoard'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import ActionButtons from './components/ActionButtons.vue'
import PostContent from './components/PostContent.vue'

const DUMMY_POST = {
  id: 1,
  image: 'https://placehold.co/620x400?text=RideOn',
  title: '자전거로 에베레스트를 등반하다',
  content: `이게 어려워?” <br />학교 선배님들이 저에게 자주 하던 말이었습니다. <br />
            처음에는 단순한 장난이라고 생각했지만, 시간이 지나면서 그 말의 의미가 달라 보이기
            시작했습니다. 그들은 정말로 묻고 있던 걸까요?<br />
            아니면 제 한계를 시험하고 있었던 걸까요? 어떤 도전이든, 시작하기 전에는 어려워 보일
            수밖에 없습니다. 하지만 막상 도전하면 생각보다 쉬울 수도 있고, 반대로 예상보다 훨씬 힘들
            수도 있죠. 저는 이런 생각을 하며 자전거를 타고 에베레스트를 등반하기로 결심했습니다.
            <br />물론, 실제로 에베레스트 정상까지 자전거를 타고 오를 수는 없습니다. 대신
            '에베레스팅(Everesting)'이라는 도전이 있습니다. 한 번의 라이딩에서 같은 언덕을 반복해서
            올라 총 상승 고도가 8,848m, 즉 에베레스트의 높이에 도달하는 것입니다. 이 도전은 단순한
            체력 싸움이 아니라, 정신력과 끈기가 필요한 극한의 도전입니다. <br />처음엔 가벼운
            마음으로 시작했습니다. "이게 어려워?"라고 스스로에게 물으며 페달을 밟았습니다. 하지만 몇
            시간 후, 다리는 무거워지고, 숨은 거칠어지고, 내리막길에서도 자전거를 더 이상 탄력 있게
            몰 수 없을 정도로 지쳤습니다. <br />그 순간, 선배들의 말이 다시 떠올랐습니다. "이게
            어려워?" <br />맞아요. 어렵습니다. 하지만 그렇다고 포기할 수는 없습니다. 도전이 쉽다면,
            의미가 없을 테니까요. 수십 번의 오르막과 내리막을 반복하며 새벽이 되었고, 마지막
            오르막에 다다랐을 때 온몸이 부서질 듯한 고통이 밀려왔습니다. 하지만 저는 끝까지 페달을
            밟았습니다. 그리고 마침내, 에베레스트와 같은 높이에 도달했을 때 깨달았습니다. <br />어떤
            도전이든, 결국엔 내가 해낼 수 있느냐의 문제라는 것을. <br />"이게 어려워?" <br />이제는
            제가 후배들에게 묻고 싶은 말입니다.`,
  views: 142,
  likes: 15,
  tags: ['로드바이크', '입문', '장비추천'],
  author: {
    fullName: '바이크초보',
    coverImage: 'https://placehold.co/20x20?text=RideOn',
  },
  createdAt: '2025-01-31T08:27:40.227Z',
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
}

const route = useRoute()
const router = useRouter()
const freeBoardStore = useFreeBoardStore()
const userStore = useUserStore()

const isLiked = ref(false)

const postId = route.params.id
const post = ref(DUMMY_POST)

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
    const newLikeStatus = !isLiked.value

    if (!newLikeStatus) {
      const likeId = post.value.likes.find((like) => like.user === userStore.user._id)._id
      await freeBoardStore.unlikePost(likeId)
    } else {
      await freeBoardStore.likePost(post.value._id)
    }

    const updatedPost = await freeBoardStore.updatePost({
      id: post.value._id,
      title: post.value.title,
      content: post.value.content,
      tags: post.value.tags,
      channelId: post.value.channel._id,
      image: post.value.image,
    })

    post.value = {
      ...post.value,
      likes: updatedPost.likes,
    }
    isLiked.value = newLikeStatus
  } catch (error) {
    console.error('좋아요 처리 중 오류가 발생했습니다:', error)
  }
}

onMounted(async () => {
  try {
    await freeBoardStore.fetchPostById(postId)
    post.value = freeBoardStore.currentPost
    console.log('post:', post.value)

    userStore.loadUser()

    const hasLiked = freeBoardStore.currentPost.likes.some(
      (like) => like.user === userStore.user._id,
    )
    isLiked.value = hasLiked
  } catch (error) {
    console.error('게시글을 불러오는데 실패했습니다:', error)
    router.push('/freeBoard')
  }
})
</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <BasicHeader />
    <main class="w-[1440px] px-[93px] mx-auto pt-10 flex flex-col gap-8 mb-12">
      <section class="mx-auto flex gap-4">
        <ActionButtons
          :onShare="handleShare"
          :onLike="handleLike"
          :likes="post.likes"
          :isLiked="isLiked"
        />
        <PostContent :post="post" />
      </section>
    </main>

    <!-- 댓글 섹션 -->
    <section class="w-full bg-black2 dark:bg-black8 py-8">
      <article class="w-[1440px] mx-auto flex gap-4 items-center justify-center">
        <div class="w-10 h-10"></div>
        <section class="max-w-[620px] flex flex-col gap-8">
          <CommentForm />
          <CommentList :comments="post.comments" />
        </section>
      </article>
    </section>
    <BasicFooter />
  </div>
</template>

<style scoped></style>
