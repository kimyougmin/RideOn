import QnaBoard from '@/views/qnaBoard/QnaBoard.vue'
import QnaBoardDetail from '@/views/qnaBoard/qnaBoardDetail/QnaBoardDetail.vue'
import QnaBoardEdit from '@/views/qnaBoard/qnaBoardEdit/QnaBoardEdit.vue'

const QNABOARD_ROUTES = [
  {
    path: '/qnaBoard',
    name: 'QnaBoard',
    component: QnaBoard,
  },
  {
    path: '/qnaBoardEdit',
    name: 'QnaBoardEdit',
    component: QnaBoardEdit,
  },
  {
    path: '/qnaBoardDetail',
    name: 'QnaBoardDetail',
    component: QnaBoardDetail,
  },
]
export default QNABOARD_ROUTES
