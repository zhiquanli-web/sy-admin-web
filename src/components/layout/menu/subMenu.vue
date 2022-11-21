<template>
  <el-sub-menu :index="menuInfo.path" v-if="!menuInfo.meta.isHidden">
    <template #title>
      <el-icon :size="20" v-if="menuInfo.meta.icon">
        <component :is="menuInfo.meta.icon"></component>
      </el-icon>
      <span>{{ menuInfo.meta.title }}</span>
    </template>
    <!-- 遍历item -->
    <template v-for="menu in menuInfo.children" :key="menu.path">
      <el-menu-item
        :index="menu.path"
        @click="handleMenuItemClick(menu)"
        v-if="!menu.meta.isHidden && (!menu.children || menu.children.length === 0)"
      >
        <el-icon :size="20" v-if="menu.meta.icon">
          <component :is="menu.meta.icon"></component>
        </el-icon>
        <span>{{ menu.meta.title }}</span>
      </el-menu-item>
      <sub-menu :menuInfo="menu" v-else />
    </template>
  </el-sub-menu>
</template>

<script setup lang="ts" name="subMenu">
import { RouterItem } from '@/router';

defineProps<{ menuInfo: RouterItem }>();
const emit = defineEmits(['handleClickMenu']);

const handleMenuItemClick = (menu: any) => {
  emit('handleClickMenu', menu);
};
</script>

<style lang="scss" scoped></style>
