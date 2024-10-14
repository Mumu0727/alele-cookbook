<template>
  <View class="waterfall-container">
    <View class="waterfall-column" v-for="(column, index) in columns" :key="index">
      <View v-for="(item) in column" :key="item.id" class="waterfall-item">
        <NutButton class="wish_btn" plain size="large" @click="handleWish(item)">
          <template #icon>
            <Addfollow v-if="!item.isWish" color="red" class="nut-icon-am-breathe nut-icon-am-infinite"></Addfollow>
            <HeartFill v-else color="red" class="nut-icon-am-breathe nut-icon-am-infinite"></HeartFill>
          </template>
        </NutButton>
        <Image :src="IMG_URL + item.imgUrl" class="waterfall-image" mode="widthFix" />
        <View class="waterfall-text">{{ item.name }}</View>
      </View>
    </View>
  </View>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue';
  import { Addfollow, HeartFill } from '@nutui/icons-vue-taro'
  import config from '@/common/constants';

  const emit = defineEmits(['wish'])
  const props = defineProps({
    items: {
      type: Array,
      required: true,
      default: () => []
    },
    columnCount: {
      type: Number,
      default: 2,
    },
  })

  const columns = ref(Array.from({ length: props.columnCount }, () => []));
  const IMG_URL = config.imgUrl;

  const handleWish = (item) => {
    emit('wish', item)
  }

  const distributeItems = () => {
    (props.items || []).forEach((item, index) => {
      columns.value[index % props.columnCount].push(item);
    });
  };

  watch(() => (props.items),
    () => {
      columns.value = Array.from({ length: props.columnCount }, () => []);
      distributeItems()
    },
    { deep: true }
  )

  onMounted(() => {
    distributeItems();
  });
</script>
