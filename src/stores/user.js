import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    _id: null,
    email: null,
    name: null,
    token: null,
    isLoggedIn: false,
  })

  const login = (email, fullName = 'Chill guy', id, token) => {
    const name = fullName ? fullName.split('|')[0] : 'Chill guy'  
    user.value = {
      _id: id,
      email,
      name,
      token,
      isLoggedIn: true,
    }
    localStorage.setItem('user', JSON.stringify(user.value))
  }
  

  const logout = () => {
    user.value = {
      _id: null,
      email: null,
      name: null,
      token: null,
      isLoggedIn: false,
    }
    localStorage.removeItem('user')
  }

  const loadUser = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser)
        // 토큰과 _id가 있으면 로그인 상태로 복원
        if (parsed && parsed._id && parsed.token) {
          user.value = parsed
        } else {
          // 필수 정보가 없으면 로그아웃 처리
          logout()
        }
      } catch (error) {
        console.error('사용자 정보 로드 실패:', error)
        logout()
      }
    }
  }

  return {
    user,
    login,
    logout,
    loadUser,
    isLoggedIn: computed(() => user.value.isLoggedIn),
  }
})
