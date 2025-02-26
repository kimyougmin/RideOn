import { createRouter, createWebHistory } from 'vue-router'
import Bicycle  from '@/views/bicycle/Bicycle.vue';
import Main from '@/views/main/Main.vue'
import BicycleDetail from '@/views/bicycle/bicycleDetail/BicycleDetail.vue'
import BicycleSearch from '@/views/bicycle/bicycleSearch/BicycleSearch.vue'
import FreeBoard from '@/views/freeBoard/FreeBoard.vue'
import FreeBoardDetail from '@/views/freeBoard/freeBoardDetail/FreeBoardDetail.vue'
import FreeBoardEdit from '@/views/freeBoard/freeBoardEdit/FreeBoardEdit.vue'
import RoadMap from '@/views/roadMap/RoadMap.vue'
import News from '@/views/news/News.vue'
import NewsDetail from '@/views/news/newsDetail/NewsDetail.vue'
import QnaBoard from '@/views/qnaBoard/QnaBoard.vue'
import QnaBoardEdit from '@/views/qnaBoard/qnaBoardEdit/QnaBoardEdit.vue'
import QnaBoardDetail from '@/views/qnaBoard/qnaBoardDetail/QnaBoardDetail.vue'
import RiderParts from '@/views/riderParts/RiderParts.vue'
import RiderPartSearch from '@/views/riderParts/roaderSearch/RiderPartSearch.vue'
import RiderPartDetail from '@/views/riderParts/roaderDetail/RiderPartDetail.vue'
import Login from '@/views/user/login/Login.vue'
import MyPage from '@/views/user/myPage/MyPage.vue'
import Signup from '@/views/user/signup/Signup.vue'
import App from '@/App.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main
    },
    {
      path: '/bicycle',
      name: 'bicycle',
      component: Bicycle
    },
    {
      path: '/bicycleDetail',
      name: 'bicycleDetail',
      component: BicycleDetail
    },
    {
      path: '/bicycleSearch',
      name: 'bicycleSearch',
      component: BicycleSearch
    },
    {
      path: '/freeBoard',
      name: 'FreeBoard',
      component: FreeBoard
    },
    {
      path: '/freeBoardDetail',
      name: 'FreeBoardDetail',
      component: FreeBoardDetail
    },
    {
      path: '/freeBoardEdit',
      name: 'FreeBoardEdit',
      component: FreeBoardEdit
    },
    {
      path: '/roadMap',
      name: 'RoadMap',
      component: RoadMap
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/newsDetail',
      name: 'NewsDetail',
      component: NewsDetail
    },
    {
      path: '/qnaBoard',
      name: 'QnaBoard',
      component: QnaBoard
    },
    {
      path: '/qnaBoardEdit',
      name: 'QnaBoardEdit',
      component: QnaBoardEdit
    },
    {
      path: '/qnaBoardDetail',
      name: 'QnaBoardDetail',
      component: QnaBoardDetail
    },
    {
      path: '/riderParts',
      name: 'RiderParts',
      component: RiderParts
    },
    {
      path: '/riderPartsSearch',
      name: 'RiderPartsSearch',
      component: RiderPartSearch
    },
    {
      path: '/riderPartsDetail',
      name: 'RiderPartsDetail',
      component: RiderPartDetail
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/myPage',
      name: 'MyPage',
      component: MyPage
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
  ],
})

export default router
