import Layout from '@/layout/index.vue'

export default {
  path: '/Home',
  name: 'Home',
  component: Layout,
  meta: {
    title: '首页',
    icon: 'user',
    affix: true
  },
  children: [
    {
      path: 'dashboard1',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
      name: 'Dashboard1',
      meta: {
        title: 'dashboard1',
        icon: 'user',
        affix: true
      }
    },
    {
      meta: {
        title: 'about',
        icon: 'user',
        affix: true
      },
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    }
  ]

}
