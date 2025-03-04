import axiosApi from '@/utils/axiosConfig'

const formOption = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
}

// 게시글 생성
export const createFreeboardPost = async (formData) => {
  try {
    const response = await axiosApi.post('/posts/create', formData, formOption)
    return response.data
  } catch (error) {
    console.error('게시글 생성 오류:', error.response?.data || error.message)
    throw error
  }
}

// 게시글 목록 조회
export const getFreeboardPosts = async (channelId) => {
  try {
    const response = await axiosApi.get(`/posts/channel/${channelId}`)
    return response.data
  } catch (error) {
    console.error('게시글 목록 조회 오류:', error.response?.data || error.message)
    throw error
  }
}

// 게시글 수정
export const updateFreeboardPost = async (formData) => {
  try {
    const response = await axiosApi.put(`/posts/update`, formData, formOption)
    return response.data
  } catch (error) {
    console.error('게시글 수정 오류:', error.response?.data || error.message)
    throw error
  }
}

// 게시글 삭제
export const deleteFreeboardPost = async (postId) => {
  try {
    const response = await axiosApi.delete(`/posts/delete/${postId}`)
    return response.data
  } catch (error) {
    console.error('게시글 삭제 오류:', error.response?.data || error.message)
    throw error
  }
}
