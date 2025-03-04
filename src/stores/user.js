import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    _id: null,
    email: null,
    name: null,
    isLoggedIn: false,
  })

  const login = (email, fullName, id) => {
    const name = fullName.split('|')[0]

    user.value._id = id
    user.value.email = email
    user.value.name = name
    user.value.isLoggedIn = true

    localStorage.setItem('user', JSON.stringify(user.value))
  }

  const logout = () => {
    user.value._id = null
    user.value.email = null
    user.value.name = null
    user.value.isLoggedIn = false
    localStorage.removeItem('user')
  }

  const loadUser = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      user.value = JSON.parse(savedUser)
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

