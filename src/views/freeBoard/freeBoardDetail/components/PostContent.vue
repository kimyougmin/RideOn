<script setup>
import getRelativeTime from '@/utils/getRelativeTime'

defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="w-[620px] flex flex-col gap-8">
    <div class="w-full h-[400px] overflow-hidden rounded-lg">
      <img :src="post.image" alt="placeholder" class="w-full h-full object-cover" />
    </div>
    <div class="flex flex-col gap-4">
      <h2 class="text-title font-bold dark:text-black1">{{ post.title }}</h2>
      <div class="flex items-center gap-3">
        <span class="text-body1 text-black4">{{ post.author.fullName.split('|')[0] }}</span>
        <span class="text-body1 text-black4">|</span>
        <span class="text-body1 text-black4">{{ getRelativeTime(post.createdAt) }}</span>
      </div>
    </div>
    <hr />
    <p class="text-body1 font-light leading-8 dark:text-black1 whitespace-pre-wrap">
      {{ post.content }}
    </p>
    <div class="flex items-center gap-3 px-4 py-3 bg-black2 rounded dark:bg-black8">
      <span class="text-body1 font-bold dark:text-black1">Tags</span>
      <span
        v-for="tag in post.tags"
        :key="tag"
        class="text-body2 bg-black1 text-black10 px-4 py-1 rounded dark:bg-black7 dark:text-black1"
      >
        {{ tag }}
      </span>
    </div>
  </article>
</template>
