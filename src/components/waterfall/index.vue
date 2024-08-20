<template>
  <view class="waterfall-container">
    <view class="waterfall-column" v-for="(column, index) in columns" :key="index">
      <view v-for="(item, idx) in column" :key="idx" class="waterfall-item">
        <image :src="IMG_URL + item.imgUrl" class="waterfall-image" mode="widthFix" />
        <view class="waterfall-text">{{ item.name }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';

export default defineComponent({
  name: 'WaterFall',
  props: {
    items: {
      type: Array as () => Array<{ imgUrl: string; name: string, id: number }>,
      required: true,
    },
    columnCount: {
      type: Number,
      default: 2,
    },
  },
  setup(props) {
    const columns = ref<Array<Array<{ imgUrl: string; name: string }>>>(Array.from({ length: props.columnCount }, () => []));
    const IMG_URL = process.env.TARO_APP_IMG;

    const distributeItems = () => {
      // 将 items 分配到每一列中
      props.items.forEach((item, index) => {
        columns.value[index % props.columnCount].push(item);
      });
    };

    watch(() => (props.items),
      () => {
        distributeItems()
      },
      { deep: true }
    )

    onMounted(() => {
      distributeItems();
    });

    return {
      columns,
      IMG_URL
    };
  },
});
</script>
