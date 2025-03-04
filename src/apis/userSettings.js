import axios from 'axios'

const devAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 닉네임 전화번호 생년월일 수정 API
export const updateUserSettings = async (payload, token) => {
  try {
    const response = await devAPI.put('/settings/update-user', payload, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('회원정보 수정 오류:', error.response?.data || error.message)
    throw error
  }
}

// 비밀번호 수정 API
export const updateUserPassword = async (password, token) => {
  try {
    const response = await devAPI.put(
      '/settings/update-password',
      { password },
      {
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('비밀번호 수정 오류:', error.response?.data || error.message)
    throw error
  }
}