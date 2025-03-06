import axiosApi from '@/utils/axiosConfig'

// 게시글 좋아요
export const likePost = async (postId) => {
  try {
    const response = await axiosApi.post('/likes/create', { postId })
    return response.data
  } catch (error) {
    console.error('게시글 좋아요 오류:', error.response?.data || error.message)
    throw error
  }
}

// 게시글 좋아요 취소
export const unlikePost = async (likeId) => {
  try {
    const response = await axiosApi.delete('/likes/delete', {
      data: { id: likeId },
    })
    return response.data
  } catch (error) {
    console.error('게시글 좋아요 취소 오류:', error.response?.data || error.message)
    throw error
  }
}
