<template>
  <el-row :gutter="10">
    <!-- 页头 -->
    <el-col :span="11">
      <el-page-header content="运动饮食计算器" />
    </el-col>
    <el-col :span="8" class="btn">
      <el-button type="primary" size="small" @click="dialogVisible = true"
        >重置基础数据</el-button
      >
    </el-col>
  </el-row>

  <!-- 主体 -->
  <el-row :gutter="10" class="warning">
    <!-- 食物选择区 -->
    <el-col :span="5">
      <el-card
        shadow="hover"
        :body-style="{ padding: '0px' }"
        type="border-card"
      >
        <el-tabs class="foodChoices" tabPosition="left">
          <el-tab-pane label="主食" name="first">User</el-tab-pane>
          <el-tab-pane label="蔬菜" name="second">Config</el-tab-pane>
          <el-tab-pane label="肉" name="third">Role</el-tab-pane>
          <el-tab-pane label="其他" name="fourth">Task</el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>

    <el-col :span="8">
      <el-card shadow="hover">
        <!-- 计算区 -->
        计算数量
      </el-card>
    </el-col>
    <!--  计算数据结果 -->
    <el-col :span="11">
      <el-card shadow="hover">
        <el-table style="width: 100%">
          <el-table-column prop="date" label="身高" width="180" />
          <el-table-column prop="name" label="体重" width="180" />
          <el-table-column prop="address" label="bmi" />
        </el-table>
      </el-card>

      <el-card shadow="hover">
        <el-table style="width: 100%">
          <el-table-column prop="date" label="身高" width="180" />
          <el-table-column prop="name" label="体重" width="180" />
          <el-table-column prop="address" label="bmi" />
        </el-table>
      </el-card>
    </el-col>
  </el-row>

  <!-- dialog -->
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
      <el-form-item label="名称" prop="name">
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
        <el-input v-model="form.weight" autosize />
      </el-form-item>
    </el-form>

    <!-- 提交按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="resetForm(ruleFormRef)">
          重置
        </el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    let dialogVisible = ref(true)
    const ruleFormRef = ref()

    // 表单数据
    const form = reactive({
      name: '',
      sex: '',
      weight: ''
    })
    // 表单规则
    const rules = reactive({
      name: [
        {
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 7,
          message: '名称长度请在3-7个字符之间',
          trigger: 'blur'
        }
      ],
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
    const submitForm = formEl => {
      if (!formEl) return
      formEl.validate(valid => {
        if (valid) {
          ElMessage({
            message: '欢迎',
            type: 'success'
          })
          dialogVisible = false
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    // // 重置表单
    const resetForm = ref => {
      console.log(ref)
      if (!ref) return
      ref.resetFields()
    }

    return {
      dialogVisible,
      form,
      ruleFormRef,
      rules,
      submitForm,
      resetForm
    }
  }
})
</script>

<style lang="scss" scoped>
.btn {
  margin: 0 !important;
}
.el-tabs {
  // width: 30%;
  height: 100%;
  // min-width: 300px;
}

.warning {
  margin-top: 10px;
  min-width: 800px;
}
</style>
