import { reactive, watch } from 'vue'
import { useReachBottom } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components'
import dict from '@/dict';
import Search from '@/components/search/index';
import { HeartFill, Uploader, Del2 } from '@nutui/icons-vue-taro'
import {request} from '@/http/request';
// import axios from 'axios'
import './index.scss';
const IMG_URL = process.env.TARO_APP_IMG
export default {
  name: 'Index',
  components: {
    View,
    Text,
    Button,
  },
  onReachBottom() {
    console.log('bottom');
  },
  setup() {

    const state = reactive<{[k: string]: any}>({
      category: dict.category,
      value: 1,
      show: false,
      menuList: [],
      pageInfo: {},
      wishList: []
    })

    const addWishList = (item) => {
      // TODO: add to wish list
      state.wishList.push(item)
    }

    const delWishList = (item) => {
      // TODO: delete from wish list
      state.wishList = state.wishList.filter((i) => i !== item)
    }

    const getMenus = () => {
      // TODO: get menus
      const {category, limit, page} = state.pageInfo[state.value]
      request('/menu/query', {category, limit, page }).then(({code, data}) => {
        if (code === 1) {
          if (data.totalPages >= state.pageInfo[state.value].page) {
            state.pageInfo[state.value].page = data.page + 1
            state.pageInfo[state.value].totalPages = data.totalPages
            if (Array.isArray(state.pageInfo[state.value].list)) {
              state.pageInfo[state.value].list.push(...data.records)
            } else {
              state.pageInfo[state.value].list = data.records
            }
          }
        }
      })
    }

    useReachBottom(() => {
      if (state.pageInfo[state.value].page >= state.pageInfo[state.value].totalPages) {
        return
      }
      getMenus()
    });

    watch(() => state.value, () => {
      if (!state.pageInfo[state.value]) {
        state.menuList = []
        state.pageInfo[state.value] = {
          category: state.value,
          limit: 10,
          page: 1
        }
        getMenus()
      } else {
        state.menuList = state.pageInfo[state.value].list
      }
    }, {
      immediate: true
    })

    return () => {
      return (
        <View class="menu_category">
          <Search />
          <NutTabs v-model={state.value} direction="vertical" animated-time="0" auto-height title-scroll>
            {state.category.map((item, index) => (
              <NutTabPane pane-key={item.value} title={item.name} key={index}>
                {
                  state.pageInfo[state.value] && state.pageInfo[state.value]?.list ? (
                    state.pageInfo[state.value]?.list.map((menu, index) => (
                      <NutCard
                        title={menu.name}
                        imgUrl={IMG_URL + menu.imgUrl}
                        price="520"
                        v-slots={{
                          footer: () => (<NutButton
                            color="linear-gradient(to right, #ff6034, #ee0a24)"
                            size="small"
                            type="primary"
                            onClick={() => {addWishList(item)}}
                            v-slots={{
                              icon: () => (<Uploader />),
                            }}
                          />),
                          origin: () => (<View></View>),
                        }}
                      >
                      </NutCard>
                    ))
                  ) : null
                }
                {}
              </NutTabPane>
            ))
            }
          </NutTabs>

          <NutButton
            class="flex_btn"
            type="primary"
            size="large"
            onClick={() => {state.show = true}}
            v-slots={{
              icon: () => (<HeartFill class="nut-icon-am-breathe nut-icon-am-infinite"></HeartFill>),
            }}
          >心愿单</NutButton>
          <NutPopup v-model={[state.show , 'visible']} position="bottom">
            {state.wishList.map((item, index) => (
              <View style="max-height: 400px">
                <NutCell round-radius="0" title="Swipe Left" v-slots={{
                  link: () => (<NutButton
                    color="linear-gradient(to right, #ff6034, #ee0a24)"
                    size="small"
                    type="primary"
                    onClick={() => {delWishList(item)}}
                    v-slots={{
                      icon: () => (<Del2 />),
                    }}/>)
                }}/>
              </View>
            ))}
          </NutPopup>
        </View>
      )
    }
  },
}
