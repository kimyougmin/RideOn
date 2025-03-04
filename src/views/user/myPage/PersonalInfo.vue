<script setup>
import { ref, watchEffect, defineProps, defineEmits, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { formatPhoneNumber } from '@/utils/format'
import defaultProfile from './images/userImg.svg'
import { getUserApi } from '@/apis/auth'       
import { updateUserSettings } from '@/apis/userSettings' 
// 추후 파일 분리
import axios from 'axios'

const props = defineProps({
  userData: {
    type: Object,
    default: () => ({
      profileImage: '',
      nickname: 'Chill guy',
      email: '',
      password: '',
      birthDate: '',
      phone: ''
    }),
  },
})

const emit = defineEmits(['updateUser', 'changeNickname'])
const router = useRouter()
const userStore = useUserStore()

const user = ref({ ...props.userData })
const isDataLoaded = ref(false)

onMounted(async () => {
  userStore.loadUser()
  if (!userStore.isLoggedIn || !userStore.user._id) {
    router.push('/login')
    return
  }
  try {
    const response = await getUserApi(userStore.user._id)
    const data = response.data

    if (data.fullName) {
      const parts = data.fullName.split('|').map(p => p.trim())
      data.nickname = parts[0] || 'Chill guy'
      if (parts[1]) {
        try {
          const decoded = atob(parts[1])
          const additionalInfo = JSON.parse(decoded)
          data.birthDate = additionalInfo.birthDate || ''
          data.phone = additionalInfo.phone || ''
        } catch (e) {
          console.error('Base64/JSON 파싱 에러:', e)
        }
      }
      if (parts[2]) {
        try {
          const extraData = JSON.parse(parts[2])
        } catch (e) {
          console.error('세 번째 파트 파싱 에러:', e)
        }
      }
    }
    user.value = { ...props.userData, ...data, token: userStore.user.token }
    isDataLoaded.value = true
  } catch (error) {
    console.error('사용자 정보 불러오기 실패:', error)
    router.push('/login')
  }
})

const formFields = ref({
  email: { label: '이메일', type: 'email', disabled: true },
  password: { label: '비밀번호', type: 'password', disabled: false },
  birthDate: { label: '생년월일', type: 'text', disabled: false },
  phone: { label: '휴대폰', type: 'text', disabled: false },
})

watchEffect(() => {
  if (user.value) {
    user.value.phone = formatPhoneNumber(String(user.value.phone || ''))
  }
})

const handleInput = (key, event) => {
  if (key === 'phone' && user.value) {
    user.value.phone = formatPhoneNumber(event.target.value)
  }
}

const changeNickname = () => {
  const newNickname = prompt('새 닉네임을 입력하세요', user.value.nickname)
  if (newNickname && newNickname !== user.value.nickname) {
    user.value.nickname = newNickname
    emit('changeNickname', newNickname)
  }
}

const updateProfile = async () => {
  try {
    let storedToken = localStorage.getItem('userInfo') || localStorage.getItem('user')
    let token = null
    if (storedToken) {
      if (storedToken.trim().startsWith('{')) {
        try {
          const parsed = JSON.parse(storedToken)
          token = parsed.token
        } catch (e) {
          console.error('토큰 파싱 에러:', e)
        }
      } else {
        token = storedToken
      }
    }
    if (!token) {
      alert('토큰이 없습니다. 다시 로그인해주세요.')
      router.push('/login')
      return
    }

    // fullName 업데이트: 이름, 생년월일, 휴대폰 번호를 하나의 문자열로 결합
    const updatedFullName = `${user.value.nickname}|${btoa(JSON.stringify({
      birthDate: user.value.birthDate,
      phone: user.value.phone,
    }))}|{}`
    const userPayload = {
      fullName: updatedFullName,
      username: user.value.nickname,
    }
    await updateUserSettings(userPayload, token)

    // 비밀번호 업데이트: 비밀번호 필드에 값이 있을때만 따로 변경 
    if (user.value.password) {
      await axios.put(
        'http://13.209.75.182:5004/settings/update-password',
        { password: user.value.password },
        {
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
    }

    emit('updateUser', user.value)
    userStore.user = { ...userStore.user, ...user.value }
    localStorage.setItem('user', JSON.stringify(userStore.user))
    alert('개인 정보가 수정되었습니다!')
  } catch (error) {
    console.error('개인 정보 수정 실패:', error)
    alert('개인 정보 수정에 실패하였습니다.')
  }
}
</script>

<template>
  <div v-if="!isDataLoaded" class="text-center">로딩 중...</div>
  <section v-else class="w-[728px] h-[822px] bg-black1 dark:bg-black9 p-8 rounded-lg border border-black3 dark:border-black4 ml-[100px]">
    <h2 class="text-2xl font-bold text-black9 dark:text-black1 flex items-center gap-2">
      개인 정보 <span>⚙️</span>
    </h2>
    <p class="text-sm text-black6 dark:text-black3 mt-2">
      회원님의 개인정보를 안전하게 관리하세요. 프로필사진, 이름, 이메일, 비밀번호, 생년월일, 휴대폰 번호를 직접 수정할 수 있으며, 정기적인 비밀번호 변경을 권장합니다.
    </p>
    <div class="flex flex-col items-center gap-3 mt-6">
      <div class="w-[88px] h-[88px] rounded-full overflow-hidden border border-black3 dark:border-black5">
        <img :src="user.profileImage || defaultProfile" alt="프로필 이미지" class="w-full h-full object-cover" />
      </div>
      <p class="text-lg font-bold dark:text-black1 cursor-pointer" @click="changeNickname">
        {{ user.nickname || 'Chill guy' }} ✏️
      </p>
    </div>
    <div class="mt-4 space-y-10">
      <div v-for="(field, key) in formFields" :key="key" class="flex flex-col items-center">
        <label class="block text-sm font-medium text-black7 dark:text-black3 text-center mb-1">
          {{ field.label }}
        </label>
        <input
          v-model="user[key]"
          :type="field.type"
          :disabled="field.disabled"
          @input="handleInput(key, $event)"
          class="w-[408px] h-[49px] p-3 border rounded text-base bg-transparent focus:border-primaryRed outline-none
                 dark:border-black5 dark:text-black1 dark:bg-black7 text-center dark:focus:border-black1"
        />
      </div>
    </div>
    <button
      class="w-[196px] h-[39px] border rounded text-md font-bold mt-[35px] transition-all
             bg-black10 text-black1 border-black7 hover:bg-primaryRed hover:text-black1
             dark:bg-black1 dark:text-black7 dark:border-black4 block mx-auto dark:hover:bg-primaryRed dark:hover:text-black1"
      @click="updateProfile"
    >
      수정 완료
    </button>
  </section>
</template>
