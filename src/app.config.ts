/*
 * @Description:
 * @Author: muqingkun
 * @Date: 2024-06-19 14:49:18
 * @LastEditTime: 2024-06-19 16:28:17
 * @LastEditors: muqingkun
 * @Reference:
 */
export default defineAppConfig({
  pages: [
    'pages/list/index',
    'pages/add/index',
    'pages/random/index',
  ],
  tabBar: {
    backgroundColor: '#fff',
    borderStyle: 'white',
    color: '#5F5F5F',
    custom: true,
    selectedColor: '#E6262C',
    list: [{
      pagePath: "pages/random/index",
      selectedIconPath: './images/accompany.png',
      iconPath: './images/accompany_a.png',
      text: "吃啥"
    }, {
      pagePath: "pages/add/index",
      selectedIconPath: './images/add.png',
      iconPath: './images/add_a.png',
      text: "新增"
    }, {
      pagePath: "pages/list/index",
      selectedIconPath: './images/food.png',
      iconPath: './images/food_a.png',
      text: "菜谱"
    }]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
