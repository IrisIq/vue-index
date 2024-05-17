<!--
 * @Author: IrisIq
 * @Date: 2024-05-14 11:45:13
 * @LastEditors: IrisIq
 * @LastEditTime: 2024-05-16 15:55:45
 * @Description: 计算器弹窗表单
-->
<template>
  <el-dialog
    :model-value="dialogVisible"
    title="请输入相关信息"
    width="50%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <!-- 数据表单 -->
    <el-form ref="ruleFormRef" :model="form" label-width="100px" label-position="left" :rules="rules">
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
      <!-- 身高 -->
      <el-form-item label="身高(cm)" prop="tall">
        <el-input-number v-model="form.tall" type="number" :max="250" />
      </el-form-item>
    </el-form>
    <!-- 提交按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="resetForm(ruleFormRef)"> 重置 </el-button>
        <el-button type="primary" @click="submitData(ruleFormRef)"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineProps, defineEmits, toRefs, defineComponent, reactive, ref, getCurrentInstance, defineModel } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup (props, { emit: $emit }) {
    const store = useStore()
    const ruleFormRef = ref()
    const { dialogVisible } = toRefs(props)
    // 表单数据
    const form = reactive(store.state.form)
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
    const submitData = formEl => {
      if (!formEl) return
      formEl.validate(valid => {
        if (valid) {
          ElMessage({
            message: '欢迎' + form.name,
            type: 'success'
          })
          // console.log(emit)
          console.log($emit)
          $emit('update:modelValue', false)
          store.commit('setForm', form)
        } else {
          ElMessage({
            message: '你必须填写相关信息',
            type: 'warning'
          })
        }
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
      form,
      ruleFormRef,
      rules,
      submitData,
      resetForm,
      dialogVisible
    }
  }
})
</script>

<style lang="sass" scoped>
.el-form-item
  justify-self: start
</style>
