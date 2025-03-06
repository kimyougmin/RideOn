import axiosApi from '@/utils/axiosConfig'

const formOption = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
}

// 게시글 생성
export const createQnaPost = async (postData) => {
  try {
    const formData = new FormData()
    const titleAndContent = JSON.stringify({
      title: postData.title,
      content: postData.content,
      tags: postData.tags,
      status: 'unsolved', // QnA 게시글 초기 상태는 미해결
    })

    formData.append('title', titleAndContent)
    formData.append('channelId', postData.channelId)

    const response = await axiosApi.post('/posts/create', formData, formOption)
    const parsedTitle = JSON.parse(response.data.title)
    return {
      ...response.data,
      ...parsedTitle,
    }
  } catch (error) {
    console.error('QnA 게시글 생성 오류:', error.response?.data || error.message)
    throw error
  }
}

// 게시글 목록 조회
export const getQnaPosts = async (channelId) => {
  try {
    const response = await axiosApi.get(`/posts/channel/${channelId}`)
    return response.data.map((post) => {
      const parsedTitle = JSON.parse(post.title)
      return {
        ...post,
        ...parsedTitle,
      }
    })
  } catch (error) {
    console.error('QnA 게시글 목록 조회 오류:', error.response?.data || error.message)
    throw error
  }
}

// 게시글 수정
export const updateQnaPost = async (updatePost) => {
  try {
    const formData = new FormData()
    const titleAndContent = JSON.stringify({
      title: updatePost.title,
      content: updatePost.content,
      tags: updatePost.tags,
      status: updatePost.status || 'unsolved',
    })

    formData.append('postId', updatePost.id)
    formData.append('title', titleAndContent)
    formData.append('channelId', updatePost.channelId)

    const response = await axiosApi.put('/posts/update', formData, formOption)
    const parsedTitle = JSON.parse(response.data.title)
    return {
      ...response.data,
      ...parsedTitle,
    }
  } catch (error) {
    console.error('QnA 게시글 업데이트 오류:', error.response?.data || error.message)
    throw error
  }
}

// 게시글 삭제
export const deleteQnaPost = async (postId) => {
  try {
    const response = await axiosApi.delete(`/posts/delete`, {
      data: { id: postId },
    })
    return response.data
  } catch (error) {
    console.error('QnA 게시글 삭제 오류:', error.response?.data || error.message)
    throw error
  }
}
