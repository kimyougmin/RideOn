import axios from 'axios'

const devAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const postSignupApi = async ({ email, password, nickname, phone, birthDate }) => {
  try {
    const additionalInfo = JSON.stringify({ phone, birthDate }) 

    const response = await devAPI.post('/signup', {
      email,
      password,
      fullName: `${nickname}|${additionalInfo}`, 
    })
    return response.data
  } catch (error) {
    console.error('회원가입 오류:', error.response?.data || error.message)
    throw error
  }
}



export const postSigninApi = async ({ email, password }) => {
  try {
    const response = await devAPI.post('/login', { email, password })
    return response.data
  } catch (error) {
    console.error('로그인 오류:', error.response?.data || error.message)
    throw error
  }
}
