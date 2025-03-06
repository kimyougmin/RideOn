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
