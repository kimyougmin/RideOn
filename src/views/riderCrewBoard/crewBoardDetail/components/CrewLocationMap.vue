<script setup>
defineProps({
  location: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="w-full h-64 bg-black2 rounded-lg flex items-center justify-center">
    <p class="text-black7">{{ location }} 지역 지도가 표시됩니다</p>
  </div>
</template>

<style scoped></style>
