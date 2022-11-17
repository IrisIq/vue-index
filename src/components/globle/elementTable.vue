<template>
  <div style="height: 100%">
    <el-table
      :data="tableDate"
      style="width: 100%"
      :height="tableConfig.height"
      :max-height="tableConfig.maxHeight"
      :show-summary="tableConfig.showSummary"
    >
      <template v-for="(item, index) in tableConfig.thead" :key="index">
        <el-table-column :prop="item.props" :label="item.label" v-if="item.props" />

        <el-table-column
          :prop="item.props"
          :label="item.label"
          v-if="item.type == 'slot'"
          :min-width="item.width"
          :fixed="item.fixed"
        >
          <template #default="scope">
            <slot :name="item.slot_name" :data="scope.row" :index="scope.$index"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'

export default {
  props: {
    tableDate: {
      type: Array,
      require: true,
      default: function () {
        return []
      }
    },
    tableConfig: {
      type: Object,
      require: true
    }
  },

  setup(props) {
    const data = reactive([])

    return { data }
  }
}
</script>

<style lang="scss" scoped></style>
