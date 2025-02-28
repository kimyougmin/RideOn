import { createRouter, createWebHistory } from 'vue-router'
import {
  FREEBOARD_ROUTES,
  BICYCLE_ROUTES,
  USER_ROUTES,
  NEWS_ROUTES,
  QNABOARD_ROUTES,
  RIDERPARTS_ROUTES,
} from './routes'
import Main from '@/views/main/Main.vue'
import RoadMap from '@/views/roadMap/RoadMap.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main,
    },
    {
      path: '/roadMap',
      name: 'RoadMap',
      component: RoadMap,
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
