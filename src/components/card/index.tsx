/*
//  * @Description:
 * @Author: muqingkun
 * @Date: 2024-06-19 15:04:19
 * @LastEditTime: 2024-08-16 17:30:09
 * @LastEditors: muqingkun
 * @Reference:
 */
import { defineComponent, onMounted } from 'vue'
import { HeartFill } from '@nutui/icons-vue-taro'
import { View, Image } from '@tarojs/components'
// import Taro from '@tarojs/taro';
import './index.scss';
const IMG_URL = process.env.TARO_APP_IMG

export default defineComponent({
  name: 'fCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    onMounted(() => {
    });
    return () => (
      <View class="f-card">
        <View class="f-card-content">
          <Image src={IMG_URL + props.imgUrl} class="f-img" mode="widthFix" />
          <View class="title">{props.title}</View>
          <NutButton
            class="add_btn"
            type="primary"
            size="large"
            v-slots={{
              icon: () => (<HeartFill class="nut-icon-am-breathe nut-icon-am-infinite"></HeartFill>),
            }}
          >心愿单</NutButton>
        </View>
      </View>
    )
  },
})
