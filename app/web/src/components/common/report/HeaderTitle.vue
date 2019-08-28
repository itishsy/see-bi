<!--
  需要传入：
  titleCenter:""---中间的标题
  titleLeft:""---左边的小标题
-->
<template>
  <div class="header-title">
    <div class="bg">
      <div class="title-bg"></div>
      <p><span class="text little-title" v-text="titleLeft"></span></p>
      <span class="text title" v-text="titleCenter"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderTitle',
  props: ['titleCenter', 'titleLeft']
}
</script>

<style lang="less" scoped>
  .header-title{
    padding-top: 20px;
    background-color: #1A294A;
  }
 .bg{
   position: relative;
   width: 100%;
   height: 66px;
   line-height: 66px;
   border-top: 2px solid #2E579E;
   padding-left: 20px;
   .title-bg{
     position: absolute;
     top: -18px;
     left: 50%;
     margin-left: -270px;
     width: 541px;
     height: 85px;
     background: url('/static/img/icons/ic-header-title.png');
   }
   .text{
     background-image:-webkit-linear-gradient(right,#0a8ef7,#62ffff);
     -webkit-background-clip:text;
     -webkit-text-fill-color:transparent;
     letter-spacing:5px;
   }
   .title{
     position: absolute;
     top: -10px;
     left: 50%;
     -moz-transform: translateX(-50%);
     -webkit-transform: translateX(-50%);
     -o-transform: translateX(-50%);
     transform: translateX(-50%);
     font-size: 30px;
   }
   .little-title{
     text-align: left;
     font-size: 26px;
   }
 }

</style>
