<template>
  <el-table :data="tableData" style="width: 100%">
    <!-- <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" /> -->
    <el-table-column prop="address" :label="item" v-for="(item, index) in title" :key="index"></el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      require: true,
      default: function () {
        return []
      }
    },
    title: {
      type: Array,
      require: true,
      default: function () {
        return []
      }
    }
  },
  setup(props) {
    console.log(props.tableData)
    console.log(props.title)
  }
}
</script>

<style lang="scss" scoped></style>
