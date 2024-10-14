<template>
  <View class="menu_category">
    <Search />
    <NutTabs v-model="state.type" animated-time="0" auto-height title-scroll background="#fff" swipeable type="smile">
      <NutTabPane v-for="item in state.category" :pane-key="item.value" :title="item.name" :key="item.value">
        <WaterFall v-if="state.pageInfo[item.value]?.list" :items="state.pageInfo[item.value]?.list" :column-count="2" @wish="addWishList" />
      </NutTabPane>
    </NutTabs>
    <NutButton
      class="flex_btn"
      type="primary"
      size="large"
      @click="showWishList"
    >
      <template #icon>
        <HeartFill class="nut-icon-am-breathe nut-icon-am-infinite"></HeartFill>
      </template>
      心愿单
    </NutButton>
  </View>
</template>

<script setup lang="ts">
  import { useStore } from 'vuex'
  import Taro, { useReachBottom } from '@tarojs/taro';
  import { reactive, watch, computed } from 'vue'
  import { request } from '@/http/request';
  import dict from '@/dict';
  import Search from '@/components/search/index';
  import WaterFall from '@/components/waterfall/index.vue';
  import { HeartFill } from '@nutui/icons-vue-taro'
  import './index.scss';

  const store = useStore()
  const wishList = computed(() => store.getters.getWishList)

  const state = reactive<{[k: string]: any}>({
    category: dict.category,
    type: 1,
    show: false,
    menuList: [],
    pageInfo: {},
  })

  const addWishList = (item) => {
    if (wishList.value.some((i) => i.id === item.id)) {
      Taro.showToast({
        icon: 'none',
        title: '已经添加过了哦~',
      })
      return
    }
    store.dispatch('setWishList', item)
  }

  const getMenus = () => {
    // TODO: get menus
    const {category, limit, page} = state.pageInfo[state.type]
    request('/menu/query', {category, limit, page }).then(({code, data}) => {
      if (code === 1) {
        if (data.totalPages >= state.pageInfo[state.type].page) {
          state.pageInfo[state.type].page = data.page + 1
          state.pageInfo[state.type].totalPages = data.totalPages
          if (Array.isArray(state.pageInfo[state.type].list)) {
            state.pageInfo[state.type].list.push(...data.records)
          } else {
            state.pageInfo[state.type].list = data.records
          }
        }
      }
    })
  }

  useReachBottom(() => {
    if (state.pageInfo[state.type].page >= state.pageInfo[state.type].totalPages) {
      return
    }
    getMenus()
  });

  const showWishList = () => {
    if (wishList.value.length === 0) {
      Taro.showToast({
        icon: 'none',
        title: '还没有添加哦~',
      })
      return
    }
    Taro.navigateTo({
      url: '/pages/wishList/wishList'
    })
  }

  watch(() => state.type, () => {
    if (!state.pageInfo[state.type]) {
      state.menuList = []
      state.pageInfo[state.type] = {
        category: state.type,
        limit: 10,
        page: 1
      }
      getMenus()
    } else {
      state.menuList = state.pageInfo[state.type].list
    }
  }, {
    immediate: true
  })

  watch(() => state.show, () => {
    store.dispatch('setIsShowTabBar', !state.show)
  })
</script>

<style scoped>

</style>
