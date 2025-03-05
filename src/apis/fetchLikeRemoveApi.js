import axios from 'axios'

const devAPI = axios.create({
  baseURL: import.meta.env.VITE_LIKE_SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchLikeCreateApi = async ({ _id, title, name, price, image, brand, category }) => {
  try {

    const params = JSON.stringify({title, id: _id, name, price, image, brand, category})
    const response = await devAPI.post('/like/toggle', params)
    return response.data
  } catch (error) {
    console.error('fetchLikeCreateApi', error.response?.data || error.message)
    throw error
  }
}