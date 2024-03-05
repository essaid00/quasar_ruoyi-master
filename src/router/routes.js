
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/login.vue'),

  },
  {
    path: '/one',
    name:'one',
    component: () => import('pages/posofsales/index.vue'),

  },
  {
    path: '/two',
    component: () => import('pages/test/two.vue'),

  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
