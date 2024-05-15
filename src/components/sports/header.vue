<!--
 * @Author: IrisIq
 * @Date: 2024-05-14 11:45:13
 * @LastEditors: IrisIq
 * @LastEditTime: 2024-05-14 15:14:04
 * @Description: 计算器Header部分
-->
<template>
  <el-row :gutter="10">
    <!-- 页头 -->
    <el-col :span="11">
      <el-page-header content="运动饮食计算器" />
    </el-col>
    <el-col :span="7" class="btn">
      <el-button type="primary" size="small" @click="modelValue=true">重置基础数据</el-button>
    </el-col>
    <el-col :span="4" class="btn" v-if="!modelValue"> 您好，{{ formIndex?.name }} </el-col>
  </el-row>
</template>

<script setup>
defineProps({
  formIndex: Object
})
const modelValue = defineModel({ default: false })
</script>
