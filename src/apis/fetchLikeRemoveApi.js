import axios from 'axios'

const devAPI = axios.create({
  baseURL: import.meta.env.VITE_LIKE_SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
})


//  찜 삭제 API
export const fetchLikeRemoveApi = async ({ title, id }) => {
  try {
    const response = await devAPI.delete('/like/remove', {
      data: { title, id },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error(' 찜 삭제 오류:', error.response?.data || error.message);
    throw error;
  }
}