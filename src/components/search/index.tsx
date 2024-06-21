/*
 * @Description:
 * @Author: muqingkun
 * @Date: 2024-06-19 15:04:19
 * @LastEditTime: 2024-06-20 19:24:25
 * @LastEditors: muqingkun
 * @Reference:
 */
import { reactive } from 'vue'
import { View, Button, Input } from '@tarojs/components'
import './index.scss';

export default {
  name: 'Search',
  components: {
    View,
    Button,
    Input
  },
  setup() {
    const state = reactive({

    })

    return () => {
      return (
        <View>
          <View class="search-box" >
            <View class="search-btn" type="primary"></View>
            <Input class="search-input" type="text" placeholder="搜菜谱" />
          </View>
        </View>
      )
    }
  },
}
