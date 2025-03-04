const naverURL = "/naver-api"
const naverID = import.meta.env.VITE_NAVER_SHOPPING_CLIENT_ID;
const naverSecret = import.meta.env.VITE_NAVER_SHOPPING_CLIENT_SECRET;
import axios from "axios";
const naverShoppingApi = axios.create({
  baseURL: naverURL,
  timeout: 5000,
  headers: {
    'X-Naver-Client-Id': naverID,
    'X-Naver-Client-Secret': naverSecret,
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
    console.log('✅ API 응답 데이터:', response.data);
    if (response.data && response.data.items) {
      return response.data.items;
    } else {
      console.warn('⚠️ API 응답에 items가 없습니다:', response.data);
      return [];
    }
  } catch (error) {
    console.error('🚨 API 호출 중 에러 발생:', error);
    if (error.response) {
      console.error('📌 응답 코드:', error.response.status);
      console.error('📌 응답 데이터:', error.response.data);
    } else if (error.request) {
      console.error('📌 요청이 전송되지 않음:', error.request);
    } else {
      console.error('📌 설정 오류:', error.message);
    }
    return [];
  }
}
