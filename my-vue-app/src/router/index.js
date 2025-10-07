import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/home.vue'
import Resume from '../views/Resume.vue'
import Projects from '../views/Projects.vue'
import Contact from '../views/Contact.vue'
import Cart from '../views/Cart.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import ErrorPage from '../error.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/resume', name: 'Resume', component: Resume },
  { path: '/projects', name: 'Projects', component: Projects },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/login', name: 'Login', component: Login },
  {  path: '/register', name: 'Register', component: Register },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: ErrorPage }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 } 
  }
})

export default router