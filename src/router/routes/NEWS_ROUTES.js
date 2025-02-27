import News from '@/views/news/News.vue'
import NewsDetail from '@/views/news/newsDetail/NewsDetail.vue'

const NEWS_ROUTES = [
  {
    path: '/news',
    name: 'News',
    component: News,
  },
  {
    path: '/newsDetail',
    name: 'NewsDetail',
    component: NewsDetail,
  },
]
export default NEWS_ROUTES
