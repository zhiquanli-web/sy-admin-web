<template>
  <el-container class="main-container">
    <el-aside style="width: auto">
      <NavMenu :isCollapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header height="50px">
        <LayoutHeader v-model:isCollapse="isCollapse" />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { LayoutHeader, NavMenu } from '@/components/layout';
const isCollapse = ref(false);
</script>

<style lang="scss" scoped>
.main-container {
  height: 100%;
  .el-header {
    background: #fff;
  }
  .el-aside {
    background: #001529;
  }
  .el-main {
    background: #f0f2f5;
  }
}
</style>
