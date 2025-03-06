import axios from 'axios'

const devAPI = axios.create({
  baseURL: import.meta.env.VITE_LIKE_SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 사용자의 찜 목록 불러오기 API
export const fetchUserLikesApi = async (userId) => {
  try {
    const response = await devAPI.post(`/likes`, { id: userId })

    return response.data.data
  } catch (error) {
    console.error(' 찜 목록 불러오기 오류:', error)

    return []
  }
}


// 사용자 찜 삭제 api
export const removeUserLikeApi = async (title, userId) => {
  try {
    const response = await axios.post(`${API_URL}/like/remove`, { title, id: userId }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    return response.data;
  } catch (error) {
    console.error('찜 삭제 오류:', error);
    return null;
  }
};