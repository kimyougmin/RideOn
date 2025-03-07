<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { postSignupApi } from '@/apis/auth'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY
const REDIRECT_URI = 'http://localhost:5173'

const router = useRouter()
const isLoggedIn = ref(false)  
const userInfo = ref(null) 

const loadKakaoSDK = () => {
  if (!window.Kakao) {
    const script = document.createElement('script')
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js'
    script.onload = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_REST_API_KEY)
      }
    }
    document.head.appendChild(script)
  } else {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_REST_API_KEY)
    }
  }
}

const kakaoLogin = () => {
  if (!window.Kakao) return

  window.Kakao.Auth.login({
    success: async () => {
      try {
        const userData = await getKakaoUserInfo()
        if (userData) await registerOrLogin(userData)
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error)
      }
    },
    fail: (error) => console.error('카카오 로그인 실패:', error),
  })
}

const getKakaoUserInfo = async () => {
  try {
    const res = await window.Kakao.API.request({ url: '/v2/user/me' })

    let userEmail = res.kakao_account?.email || `kakao_${res.id}@example.com`

    return {
      id: res.id.toString(),
      email: userEmail,
      fullname: res.kakao_account?.profile?.nickname || '카카오 사용자',
      profileImage: res.kakao_account?.profile?.profile_image_url || '',
    }
  } catch (error) {
    console.error('카카오 사용자 정보 요청 실패:', error)
    return null
  }
}

const registerOrLogin = async (userData) => {
  if (!userData.email || !userData.id || !userData.fullname) return

  try {
    await postSignupApi({
      email: userData.email,
      password: userData.id,
      fullname: userData.fullname,
    })

    await loginUser(userData)
  } catch (error) {
    if (error.response?.data === 'The email address is already being used.') {
      await loginUser(userData) // 이미 존재하는 계정이면 로그인 실행
    } else {
      console.error('회원가입 요청 실패:', error.response?.data || error)
    }
  }
}

const loginUser = async (userData) => {
  const userStore = useUserStore()
  try {
    const response = await axios.post('http://13.125.143.126:5004/login', {
      email: userData.email,
      password: userData.id,
    })

    const fullName = response.data.user.fullname || 'Chill guy'

    userStore.login(
      response.data.user.email,
      fullName,
      response.data.user._id,
      response.data.token
    )

    router.push('/mypage')
  } catch (error) {
    console.error('로그인 요청 실패:', error.response?.data || error)
  }
}

onMounted(() => {
  loadKakaoSDK()

  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    isLoggedIn.value = true
    userInfo.value = JSON.parse(storedUser)
  }
})
</script>

<template>
  <div class="w-[428px] flex flex-col items-center space-y-[19px] relative">
    <!-- 5초만의 회원 가입 말풍선 -->
    <div class="absolute top-[-20px] w-[200px] flex items-center justify-center">
      <img src="./icons/loginBox.svg" alt="빠른 회원가입" class="w-full" />
      <p class="absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[70%] 
               text-[13px] font-bold text-primaryRed whitespace-nowrap">
        5초만에 빠른 회원가입
      </p>
    </div>

    <!-- 카카오 로그인 버튼 -->
    <button type="button" class="w-full h-[47px] bg-[#FEE500] rounded flex items-center justify-center font-bold text-lg"
      @click="kakaoLogin">
      <div class="flex items-center justify-center gap-3">
        <img src="./icons/kakaoLogin.svg" alt="카카오 로그인" class="w-8 h-8" />
        <span>카카오로 로그인</span>
      </div>
    </button>

    <!-- 네이버 로그인 버튼 -->
    <button
      type="button"
      class="w-full h-[47px] bg-[#03C75A] text-black1 rounded flex items-center justify-center font-bold text-lg"
    >
      <div class="flex items-center justify-center gap-3">
        <img src="./icons/naverLogin.svg" alt="네이버 로그인" class="w-8 h-8" />
        <span>네이버로 로그인</span>
      </div>
    </button>
  </div>
</template>
