import axios from 'axios'

const devAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
// 게시물 삭제 
export const deletePostApi = async (postId, token) => {
  if (!token) {
    throw new Error('토큰이 존재하지 않습니다.')
  }
  // Bearer 붙이기
  const authToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`

  try {
    const response = await devAPI.delete('/posts/delete', {
      headers: {
        accept: 'application/json',
        Authorization: authToken,
      },
      data: { id: postId },
    })
    return response.data
  } catch (error) {
    console.error('게시글 삭제 오류:', error.response?.data || error.message)
    throw error
  }
}
