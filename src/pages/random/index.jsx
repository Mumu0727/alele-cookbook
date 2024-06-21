import { reactive } from 'vue'
import { View, Text, Button } from '@tarojs/components'

export default {
  name: 'Index',
  components: {
    View,
    Text,
    Button,
  },
  setup() {
    const state = reactive({
      msg: '随机菜单'
    })

    const handleClick = (msg) => {
      state.msg = msg
    }

    return () => {
      return (
        <View>
          <View>
            <Text>{state.msg}</Text>
          </View>
        </View>
      )
    }
  },
}
