<script setup>
import { defineProps } from 'vue'

defineProps({
  onShare: {
    type: Function,
    required: true,
  },
  onLike: {
    type: Function,
    required: true,
  },
  likes: {
    type: Array,
    required: true,
  },
  isLiked: {
    type: Boolean,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <article class="flex flex-col justify-center gap-2">
    <router-link
      to="/qnaBoard"
      class="max-h-10 px-3 py-2 border rounded flex items-center justify-center bg-black1 dark:bg-black7 dark:border-black5"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.5 10.0003H2.5M2.5 10.0003L9.58333 2.91699M2.5 10.0003L9.58333 17.0837"
          stroke="#202020"
          class="dark:stroke-black2"
          stroke-width="2.08333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </router-link>
    <button
      @click="onShare"
      class="max-h-10 px-3 py-2 border rounded flex items-center justify-center bg-black1 dark:bg-black7 dark:border-black5"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.25 23.417C20.9759 23.417 22.375 22.0179 22.375 20.292C22.375 18.5661 20.9759 17.167 19.25 17.167C17.5241 17.167 16.125 18.5661 16.125 20.292C16.125 22.0179 17.5241 23.417 19.25 23.417Z"
          stroke="#202020"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="dark:stroke-black2"
        />
        <path
          d="M19.25 8.83301C20.9759 8.83301 22.375 7.43389 22.375 5.70801C22.375 3.98212 20.9759 2.58301 19.25 2.58301C17.5241 2.58301 16.125 3.98212 16.125 5.70801C16.125 7.43389 17.5241 8.83301 19.25 8.83301Z"
          stroke="#202020"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="dark:stroke-black2"
        />
        <path
          d="M6.75 16.125C8.47589 16.125 9.875 14.7259 9.875 13C9.875 11.2741 8.47589 9.875 6.75 9.875C5.02411 9.875 3.625 11.2741 3.625 13C3.625 14.7259 5.02411 16.125 6.75 16.125Z"
          stroke="#202020"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="dark:stroke-black2"
        />
        <path
          d="M16.6462 7.27051L9.35449 11.4372"
          stroke="#202020"
          stroke-width="2"
          class="dark:stroke-black2"
        />
        <path
          d="M9.35449 14.5625L16.6462 18.7292"
          stroke="#202020"
          stroke-width="2"
          class="dark:stroke-black2"
        />
      </svg>
    </button>
    <button
      @click="onLike"
      :disabled="isLoading"
      class="max-h-10 px-3 py-2 border border-primaryRed rounded flex items-center justify-center bg-black1 dark:bg-black7 dark:border-primaryRed"
      :class="{ 'bg-primaryRed dark:bg-primaryRed': isLiked }"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        :class="{ 'fill-white': isLiked }"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 5.59091C17 3.33156 15.1345 1.5 12.8333 1.5C11.1128 1.5 9.63581 2.52389 9 3.98493C8.3642 2.52389 6.88722 1.5 5.16667 1.5C2.86548 1.5 1 3.33156 1 5.59091C1 12.1551 9 16.5 9 16.5C9 16.5 17 12.1551 17 5.59091Z"
          stroke="#DC3644"
          :class="{ 'stroke-white': isLiked }"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <div class="block text-center bottom-0 right-0 text-body1 text-primaryRed">
      {{ likes?.length || 0 }}
    </div>
  </article>
</template>
