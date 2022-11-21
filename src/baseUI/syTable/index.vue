<template>
  <el-table
    :style="style"
    :data="data"
    v-bind="options"
    @selection-change="handleSelectionChange"
    ref="tableRef"
  >
    <template v-for="(column, index) in columns" :key="column.prop + index">
      <el-table-column v-bind="column">
        <template #header>
          <slot :name="`header-${column.prop}`" :row="column">
            {{ column.label }}
          </slot>
        </template>
        <template #default="scope" v-if="!['index', 'selection'].includes(column.prop)">
          <slot :name="column.prop" :row="scope.row">
            <span>{{ scope.row[column.prop] }}</span>
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <div v-if="showFooter" class="mt-14px flex justify-end">
    <el-pagination
      v-bind="defPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts" name="syTable">
import { IOptions, IColumn, IPage } from './types';
interface IProps {
  data: any[]; // 表格数据
  options?: IOptions; // 表格配置项
  columns: IColumn[]; // 表格列配置项
  style?: object; // 表格样式
  pageOptions?: IPage; // 分页配置项
  showFooter?: boolean; // 是否显示分页
}
const props = withDefaults(defineProps<IProps>(), {
  style: () => ({ style: { width: '100%' } }),
  showFooter: true
});
const emit = defineEmits(['multipleSelection', 'currentChange', 'sizeChange']);
const defPage = reactive<IPage>({
  currentPage: 1,
  pageSize: 5,
  pageSizes: [5, 10, 20, 50, 100],
  layout: 'total, sizes, prev, pager, next, jumper',
  total: 0
});
watch(
  () => props.pageOptions,
  () => {
    Object.assign(defPage, props.pageOptions);
  },
  { deep: true, immediate: true }
);
const handleSelectionChange = (val: any[]) => {
  emit('multipleSelection', val);
};
const handleSizeChange = (val: number) => {
  emit('sizeChange', val);
};
const handleCurrentChange = (val: number) => {
  emit('currentChange', val);
};
</script>

<style lang="scss" scoped></style>
