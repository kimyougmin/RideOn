import FreeBoard from '@/views/freeBoard/FreeBoard.vue'
import FreeBoardDetail from '@/views/freeBoard/freeBoardDetail/FreeBoardDetail.vue'
import FreeBoardEdit from '@/views/freeBoard/freeBoardEdit/FreeBoardEdit.vue'

const FREEBOARD_ROUTES = [
  {
    path: '/freeBoard',
    name: 'FreeBoard',
    component: FreeBoard,
  },
  {
    path: '/freeBoardDetail',
    name: 'FreeBoardDetail',
    component: FreeBoardDetail,
  },
  {
    path: '/freeBoardEdit',
    name: 'FreeBoardEdit',
    component: FreeBoardEdit,
  },
]
export default FREEBOARD_ROUTES
