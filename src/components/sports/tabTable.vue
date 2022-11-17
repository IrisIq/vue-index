<template>
  <elementTable :tableConfig="data.calculateTableConfig" :tableDate="data.colData" class="topTable">
    <template #btn="scope">
      <el-button size="small" @click="addFood(scope)">Add</el-button>
    </template>
  </elementTable>
</template>

<script setup>
import { defineProps, onMounted, reactive, defineEmits } from 'vue'
import { getFood } from '@/api/api'

onMounted(() => {
  getFoods()
})

const props = defineProps({
  type: String
})
const data = reactive({
  calculateTableConfig: {
    height: '250px',
    // maxHeight: '45vh',
    showSummary: false,
    thead: [
      { label: '名称', props: 'food_name' },
      { label: '热量/千卡', props: 'food_heat' },
      { label: '蛋白质/克', props: 'food_protein' },
      { label: '脂肪/克', props: 'food_fat' },
      { label: '碳水/克', props: 'food_carbohydrate' },
      {
        label: '操作',
        type: 'slot',
        slot_name: 'btn',
        width: 180,
        fixed: 'right'
      }
    ]
  },
  colData: []
})
const emit = defineEmits(['addFoodTab'])

const getFoods = async () => {
  const { data: res } = await getFood({ type: props.type })
  data.colData = res.data
}

const addFood = scope => {
  emit('addFoodTab', scope)
}
</script>
