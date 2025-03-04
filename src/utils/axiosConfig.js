import axios from 'axios'

// Axios 인스턴스 생성
const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const getToken = () => {
  const user = localStorage.getItem('user')
  const userData = JSON.parse(user)

  if (!userData) {
    alert('로그인 후 이용해주세요.')
    window.location.href = '/login'
  }

  return userData.token
}

// 요청 인터셉터 설정 (토큰 추가)
axiosApi.interceptors.request.use(
  (config) => {
    const token = getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// 응답 인터셉터 설정 (토큰 만료 처리)
axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response?.status === 401 ||
      error.response?.status === 403 ||
      error.response?.status === 404
    ) {
      console.warn('토큰이 만료되었습니다.')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
  },
)

export default axiosApi
