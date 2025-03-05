import axios from 'axios'

const devAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const deletePostApi = async (postId, token) => {
  try {
    const response = await devAPI.delete('/posts/delete', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: { id: postId },
    })
    return response.data
  } catch (error) {
    console.error('게시글 삭제 오류:', error.response?.data || error.message)
    throw error
  }
}
