<script setup>
import { ref, onMounted, defineProps, defineEmits, watch, watchEffect, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getUserApi } from '@/apis/auth'
import { updateUserSettings, updateUserPassword } from '@/apis/userSettings'
import { uploadUserPhoto } from '@/apis/uploadPhoto'
import defaultProfile from './images/userImg.svg'
import { useUserStore } from '@/stores/user'
import { formatPhoneNumber } from '@/utils/format'
// import useSignupValidation from '../signup/useSignupValidation'

const props = defineProps({
  userData: {
    type: Object,
    default: () => ({
      image: '',
      nickname: 'Chill guy',
      email: '',
      password: '',
      birthDate: '',
      phone: '',
    }),
  },
})

const emit = defineEmits(['updateUser', 'changeNickname'])
const router = useRouter()
const userStore = useUserStore()

const user = ref({ ...props.userData })
const isDataLoaded = ref(false)

const profileImageVersion = ref(Date.now())

const fileInput = ref(null)

const profileImageSrc = computed(() => {
  return user.value.image ? user.value.image + '?v=' + profileImageVersion.value : defaultProfile
})

const loadUserInfo = async () => {
  if (userStore.isLoggedIn && userStore.user._id) {
    try {
      const response = await getUserApi(userStore.user._id)
      const data = response.data

      let nickname = '사용자'
      let birthDate = ''
      let phone = ''
      let imageUrl = data.image || data.profileImage || ''

      if (data.fullName) {
        const parts = data.fullName.split('|').map((p) => p.trim())

        nickname = parts[0] || '사용자'

        // Base64로 인코딩된 JSON 데이터 디코딩 후 추출
        if (parts[1]) {
          try {
            const decodedData = JSON.parse(atob(parts[1]))
            birthDate = decodedData.birthDate || ''
            phone = decodedData.phone || ''
          } catch (e) {
            console.error('Base64 디코딩 실패:', e)
          }
        }
      }

      // 이미지가 존재하면 캐시 우회 파라미터 추가
      if (imageUrl) {
        imageUrl += `?v=${Date.now()}`
      }

      user.value = {
        ...props.userData,
        ...data,
        token: userStore.user.token,
        nickname,
        birthDate,
        phone,
        image: imageUrl,
      }

      userStore.user = {
        ...userStore.user,
        name: nickname,
        image: imageUrl,
      }

      localStorage.setItem('user', JSON.stringify(userStore.user))
      profileImageVersion.value = Date.now()
    } catch (error) {
      console.error('사용자 정보 불러오기 실패:', error)
    }
  }
}

onMounted(async () => {
  userStore.loadUser()
  if (!userStore.isLoggedIn || !userStore.user._id) {
    router.push('/login')
    return
  }
  await loadUserInfo()
  isDataLoaded.value = true
})

watch(
  () => userStore.user,
  (newUser) => {
    if (newUser && newUser._id) {
      const updatedImage = newUser.image || newUser.profileImage || ''
      user.value.image = updatedImage

      const updatedName =
        newUser.name || (newUser.fullName ? newUser.fullName.split('|')[0].trim() : '사용자')
      user.value.nickname = updatedName
    }
  },
  { deep: true, immediate: true },
)

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
  const newName = prompt('새 닉네임을 입력하세요', user.value.nickname)
  if (newName && newName !== user.value.nickname) {
    user.value.nickname = newName
    emit('changeNickname', newName)
  }
}

const changeProfileImage = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const handleFileChange = async (e) => {
  const files = e.target.files
  if (!files || !files.length) return
  const file = files[0]

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

  try {
    await uploadUserPhoto(file, token)

    setTimeout(async () => {
      await loadUserInfo()
      profileImageVersion.value = Date.now()
    }, 1000)

    alert('프로필 이미지가 수정되었습니다!')
  } catch (error) {
    console.error('프로필 이미지 수정 실패:', error)
    alert('프로필 이미지 수정에 실패하였습니다.')
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
      alert('세션이 만료되었습니다. 다시 로그인해주세요.')
      router.push('/login')
      return
    }

    const currentImage = user.value.image

    const updatedFullName = `${user.value.nickname}|${btoa(
      JSON.stringify({
        birthDate: user.value.birthDate,
        phone: user.value.phone,
      }),
    )}|{}`

    const userPayload = {
      fullName: updatedFullName,
      username: user.value.nickname,
    }

    await updateUserSettings(userPayload, token)
    if (user.value.password) {
      await updateUserPassword(user.value.password, token)
    }

    await loadUserInfo()
    user.value.image = currentImage
    const updatedUser = {
      _id: userStore.user._id,
      email: userStore.user.email,
      name: user.value.nickname,
      image: currentImage,
      token: userStore.user.token,
      isLoggedIn: true,
    }

    emit('updateUser', updatedUser)
    userStore.user = updatedUser
    localStorage.setItem('user', JSON.stringify(updatedUser))

    alert('개인 정보가 수정되었습니다!')
  } catch (error) {
    console.error('개인 정보 수정 실패:', error)
    alert('개인 정보 수정에 실패하였습니다.')
  }
}
</script>

<template>
  <div v-if="!isDataLoaded" class="text-center">로딩 중...</div>
  <section
    v-else
    class="w-[728px] h-[822px] bg-black1 dark:bg-black9 p-8 rounded-lg border border-black3 dark:border-black4 ml-[100px]"
  >
    <h2 class="text-2xl font-bold text-black9 dark:text-black1 flex items-center gap-2">
      개인 정보 <span>⚙️</span>
    </h2>
    <p class="text-sm text-black6 dark:text-black3 mt-2">
      회원님의 개인정보를 안전하게 관리하세요. 프로필사진, 이름, 이메일, 비밀번호, 생년월일, 휴대폰
      번호를 직접 수정할 수 있으며, 정기적인 비밀번호 변경을 권장합니다.
    </p>
    <div class="flex flex-col items-center gap-3 mt-6">
      <div
        class="relative w-[88px] h-[88px] rounded-full overflow-hidden border border-black3 dark:border-black5"
      >
        <img
          :src="profileImageSrc || defaultProfile"
          alt="프로필 이미지"
          class="w-full h-full object-cover hover:cursor-pointer"
          referrerpolicy="no-referrer-when-downgrade"
          @click="changeProfileImage"
        />
        <input
          type="file"
          ref="fileInput"
          style="display: none"
          accept="image/*"
          @change="handleFileChange"
        />
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
          class="w-[408px] h-[49px] p-3 border rounded text-base bg-transparent focus:border-primaryRed outline-none dark:border-black5 dark:text-black1 dark:bg-black7 text-center dark:focus:border-black1"
        />
      </div>
    </div>
    <button
      class="w-[196px] h-[39px] border rounded text-md font-bold mt-[35px] transition-all bg-black10 text-black1 border-black7 hover:bg-primaryRed hover:text-black1 dark:bg-black1 dark:text-black7 dark:border-black4 block mx-auto dark:hover:bg-primaryRed dark:hover:text-black1"
      @click="updateProfile"
    >
      수정 완료
    </button>
  </section>
</template>
