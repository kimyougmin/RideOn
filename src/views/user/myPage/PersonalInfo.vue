<script setup>
import { ref, watchEffect, defineProps, defineEmits, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { formatPhoneNumber } from '@/utils/format'
import defaultProfile from './images/userImg.svg'
import { getUserApi } from '@/apis/auth'  // 별도의 API 파일에서 사용자 정보를 가져오는 함수

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

const emit = defineEmits(['updateUser'])
const router = useRouter()
const userStore = useUserStore()

// 사용자 정보 관리: 초기값은 props.userData로 설정
const user = ref({ ...props.userData })

onMounted(async () => {
  // 로컬 스토리지에서 사용자 정보를 불러옴
  userStore.loadUser()
  // 만약 로그인되어 있지 않거나 _id가 없다면 로그인 페이지로 이동
  if (!userStore.isLoggedIn || !userStore.user._id) {
    router.push('/login')
  } else {
    try {
      // 서버에서 최신 사용자 정보를 가져옴
      const response = await getUserApi(userStore.user._id)
      const data = response.data
      
      // fullName이 "닉네임|추가정보" 형태라면 분리하여 nickname, birthDate, phone을 업데이트
      if (data.fullName) {
        const parts = data.fullName.split('|')
        data.nickname = parts[0] || 'Chill guy'
        if (parts[1]) {
          try {
            const additionalInfo = JSON.parse(parts[1])
            data.birthDate = additionalInfo.birthDate
            data.phone = additionalInfo.phone
          } catch (e) {
            console.error('추가 정보 파싱 에러:', e)
          }
        }
      }
      // 최신 정보를 user에 업데이트
      user.value = { ...data }
    } catch (error) {
      console.error('사용자 정보 불러오기 실패:', error)
      router.push('/login')
    }
  }
})

const formFields = ref({
  email: { label: '이메일', type: 'email', disabled: true },
  password: { label: '비밀번호', type: 'password', disabled: false },
  birthDate: { label: '생년월일', type: 'text', disabled: false },
  phone: { label: '휴대폰', type: 'text', disabled: false },
})

// 전화번호 자동 포맷 적용
const handleInput = (key, event) => {
  if (key === 'phone') {
    user.value.phone = formatPhoneNumber(event.target.value)
  }
}

watchEffect(() => {
  // 항상 문자열로 변환해서 formatPhoneNumber 적용 (null 방지)
  user.value.phone = formatPhoneNumber(String(user.value.phone || ''))
})

// 수정 버튼 클릭 시: 최신 정보를 부모로 emit하고 Pinia 스토어 및 로컬 스토리지에 저장
const updateProfile = async () => {
  try {
    // 필요한 경우, 서버 API 호출을 통해 수정 요청을 보낼 수 있습니다.
    emit('updateUser', user.value)
    userStore.user = { ...user.value }
    localStorage.setItem('user', JSON.stringify(userStore.user))
    alert('개인 정보가 수정되었습니다!')
  } catch (error) {
    console.error('개인 정보 수정 실패:', error)
    alert('개인 정보 수정에 실패하였습니다.')
  }
}
</script>

<template>
  <section class="w-[728px] h-[822px] bg-black1 dark:bg-black9 p-8 rounded-lg border border-black3 dark:border-black4 ml-[100px]">
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
      <p class="text-lg font-bold dark:text-black1">{{ user.nickname + '  ✏️' }}</p>
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
                 dark:border-black5 dark:text-black1 dark:bg-black7 text-center
                 dark:focus:border-black1"
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
