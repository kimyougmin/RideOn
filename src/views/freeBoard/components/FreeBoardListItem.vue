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
  <article
    class="col-span-3 flex flex-col shadow-md rounded-xl overflow-hidden dark:bg-black7 dark:text-black1"
  >
    <div class="flex items-center gap-2 rounded-t-lg overflow-hidden">
      <img
        :src="post.image || 'https://placehold.co/300x200?text=RideOn'"
        alt="placeholder"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="flex flex-col gap-2 p-4">
      <h3 class="font-bold">{{ post.title }}</h3>
      <p class="text-sm line-clamp-3 mb-8 font-light">
        {{ post.content }}
      </p>
      <div class="flex justify-between">
        <div class="flex items-center gap-2">
          <div class="w-5 h-5 rounded-full overflow-hidden">
            <img
              :src="post.author?.coverImage || 'https://placehold.co/20x20?text=RideOn'"
              alt="placeholder"
              class="w-full h-full object-cover"
            />
          </div>
          <span class="text-sm">{{ post.author?.fullName }}</span>
        </div>
        <div>
          <span class="text-sm">{{ getRelativeTime(post.createdAt) }}</span>
        </div>
      </div>
    </div>
  </article>
</template>
