<template>
  <div class="index">
    <!-- <initialization></initialization> -->
    <index />
  </div>
</template>

<script>
// import initialization from '@/components/sports/initialization.vue'
import index from '@/components/sports/index.vue'

export default {
  name: 'initializationView',
  components: {
    index
  }
}
</script>

<style lang="scss" scoped>
.index {
  margin-top: 6px;
  margin-left: 6px;
  min-width: 800px;
}
</style>
