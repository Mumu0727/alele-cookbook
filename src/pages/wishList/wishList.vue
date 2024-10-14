<!--
 * @Description:
 * @Author: muqingkun
 * @Date: 2024-10-09 16:00:08
 * @LastEditTime: 2024-10-09 16:51:38
 * @LastEditors: muqingkun
 * @Reference:
-->
<template>
  <View>
    <View class="wish_list">
      <NutCell class="cell_box" v-for="item in wishList" :key="item.id">
        <template #title>
          <View class="title_box">
            <Image class="img_box" :src="IMG_URL + item.imgUrl" width="100" height="100" />
            <Text class="text_box">{{ item.name }}</Text>
          </View>
        </template>
        <template #link>
          <NutButton class="del_btn" plain @click="deleteWishList(item.id)">
            <template #icon>
              <Del2 color="red" size="16" />
            </template>
          </NutButton>
        </template>
      </NutCell>
    </View>
    <View class="date_view">
      <NutTimeSelect
        v-model:visible="visible"
        :current-key="key"
        :current-time="time"
        @select="handleSelect"
        >
        <template #title>选择时间</template>
        <template #pannel>
          <NutTimePannel name="2月23日(今天)" pannel-key="0" @change="onChange"></NutTimePannel>
          <NutTimePannel name="2月24日(星期三)" pannel-key="1" @change="onChange"></NutTimePannel>
        </template>
        <template #detail>
          <NutTimeDetail :times="times" @select="onSelect"></NutTimeDetail>
        </template>
      </NutTimeSelect>
    </View>
  </View>
</template>

<script setup>
import Taro from '@tarojs/taro';
import { useStore } from 'vuex'
import { computed, nextTick, onMounted, ref }  from 'vue'
import { Del2 } from '@nutui/icons-vue-taro'
import config from '@/common/constants';

import './wishList.scss';

const IMG_URL = config.imgUrl;
const store = useStore()
const wishList = computed(() => store.getters.getWishList)

const visible = true
const key = ref(0)
const time = ref([])

const times = ref([
  {
    key: 0,
    list: ['9:00-10:00', '10:00-11:00', '11:00-12:00']
  },
  {
    key: 1,
    list: ['9:00-10:00', '10:00-11:00']
  }
])

const deleteWishList = (id) => {
  store.dispatch('delWishList', id)
  nextTick(() => {
    if (wishList.value.length === 0) {
      Taro.navigateBack()
    }
  })
}

const onChange = (pannelKey) => {
  key.value = pannelKey
  time.value = []
  time.value.push({
    key: pannelKey,
    list: []
  })
}

const handleSelect = (obj) => {
  console.log(obj)
}

onMounted(() => {
  time.value.push({
    key: key.value,
    list: []
  })
})


const onSelect = (item) => {
  let curTimeIndex = time.value[0]['list'].findIndex(time => time === item)
  if (curTimeIndex === -1) {
    time.value[0]['list'].push(item)
  } else {
    time.value[0]['list'].splice(curTimeIndex, 1)
  }
}
</script>
