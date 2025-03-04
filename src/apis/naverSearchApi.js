const NAVER_SHOPPING_BASE_URL = import.meta.env.VITE_NAVER_SHOPPING_BASE_URL;
const NAVER_SHOPPING_CLIENT_ID = import.meta.env.VITE_NAVER_SHOPPING_CLIENT_ID;
const NAVER_SHOPPING_CLIENT_SECRET = import.meta.env.VITE_NAVER_SHOPPING_CLIENT_SECRET;
import axios from "axios";

console.log("🔍 Client ID:", import.meta.env.VITE_NAVER_SHOPPING_CLIENT_ID);
console.log("🔍 Client Secret:", import.meta.env.VITE_NAVER_SHOPPING_CLIENT_SECRET);

const naverShoppingApi = axios.create({
  baseURL: NAVER_SHOPPING_BASE_URL,
  timeout: 5000,
  headers: {
    'X-Naver-Client-Id': NAVER_SHOPPING_CLIENT_ID,
    'X-Naver-Client-Secret': NAVER_SHOPPING_CLIENT_SECRET,
  },
});

export async function getNaverItems(targetWord) {
  try {
    const response = await naverShoppingApi.get('/v1/search/shop.json', {
      params: {
        query: targetWord,
        display: 20,
      },
    });
    console.log('API 응답데이터 : ', response.data);
    if (response.data && response.data.items) {
      return response.data.items;
    } else {
      console.warn('API 응답에 items가 없습니다:', response.data);
      return [];
    }
  } catch (error) {
    console.error('API 호출 중 에러 발생:', error.response ? error.response.data : error.message);
    return [];
  }
}
