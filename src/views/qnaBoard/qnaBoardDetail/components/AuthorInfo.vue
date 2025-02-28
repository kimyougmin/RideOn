<script setup>
defineProps({
  author: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="flex items-center gap-2 border border-black4 rounded-lg p-4">
    <div class="w-12 h-12 rounded-full overflow-hidden">
      <img :src="author.profileImage" alt="profile image" class="w-full h-full object-cover" />
    </div>
    <div class="flex flex-col">
      <span class="text-body1 font-bold dark:text-black3">{{ author.fullName }}</span>
      <span class="text-body2 text-black5 font-light dark:text-black3"
        >작성한 질문 수 {{ author.postCount }}</span
      >
    </div>
  </div>
</template>
