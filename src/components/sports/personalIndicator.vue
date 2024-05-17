<!--
 * @Author: IrisIq
 * @Date: 2024-05-16 15:53:33
 * @LastEditors: IrisIq
 * @LastEditTime: 2024-05-17 15:13:55
 * @Description: 个人指标选择 展示 模板
-->
<template>
  <!-- 相关数据 -->
  <el-card>
    <el-radio-group v-model="data.modelRadio" @change="radioChange">
      <el-radio :value="item" v-for="item in data.radioArr" :key="item">{{item}}</el-radio>
    </el-radio-group>
  </el-card>

  <div class="topCards">
    <el-card shadow="hover">
      <el-descriptions title="目标总数">
        <el-descriptions-item label="蛋白质">{{ data.protein }} </el-descriptions-item>
        <el-descriptions-item label="脂肪">{{ data.fat }} </el-descriptions-item>
        <el-descriptions-item label="碳水">
          {{ data.carbohydrate }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup>
import fingertipsConfig from '@/assets/fingertipsConfig.json'
import { defineComponent, ref, reactive, toRefs, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const data = reactive({
  protein: 0, // 蛋白质
  fat: 0, // 脂肪
  carbohydrate: 0, // 碳水
  radioArr: [], // 模式
  modelRadio: '' // 已选模
})

const getRadioArr = () => {
  data.radioArr = Object.keys(fingertipsConfig)
}
const radioChange = (e) => {
  const keyArr = ['fat', 'carbohydrate', 'protein']
  keyArr.forEach((item) => {
    data[item] = fingertipsConfig[e][item] * store.state.form.weight
  })
}
getRadioArr()
</script>
