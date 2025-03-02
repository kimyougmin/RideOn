<template>
  <div class="flex flex-col gap-4 border border-black4 rounded-lg px-4 py-3">
    <h3 class="text-body1 font-bold dark:text-black3">인기 태그</h3>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="tag in tags"
        :key="tag"
        class="text-body2 bg-black2 text-black10 px-4 py-1 rounded dark:bg-black7 dark:text-black1"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup>
const tags = ['휠셋', '브랜드 추천', '자전거', '헬멧']
</script>
