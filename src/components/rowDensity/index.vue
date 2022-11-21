<template>
  <el-tooltip content="密度" placement="top">
    <el-dropdown trigger="click" @command="handleCommand">
      <el-icon :size="20">
        <i-sy-density class="cursor" />
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            :style="{
              background: size.value === selectedSize ? '#ecf5ff' : '',
              color: size.value === selectedSize ? '#409eff' : '#606266'
            }"
            :command="size.value"
            v-for="size in sizes"
            :key="size.value"
          >
            {{ size.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-tooltip>
</template>

<script setup lang="ts" name="rowDensity">
const emit = defineEmits(['changeSize']);
const selectedSize = ref('default');
const sizes = ref([
  {
    name: '紧凑',
    value: 'small'
  },
  {
    name: '默认',
    value: 'default'
  },
  {
    name: '松散',
    value: 'large'
  }
]);
const handleCommand = (command: string) => {
  selectedSize.value = command;
  emit('changeSize', command);
};
</script>

<style lang="scss" scoped></style>
