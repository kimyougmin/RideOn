<script setup>
import { ref } from 'vue';
import PersonalInfo from './PersonalInfo.vue';
import Wishlist from './Wishlist.vue';
// import Cart from './Cart.vue';
import History from './History.vue';
import MypageSidebar from './MypageSidebar.vue';
import BasicHeader from '@/components/BasicHeader.vue';
import BasicFooter from '@/components/BasicFooter.vue';

// 현재 선택된 메뉴
const activeMenu = ref('profile');

// 메뉴 변경 함수 (사이드바에서 선택된 메뉴를 업데이트)
const updateActiveMenu = (menu) => {
  activeMenu.value = menu;
};

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};




</script>
<template>
  <div class="min-h-screen w-full dark:bg-black9 dark:text-black1">
    <BasicHeader :isDarkMode="isDarkMode" @toggle-dark-mode="toggleDarkMode" />

    <main class="w-[1440px] px-[93px] mx-auto pt-10 flex gap-8 mb-20">
      <MypageSidebar :activeMenu="activeMenu" @updateMenu="updateActiveMenu" class="w-[260px]"/>
      <section class="flex-grow p-6 rounded-lg">
        <PersonalInfo v-if="activeMenu === 'profile'" />
        <Wishlist v-if="activeMenu === 'wishlist'" />
        <History v-if="activeMenu === 'history'" />
      </section>
    </main>

    <BasicFooter />
  </div>
</template>