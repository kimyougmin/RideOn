import QnaBoard from '@/views/qnaBoard/QnaBoard.vue'
import QnaBoardDetail from '@/views/qnaBoard/qnaBoardDetail/QnaBoardDetail.vue'
import QnaBoardEdit from '@/views/qnaBoard/qnaBoardEdit/QnaBoardEdit.vue'
import QnaBoardWrite from '@/views/qnaBoard/qnaBoardWrite/QnaBoardWrite.vue'
const QNABOARD_ROUTES = [
  {
    path: '/qnaBoard',
    name: 'QnaBoard',
    component: QnaBoard,
  },
  {
    path: '/riderCrewBoardDetail/:id',
    name: 'QnaBoardDetail',
    component: QnaBoardDetail,
  },
  {
    path: '/qnaBoard/write',
    name: 'QnaBoardWrite',
    component: QnaBoardWrite,
  },
  {
    path: '/qnaBoard/edit/:id',
    name: 'QnaBoardEdit',
    component: QnaBoardEdit,
  },
]
export default QNABOARD_ROUTES
