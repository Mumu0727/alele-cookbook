import { defineComponent, ref, onMounted } from 'vue';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components'
import './index.scss';

export default defineComponent({
  name: 'CustomNavBar',
  props: {
    title: {
      type: String,
      required: true,
    },
    showBackButton: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const statusBarHeight = ref<number>(20); // 默认状态栏高度
    const navBarHeight = ref(44); // 默认导航栏高度

    const handleBack = () => {
      if (Taro.getCurrentPages().length > 1) {
        Taro.navigateBack();
      }
    };

    onMounted(() => {
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
      <View style={`padding-top: ${statusBarHeight.value}px;height: 88rpx`}>
        <View class="custom-nav-bar" style={`padding-top: ${statusBarHeight.value}px`}>
          <NutNavbar
            title={props.title}
            leftShow={props.showBackButton}
            safe-area-inset-top
            leftText={props.showBackButton ? '返回' : ''}
            onClick-left={handleBack}
          />
        </View>
      </View>
    );
  },
});
