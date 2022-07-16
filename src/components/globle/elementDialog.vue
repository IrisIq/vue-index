<template>
  <div>
    <el-dialog :title="title" v-model="dialogShow" :width="width" :before-close="close">
      <slot></slot>

      <template #footer>
        <slot name="btn"></slot>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '50%'
    }
  },
  emits: ['dialogClose'],
  setup(props, ctx) {
    // const dialogShow = computed({
    //   get: val => {
    //     console.log(val)
    //     return props.dialogVisible
    //   },
    //   set: val => {
    //     console.log(val)
    //     // return val
    //     return ctx.emit('update:dialogVisible', val)
    //   }
    // })

    // const dialogBeforeClose = () => {
    //   dialogShow = false
    // }
    // const close = () => {
    //   ctx.emit('dialogClose', false, 'close')
    // }

    const dialogShow = computed({
      get: () => {
        return props.dialogVisible
      },
      set: val => {
        console.log(val)
        return val
        // return ctx.emit('dialogClose', val)
      }
    })
    const close = () => {
      // ctx.emit('dialogClose', false, 'close')
      ctx.emit('dialogClose')
      console.log(123)
    }

    return { dialogShow, close }
  }
}
</script>
<style></style>
