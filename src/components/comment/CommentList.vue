<script setup>
import getRelativeTime from '@/utils/getRelativeTime'

const emit = defineEmits(['delete'])

const props = defineProps({
  comments: {
    type: Array,
    required: true,
    default: () => [],
  },
  authorId: {
    type: String,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
})

const handleDelete = async (commentId) => {
  try {
    emit('delete', commentId)
  } catch (error) {
    console.error('댓글 삭제 실패:', error)
  }
}

const isAuthor = (comment) => {
  return comment.author._id === props.authorId
}
</script>

<template>
  <ul class="list-none pl-0 flex flex-col gap-4">
    <li v-for="comment in comments" :key="comment._id" class="flex gap-4">
      <div class="w-11 h-10 rounded-full overflow-hidden">
        <img
          :src="comment.author.coverImage || 'https://placehold.co/100x100?text=RideOn'"
          alt="profile image"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="w-full flex flex-col gap-2">
        <div class="flex justify-between">
          <div>
            <span class="text-body1 font-bold dark:text-black1">{{
              comment.author.fullName.split('|')[0]
            }}</span>
            <span class="text-body1 font-light text-black4">
              • {{ getRelativeTime(comment.createdAt) }}
            </span>
          </div>
          <button
            v-if="isAuthor(comment)"
            @click="handleDelete(comment._id)"
            class="px-2 py-1 flex items-center gap-1 justify-end cursor-pointer text-body2 text-black7 bg-black3 dark:bg-black7 dark:text-black1 rounded-lg grow-0"
            :disabled="isLoading"
          >
            <svg
              width="14px"
              height="14px"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="dark:stroke-black1"
            >
              <path
                d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9"
                stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="dark:stroke-black1"
              ></path>
              <path
                d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6"
                stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="dark:stroke-black1"
              ></path>
            </svg>
            삭제
          </button>
        </div>
        <p class="text-body2 font-light dark:text-black1">
          {{ comment.comment }}
        </p>
      </div>
    </li>
  </ul>
</template>
