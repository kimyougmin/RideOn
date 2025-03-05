import axios from 'axios'

const API_URL = import.meta.env.VITE_LIKE_SERVER

// 사용자의 찜 목록 불러오기 API
export const fetchUserLikesApi = async (userId) => {
  try {
    const response = await axios.post(`${API_URL}/likes`, { id: userId })

    return response.data.data
  } catch (error) {
    console.error(' 찜 목록 불러오기 오류:', error)

    return []
  }
}
