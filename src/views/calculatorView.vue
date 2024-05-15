<template>
  <div class="cont">
    <div class="top">
      <Header v-model="dialogVisible" :formIndex="formIndex"></Header>
      <!-- 个人信息 -->
      <PersonalInformation :formIndex="formIndex" :dialogVisible="dialogVisible" />

      <el-card>
        <el-radio-group v-model="model">
          <el-radio :value="1">小白增肌</el-radio>
          <el-radio :value="2">增肌Plus</el-radio>
          <el-radio :value="3" disabled>减脂模式</el-radio>
          <el-radio :value="4" disabled>日常模式</el-radio>
          <el-radio :value="5" disabled>DIY倍率模式</el-radio>
        </el-radio-group>
      </el-card>

      <!-- 相关数据 -->
      <div class="topCards">
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
      </div>

      <!-- 上部表格 -->
      <div class="topTable">
        <el-card shadow="hover">
          <elementTable :tableConfig="calculateTableConfig" :tableDate="calculateFood" class="topTable">
            <template #btn="scope">
              <el-input-number
                :min="1"
                :step="50"
                size="small"
                v-model="scope.data.food_weight"
                @change="weightChange(scope.index, scope.data)"
              ></el-input-number>
              <el-button link type="primary" size="small" style="margin-left: 5px" @click="delFood(scope.index)"
                >删除</el-button
              >
            </template>
          </elementTable>
        </el-card>
      </div>

      <!-- 上部表格-->
    </div>

    <!-- 下部区域 -->
    <div class="buttom">
      <el-card shadow="hover" :body-style="{ padding: '0px' }" type="border-card">
        <el-tabs class="foodChoices" tabPosition="left" v-model="selectFood">
          <el-tab-pane label="主食" name="1">
            <!-- 主食表格 -->
            <tabTable :type="selectFood" v-if="selectFood == 1" @addFoodTab="addFoodTab"></tabTable>
          </el-tab-pane>

          <el-tab-pane label="蔬菜" name="2">
            <tabTable :type="selectFood" v-if="selectFood == 2"></tabTable>
          </el-tab-pane>

          <el-tab-pane label="肉" name="3">
            <tabTable :type="selectFood" v-if="selectFood == 3"></tabTable>
          </el-tab-pane>

          <el-tab-pane label="其他" name="5">
            <tabTable :type="selectFood" v-if="selectFood == 5"></tabTable>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>

    <Initialization v-model="dialogVisible" />

  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs, watch } from 'vue'
import { useStore, mapState, mapGetters } from 'vuex'

// import { stapleFood, vegetable, meet, other } from './staple.js'
import tabTable from '@/components/sports/tabTable'
import PersonalInformation from '@/components/sports/personalInformation'
import Header from '@/components/sports/header'
import Initialization from '@/components/sports/initialization'

export default defineComponent({
  name: 'index',
  components: { tabTable, PersonalInformation, Header, Initialization },
  computed: {
    ...mapState(['form', 'count']),
    ...mapGetters(['muscleMini', 'musclePlus'])
  },

  setup () {
    const data = reactive({
      columnsIndex: null, // 选中的数据
      calculateFood: [], // 计算表数据
      standardValue: [], // 计算表中的种类标准值
      alterKey: ['food_heat', 'food_protein', 'food_carbohydrate', 'food_fat']
    })
    const dataRef = toRefs(data)

    const ruleFormRef = ref()
    const store = useStore()
    const foodDate = null
    const calculateTableConfig = reactive({
      height: '250px',
      // maxHeight: '45vh',
      showSummary: true,
      thead: [
        { label: '名称', props: 'food_name' },
        { label: '热量/千卡', props: 'food_heat' },
        { label: '蛋白质/克', props: 'food_protein' },
        { label: '脂肪/克', props: 'food_fat' },
        { label: '碳水/克', props: 'food_carbohydrate' },
        {
          label: '数量/克',
          type: 'slot',
          slot_name: 'btn',
          width: 180,
          fixed: 'right'
        }
      ]
    })
    // 表单数据
    const formIndex = reactive(store.state.form)
    const selectFood = ref('1')
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
    // 搜索食物数据
    const searchFood = ref('')
    // 模式选择
    const model = ref('')

    // 判断是否需要显示
    const isShow = () => {
      if (formIndex.name === '') {
        return true
      } else {
        return false
      }
    }
    const dialogVisible = ref(isShow())

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
      if (!ref) return
      store.commit('restForm')
    }

    // 删除食物
    const delFood = index => {
      data.calculateFood.splice(index, 1)
    }

    // 计算函数
    const foodVariety = (oldValue, row) => {
      for (const item of data.alterKey) {
        row[item] = ((oldValue[item] / oldValue.food_weight) * row.food_weight).toFixed(2)
      }
    }
    // 食物数量发生改变
    const weightChange = (index, row) => {
      const { food_id } = row
      const obj = data.standardValue.find(item => {
        return item.food_id === food_id
      })
      foodVariety(obj, row)
    }
    // 添加食物回调
    const addFoodTab = ({ data: value }) => {
      // console.log(value)
      const findIndex = data.calculateFood.findIndex(item => item.food_id === value.food_id)
      if (findIndex === -1) {
        // 未添加过这个 直接添加
        data.calculateFood.push(JSON.parse(JSON.stringify(value)))
        data.standardValue.push(JSON.parse(JSON.stringify(value)))
        console.log(data.standardValue)
        return false
      }
      // 存在 增加一份数量 并计算
      data.calculateFood[findIndex].food_weight += value.food_weight
      for (const item of data.alterKey) {
        data.calculateFood[findIndex][item] = (
          (value[item] / value.food_weight) *
          data.calculateFood[findIndex].food_weight
        ).toFixed(2)
      }
    }
    return {
      dialogVisible,
      formIndex,
      addFoodTab,
      ruleFormRef,
      rules,
      submitForm,
      resetForm,
      store,
      selectFood,
      delFood,
      weightChange,
      searchFood,
      model,
      calculateTableConfig,
      ...dataRef
    }
  }
})
</script>

<style lang="scss" scoped>
  @media screen and (max-width: 500px) {
    .index {
      font-size: 16px;
      width: 100%;
      background-color: red; // min-width: 750px;
    }
  }
  @media screen and (min-width: 501px) {
    .index {
      width: 60%;
      height: 100%;
      margin: 10px auto;
      // margin-top: 6px;
      // margin-left: 6px;
      min-width: 750px;
      // background-color: blue;
    }
  }
  .cont {
    width: 100%;
  }
  .top {
    // height: 60vh;
    .topTable {
      max-height: 100%;
    }
    .topCards {
      max-height: 100%;
    }
  }

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
