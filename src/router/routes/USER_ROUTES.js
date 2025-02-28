import Login from '@/views/user/login/Login.vue'
import MyPage from '@/views/user/myPage/MyPage.vue'
import Signup from '@/views/user/signup/Signup.vue'

const USER_ROUTES = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/myPage',
    name: 'MyPage',
    component: MyPage,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
]
export default USER_ROUTES
