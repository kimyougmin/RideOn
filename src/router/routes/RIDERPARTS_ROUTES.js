import RiderParts from '@/views/riderParts/RiderParts.vue'
import RiderPartDetail from '@/views/riderParts/roaderDetail/RiderPartDetail.vue'
import RiderPartSearch from '@/views/riderParts/roaderSearch/RiderPartSearch.vue'

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
  },
]
export default RIDERPARTS_ROUTES
