<script setup>
import BasicHeader from '@/components/BasicHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
import QnaContent from './components/QnaContent.vue'
import CommentForm from '@/components/comment/CommentForm.vue'
import CommentList from '@/components/comment/CommentList.vue'
import AuthorInfo from './components/AuthorInfo.vue'

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
  like: 100,
  isSolved: false,
}
</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <BasicHeader />
    <section class="w-[1440px] px-[304px] mx-auto pt-10 grid grid-cols-8 gap-4 mb-12 items-start">
      <article class="col-span-6 flex flex-col gap-8">
        <QnaContent :qna="DUMMY_QNA" />
        <hr class="border-black3 dark:border-black6" />
        <CommentForm />
        <CommentList :comments="DUMMY_QNA.comments" />
      </article>
      <article class="col-span-2 flex flex-col gap-4">
        <AuthorInfo :author="DUMMY_QNA.author" />
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
