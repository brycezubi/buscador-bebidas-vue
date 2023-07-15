import { createRouter, createWebHistory } from 'vue-router'
import Principal from '../views/PrincipalView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/inicio',
      name:'inicio',
      component: Principal,
      props:{titulo:'Recetas'}
    },
    {
      path:'/favoritos',
      name:'favoritos',
      component:()=>import('../views/FavoritosView.vue'),
      props:{titulo:'Favoritos'}
    }
  ]
})

export default router
