import { reactive, watch } from 'vue'
import { View, Text, Button } from '@tarojs/components'
import dict from '@/dict';
import Search from '@/components/search/index';
import { HeartFill, Uploader, Del2 } from '@nutui/icons-vue-taro'
import request from '@/http/request';
// import axios from 'axios'
import './index.scss';

export default {
  name: 'Index',
  components: {
    View,
    Text,
    Button,
  },
  setup() {
    const state = reactive<{[k: string]: any}>({
      category: dict.category,
      value: 1,
      show: false,
      menuList: [],
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
      
      request.get('/menu/query').then((res) => {
        console.log('==res===', res);
        state.menuList = res.data
      })
      // TODO: get menus
      state.menuList = []
    }

    watch(() => state.value, () => {
      getMenus()
    })

    return () => {
      return (
        <View class="menu_category">
          <Search />
          <NutTabs v-model={state.value} direction="vertical" style="height: 100%" auto-height title-scroll>
            {state.category.map((item, index) => (
              <NutTabPane pane-key={item.value} title={item.name} key={index}>
                {state.menuList.map((menuL, index) => (
                  <NutCard
                    title={menuL.name}
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
                ))}
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
