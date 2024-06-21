/*
 * @Description:
 * @Author: muqingkun
 * @Date: 2024-06-19 15:04:19
 * @LastEditTime: 2024-06-20 20:46:12
 * @LastEditors: muqingkun
 * @Reference:
 */
import { reactive } from 'vue'
import { View, Text, Button, Input, Textarea, PickerView, PickerViewColumn  } from '@tarojs/components'
import { Form, Field } from 'vant';

export default {
  name: 'Index',
  components: {
    View,
    Text,
    Button,
    Input,
    Textarea,
    PickerView,
    PickerViewColumn,
    Field,
    Form
  },
  setup() {
    const state = reactive({
      msg: '新增菜谱',
    })

    return () => {
      return (
        <View>
          <Form>
            <Field
              name="name"
              label="菜名"
              placeholder="菜名"
            ></Field>
          </Form>
        </View>
      )
    }
  },
}
