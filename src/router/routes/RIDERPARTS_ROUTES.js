import RiderParts from '@/views/riderParts/RiderParts.vue'
import RiderPartDetail from '@/views/riderParts/riderPartsDetail/RiderPartDetail.vue'
import RiderPartSearch from '@/views/riderParts/riderPartsSearch/RiderPartSearch.vue'

const RIDERPARTS_ROUTES = [
  {
    path: '/riderParts',
    name: 'RiderParts',
    component: RiderParts,
  },
  {
    path: '/riderPartsSearch',
    name: 'RiderPartsSearch',
    component: RiderPartSearch,
  },
  {
    path: '/riderPartsDetail',
    name: 'RiderPartsDetail',
    component: RiderPartDetail,
    props: (route) => ({
      keyword: route.query.keyword,
      productId: route.query.productId,
    }),
  },
]
export default RIDERPARTS_ROUTES
