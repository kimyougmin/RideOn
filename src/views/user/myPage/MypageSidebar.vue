<script setup>
import { ref, onMounted, defineProps, defineEmits, watch, watchEffect, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getUserApi } from '@/apis/auth'
import { useUserStore } from '@/stores/user'
import defaultProfile from './images/userImg.svg'

const props = defineProps({
  activeMenu: String,
})

const emit = defineEmits(['updateMenu'])
const router = useRouter()
const userStore = useUserStore()

// 초기 기본 유저 정보 (API 연동 전 기본값)
const user = ref({
  image: '',
  nickname: '사용자',
})

// 사이드바 메뉴 리스트
const menus = ref([
  { id: 'profile', text: '개인 정보' },
  { id: 'wishlist', text: '찜 목록' },
  { id: 'cart', text: '장바구니' },
  { id: 'history', text: '활동내역' },
  { id: 'logout', text: '로그아웃' },
])

// 서버에서 사용자 정보를 불러와 로컬 user를 업데이트하는 함수
const loadUserInfo = async () => {
  if (userStore.isLoggedIn && userStore.user._id) {
    try {
      const response = await getUserApi(userStore.user._id)
      const data = response.data

      // fullName 파싱: '|' 기준으로 분리하여 첫 번째 부분을 닉네임으로 사용
      let nickname = '사용자'
      if (data.fullName) {
        const parts = data.fullName.split('|').map(p => p.trim())
        nickname = parts[0] || '사용자'
      }
      
      // 이미지: data.image 또는 data.profileImage가 있다면 사용
      const imageUrl = data.image || data.profileImage || ''

      // 로컬 user 상태 업데이트
      user.value = {
        image: imageUrl,
        nickname: nickname,
      }
    } catch (error) {
      console.error('사용자 정보 불러오기 실패:', error)
    }
  }
}

onMounted(async () => {
  await loadUserInfo()
})

// userStore.user 전체를 watch하여 변경 시 로컬 user 업데이트
watch(
  () => userStore.user,
  (newUser) => {
    if (newUser && newUser._id) {
      // 이미지가 없으면 profileImage도 확인
      const updatedImage = newUser.image || newUser.profileImage || ''
      user.value.image = updatedImage

      // 이름: userStore.user.name이 있으면 사용, 없으면 fullName 파싱
      const updatedName = newUser.name
        ? newUser.name
        : (newUser.fullName ? newUser.fullName.split('|')[0].trim() : '사용자')
      user.value.nickname = updatedName
    }
  },
  { deep: true, immediate: true }
)
</script>

<template>
  <aside class="w-[260px] min-h-screen p-6 bg-black1 dark:bg-black9 mr-auto">
    <!-- 프로필 정보 -->
    <div class="flex flex-col items-center gap-3">
      <!-- 프로필 이미지 -->
      <div class="w-[88px] h-[88px] rounded-full overflow-hidden border border-black3 dark:border-black5">
        <img
          :src="user.image || defaultProfile"
          alt="프로필 이미지"
          class="w-full h-full object-cover"
        />
      </div>
      <!-- 닉네임 -->
      <p class="text-lg font-bold dark:text-black1">{{ user.nickname }}</p>
    </div>
    <!-- 네비게이션 메뉴 -->
    <nav class="mt-6 mr-10">
      <ul class="flex flex-col gap-4">
        <li v-for="menu in menus" :key="menu.id">
          <button
            class="w-full text-center px-3 py-2 text-base font-bold rounded-lg transition-colors min-w-[150px]"
            :class="activeMenu === menu.id 
              ? 'bg-black7 text-black1 dark:bg-black1 dark:text-black7'
              : 'bg-black1 text-black7 dark:bg-black9 dark:text-black1 hover:bg-black7 dark:hover:bg-black5 hover:text-black1 dark:hover:text-black1'"
            @click="$emit('updateMenu', menu.id)"
          >
            {{ menu.text }}
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>
