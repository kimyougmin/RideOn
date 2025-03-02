import FreeBoard from '@/views/freeBoard/FreeBoard.vue'
import FreeBoardDetail from '@/views/freeBoard/freeBoardDetail/FreeBoardDetail.vue'
import FreeBoardEdit from '@/views/freeBoard/freeBoardEdit/FreeBoardEdit.vue'
import FreeBoardWrite from '@/views/freeBoard/freeBoardWrite/FreeBoardWrite.vue'

const FREEBOARD_ROUTES = [
  {
    path: '/freeBoard',
    name: 'FreeBoard',
    component: FreeBoard,
  },
  {
    path: '/freeBoardDetail/:id',
    name: 'FreeBoardDetail',
    component: FreeBoardDetail,
  },
  {
    path: '/freeBoard/write',
    name: 'FreeBoardWrite',
    component: FreeBoardWrite,
  },
  {
    path: '/freeBoard/edit/:id',
    name: 'FreeBoardEdit',
    component: FreeBoardEdit,
  },
]
export default FREEBOARD_ROUTES
