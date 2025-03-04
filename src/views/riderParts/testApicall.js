import { getNaverItems } from '../../apis/naverSearchApi.js';

(async () => {
  const result = await getNaverItems('아이폰');
  console.log('🔍 네이버 쇼핑 검색 결과:', result);
})();
