<template>
  <el-drawer
    v-bind="options"
    :model-value="modelValue"
    :before-close="onClose"
    @closed="emit('onClose')"
    modal-class="sy-drawer-container"
  >
    <template #header>
      <span>{{ title }}</span>
    </template>
    <template #footer v-if="showFooter">
      <div class="flex justify-between">
        <el-button :disabled="loading" @click="onClose" class="flex-1">取消</el-button>
        <el-button :loading="loading" type="primary" @click="emit('onConfirm')" class="flex-1">
          确定
        </el-button>
      </div>
    </template>
    <slot></slot>
  </el-drawer>
</template>

<script setup lang="ts" name="syDrawer">
import { IOptions } from './types';
interface IProps {
  modelValue: boolean; // 是否显示 Drawer
  title?: string; // Drawer 的标题
  showFooter?: boolean; // 是否显示页脚
  loading?: boolean; // 加载状态
  options?: IOptions;
}
const props = withDefaults(defineProps<IProps>(), {
  options: () => ({
    size: 520,
    destroyOnClose: true
  }),
  showFooter: true
});
const emit = defineEmits(['update:modelValue', 'onConfirm', 'onClose']);
const onClose = () => {
  emit('update:modelValue', !props.modelValue);
};

defineExpose({
  onClose
});
</script>

<style lang="scss">
.sy-drawer-container {
  .el-drawer__header {
    margin-bottom: 0px !important;
  }
}
</style>
