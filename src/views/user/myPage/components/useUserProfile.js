import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { getUserApi } from '@/apis/auth'

export default function useUserProfile() {
  const router = useRouter()
  const userStore = useUserStore()
  const user = ref(null)
  const isLoading = ref(true)

  const loadUserProfile = async () => {
    // 로컬 스토리지에서 저장된 사용자 정보 불러오기
    userStore.loadUser()
    if (!userStore.isLoggedIn || !userStore.user._id) {
      router.push('/login')
      return
    }
    try {
      const response = await getUserApi(userStore.user._id)
      const data = response.data

      if (data.fullName) {
        const parts = data.fullName.split('|')
        // 닉네임
        data.nickname = parts[0] || 'Chill guy'
        if (parts[1]) {
          try {
            const decoded = atob(parts[1])  // Base64 디코딩
            const additionalInfo = JSON.parse(decoded)
            data.birthDate = additionalInfo.birthDate || ''
            data.phone = additionalInfo.phone || ''
          } catch (e) {
            console.error('Base64/JSON 파싱 에러:', e)
          }
        }
        // 세 번째 파트 (있다면) 처리
        if (parts[2]) {
          try {
            const extraData = JSON.parse(parts[2])
            // 필요한 추가 정보를 여기서 처리 (예: data.someField = extraData.someValue)
          } catch (e) {
            console.error('세 번째 파트 파싱 에러:', e)
          }
        }
      }
      user.value = { ...data }
    } catch (error) {
      console.error('사용자 정보 불러오기 실패:', error)
      router.push('/login')
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    loadUserProfile()
  })

  return { user, isLoading, loadUserProfile }
}
