import vue from 'vue'
import VueRouter from 'vue-router'

vue.use(VueRouter)

const routes = [
  {
    path: '/demo/digital-tube',
    name: 'digital-tube',
    component: () => import('@/views/demo/digital-tube')
  }
]

export default new VueRouter({
  routes
})