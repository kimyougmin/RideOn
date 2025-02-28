<template>
  <aside class="w-[260px] min-h-screen p-6 bg-white dark:bg-black9 mr-auto">
    <!-- 프로필 정보 -->
    <div class="flex flex-col items-center gap-3">
      <!-- 프로필 이미지 -->
      <div class="w-[88px] h-[88px] rounded-full overflow-hidden border border-black3 dark:border-black5">
        <img
          :src="user.profileImage || defaultProfile"
          alt="프로필 이미지"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- 닉네임 -->
      <p class="text-lg font-bold dark:text-white">{{ user.nickname || '사용자' }}</p>
    </div>

    <!-- 네비게이션 메뉴 -->
    <nav class="mt-6 mr-10">
      <ul class="flex flex-col gap-4">
        <li v-for="menu in menus" :key="menu.id">
          <button
            class="w-full text-center px-3 py-2 text-base rounded-lg transition-all"
            :class="{
              'bg-black text-white dark:bg-white dark:text-black': activeMenu === menu.id,
              'hover:bg-black10 dark:hover:bg-black6 dark:text-white': activeMenu !== menu.id
            }"
            @click="$emit('updateMenu', menu.id)"
          >
            {{ menu.text }}
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import defaultProfile from './images/userImg.svg';

// 부모 컴포넌트에서 `activeMenu`를 전달받음
const props = defineProps({
  activeMenu: String,
});

// 유저 정보 (이후 API 연동 예정)
const user = ref({
  profileImage: '', // 프로필 이미지 URL (기본값: 빈 값)
  nickname: 'Chill guy', // 닉네임
});

// 사이드바 메뉴 리스트
const menus = ref([
  { id: 'profile', text: '개인 정보' },
  { id: 'wishlist', text: '찜 목록' },
  { id: 'cart', text: '장바구니' },
  { id: 'history', text: '활동내역' },
]);
</script>
