import { naverApiInstance } from '@/utils/axiosConfig'

export const searchNews = async (keyword, display = 10, start = 1, sort = 'sim') => {
  try {
    const response = await naverApiInstance.get('/news.json', {
      params: {
        query: keyword,
        display,
        start,
        sort,
      },
    })

    return response.data.items
  } catch (error) {
    console.error('네이버 뉴스 검색 중 오류가 발생했습니다:', error)
    throw new Error('뉴스 데이터를 가져오는 중 오류가 발생했습니다.')
  }
}

export const searchBlog = async (keyword, display = 10, start = 1, sort = 'sim') => {
  try {
    const response = await naverApiInstance.get('/blog.json', {
      params: {
        query: keyword,
        display,
        start,
        sort,
      },
    })

    return response.data.items
  } catch (error) {
    console.error('네이버 블로그 검색 중 오류가 발생했습니다:', error)
    throw new Error('블로그 데이터를 가져오는 중 오류가 발생했습니다.')
  }
}

export const searchShopping = async (keyword, display = 10, start = 1, sort = 'sim') => {
  try {
    const response = await naverApiInstance.get('/shop.json', {
      params: {
        query: keyword,
        display,
        start,
        sort,
      },
    })

    return response.data.items
  } catch (error) {
    console.error('네이버 쇼핑 검색 중 오류가 발생했습니다:', error)
    throw new Error('쇼핑 데이터를 가져오는 중 오류가 발생했습니다.')
  }
}
