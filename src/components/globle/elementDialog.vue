<template>
  <div>
    <el-dialog
      :title="title"
      v-model="dialogShow"
      :width="width"
      :before-close="close"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnPressEscape"
      :show-close="showClose"
    >
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
    },
    // 是否可以通过点击 modal 关闭 Dialog
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    // 是否可以通过按下 ESC 关闭 Dialog
    closeOnPressEscape: {
      type: Boolean,
      default: false
    },
    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: false
    }
  },
  emits: ['dialogClose'],
  setup(props, ctx) {
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
