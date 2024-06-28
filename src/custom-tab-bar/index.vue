<!--
 * @Description:
 * @Author: muqingkun
 * @Date: 2024-06-19 15:19:19
 * @LastEditTime: 2024-06-28 17:36:15
 * @LastEditors: muqingkun
 * @Reference:
-->
<template>
  <View class="tab-bar">
    <View class="tab-bar-box">
      <View v-for="(item, index) in list" :key="index" class="tab-bar-item" @tap="switchTab(index, item.pagePath)">
        <View class="tab-bar-item-add" v-if="item.unique">
          <Image :src="selected === index ? item.selectedIconPath : item.iconPath" />
        </View>
        <View v-else>
          <Image :src="selected === index ? item.selectedIconPath : item.iconPath" />
        </View>
      </View>
    </View>
  </View>
</template>

<script setup>
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { computed }  from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const selected = computed(() => store.getters.getSelected)

const color = '#000000'
const selectedColor = '#DC143C'
const list = [
  {
    pagePath: "/pages/random/index",
    selectedIconPath: './../images/accompany.png',
    iconPath: './../images/accompany_a.png',
    text: "吃啥"
  }, {
    pagePath: "/pages/add/index",
    selectedIconPath: './../images/add.png',
    iconPath: './../images/add_a.png',
    unique: true,
    text: "新增"
  }, {
    pagePath: "/pages/list/index",
    selectedIconPath: './../images/food.png',
    iconPath: './../images/food_a.png',
    text: "菜谱"
  }
]

function switchTab(index, url) {
  setSelected(index)
  Taro.switchTab({ url })
}

function setSelected (index) {
  store.dispatch('setSelected', index)
}
</script>

<style lang="scss">
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  padding-bottom: env(safe-area-inset-bottom);
  background-color: #fff;
}
.tab-bar-box {
  position: absolute;
  width: 100%;
  top: -40px;
  display: flex;
  background-image: url('./../images/tab.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position-y: -3px;
  height: 130px;
}

.tab-bar-item .tab-bar-item-add {
  width: 100px;
  background: linear-gradient(180deg,#f4d0e9, #ff3f5f 98%);
  border-radius: 50%;
  box-shadow: 0px 2px 12px 0px rgba(255, 124, 170, 0.7);
  color: #fff;
  line-height: 80px;
  height: 100px;
  margin-top: 20px;
  font-weight: 700;
  Image {
    padding-top: 10px;
    width: 80px;
    height: 80px;
    margin: 0 auto;
  }
}

.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 28px;
}

.tab-bar-item Image {
  padding-top: 40px;
  width: 60px;
  height: 60px;
}

</style>
