<template>
  <el-page-header content="个人简历" />
  <h2 class="title">个人简历</h2>
  <div class="index">
    <el-card>
      <el-descriptions title="个人信息">
        <el-descriptions-item label="姓名">吴泳汐</el-descriptions-item>
        <el-descriptions-item label="年龄">24</el-descriptions-item>
        <el-descriptions-item label="邮箱">2368048277@qq.com</el-descriptions-item>
        <el-descriptions-item label="Remarks">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address"
          >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province</el-descriptions-item
        >
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.title {
  margin: 10px 0;
}
.index {
  width: 75%;
  margin: 0 auto;
}
</style>
