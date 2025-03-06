import axiosApi from '@/utils/axiosConfig'

// 댓글 생성
export const createComment = async (postId, comment) => {
  try {
    const response = await axiosApi.post('/comments/create', { postId, comment })
    return response.data
  } catch (error) {
    console.error('댓글 생성 오류:', error.response?.data || error.message)
    throw error
  }
}

// 댓글 삭제
export const deleteComment = async (commentId) => {
  try {
    const response = await axiosApi.delete('/comments/delete', {
      data: { id: commentId },
    })
    return response.data
  } catch (error) {
    console.error('댓글 삭제 오류:', error.response?.data || error.message)
    throw error
  }
}
