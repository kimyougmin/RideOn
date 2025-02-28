<script setup>
import getRelativeTime from '@/utils/getRelativeTime'

const { post } = defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <router-link
    :to="`/freeBoardDetail/${post.id}`"
    class="min-h-64 col-span-3 flex flex-col bg-black1 drop-shadow-custom2 rounded-xl overflow-hidden dark:bg-black7 dark:text-black1 relative"
  >
    <div
      class="absolute top-4 left-4 px-3 py-2 bg-black2/70 backdrop-blur-sm rounded-lg flex items-center gap-2"
    >
      <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 4.09091C16 1.83156 14.1345 0 11.8333 0C10.1128 0 8.63581 1.02389 8 2.48493C7.3642 1.02389 5.88722 0 4.16667 0C1.86548 0 0 1.83156 0 4.09091C0 10.6551 8 15 8 15C8 15 16 10.6551 16 4.09091Z"
          fill="#DC3644"
        />
      </svg>
      <span class="text-body1 text-primaryRed">{{ post.likes }}</span>
    </div>
    <div
      class="flex items-center gap-2 rounded-t-lg overflow-hidden border-b-[0.5px] border-black4"
    >
      <img
        :src="post.image || 'https://placehold.co/300x200?text=RideOn'"
        alt="placeholder"
        class="w-full h-52 object-cover"
      />
    </div>
    <div class="flex flex-col gap-2 p-4">
      <h3 class="text-sub-title font-bold">{{ post.title }}</h3>
      <p class="text-body1 line-clamp-3 font-light">
        {{ post.content }}
      </p>
      <div class="flex items-center gap-2 overflow-hidden">
        <svg
          width="15"
          height="15"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.33333 3.5L5 18.5"
            stroke="black-4"
            class="stroke-black4"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M17.083 14.334H2.08301"
            stroke="black-4"
            class="stroke-black4"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M18.333 6.83398H3.33301"
            stroke="black-4"
            class="stroke-black4"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M15.0003 3.5L11.667 18.5"
            stroke="black-4"
            class="stroke-black4"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
        <span class="text-body1 text-black4">{{ post.tags.join(' • ') }}</span>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <div class="w-5 h-5 rounded-full overflow-hidden">
            <img
              :src="post.author?.coverImage || 'https://placehold.co/20x20?text=RideOn'"
              alt="placeholder"
              class="w-full h-full object-cover"
            />
          </div>
          <span class="text-body1">{{ post.author?.fullName }}</span>
        </div>
        <div>
          <span class="text-body1">{{ getRelativeTime(post.createdAt) }}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>
