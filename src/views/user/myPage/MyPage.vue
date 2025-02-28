<script setup>
import BasicHeader from '@/components/BasicHeader.vue';
import BasicFooter from '@/components/BasicFooter.vue';
import MypageSidebar from './MypageSidebar.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen dark:bg-black9 dark:text-white">
    <BasicHeader :isDarkMode="isDarkMode" @toggle-dark-mode="darkMode" />

    <main class="w-[1440px] px-[30px] mx-auto pt-10 flex gap-8  mb-20 ">
      <!-- 사이드바 -->
      <MypageSidebar />

      <!-- 메인 컨텐츠 영역 -->
      <section class="mt-3 flex-grow bg-white dark:bg-black8 p-6 rounded-lg  border border-black3 dark:border-black4">
        <slot />
      </section>
    </main>

    <BasicFooter />
  </div>
</template>


<style scoped>

</style>