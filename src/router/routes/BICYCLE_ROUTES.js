import Bicycle from '@/views/bicycle/Bicycle.vue'
import BicycleDetail from '@/views/bicycle/bicycleDetail/BicycleDetail.vue'
import BicycleSearch from '@/views/bicycle/bicycleSearch/BicycleSearch.vue'

const BICYCLE_ROUTES = [
  {
    path: '/bicycle',
    name: 'bicycle',
    component: Bicycle,
  },
  {
    path: '/bicycleDetail/:id',
    name: 'bicycleDetail',
    component: BicycleDetail,
    props: true,
  },
  {
    path: '/bicycleSearch',
    name: 'bicycleSearch',
    component: BicycleSearch,
  },
]

export default BICYCLE_ROUTES
