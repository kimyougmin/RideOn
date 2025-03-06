<script setup>
import BasicHeader from '@/components/BasicHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
import CommentForm from '@/components/comment/CommentForm.vue'
import CommentList from '@/components/comment/CommentList.vue'
import RiderCrewContent from './components/RiderCrewContent.vue'
import AuthorInfo from './components/AuthorInfo.vue'

const DUMMY_RIDER_CREW = {
  id: 1,
  title: '주말 한강 라이딩 크루 모집합니다',
  content:
    '매주 토요일 아침 7시 잠실한강공원에서 출발하는 라이딩 크루 모집합니다. 편하게 30km 정도 달릴 예정이에요. 초보자도 환영합니다!',
  locations: ['서울', '경기'],
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
  views: 72,
  like: 100,
  status: 'recruiting',
}
</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <BasicHeader />
    <section class="w-[1440px] px-[304px] mx-auto pt-10 grid grid-cols-8 gap-4 mb-12 items-start">
      <article class="col-span-6 flex flex-col gap-8">
        <RiderCrewContent :riderCrew="DUMMY_RIDER_CREW" />
        <div class="w-full h-64 bg-black2 rounded-lg flex items-center justify-center">
          지도가 들어갈 공간
        </div>
        <hr class="border-black3 dark:border-black6" />
        <CommentForm />
        <CommentList :comments="DUMMY_RIDER_CREW.comments" />
      </article>
      <article class="col-span-2 flex flex-col gap-4">
        <AuthorInfo :author="DUMMY_RIDER_CREW.author" />
        <button class="w-full bg-blue-500 text-white rounded-lg p-4 text-center">함께하기</button>
      </article>
    </section>
    <BasicFooter />
  </div>
</template>

<style scoped></style>
