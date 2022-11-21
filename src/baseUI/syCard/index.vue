<template>
  <el-card class="box-card" :shadow="shadow" :bodyStyle="bodyStyle">
    <template #header v-if="showHeader">
      <div class="card-header flex justify-between items-center">
        <span class="flex-1">
          <slot name="left">
            {{ title }}
          </slot>
        </span>
        <span class="ml-10px">
          <slot name="right"></slot>
        </span>
      </div>
    </template>
    <div class="card-content">
      <slot></slot>
    </div>
  </el-card>
</template>

<script setup lang="ts" name="syCard">
withDefaults(
  defineProps<{
    title?: string;
    shadow?: 'always' | 'hover' | 'never';
    bodyStyle?: object;
    showHeader?: boolean;
  }>(),
  {
    showHeader: true
  }
);
</script>

<style lang="scss" scoped></style>
