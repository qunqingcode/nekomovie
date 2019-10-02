import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie'
import mineRouter from './mine'
import cinemaRouter from './cinema'
Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'/movie'},
    movieRouter,
    mineRouter,
    cinemaRouter 
  ],
  linkActiveClass:"activecolor"
})
// 配置路由的时候component可以让它为 =>import(组件位置) 实现懒加载,优化性能 