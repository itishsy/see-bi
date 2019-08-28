<template>
  <div class="square-border-contain mt-10" :style="{height: squBorHeight + 'px'}">
    <div class="square-border"></div>
    <div class="square-contain">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SquareBorder',
  props: ['squBorHeight']
}
</script>

<style lang="less" scoped>
  .square-border-contain{
    position: relative;
    width: 100%;
    .square-border{
      width: 100%;
      height: 100%;
    }
    .square-contain{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      padding: 10px 20px;
    }
  }
</style>
