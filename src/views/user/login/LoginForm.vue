<script setup>
import { ref, onMounted, watchEffect, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { postSigninApi } from '@/apis/auth'
import { useUserStore } from '@/stores/user'
import LoginButtons from './LoginButtons.vue'
import AlertComponent from '../myPage/components/Alert.vue'

const router = useRouter()
const isDarkMode = ref(false)
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const emailError = ref('')
const passwordError = ref('')
const apiError = ref('')
const isLoading = ref(false)
const userStore = useUserStore()
const isFocused = ref({ email: false, password: false })

const emailRef = ref(null)
const passwordRef = ref(null)

const handleFocus = (field) => {
  isFocused.value[field] = true
}

const showAlert = ref(false)
const alertType = ref('success')
const alertMessage = ref('')

const handleSubmit = async () => {
  validateEmail()
  validatePassword()

  if (!emailError.value && !passwordError.value) {
    try {
      isLoading.value = true
      apiError.value = ''

      const response = await postSigninApi({ email: email.value, password: password.value })

      if (
        !response ||
        !response.user ||
        !response.user.email ||
        !response.user.fullName ||
        !response.user._id ||
        !response.token
      ) {
        throw new Error('잘못된 응답 데이터입니다.')
      }

      userStore.login(
        response.user.email,
        response.user.fullName,
        response.user._id,
        response.token,
      )
      alertType.value = 'success'
      alertMessage.value = '로그인에 성공하셨습니다!'
      showAlert.value = true
      setTimeout(() => {
        if (showAlert.value) {
          showAlert.value = false
          router.push('/')
        }
      }, 4000)
    } catch (error) {
      console.error('로그인 실패:', error.response?.data || error.message)
      apiError.value = '이메일 또는 비밀번호가 올바르지 않습니다.'
      alertType.value = 'error'
      alertMessage.value = '이메일 또는 비밀번호가 올바르지 않습니다.'
      showAlert.value = true
    } finally {
      isLoading.value = false
    }
  }
}

const applyTheme = async (theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
    isDarkMode.value = true
  } else {
    document.documentElement.classList.remove('dark')
    isDarkMode.value = false
  }
  localStorage.setItem('theme', theme)
  await nextTick()
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    applyTheme(savedTheme)
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    applyTheme(prefersDark ? 'dark' : 'light')
  }
})

watchEffect(() => {
  document.documentElement.classList.toggle('dark', isDarkMode.value)
})

const validateEmail = () => {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
  emailError.value = emailRegex.test(email.value) ? '' : '올바른 이메일 형식이 아닙니다.'
}

const validatePassword = () => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}|[\]\\:";'<>?,./]).{8,16}$/
  passwordError.value = passwordRegex.test(password.value) ? '' : '영문, 숫자, 특수문자 포함 8~16자'
}

const handleAlertClose = () => {
  showAlert.value = false
  // 성공 알림인 경우 즉시 홈으로 이동
  if (alertType.value === 'success') {
    router.push('/')
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="w-full flex flex-col items-center">
    <div class="w-[428px] space-y-[32px]">
      <button type="submit" class="hidden"></button>
      <!-- 이메일 -->
      <div>
        <label class="block text-sm font-medium mb-1 text-black7 dark:text-black3">이메일</label>
        <input
          v-model="email"
          type="email"
          ref="emailRef"
          class="w-full h-[48px] p-3 border border-black4 rounded text-base bg-transparent focus:border-primaryRed outline-none dark:border-black1 dark:placeholder:text-black1 dark:text-black1 placeholder:text-black4"
          placeholder="이메일을 입력하세요."
          @blur="validateEmail"
        />
        <p class="text-primaryRed text-sm h-5">{{ emailError }}</p>
      </div>

      <!-- 비밀번호 -->
      <div>
        <label class="block text-sm font-medium mb-1 text-black7 dark:text-black3">비밀번호</label>
        <input
          v-model="password"
          type="password"
          ref="passwordRef"
          class="w-full h-[48px] p-3 border border-black4 rounded text-base bg-transparent focus:border-primaryRed outline-none dark:border-black1 dark:placeholder:text-black1 dark:text-black1 placeholder:text-black4"
          placeholder="비밀번호를 입력하세요."
          @focus="handleFocus('password')"
          @blur="validatePassword"
        />
        <p class="text-primaryRed text-sm h-5">{{ passwordError }}</p>
      </div>

      <!-- 체크박스 및 링크 -->
      <div class="flex justify-between items-center text-sm mb-1 w-[428px] -mt-[16px]">
        <div class="flex items-center">
          <label class="flex items-center cursor-pointer">
            <input type="checkbox" class="mr-2" v-model="rememberMe" />
            <p class="cursor-pointer dark:text-black3 mt-[15px]">아이디 저장</p>
          </label>
        </div>
        <div>
          <a href="#" class="mr-2 dark:text-black3">아이디 찾기</a>
          <a href="#" class="dark:text-black3">비밀번호 찾기</a>
        </div>
      </div>

      <!-- LoginButtons 컴포넌트 -->
      <LoginButtons class="mt-[15px]" />

      <!-- 로그인 버튼 -->
      <p
        class="w-[428px] h-[47px] border rounded text-lg font-bold -translate-y-2 transition-all focus:ring-2 focus:ring-primaryRed flex items-center justify-center cursor-pointer bg-black7 text-black1 border-black7 hover:bg-primaryRed hover:text-white dark:bg-black3 dark:text-black7 dark:border-black3 dark:hover:bg-primaryRed"
        @click="handleSubmit"
        @keydown.enter="handleSubmit"
      >
        {{ isLoading ? '로그인 중...' : '로그인' }}
      </p>

      <p v-if="apiError" class="text-primaryRed text-sm text-center mt-2">{{ apiError }}</p>

      <p class="mt-[10px] text-sm dark:text-black3 text-center">
        Wherever you want, <span class="text-primaryRed font-bold">RideOn</span>
        <a href="/" class="underline ml-1 dark:text-blue-400 text-blue-600">홈으로 돌아가기</a>
      </p>
    </div>
  </form>
  <!-- alert -->
  <AlertComponent
    :type="alertType || 'success'"
    :message="alertMessage"
    :visible="showAlert"
    @close="handleAlertClose"
  />
</template>
