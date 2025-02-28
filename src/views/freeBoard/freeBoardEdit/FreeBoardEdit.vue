<script setup>
import BasicHeader from '@/components/BasicHeader.vue'
import BasicFooter from '@/components/BasicFooter.vue'
</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <BasicHeader />
    <main class="w-[1440px] px-[93px] mx-auto pt-10 flex flex-col gap-8 mb-12">
      <h2 class="text-title font-bold text-black9 dark:text-black1">게시글 수정</h2>
    </main>
    <BasicFooter />
  </div>
</template>

<style scoped></style>
