<template>
  <div class="index">
    <index />
  </div>
</template>

<script>
import index from '@/components/sports/index.vue'

export default {
  name: 'initializationView',
  components: {
    index
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 500px) {
  .index {
    font-size: 16px;
    width: 100%;
    background-color: red; // min-width: 750px;
  }
}
@media screen and (min-width: 501px) {
  .index {
    width: 60%;
    height: 100%;
    margin: 10px auto;
    // margin-top: 6px;
    // margin-left: 6px;
    min-width: 750px;
    // background-color: blue;
  }
}
</style>
