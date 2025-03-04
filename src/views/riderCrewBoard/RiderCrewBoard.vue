<script setup>
import { ref } from 'vue'
import BasicHeader from '@/components/BasicHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
import KeywordSearch from '@/components/search/KeywordSearch.vue'
import SortButtons from '@/components/search/SortButtons.vue'
import LocationFilter from '@/components/search/LocationFilter.vue'
import MemberCountFilter from '@/components/search/MemberCountFilter.vue'

import RiderCrewHeader from './components/RiderCrewHeader.vue'
import RiderCrewFilterMenu from './components/RiderCrewFilterMenu.vue'
import MoveToMap from './components/MoveToMap.vue'
import RiderCrewListItem from './components/RiderCrewListItem.vue'
const selectedSort = ref('latest')
const selectedFilter = ref('all')

const searchKeyword = ref('')
const searchTags = ref([])

const selectedLocations = ref([])
const selectedMemberCount = ref([])

const handleKeywordSearch = (keyword) => {
  // 검색 로직 구현
  console.log('검색어:', keyword)
  console.log('태그:', searchTags.value)
}

const DUMMY_RIDER_CREWS = [
  {
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
      fullName: '감자머리',
      profileImage: 'https://placehold.co/50x50',
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
  },
  {
    id: 2,
    title: '부산 해운대 야간 라이딩',
    content:
      '매주 금요일 저녁 8시 해운대 해수욕장에서 광안리까지 달립니다. 야경 보면서 여유롭게 라이딩해요!',
    locations: ['부산'],
    memberInfo: {
      current: 5,
      max: 10,
    },
    author: {
      fullName: '바다사랑',
      profileImage: 'https://placehold.co/50x50',
    },
    createdAt: '2024-03-26',
    comments: [],
    views: 45,
    like: 23,
    status: 'completed',
  },
  {
    id: 3,
    title: '제주도 한바퀴 라이딩 크루',
    content:
      '제주도 한바퀴 라이딩 함께하실 분 구합니다. 4월 중순 출발 예정이며, 3박 4일 코스입니다.',
    locations: ['제주'],
    memberInfo: {
      current: 2,
      max: 4,
    },
    author: {
      fullName: '섬돌이',
      profileImage: 'https://placehold.co/50x50',
    },
    createdAt: '2024-03-25',
    comments: [
      {
        content: '일정 조율 가능한가요?',
        author: {
          fullName: '여행자',
          profileImage: 'https://placehold.co/50x50',
        },
        createdAt: '2024-03-26',
      },
    ],
    views: 128,
    like: 45,
    status: 'recruiting',
  },
  {
    id: 4,
    title: '인천 송도 브롬톤 크루',
    content:
      '송도 센트럴파크에서 매주 일요일 오후 2시 출발합니다. 브롬톤 자전거로 여유롭게 달려요.',
    locations: ['인천'],
    memberInfo: {
      current: 8,
      max: 8,
    },
    author: {
      fullName: '폴딩러버',
      profileImage: 'https://placehold.co/50x50',
    },
    createdAt: '2024-03-24',
    comments: [],
    views: 92,
    like: 34,
    status: 'completed',
  },
  {
    id: 5,
    title: '대전 계족산 산악 라이딩',
    content: '계족산 트레일을 함께 달리실 중급자 이상 라이더를 찾습니다. 안전장비 필수입니다.',
    locations: ['대전'],
    memberInfo: {
      current: 1,
      max: 5,
    },
    author: {
      fullName: '산악고수',
      profileImage: 'https://placehold.co/50x50',
    },
    createdAt: '2024-03-23',
    comments: [
      {
        content: '소요 시간이 어떻게 되나요?',
        author: {
          fullName: '산린이',
          profileImage: 'https://placehold.co/50x50',
        },
        createdAt: '2024-03-24',
      },
    ],
    views: 67,
    like: 12,
    status: 'recruiting',
  },
]
</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <BasicHeader />
    <RiderCrewHeader />
    <section class="w-[1440px] px-[198px] mx-auto pt-10 grid grid-cols-10 gap-6 mb-12 items-start">
      <!-- 질문 게시판 - 좌측 영역 -->
      <article class="col-span-2 flex flex-col gap-4">
        <RiderCrewFilterMenu v-model="selectedFilter" />
      </article>

      <!-- 질문 게시판 - 가운데 영역 -->
      <article class="col-span-6 flex flex-col gap-6">
        <!-- 검색 영역 -->
        <section class="flex flex-col gap-6">
          <KeywordSearch v-model="searchKeyword" @search="handleKeywordSearch" />
          <LocationFilter v-model="selectedLocations" />
          <MemberCountFilter v-model="selectedMemberCount" />
        </section>

        <!-- 정렬 옵션 & 글쓰기 버튼 -->
        <section class="flex items-center justify-between">
          <SortButtons v-model="selectedSort" />
          <router-link to="/riderCrewBoard/write" class="bg-black6 px-6 py-2 rounded text-black1"
            >글쓰기</router-link
          >
        </section>

        <!-- 질문 게시판 목록 -->
        <ul class="flex flex-col list-none p-0 items-start">
          <RiderCrewListItem
            v-for="riderCrew in DUMMY_RIDER_CREWS"
            :key="riderCrew.id"
            :riderCrew="riderCrew"
          />
        </ul>
      </article>

      <!-- 질문 게시판 - 우측 영역 -->
      <article class="col-span-2">
        <MoveToMap />
      </article>
    </section>
    <BasicFooter />
  </div>
</template>

<style scoped></style>
