<script setup>
import getRelativeTime from '@/utils/getRelativeTime'

defineProps({
  comments: {
    type: Array,
    required: true,
    default: () => [],
  },
})
</script>

<template>
  <ul class="list-none pl-0 flex flex-col gap-4">
    <li v-for="comment in comments" :key="comment.id" class="flex gap-4">
      <div class="w-11 h-10 rounded-full overflow-hidden">
        <img
          :src="comment.author.coverImage"
          alt="profile image"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="w-full flex flex-col gap-2">
        <div class="flex justify-between">
          <div>
            <span class="text-body1 font-bold dark:text-black1">{{ comment.author.fullName }}</span>
            <span class="text-body1 font-light text-black4">
              • {{ getRelativeTime(comment.createdAt) }}</span
            >
          </div>
          <div class="max-w-10 text-primaryRed flex items-center gap-2 justify-end cursor-pointer">
            <svg
              width="15"
              height="14"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3.72727C12 2.22104 10.7175 1 9.13542 1C7.95254 1 6.93712 1.68259 6.5 2.65662C6.06288 1.68259 5.04746 1 3.86458 1C2.28252 1 1 2.22104 1 3.72727C1 8.10337 6.5 11 6.5 11C6.5 11 12 8.10337 12 3.72727Z"
                stroke="#DC3644"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ comment.likes }}
          </div>
        </div>
        <p class="text-body2 font-light dark:text-black1">
          {{ comment.content }}
        </p>
      </div>
    </li>
  </ul>
</template>
