/*
 * @Description:
 * @Author: muqingkun
 * @Date: 2024-06-19 15:04:19
 * @LastEditTime: 2024-06-20 19:35:49
 * @LastEditors: muqingkun
 * @Reference:
 */
import { reactive } from 'vue'
import { View, Text, Button, Image } from '@tarojs/components'
import Search from '@/components/search/index';
import dict from '@/dict';
import './index.scss'
import qita from '@/images/qita.png';
import jiachangcai from '@/images/jiachangcai.png';
import tang from '@/images/tang.png';
import tiandian from '@/images/tiandian.png';
import yinliao from '@/images/yinliao.png';
import zhushi from '@/images/zhushi.png';
import menuBg from '@/images/20240620-193345.jpg';

export default {
  name: 'Index',
  components: {
    View,
    Text,
    Button,
    Search
  },
  setup() {
    const iconlist = [
      zhushi,
      jiachangcai,
      yinliao,
      tiandian,
      tang,
      qita,
    ]
    const state = reactive({
      msg: '菜谱列表',
      category: dict.category,
    })

    const handleClick = (msg) => {
      state.msg = msg
    }

    return () => {
      return (
        <View>
          <Image class="menu-bg" src={menuBg}></Image>
          <Search />
          <View class="menu-list">
            {state.category.map((item, i) => (<>
              <View class="menu-item" onClick={() => handleClick(item.name)}>
                <Image class="menu-icon" src={iconlist[i]} />
                <Text class="menu-name">{item.name}</Text>
              </View>
            </>))}
          </View>
        </View>
      )
    }
  },
}
