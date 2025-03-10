import axios from 'axios'

const getToken = () => {
  const user = localStorage.getItem('user')
  if (!user) return null

  try {
    const userData = JSON.parse(user)
    return userData?.token || null
  } catch (error) {
    console.error('토큰 파싱 오류:', error)
    return null
  }
}

// Axios 인스턴스 생성
const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const naverApiInstance = axios.create({
  baseURL: '/naver-api/v1/search',
  headers: {
    'Content-Type': 'application/json',
    'X-Naver-Client-Id': import.meta.env.VITE_NAVER_SHOPPING_CLIENT_ID,
    'X-Naver-Client-Secret': import.meta.env.VITE_NAVER_SHOPPING_CLIENT_SECRET,
  },
})

// 요청 인터셉터 설정 (토큰 추가)
axiosApi.interceptors.request.use(
  (config) => {
    const token = getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 응답 인터셉터 설정 (토큰 만료 처리)
axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert('로그인이 필요한 서비스입니다.')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default axiosApi
