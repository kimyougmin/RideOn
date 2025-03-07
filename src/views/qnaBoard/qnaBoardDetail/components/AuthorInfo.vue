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
      <img
        :src="author.image || 'https://placehold.co/100x100?text=RideOn'"
        alt="profile image"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="flex flex-col">
      <span class="text-body1 font-bold dark:text-black3">{{ author.fullName.split('|')[0] }}</span>
      <span class="text-body2 text-black5 font-light dark:text-black3"
        >작성한 게시글 수 {{ author.posts?.length || 0 }}</span
      >
    </div>
  </div>
</template>
