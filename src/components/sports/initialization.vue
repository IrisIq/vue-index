<!--
 * @Author: IrisIq
 * @Date: 2024-05-14 11:45:13
 * @LastEditors: IrisIq
 * @LastEditTime: 2024-05-14 14:53:45
 * @Description: 计算器弹窗表单
-->
<template>
  <el-dialog v-model="dialogVisible" title="请输入相关信息" width="50%">
    <!-- 数据表单 -->
    <el-form
      ref="ruleFormRef"
      :model="form"
      label-width="100px"
      label-position="left"
      :rules="rules"
    >
      <!-- 名称 -->
      <el-form-item label="名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <!-- 性别选择 -->
      <el-form-item label="性别" prop="sex">
        <el-select v-model="form.sex" placeholder="请选择你的性别">
          <el-option label="男" value="boy" />
          <el-option label="女" value="girl" />
        </el-select>
      </el-form-item>
      <!-- 体重 -->
      <el-form-item label="体重(kg)" prop="weight">
        <el-input v-model="form.weight" autosize autocomplete="" />
      </el-form-item>
    </el-form>
    <!-- 提交按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="restData(ruleFormRef)">
          重置
        </el-button>
        <el-button type="primary" @click="submitData(ruleFormRef)">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, ref, getCurrentInstance } from 'vue'

export default defineComponent({
  setup() {
    let dialogVisible = ref(true)
    const ruleFormRef = ref()
    const { proxy } = getCurrentInstance()

    function sendMitt() {
      proxy.$mitt.emit('basicDataForm', form)
    }
    // 表单数据
    const form = reactive({
      name: '',
      sex: '',
      weight: ''
    })
    // 表单规则
    const rules = reactive({
      sex: [
        {
          required: true,
          message: '请选择性别',
          trigger: 'change'
        }
      ],
      weight: [
        {
          required: true,
          message: '请输入你的体重',
          trigger: 'blur'
        }
      ]
    })
    // 提交表单
    const submitData = ref => {
      if (!ref) return
      ref.validate((valid, fields) => {
        if (!valid) {
          console.log('请输入信息', fields)
          return
        }
        console.log(form)
        dialogVisible = false
        console.log(dialogVisible)
        sendMitt()
      })
    }
    // 重置表单
    const resetForm = ref => {
      console.log(ref)
      if (!ref) return
      ref.resetFields()
    }
    // 传送表单数据

    return {
      dialogVisible,
      form,
      ruleFormRef,
      rules,
      submitData,
      resetForm,
      sendMitt
    }
  }
})
</script>

<style lang="sass" scoped>
.el-form-item
  justify-self: start
</style>
