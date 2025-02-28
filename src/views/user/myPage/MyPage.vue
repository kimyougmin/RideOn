<template>
  <div class="flex flex-col min-h-screen dark:bg-black9 dark:text-white">
    <BasicHeader :isDarkMode="isDarkMode" @toggle-dark-mode="darkMode" />

    <main class="w-[1440px] px-[65px] mx-auto pt-10 flex gap-8 mb-20">
      <!-- 사이드바 (고정) -->
      <MypageSidebar :activeMenu="activeMenu" @updateMenu="updateActiveMenu" />

      <!-- 선택된 메뉴에 따라 내용 변경 -->
      <section class="flex-grow bg-white dark:bg-black8 p-6 rounded-lg ">
        <PersonalInfo v-if="activeMenu === 'profile'" />
        <Wishlist v-if="activeMenu === 'wishlist'" />
        <Cart v-if="activeMenu === 'cart'" />
        <History v-if="activeMenu === 'history'" />
      </section>
    </main>

    <BasicFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PersonalInfo from './PersonalInfo.vue';
// import Wishlist from './Wishlist.vue';
// import Cart from './Cart.vue';
// import History from './History.vue';
import MypageSidebar from './MypageSidebar.vue';
import BasicHeader from '@/components/BasicHeader.vue';
import BasicFooter from '@/components/BasicFooter.vue';

// 현재 선택된 메뉴
const activeMenu = ref('profile');

// 메뉴 변경 함수 (사이드바에서 선택된 메뉴를 업데이트)
const updateActiveMenu = (menu) => {
  activeMenu.value = menu;
};
</script>
