<template>
  <el-row :gutter="10">
    <!-- 页头 -->
    <el-col :span="11">
      <el-page-header content="运动饮食计算器" />
    </el-col>
    <el-col :span="7" class="btn">
      <el-button type="primary" size="small" @click="dialogVisible = true">重置基础数据</el-button>
    </el-col>
    <el-col :span="4" class="btn" v-if="!dialogVisible"> 您好，{{ formIndex.name }} </el-col>
  </el-row>

  <!-- 上部区域 -->
  <el-row :gutter="5" class="warning">
    <!-- 食物数量表单 -->
    <el-col :span="16">
      <el-card shadow="hover">
        <el-table style="width: 100%" :data="calculateFood" height="283px" show-summary>
          <el-table-column prop="food_name" label="名称"> </el-table-column>
          <el-table-column prop="food_heat" label="热量"> </el-table-column>
          <el-table-column prop="food_protein" label="蛋白质"> </el-table-column>
          <el-table-column prop="food_fat" label="脂肪"> </el-table-column>
          <el-table-column prop="food_carbohydrate" label="碳水"></el-table-column>

          <!-- 末端按钮 -->
          <el-table-column fixed="right" width="180px">
            <template #default="scope">
              <el-input-number
                :min="1"
                :step="50"
                v-model="scope.row.food_weight"
                size="small"
                @change="weightChange(scope.$index, scope.row)"
              />
              <el-button link type="primary" size="small" @click="delFood(scope.$index)" style="margin-left: 5px"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <!--  计算数据结果 -->
    <el-col :span="8">
      <!-- 卡片1 个人信息栏 -->
      <el-card shadow="hover" v-if="!dialogVisible">
        <!-- 个人信息 -->
        <el-row :gutter="10">
          <el-col :span="8">
            <span>性别:{{ formIndex.sex }}</span>
          </el-col>
          <el-col :span="8"
            ><span>体重:{{ formIndex.weight }}</span> <span v-if="formIndex.weight">kg</span></el-col
          >
          <el-col :span="8">
            <span>bmi:{{ getBmi }} </span>
          </el-col>
        </el-row>
      </el-card>

      <!-- 卡片2 模式选择 -->
      <el-card shadow="hover">
        <el-radio-group v-model="model">
          <el-radio :label="1">小白增肌</el-radio>
          <el-radio :label="2">增肌Plus</el-radio>
          <el-radio :label="3" disabled>减脂模式</el-radio>
          <el-radio :label="4" disabled>日常模式</el-radio>
          <el-radio :label="5" disabled>DIY倍率大哥模式</el-radio>
        </el-radio-group>
      </el-card>

      <!-- 增肌小白 -->
      <el-card shadow="hover" v-if="model == 1">
        <el-descriptions title="目标总数">
          <el-descriptions-item label="蛋白质">{{ muscleMini.protein }} </el-descriptions-item>
          <el-descriptions-item label="脂肪">{{ muscleMini.fat }} </el-descriptions-item>
          <el-descriptions-item label="碳水">
            {{ muscleMini.carbohydrate }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>

      <!--增肌PLus  -->
      <el-card shadow="hover" v-if="model == 2">
        <el-descriptions title="目标总数">
          <el-descriptions-item label="蛋白质">{{ musclePlus.protein }} </el-descriptions-item>
          <el-descriptions-item label="脂肪">{{ musclePlus.fat }} </el-descriptions-item>
          <el-descriptions-item label="碳水">
            {{ musclePlus.carbohydrate }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-col>
  </el-row>

  <!-- 下部区域 -->

  <el-card shadow="hover" :body-style="{ padding: '0px' }" type="border-card">
    <el-tabs class="foodChoices" tabPosition="left" v-model="selectFood">
      <el-tab-pane label="主食" name="stapleFood">
        <!-- 主食表格 -->
        <el-table :data="stapleFood" style="width: 100%" height="250px">
          <el-table-column prop="food_name" label="名称"> </el-table-column>
          <el-table-column prop="food_heat" label="热量/千卡"> </el-table-column>
          <el-table-column prop="food_protein" label="蛋白质/克"> </el-table-column>
          <el-table-column prop="food_fat" label="脂肪/克"> </el-table-column>
          <el-table-column prop="food_carbohydrate" label="碳水"> </el-table-column>
          <el-table-column align="right" fixed="right">
            <template #header>
              <el-input v-model="searchFood" size="small" placeholder="您要找什么" />
            </template>
            <template #default="scope">
              <el-button size="small" @click="addFood(scope.$index, scope.row)">Add</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="蔬菜" name="vegetable">
        <el-table :data="vegetable" style="width: 100%" height="250px">
          <el-table-column prop="food_name" label="名称"> </el-table-column>
          <el-table-column prop="food_heat" label="热量/千卡"> </el-table-column>
          <el-table-column prop="food_protein" label="蛋白质/克"> </el-table-column>
          <el-table-column prop="food_fat" label="脂肪/克"> </el-table-column>
          <el-table-column prop="food_carbohydrate" label="碳水"> </el-table-column>
          <el-table-column align="right" fixed="right">
            <template #header>
              <el-input v-model="searchFood" size="small" placeholder="您要找什么" />
            </template>
            <template #default="scope">
              <el-button size="small" @click="addFood(scope.$index, scope.row)">Add</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="肉" name="meet"
        ><el-table :data="meet" style="width: 100%" height="250">
          <el-table-column prop="food_name" label="名称" width="width"> </el-table-column>
          <el-table-column prop="food_heat" label="热量/千卡" width="width"> </el-table-column>
          <el-table-column prop="food_protein" label="蛋白质/克" width="width"> </el-table-column>
          <el-table-column prop="food_fat" label="脂肪/克" width="width"> </el-table-column>
          <el-table-column prop="food_carbohydrate" label="碳水" width="width"> </el-table-column>
          <el-table-column align="right" fixed="right">
            <template #header>
              <el-input v-model="searchFood" size="small" placeholder="您要找什么" />
            </template>
            <template #default="scope">
              <el-button size="small" @click="addFood(scope.$index, scope.row)">Add</el-button>
            </template>
          </el-table-column>
        </el-table></el-tab-pane
      >

      <el-tab-pane label="其他" name="others">
        <el-table :data="other" style="width: 100%" height="250">
          <el-table-column prop="food_name" label="名称"> </el-table-column>
          <el-table-column prop="food_heat" label="热量/千卡"> </el-table-column>
          <el-table-column prop="food_protein" label="蛋白质/克"> </el-table-column>
          <el-table-column prop="food_fat" label="脂肪/克"> </el-table-column>
          <el-table-column prop="food_carbohydrate" label="碳水"> </el-table-column>
          <el-table-column align="right" fixed="right">
            <template #header>
              <el-input v-model="searchFood" size="small" placeholder="您要找什么" />
            </template>
            <template #default="scope">
              <el-button size="small" @click="addFood(scope.$index, scope.row)">Add</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>

  <!-- dialog -->
  <el-dialog
    v-model="dialogVisible"
    title="请输入相关信息"
    width="50%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <!-- 数据表单 -->
    <el-form
      ref="ruleFormRef"
      :model="formIndex"
      label-width="100px"
      label-position="left"
      :rules="rules"
      sum-text="合计"
    >
      <!-- 名称 -->
      <el-form-item label="名称" prop="name">
        <el-input v-model="formIndex.name" />
      </el-form-item>
      <!-- 性别选择 -->
      <el-form-item label="性别" prop="sex">
        <el-select v-model="formIndex.sex" placeholder="请选择你的性别">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <!-- 体重 -->
      <el-form-item label="体重(kg)" prop="weight">
        <el-input-number v-model="formIndex.weight" type="number" :max="300" />
      </el-form-item>
      <!-- 身高 -->
      <el-form-item label="身高(cm)" prop="tall">
        <el-input-number v-model="formIndex.tall" type="number" :max="250" />
      </el-form-item>
    </el-form>

    <!-- 提交按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="resetForm(ruleFormRef)"> 重置 </el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import { useStore, mapState, mapGetters } from 'vuex'
import { ElMessage } from 'element-plus'
import { stapleFood, vegetable, meet, other } from './staple.js'

export default defineComponent({
  computed: {
    ...mapState(['form', 'count']),
    ...mapGetters(['getBmi', 'muscleMini', 'musclePlus'])
  },

  setup() {
    const dialogVisible = ref(true)
    const ruleFormRef = ref()
    const store = useStore()

    // 表单数据
    const formIndex = reactive(store.state.form)
    const selectFood = ref('stapleFood')
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
      ],
      tall: [
        {
          required: true,
          message: '请输入你的身高',
          trigger: 'blur'
        }
      ]
    })
    // 计算表单数据
    const calculateFood = ref([])
    // 搜索食物数据
    const searchFood = ref('')
    // 模式选择
    const model = ref('')

    // 食物数据处理

    // 提交表单
    const submitForm = formEl => {
      if (!formEl) return
      formEl.validate(valid => {
        if (valid) {
          ElMessage({
            message: '欢迎' + formIndex.name,
            type: 'success'
          })
          dialogVisible.value = false
          store.commit('setForm', formIndex)
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

    // 添加食物进入计算表单
    const addFood = (index, row) => {
      for (let i = 0; i < calculateFood.value.length; i++) {
        if (calculateFood.value[i].food_id === row.food_id) {
          calculateFood.value[i].food_weight = calculateFood.value[i].food_weight + row.food_weight
          weightChange(index, calculateFood.value[i])
          return false
        }
      }
      const list = JSON.parse(JSON.stringify(row))
      calculateFood.value.push(list)
    }

    // 删除食物
    const delFood = index => {
      calculateFood.value.splice(index, 1)
    }

    // 计算
    // const foodVariety = (standardNum, standardWeight, NewWeight) => {
    //   const num = (standardNum / standardWeight) * NewWeight
    //   return num.toFixed(2)
    // }
    // 选择函数

    // 计算函数
    const foodVariety = (item, row) => {
      const heat = (item.food_heat / item.food_weight) * row.food_weight
      row.food_heat = heat.toFixed(2)
      const protein = (item.food_protein / item.food_weight) * row.food_weight
      row.food_protein = protein.toFixed(2)
      const fat = (item.food_fat / item.food_weight) * row.food_weight
      row.food_fat = fat.toFixed(2)
      const carbohydrate = (item.food_carbohydrate / item.food_weight) * row.food_weight
      row.food_carbohydrate = carbohydrate.toFixed(2)
    }
    // 食物数量发生改变
    const weightChange = (index, row) => {
      const { food_id, food_type: res, food_heat, food_protein, food_fat, food_carbohydrate, food_weight } = row

      if (res === 'stapleFood') {
        for (const item of stapleFood) {
          if (item.food_id === food_id) {
            row = foodVariety(item, row)
            return
          }
        }
      } else if (res === 'vegetable') {
        for (const item of vegetable) {
          if (item.food_id === food_id) {
            row = foodVariety(item, row)
            return
          }
        }
      } else if (res === 'meet') {
        for (const item of meet) {
          if (item.food_id === food_id) {
            row = foodVariety(item, row)
            return
          }
        }
      } else if (res === 'other') {
        for (const item of other) {
          if (item.food_id === food_id) {
            row = foodVariety(item, row)
            return
          }
        }
      }
      row.food_heat = foodVariety(food_heat, food_weight)
      row.food_protein = foodVariety(res, food_id, food_protein, food_weight)
      row.food_fat = foodVariety(res, food_id, food_fat, food_weight)
      row.food_carbohydrate = foodVariety(res, food_carbohydrate, food_weight)
    }
    //
    return {
      dialogVisible,
      formIndex,
      ruleFormRef,
      rules,
      submitForm,
      resetForm,
      store,
      selectFood,
      calculateFood,
      addFood,
      delFood,
      weightChange,
      searchFood,
      model,
      stapleFood,
      vegetable,
      meet,
      other
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
  // max-height: 400px;
}
</style>
