<script setup>
defineProps({
  author: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="flex justify-center items-center gap-4 border border-black4 rounded-lg p-4 grow-0">
    <div class="w-12 h-12 rounded-full overflow-hidden">
      <img
        :src="author.image || 'https://placehold.co/40x40?text=RideOn'"
        alt="profile image"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="flex flex-col">
      <span class="text-sub-title font-bold dark:text-black3">{{
        author.fullName.split('|')[0]
      }}</span>
    </div>
  </div>
</template>
