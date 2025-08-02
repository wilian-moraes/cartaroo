import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import TradesPage from '@/pages/TradesPage.vue'
import api from '@/services/api'
import MarketplacePage from '@/pages/MarketplacePage.vue'
import MyCardsPage from '@/pages/MyCardsPage.vue'
import CreateTradePage from '@/pages/CreateTradePage.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import BaseLayout from '@/layouts/BaseLayout.vue'
import NoCredentialsLayout from '@/layouts/NoCredentialsLayout.vue'

const title = '| Cartaroo'

const routes = [
  {
    path: '/',
    component: NoCredentialsLayout,
    children: [
      {
        path: '',
        name: 'Marketplace',
        component: MarketplacePage
      },
    ]
  },
  {
    path: '/app',
    component: BaseLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: HomePage,
        meta: { title: `Início ${title}` }
      },
      {
        path: 'me/cards',
        name: 'MyCards',
        component: MyCardsPage,
        meta: { title: `Minhas cartas ${title}` }
      },
      {
        path: 'trades',
        name: 'Trades',
        component: TradesPage,
        meta: { title: `Trocas ${title}` }
      },
      {
        path: 'trades/create',
        name: 'CreateTrade',
        component: CreateTradePage,
        meta: { title: `Solicitar troca ${title}` }
      }
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: LoginPage,
        meta: { title: `Login ${title}` }
      },
      {
        path: 'register',
        name: 'Register',
        component: RegisterPage,
        meta: { title: `Cadastro ${title}` }
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to) => {
  const defaultTitle = 'Cartaroo'
  document.title = to.meta.title as string || defaultTitle
})


router.beforeEach(async (to, from, next) => {
  const store = useUserStore()
  const isAuthenticated = !!store.token

  if (to.meta.requiresGuest && isAuthenticated) {
    return next({ name: 'Home' })
  }

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      return next({ name: 'Marketplace' })
    }

    try {
      await api.get('/me')
      return next()
    } catch {
      store.logout()
      return next({ name: 'Marketplace' })
    }
  }
  return next()
})

export default router
