/*
 * @Description:
 * @Author: muqingkun
 * @Date: 2024-06-19 16:09:47
 * @LastEditTime: 2024-10-09 16:28:49
 * @LastEditors: muqingkun
 * @Reference:
 */
import { createStore } from 'vuex'

const state = {
  selected: 0,
  isShowTabBar: true,
  wishList: []
}

const mutations = {
  SET_SELECTED (state, selected) {
    state.selected = selected
  },
  SET_ISSHOW_TAB_BAR (state, isShowTabBar) {
    state.isShowTabBar = isShowTabBar
  },
  SET_WISH_LIST (state, item) {
    state.wishList.push(item)
  },
  DEL_WISH_LIST (state, id) {
    state.wishList = state.wishList.filter((i) => i.id !== id)
  }
}

const actions = {
  setSelected (context, index) {
    context.commit('SET_SELECTED', index)
  },
  setIsShowTabBar (context, data) {
    context.commit('SET_ISSHOW_TAB_BAR', data)
  },
  setWishList (context, data) {
    context.commit('SET_WISH_LIST', data)
  },
  delWishList (context, data) {
    context.commit('DEL_WISH_LIST', data)
  }
}

const getters = {
  getSelected(state) {
    return state.selected
  },
  getIsShowTabBar(state) {
    return state.isShowTabBar
  },
  getWishList(state) {
    return state.wishList
  }
}

const store = createStore({
  state,
  mutations,
  actions,
  getters
})

export default store
