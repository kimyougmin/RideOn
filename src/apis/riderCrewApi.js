import { RIDEON_RIDERCREW_CHANNEL_ID } from '@/constants/channelId'
import axiosApi from '@/utils/axiosConfig'

const formOption = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
}

// 게시글 생성
export const createRiderCrewPost = async (postData) => {
  try {
    const formData = new FormData()
    const crewData = JSON.stringify({
      title: postData.title,
      content: postData.content,
      location: postData.location,
      memberInfo: postData.memberInfo,
      status: 'RECRUITING', // 'RECRUITING' | 'COMPLETED'
    })

    formData.append('title', crewData)
    formData.append('channelId', RIDEON_RIDERCREW_CHANNEL_ID)

    // 썸네일 이미지가 있는 경우 추가
    if (postData.image) {
      formData.append('image', postData.image)
    }

    const response = await axiosApi.post('/posts/create', formData, formOption)
    const parsedCrewData = JSON.parse(response.data.title)
    return {
      ...response.data,
      ...parsedCrewData,
    }
  } catch (error) {
    console.error('라이더 크루 게시글 생성 오류:', error.response?.data || error.message)
    throw error
  }
}

// 게시글 목록 조회
export const getRiderCrewPosts = async (channelId) => {
  try {
    const response = await axiosApi.get(`/posts/channel/${channelId}`)
    return response.data.map((post) => {
      const parsedCrewData = JSON.parse(post.title)
      return {
        ...post,
        ...parsedCrewData,
      }
    })
  } catch (error) {
    console.error('라이더 크루 게시글 목록 조회 오류:', error.response?.data || error.message)
    throw error
  }
}

// 게시글 수정
export const updateRiderCrewPost = async (updatePost) => {
  try {
    const formData = new FormData()
    const crewData = JSON.stringify({
      title: updatePost.title,
      content: updatePost.content,
      location: updatePost.location,
      memberInfo: {
        members: updatePost.memberInfo?.members || [],
        current: updatePost.memberInfo?.members.length || 1,
        max: updatePost.memberCount || updatePost.memberInfo?.max,
      },
      status: updatePost.status || 'RECRUITING',
    })

    formData.append('postId', updatePost.id)
    formData.append('title', crewData)
    formData.append('channelId', RIDEON_RIDERCREW_CHANNEL_ID)

    // 썸네일 이미지가 있는 경우 추가
    if (updatePost.image) {
      formData.append('image', updatePost.image)
    }

    if (updatePost.imageToDeletePublicId.trim() !== '') {
      formData.append('imageToDeletePublicId', updatePost.imageToDeletePublicId)
    }

    const response = await axiosApi.put('/posts/update', formData, formOption)
    const parsedCrewData = JSON.parse(response.data.title)
    return {
      ...response.data,
      ...parsedCrewData,
    }
  } catch (error) {
    console.error('라이더 크루 게시글 업데이트 오류:', error.response?.data || error.message)
    throw error
  }
}

// 게시글 삭제
export const deleteRiderCrewPost = async (postId) => {
  try {
    const response = await axiosApi.delete(`/posts/delete`, {
      data: { id: postId },
    })
    return response.data
  } catch (error) {
    console.error('RiderCrew 게시글 삭제 오류:', error.response?.data || error.message)
    throw error
  }
}
