import { createRouter, createWebHistory } from 'vue-router'
import {
  FREEBOARD_ROUTES,
  BICYCLE_ROUTES,
  USER_ROUTES,
  NEWS_ROUTES,
  QNABOARD_ROUTES,
  RIDERPARTS_ROUTES,
} from './routes'
import MainPage from '@/views/main/MainPage.vue'
import RoadMap from '@/views/roadMap/RoadMap.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
    },
    {
      path: '/roadMap',
      name: 'RoadMap',
      component: RoadMap,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      component: NotFound,
    },
    ...BICYCLE_ROUTES,
    ...FREEBOARD_ROUTES,
    ...NEWS_ROUTES,
    ...QNABOARD_ROUTES,
    ...RIDERPARTS_ROUTES,
    ...USER_ROUTES,
  ],
})

export default router
