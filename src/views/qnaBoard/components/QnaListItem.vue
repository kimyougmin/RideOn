<script setup>
import getRelativeTime from '@/utils/getRelativeTime'

defineProps({
  qna: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <router-link
    :to="`/qnaBoard/detail/${qna.id}`"
    class="w-full flex flex-col gap-6 items-start py-8 border-t border-black3 dark:border-black6"
  >
    <!-- 질문 정보 상단 -->
    <div class="flex flex-col gap-4">
      <div class="flex gap-4 items-center">
        <span class="text-body1 px-4 py-1 rounded-full bg-black2 dark:bg-black7 dark:text-black1">{{
          qna.isSolved ? '해결' : '미해결'
        }}</span>
        <span class="text-sub-title font-bold dark:text-black1">{{ qna.title }}</span>
      </div>
      <p class="text-body1 font-light m-0 dark:text-black3">
        {{ qna.content }}
      </p>
      <div class="flex items-center gap-3">
        <span
          v-for="tag in qna.tags"
          :key="tag"
          class="text-body2 bg-black2 text-black10 px-4 py-1 rounded dark:bg-black7 dark:text-black1"
        >
          {{ tag }}
        </span>
      </div>
    </div>
    <!-- 질문 정보 하단 -->
    <div class="flex items-center justify-between w-full">
      <!-- 작성자 정보 & 작성일 -->
      <div class="flex items-center gap-3">
        <span class="text-body2 text-black5 font-light dark:text-black4">{{
          qna.author.fullName
        }}</span>
        <span class="text-body2 text-black5 font-light dark:text-black4">|</span>
        <span class="text-body2 text-black5 font-light dark:text-black4">{{
          getRelativeTime(qna.createdAt)
        }}</span>
      </div>
      <!-- 좋아요 수 & 조회수 -->
      <div class="flex items-center gap-6 grow-0">
        <span class="text-body2 dark:text-black3 font-light flex items-center gap-1">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.9813 13.8328H2.73301C2.51209 13.8328 2.33301 13.6537 2.33301 13.4328V6.89942C2.33301 6.67851 2.51209 6.49942 2.73301 6.49942H4.57809C5.04644 6.49942 5.48045 6.25369 5.72141 5.85208L7.52834 2.8405C7.91828 2.19068 8.83661 2.1289 9.31001 2.72066C9.53314 2.99959 9.60508 3.37032 9.50241 3.71246L8.82081 5.98448C8.74381 6.24113 8.93601 6.49942 9.20394 6.49942H12.254C13.1331 6.49942 13.7717 7.33542 13.5403 8.18356L12.2676 12.8502C12.1094 13.4304 11.5825 13.8328 10.9813 13.8328Z"
              stroke="black"
              stroke-linecap="round"
              class="stroke-black5 dark:stroke-black1"
            />
            <path
              d="M4.66699 13.8333V6.5"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-black5 dark:stroke-black1"
            />
          </svg>
          {{ qna.like }}</span
        >
        <span class="text-body2 dark:text-black3 font-light flex items-center gap-1">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.3333 8.83268C11.5174 8.83268 11.6667 8.68342 11.6667 8.49935C11.6667 8.31528 11.5174 8.16602 11.3333 8.16602C11.1493 8.16602 11 8.31528 11 8.49935C11 8.68342 11.1493 8.83268 11.3333 8.83268Z"
              fill="black"
              stroke="black"
              stroke-width="1.125"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-black5 dark:stroke-black1"
            />
            <path
              d="M8.00033 8.83268C8.18439 8.83268 8.33366 8.68342 8.33366 8.49935C8.33366 8.31528 8.18439 8.16602 8.00033 8.16602C7.81626 8.16602 7.66699 8.31528 7.66699 8.49935C7.66699 8.68342 7.81626 8.83268 8.00033 8.83268Z"
              fill="black"
              stroke="black"
              stroke-width="1.125"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-black5 dark:stroke-black1"
            />
            <path
              d="M4.66634 8.83268C4.85043 8.83268 4.99967 8.68342 4.99967 8.49935C4.99967 8.31528 4.85043 8.16602 4.66634 8.16602C4.48225 8.16602 4.33301 8.31528 4.33301 8.49935C4.33301 8.68342 4.48225 8.83268 4.66634 8.83268Z"
              fill="black"
              stroke="black"
              stroke-width="1.125"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-black5 dark:stroke-black1"
            />
            <path
              d="M7.99967 15.1673C11.6815 15.1673 14.6663 12.1825 14.6663 8.50065C14.6663 4.81875 11.6815 1.83398 7.99967 1.83398C4.31777 1.83398 1.33301 4.81875 1.33301 8.50065C1.33301 9.71492 1.65765 10.8534 2.22489 11.834L1.66634 14.834L4.66634 14.2755C5.64692 14.8427 6.78541 15.1673 7.99967 15.1673Z"
              stroke="black"
              stroke-width="1.125"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-black5 dark:stroke-black1"
            />
          </svg>
          {{ qna.comments.length }}</span
        >
        <span class="text-body2 dark:text-black3 font-light flex items-center gap-1">
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.61226 9.75492C1.55763 9.59072 1.55763 9.41324 1.61226 9.24904C2.71031 5.94542 5.8271 3.5625 9.50043 3.5625C13.1722 3.5625 16.2874 5.94304 17.3878 9.24508C17.4432 9.40896 17.4432 9.58629 17.3878 9.75096C16.2906 13.0546 13.1738 15.4375 9.50043 15.4375C5.82868 15.4375 2.71268 13.057 1.61226 9.75492Z"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-black5 dark:stroke-black1"
            />
            <path
              d="M11.875 9.5C11.875 10.1299 11.6248 10.734 11.1794 11.1794C10.734 11.6248 10.1299 11.875 9.5 11.875C8.87011 11.875 8.26602 11.6248 7.82062 11.1794C7.37522 10.734 7.125 10.1299 7.125 9.5C7.125 8.87011 7.37522 8.26602 7.82062 7.82062C8.26602 7.37522 8.87011 7.125 9.5 7.125C10.1299 7.125 10.734 7.37522 11.1794 7.82062C11.6248 8.26602 11.875 8.87011 11.875 9.5Z"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-black5 dark:stroke-black1"
            />
          </svg>

          {{ qna.views }}</span
        >
      </div>
    </div>
  </router-link>
</template>
