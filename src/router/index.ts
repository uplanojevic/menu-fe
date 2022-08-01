import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
/*   {
    path: '/',
    name: 'home',
    component: HomeView
  }, */
  {
    path: '/',
    name: 'RegistrationView',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegistrationView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/analytics-view',
    name: 'AnalyticsView',
    component: () => import(/* webpackChunkName: "about" */ '../views/AnalyticsView.vue')
  },
  {
    path: '/offers-view',
    name: 'OffersView',
    component: () => import(/* webpackChunkName: "about" */ '../views/OffersView.vue')
  },
  {
    path: '/loyality-view',
    name: 'LoyalityView',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoyalityView.vue')
  },
  {
    path: '/currencies-view',
    name: 'CurrenciesView',
    component: () => import(/* webpackChunkName: "about" */ '../views/CurrenciesView.vue')
  },
  {
    path: '/dispatch-view',
    name: 'DispatchView',
    component: () => import(/* webpackChunkName: "about" */ '../views/DispatchView.vue')
  },
  {
    path: '/configurations-view',
    name: 'ConfigurationsView',
    component: () => import(/* webpackChunkName: "about" */ '../views/ConfigurationsView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
