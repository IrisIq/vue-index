<!--
 * @Author: IrisIq
 * @Date: 2024-05-10 15:19:47
 * @LastEditors: IrisIq
 * @LastEditTime: 2024-05-14 15:06:35
 * @Description: 个人信息组件
-->
 <template>
  <el-card v-show="!dialogVisible">
    <el-row :gutter="10">
      <el-col :span="8">
        <span>性别:{{ formIndex?.sex }}</span>
      </el-col>
      <el-col :span="8"
        ><span>体重:{{ formIndex?.weight }}</span> <span v-if="formIndex?.weight">kg</span></el-col
      >
      <el-col :span="8">
        <span>bmi:{{ useStore().getters.getBmi }} </span>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { useStore } from 'vuex'
const props = defineProps({
  formIndex: Object,
  dialogVisible: Boolean
})

</script>
