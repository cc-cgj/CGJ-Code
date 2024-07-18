<template>
  <div class="layout">
    <div class="layout-header">
      <div class="layout-header-title">{{ $route.meta.title }}</div>
    </div>
    <div class="layout-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script name="Layout" lang="ts" setup></script>

<style lang="less">
.layout {
  --header-height: 84px;
  padding-top: var(--header-height);
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #f2f5f8;
  &-header {
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: var(--header-height);
    background: #ffffff;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
    padding: 25px 0;
    text-align: center;
    box-sizing: border-box;
    z-index: 66;
    &-title {
      font-weight: bold;
      font-size: 22px;
      color: #000000;
      font-family: PingFangSC, PingFang SC;
    }
  }
  &-main {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }
}

@media (max-width: 575px) {
  .layout-main {
    width: 100vw;
  }
}
</style>
