<template>
  <h1>当前form数据为{{ store.state.form }}</h1>
  <!-- <input type="text" :value="form.name" @input="add" />
  <input type="text" :value="form.sex" @input="add" />
  <input type="text" :value="form.weight" @input="add" /> -->
  <button @click="add">123</button>

  <div>
    <button @click="dialog = true">打开dialog</button>

    <elementDialog :dialogVisible="dialog" @dialogClose="onDialogClose" :title="dialogTitle">
      <div><span>这是普通内容</span></div>

      <template v-slot:btn>
        <el-button type="primary" @click="handleClick">提交</el-button>
      </template>
    </elementDialog>
  </div>

  <div>
    <elementTable :tableData="data" :title="titleName"></elementTable>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore, mapState, mapGetters } from 'vuex'
export default {
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(['getForm']),
    ...mapState(['form', 'count'])
  },
  methods: {
    // ...mapMutations(['setForm']),
    // ...mapActions(['asyAdd'])
  },
  watch: {
    '$store.state.app.form': function (newFlag, oldFlag) {
      console.log('监听到页面1的变化')
      // 进行业务逻辑处理
    }
  },
  setup() {
    // const data = { name: '123', sex: '123', weight: '213' }
    const store = useStore()
    const add = () => {
      // 可以使用
      store.commit('setForm')
      // 可以使用
      store.dispatch('asyAdd')
    }
    const dialog = ref(false)

    const onDialogClose = () => {
      dialog.value = false
    }
    const dialogTitle = '998'
    const handleClick = () => {
      dialog.value = false
    }

    const data = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ]
    const titleName = ['日期', '地址', '地址']
    return { add, store, dialog, onDialogClose, dialogTitle, handleClick, data, titleName }
  }
}
</script>

<style lang="scss" scoped></style>
