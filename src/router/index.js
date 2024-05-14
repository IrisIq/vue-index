/*
 * @Author: IrisIq
 * @Date: 2022-07-02 20:59:08
 * @LastEditors: IrisIq
 * @LastEditTime: 2024-05-14 15:12:05
 * @Description: content
 */
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import calculatorView from '../views/calculatorView.vue'

const routes = [
  {
    path: '/',
    name: 'calculatorView',
    component: calculatorView
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
