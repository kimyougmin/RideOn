import { searchShopping } from './naverApis'

function logApiError(operation, error) {
  console.error(`❌ ${operation} 중 오류 발생:`, error.message)

  if (error.response) {
    console.error(`응답 코드: ${error.response.status}`)
    console.error('응답 데이터:', error.response.data)
  } else if (error.request) {
    console.error('요청이 전송되지 않음:', error.request)
  } else {
    console.error('설정 오류:', error.message)
  }
}

export async function getNaverItems(targetWord, displayCount = 100, sortOption = 'sim') {
  try {
    const items = await searchShopping(targetWord, displayCount, 1, sortOption)
    if (items) {
      return items
    } else {
      console.warn('⚠️ API 응답에 items가 없습니다')
      return []
    }
  } catch (error) {
    logApiError('상품 검색', error)
    return []
  }
}

export async function getNaverItemById(targetWord, productId) {
  try {
    const items = await searchShopping(targetWord, 100)
    const stringProductId = String(productId)

    const matchedItem = items.find((item) => String(item.productId) === stringProductId)

    if (!matchedItem) {
      console.warn(`❌ productId ${productId}에 맞는 상품이 없습니다`)
      return null
    }

    return matchedItem
  } catch (error) {
    logApiError('상품 ID 검색', error)
    return null
  }
}
