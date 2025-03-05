import axiosApi from '@/utils/axiosConfig'

const formOption = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
}

// 게시글 생성
export const createFreeboardPost = async (postData) => {
  try {
    const formData = new FormData()
    const titleAndContent = JSON.stringify({
      title: postData.title,
      content: postData.content,
      tags: postData.tags,
    })

    formData.append('title', titleAndContent)
    formData.append('channelId', postData.channelId)

    if (postData.image) {
      formData.append('image', postData.image)
    }

    const response = await axiosApi.post('/posts/create', formData, formOption)
    const parsedTitle = JSON.parse(response.data.title)
    return {
      ...response.data,
      ...parsedTitle,
    }
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
export const updateFreeboardPost = async (updatePost) => {
  try {
    const formData = new FormData()
    const titleAndContent = JSON.stringify({
      title: updatePost.title,
      content: updatePost.content,
      tags: updatePost.tags,
    })

    formData.append('postId', updatePost.id)
    formData.append('title', titleAndContent)
    formData.append('image', updatePost.image) // 기존 이미지 유지
    formData.append('imageToDeletePublicId', '') // 이미지 삭제 없음
    formData.append('channelId', updatePost.channelId)

    const response = await axiosApi.put('/posts/update', formData, formOption)

    const parsedTitle = JSON.parse(response.data.title)
    return {
      ...response.data,
      ...parsedTitle,
    }
  } catch (error) {
    console.error('게시글 업데이트 오류:', error.response?.data || error.message)
    throw error
  }
}

// 게시글 삭제
export const deleteFreeboardPost = async (postId) => {
  try {
    const response = await axiosApi.delete(`/posts/delete`, {
      data: { id: postId },
    })
    return response.data
  } catch (error) {
    console.error('게시글 삭제 오류:', error.response?.data || error.message)
    throw error
  }
}

// 게시글 좋아요
export const likeFreeboardPost = async (postId) => {
  try {
    const response = await axiosApi.post('/likes/create', { postId })
    return response.data
  } catch (error) {
    console.error('게시글 좋아요 오류:', error.response?.data || error.message)
    throw error
  }
}

// 게시글 좋아요 취소
export const unlikeFreeboardPost = async (likeId) => {
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
