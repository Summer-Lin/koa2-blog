<template>
  <div class="title-box">
  <div>
    <slot name="title"></slot>
    <div class="rightBtn">
      <slot name="rightBtn"></slot>
    </div>
    
  </div>
    
  </div>
</template>
<script>
export default {}
</script>
<style lang="less">
  .title-box {
    background-color: #e8e8e8;
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 5px 5px 0 0;

    .rightBtn {
      float: right;
    }
  }
</style>