/*
 * @Description:
 * @Author: muqingkun
 * @Date: 2024-06-19 15:04:19
 * @LastEditTime: 2024-07-24 20:51:37
 * @LastEditors: muqingkun
 * @Reference:
 */
import { ref, defineComponent, onMounted } from 'vue'
import { View, Input } from '@tarojs/components'
import Taro from '@tarojs/taro';
import './index.scss';

export default defineComponent({
  name: 'SearchA',
  setup() {
    const statusBarHeight = ref<number>(20); // 默认状态栏高度
    const navBarHeight = ref(44); // 默认导航栏高度
    const rect = ref({
      height: 0,
      width: 0,
      top: 0
    }); // 胶囊信息

    onMounted(() => {
      rect.value = Taro.getMenuButtonBoundingClientRect()
      console.log("🚀 ~ onMounted ~ rect:", rect)
      Taro.getSystemInfo({
        success: (res) => {
          statusBarHeight.value = res.statusBarHeight || 0;
          if (res.model.includes('iPhone X') || res.model.includes('iPhone 11')) {
            navBarHeight.value = 88; // iPhone X, 11系列高度
          }
        },
      });
    });

    return () => (
      <View class="search-container">
        <View class="search-box" >
          <View class="search-btn" type="primary"></View>
          <Input class="search-input" type="text" placeholder="搜想吃" />
        </View>
      </View>
    )
  },
})
