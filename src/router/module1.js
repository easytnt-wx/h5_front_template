const routerPage = {
  user: () => import(/* webpackChunkName: "user" */ '@/view/user'),
  cart: () => import(/* webpackChunkName: "cart" */ '@/view/cart'),
  goods: () => import(/* webpackChunkName: "goods" */ '@/view/goods')
}

export default [
  {
    path: '*',
    redirect: '/goods'
  },
  {
    name: 'user',
    component: routerPage.user,
    meta: {
      title: '会员中心',
      keepAlive: true
    }
  },
  {
    name: 'cart',
    component: routerPage.cart,
    meta: {
      title: '购物车',
      keepAlive: true
    }
  },
  {
    name: 'goods',
    component: routerPage.goods,
    meta: {
      title: '商品详情',
      keepAlive: true
    }
  }
]
