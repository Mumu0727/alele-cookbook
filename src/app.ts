/*
 * @Description: 
 * @Author: muqingkun
 * @Date: 2024-06-27 20:35:50
 * @LastEditTime: 2024-06-27 20:48:18
 * @LastEditors: muqingkun
 * @Reference: 
 */

import { createApp } from 'vue'
import { IconFont } from '@nutui/icons-vue-taro'
import './app.scss'
import store from './store'

const App = createApp({
  onShow (_options) {
    console.log('App onShow.')
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
App.use(store)
App.use(IconFont)

export default App
