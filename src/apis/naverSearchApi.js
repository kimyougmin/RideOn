// const naverURL = import.meta.env.VITE_NAVER_SHOPPING_BASE_URL;
const naverURL = '/naver-api'
const naverID = import.meta.env.VITE_NAVER_SHOPPING_CLIENT_ID
const naverSecret = import.meta.env.VITE_NAVER_SHOPPING_CLIENT_SECRET
import axios from 'axios'

const naverShoppingApi = axios.create({
  baseURL: naverURL,
  timeout: 5000,
})

export async function getNaverItems(targetWord, displayCount = 32, sortOption = 'sim') {
  try {
    const response = await naverShoppingApi.get('/v1/search/shop.json', {
      params: {
        query: targetWord,
        display: displayCount,
        start: 1,
        sort: sortOption,
      },
      headers: {
        'X-Naver-Client-Id': naverID,
        'X-Naver-Client-Secret': naverSecret,
      },
    })
    if (response.data && response.data.items) {
      return response.data.items
    } else {
      console.warn('⚠️ API 응답에 items가 없습니다:', response.data)
      return [];
    }
  } catch (error) {
    console.error('API 호출 중 에러 발생:', error)
    if (error.response) {
      console.error('응답 코드:', error.response.status)
      console.error('응답 데이터:', error.response.data)
    } else if (error.request) {
      console.error('요청이 전송되지 않음:', error.request)
    } else {
      console.error('설정 오류:', error.message)
    }
    return [];
  }
}

export async function getNaverItemById(targetWord, productId) {
  try {
    const items = await getNaverItems(targetWord, 10);
    const matchedItem = items.find(item => item.productId === productId);

    if(!matchedItem) {
      console.warn(`productId에 맞는 ${productId}가 없습니다.`);
      return null;
    }

    return matchedItem;
  } catch (error) {
    console.error('Error 발생', error);
    return null;
  }
}
