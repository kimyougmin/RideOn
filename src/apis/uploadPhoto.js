import axios from 'axios'

const devAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

export const uploadUserPhoto = async (file, token) => {
  const formData = new FormData()
  formData.append('isCover', 'false')
  formData.append('image', file)

  try {
    const response = await devAPI.post('/users/upload-photo', formData, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('프로필 이미지 업로드 오류:', error.response?.data || error.message)
    throw error
  }
}
