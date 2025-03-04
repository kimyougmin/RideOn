import RiderCrewBoard from '@/views/riderCrewBoard/RiderCrewBoard.vue'
import RiderCrewBoardDetail from '@/views/riderCrewBoard/crewBoardDetail/RiderCrewBoardDetail.vue'
import RiderCrewBoardWrite from '@/views/riderCrewBoard/crewBoardWrite/RiderCrewBoardWrite.vue'
import RiderCrewBoardEdit from '@/views/riderCrewBoard/crewBoardEdit/RiderCrewBoardEdit.vue'

const RIDERCREWBOARD_ROUTES = [
  {
    path: '/riderCrewBoard',
    name: 'RiderCrewBoard',
    component: RiderCrewBoard,
  },
  {
    path: '/riderCrewBoardDetail/:id',
    name: 'RiderCrewBoardDetail',
    component: RiderCrewBoardDetail,
  },
  {
    path: '/riderCrewBoard/write',
    name: 'RiderCrewBoardWrite',
    component: RiderCrewBoardWrite,
  },
  {
    path: '/riderCrewBoard/edit/:id',
    name: 'RiderCrewBoardEdit',
    component: RiderCrewBoardEdit,
  },
]
export default RIDERCREWBOARD_ROUTES
