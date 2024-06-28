import { defineComponent, ref, watch } from 'vue';
import { View } from '@tarojs/components'
import './index.scss';

export default defineComponent({
  name: 'StepTextarea',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '请输入内容',
    },
    maxLength: {
      type: Number,
      default: 200,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const text = ref(props.modelValue);
    watch(() => props.modelValue, (newValue) => {
      text.value = newValue;
    });
    const handleInput = (event) => {
      text.value = ''
      console.log("🚀 ~ handleInput ~ event:", event.target.value)

      event.preventDefault();
      const steps = event.target.value.split('\n');
      text.value = steps.map((t: string, i: number) => {
        if (!t.includes(`第${i + 1}步：`)) {
          t = `第${i + 1}步：${t}`
        }
        return t
      }).join('\n');
      emit('update:modelValue', text.value);
    };

    return () => (
      <View class="step-textarea">
        <NutTextarea
          v-model={text.value}
          placeholder={props.placeholder}
          maxLength={props.maxLength}
          onInput={handleInput}
          max-length={500}
        />
      </View>
    );
  },
});
