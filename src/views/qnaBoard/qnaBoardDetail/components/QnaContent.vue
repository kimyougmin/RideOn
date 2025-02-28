<script setup>
defineProps({
  qna: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="flex gap-3 flex-col items-baseline">
    <h2 class="text-title font-bold text-black9 dark:text-black1">{{ qna.title }}</h2>
    <div class="flex gap-2">
      <span class="text-sub-body1 text-black6 dark:text-black4"> {{ qna.createdAt }} 작성 </span>
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
        {{ qna.views }}
      </span>
    </div>
  </div>
  <div class="flex flex-col gap-4">
    <p class="m-0 text-body1 dark:text-black3 leading-loose">{{ qna.content }}</p>
    <div class="flex items-center gap-3">
      <span
        v-for="tag in qna.tags"
        :key="tag"
        class="text-body2 bg-black2 text-black10 px-4 py-1 rounded dark:bg-black7 dark:text-black1"
      >
        {{ tag }}</span
      >
    </div>
  </div>
</template>
