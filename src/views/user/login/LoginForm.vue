

<script>
import { ref, onMounted, watchEffect, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { postSigninApi } from '@/apis/auth'
import { useUserStore } from '@/stores/user'
import LoginButtons from './LoginButtons.vue'

export default {
  components: { LoginButtons },
  setup() {
    const email = ref('')
    const password = ref('')
    const rememberMe = ref(false)
    const emailError = ref('')
    const passwordError = ref('')
    const apiError = ref('')
    const isLoading = ref(false)
    const userStore = useUserStore()
    const router = useRouter()
    const isDarkMode = ref(false)
    const isFocused = ref({ email: false, password: false })

    const emailRef = ref(null)
    const passwordRef = ref(null)

    const handleFocus = (field) => {
      isFocused.value[field] = true
    }

    const updateEmail = (event) => {
      email.value = event.target.innerText
    }

    const updatePassword = (event) => {
      password.value = event.target.innerText
    }

    const handleSubmit = async () => {
      validateEmail()
      validatePassword()

      if (!emailError.value && !passwordError.value) {
        try {
          isLoading.value = true
          apiError.value = ''

          const response = await postSigninApi({ email: email.value, password: password.value })

          console.log(' 로그인에 성공한 데이터', response)

          if (!response || !response.user || !response.user.email || !response.user.fullName) {
            throw new Error('잘못된 응답 데이터입니다.')
          }

          userStore.login(response.user.email, response.user.fullName)
          alert('로그인에 성공 하셨습니다.')
          router.push('/')
        } catch (error) {
          console.error(' 로그인 실패:', error.response?.data || error.message)
          apiError.value = '이메일 또는 비밀번호가 올바르지 않습니다.'
          alert('이메일 또는 비밀번호가 올바르지 않습니다.')
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
      passwordError.value = passwordRegex.test(password.value)
        ? ''
        : '영문, 숫자, 특수문자 포함 8~16자'
    }

    return {
      email,
      password,
      rememberMe,
      emailError,
      passwordError,
      apiError,
      isLoading,
      isDarkMode,
      isFocused,
      emailRef,
      passwordRef,
      handleFocus,
      updateEmail,
      updatePassword,
      validateEmail,
      validatePassword,
      handleSubmit,
    }
  },
}
</script>


<template>
  <form @submit.prevent="handleSubmit" class="w-full flex flex-col items-center">
    <div class="w-[428px]">
      <label class="block text-sm font-medium mb-1 text-black7 dark:text-black3">이메일</label>
      <p
        ref="emailRef"
        contenteditable="true"
        class="w-full h-[48px] p-3 border rounded text-base bg-transparent focus:border-primaryRed outline-none"
        :class="
          isDarkMode
            ? 'border-black1 text-black1'
            : 'border-black4 text-black4 placeholder-gray-400'
        "
        @input="updateEmail"
        @focus="handleFocus('email')"
        @blur="validateEmail"
      >
        <span
          v-if="!email && !isFocused.email"
          class="placeholder"
          :style="{ color: isDarkMode ? 'black1' : 'black4' }"
        >
          이메일을 입력하세요.
        </span>
      </p>
      <p class="text-primaryRed text-sm h-5">{{ emailError }}</p>
    </div>

    <div class="w-[428px]">
      <label class="block text-sm font-medium mb-1 text-black7 dark:text-black3">비밀번호</label>
      <p
        ref="passwordRef"
        contenteditable="true"
        class="w-full h-[48px] p-3 border rounded text-base bg-transparent focus:border-primaryRed outline-none"
        :class="
          isDarkMode
            ? 'border-black1 text-black1'
            : 'border-black4 text-black4 placeholder-gray-400'
        "
        @input="updatePassword"
        @focus="handleFocus('password')"
        @blur="validatePassword"
      >
        <span
          v-if="!password && !isFocused.password"
          class="placeholder"
          :style="{ color: isDarkMode ? 'black1' : 'black7' }"
        >
          비밀번호를 입력하세요.
        </span>
      </p>
      <p class="text-primaryRed text-sm h-5">{{ passwordError }}</p>
    </div>

    <div class="flex justify-between items-center text-sm mb-1 w-[428px] -mt-[16px]">
      <div class="flex items-center">
        <label class="flex items-center cursor-pointer">
          <input type="checkbox" class="mr-2" v-model="rememberMe" />
          <p
            class="cursor-pointer"
            :class="isDarkMode ? 'text-black3 mt-[15px]' : 'text-black7 mt-[15px]'"
          >
            아이디 저장
          </p>
        </label>
      </div>
      <div>
        <a href="#" :class="isDarkMode ? 'text-black4' : 'text-black5'" class="mr-2">아이디 찾기</a>
        <a href="#" :class="isDarkMode ? 'text-black4' : 'text-black5'">비밀번호 찾기</a>
      </div>
    </div>

    <LoginButtons class="mt-[15px]" />

    <p
      class="w-[428px] h-[47px] border rounded text-lg font-bold mt-[15px] transition-all focus:ring-2 focus:ring-primaryRed flex items-center justify-center cursor-pointer"
      :class="
        isDarkMode
          ? 'bg-black1 text-black7 border-black1 hover:bg-primaryRed hover:text-white'
          : 'bg-black7 text-black1 border-black7 hover:bg-primaryRed hover:text-white'
      "
      @click="handleSubmit"
    >
      {{ isLoading ? '로그인 중...' : '로그인' }}
    </p>

    <p v-if="apiError" class="text-primaryRed text-sm text-center mt-2">
      {{ apiError }}
    </p>

    <p class="mt-[15px] text-sm" :class="isDarkMode ? 'text-black4' : 'text-black5'">
      Wherever you want, <span class="text-primaryRed font-bold">RideOn</span>
      <a href="/" class="underline ml-1" :class="isDarkMode ? 'text-blue-400' : 'text-blue-600'">
        홈으로 돌아가기
      </a>
    </p>
  </form>
</template>