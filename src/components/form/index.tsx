/*
 * @Description:
 * @Author: muqingkun
 * @Date: 2024-06-27 20:24:14
 * @LastEditTime: 2024-06-28 17:31:44
 * @LastEditors: muqingkun
 * @Reference:
 */
import { ref, defineComponent, reactive } from 'vue'
import { View } from '@tarojs/components'
import StepTextarea from '@/components/stepTextarea';
import dict from '@/dict';
// import CustomNavBar from '@/components/CustomNavBar';
import './index.scss';

export default defineComponent({
  name: 'AddPage',
  setup() {
    const requiredValidator = (val) => {
      console.log("🚀 ~ requiredValidator ~ val:", val)
      if (/^\d+$/.test(val)) {
        return Promise.resolve()
      } else {
        return Promise.reject('请输入')
      }
    }
    const formRef = ref()
    const state = reactive({
      rules: {
        name: [{ required: true, message: '请填写菜名' }],
        categoryName: [{ required: true, message: '请选择分类' }],
        fileList: [{ validator: requiredValidator, message: '请选择图片' }],
      },
      formData: {
        name: '',
        practices: '',
        remark: '',
        category: [],
        fileList: [],
        categoryName: ''
      },
      showPicker: false
    })

    const confirm = ({ selectedValue, selectedOptions }) => {
      state.showPicker = false
      state.formData.categoryName = selectedOptions[0].name
      state.formData.category = selectedValue
    }

    const submit = () => {
      console.log("🚀 ~ formRef.value?.validate ~ formRef.value:", formRef.value)
      formRef.value?.validate().then(({ valid, errors }) => {
        if (valid) {
          console.log('success:', state.formData)
        } else {
          console.warn('error:', errors)
        }
      })
    }

    return () => (
      <>
        <View class="form_view">
          <NutForm ref={formRef} v-model={[state.formData, 'modelValue']} model-value={state.formData} rules={state.rules}>
            <NutFormItem label="菜名" prop="name" required>
              <NutInput v-model={state.formData.name} placeholder="输入菜名"></NutInput>
            </NutFormItem>
            <NutFormItem label="分类" prop="categoryName" required >
              <NutInput v-model={state.formData.categoryName} onClick={() => state.showPicker = true} readonly placeholder="选择分类"></NutInput>
              <NutPopup v-model={[state.showPicker , 'visible']} position="bottom">
                <NutPicker
                  v-model={state.formData.category}
                  fieldNames={{text: 'name', value: 'value'}}
                  columns={dict.category}
                  onCancel={() => {state.showPicker = false}}
                  onConfirm={confirm}
                ></NutPicker>
              </NutPopup>
            </NutFormItem>
            <NutFormItem label="图片" prop="fileList" required>
              <NutUploader
                v-model={[state.formData.fileList, 'file-list']}
                url="http://服务地址"
                accept="image/*"
                maximum="1"
              />
            </NutFormItem>
            <NutFormItem label="做法" prop="practices" required>
              <StepTextarea
                v-model={state.formData.practices}
                limit-show
                required
                placeholder="编辑做法"
              />
            </NutFormItem>
            <NutFormItem label="备注" prop="remark">
              <NutTextarea
                v-model={state.formData.remark}
                limit-show
                max-length={200}
                required
                placeholder="输入备注"
              />
            </NutFormItem>
            <NutSpace direction="vertical" fill style="margin: 10px">
              <NutButton style="width: calc(100% - 20px)" block type="primary" size="normal" onClick={submit}>提交</NutButton>
            </NutSpace>
          </NutForm>
        </View>
      </>
    )
  }
})
