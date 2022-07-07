<template>
  <h1>当前form数据为{{ store.state.form }}</h1>
  <!-- <input type="text" :value="form.name" @input="add" />
  <input type="text" :value="form.sex" @input="add" />
  <input type="text" :value="form.weight" @input="add" /> -->

  <button @click="add">123</button>
</template>

<script>
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
    return { add, store }
  }
}
</script>

<style lang="scss" scoped></style>
