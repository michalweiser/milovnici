import Vue from 'vue'
import Router from 'vue-router'
import Map from './views/Mapa.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'mapa',
      component: Map
    },
    {
      path: '/region/:region_id',
      component: Map,
      name: 'region',
      props: true 
    },
    {
      path: '/blog',
      name: 'blog',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Blog.vue')
    },
    {
      path: '/tanecne-domy',
      name: 'tanecne-dome',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/TanecneDomy.vue')
    },
    {
      path: '/milovnici',
      name: 'milovnici',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Milovnici.vue')
    },
    {
      path: '/projekt',
      name: 'projekt',
      component: () => import('./views/Projekt.vue')
    },
    {
      path: '/kontakt',
      name: 'kontakt',
      component: () => import('./views/Kontakt.vue')
    }
  ]
})
