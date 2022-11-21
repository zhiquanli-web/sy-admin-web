<template>
  <SyCard :title="title">
    <template #left>
      <slot name="left">{{ title }}</slot>
    </template>
    <template #right>
      <div class="flex items-center">
        <el-button v-if="tableConfig.handlerOption?.showCreated" @click="handleToCreate">
          <i class="i-ep-plus mr-4px"></i>
          新增
        </el-button>
        <span class="ml-10px h-20px" v-if="tableConfig.handlerOption?.showSizeIcon">
          <RowDensity @change-size="tableState.changeSize" />
        </span>
        <el-tooltip
          content="列表设置"
          placement="top"
          v-if="tableConfig.handlerOption?.showCulomnIcon"
        >
          <div class="w-22px h-22px ml-8px">
            <FieldOrder @changeColumns="tableState.changeColumns" :columns="tableState.columns" />
          </div>
        </el-tooltip>
      </div>
    </template>
    <SyTable
      :columns="tableState.columns"
      :data="dataSource"
      :options="options"
      :page-options="pageInfo"
      v-bind="originTableConfig"
      @current-change="currentChange"
      @size-change="sizeChange"
    >
      <template #createTime="scope">
        {{ $filters.formatTime(scope.row.createTime) }}
      </template>
      <template #handler="scope">
        <el-button type="primary" link @click="emit('handleEdit', scope.row)">编辑</el-button>
        <el-button type="danger" link @click="handleDelete(scope.row)">删除</el-button>
      </template>
      <!-- header 插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="`header-${item.prop}`"
        #[`header-${item.prop}`]="scope"
      >
        <slot :name="`header-${item.prop}`" :row="scope.row"></slot>
      </template>
      <!-- column 插槽 -->
      <template v-for="item in otherPropSlots" :key="item.prop" #[item.prop]="scope">
        <slot :name="item.prop" :row="scope.row"></slot>
      </template>
    </SyTable>
  </SyCard>
</template>

<script setup lang="ts" name="pageContent">
import { SyTable, SyCard } from '@/baseUI';
import { IColumn, IOptions, ITableConfig } from '@/baseUI/syTable/types';
import { usePageContent } from '@/hooks';
import RowDensity from '@/components/rowDensity/index.vue';
import FieldOrder from '@/components/fieldOrder/index.vue';

interface Props {
  tableConfig: ITableConfig;
  pageQuery?: object;
  title?: string;
}
const props = withDefaults(defineProps<Props>(), {
  pageQuery: () => ({})
});
const emit = defineEmits(['handleEdit', 'handleCreate']);
const {
  pageInfo,
  dataSource,
  tableState,
  getPageData,
  refresh,
  currentChange,
  sizeChange,
  handleDelete,
  handleEdit,
  handleCreate
} = usePageContent(props.tableConfig, props.pageQuery);
const originTableConfig = Object.assign({
  ...props.tableConfig
});

// 获取其他的动态插槽名称
const otherPropSlots = ref<IColumn[]>([]);
let filterSlotNames = props.tableConfig?.filterSlotNames || [];
filterSlotNames = filterSlotNames.concat(['handler']);
otherPropSlots.value = props.tableConfig?.columns.filter((item) => {
  if (filterSlotNames.includes(item.prop)) return false;
  return item.prop;
});

if (originTableConfig.url) {
  delete originTableConfig.url;
}
if (originTableConfig.filterSlotNames) {
  delete originTableConfig.filterSlotNames;
}
if (props.tableConfig.handlerOption?.showCulomnIcon) {
  delete originTableConfig.columns;
}
if (originTableConfig.handlerOption) {
  delete originTableConfig.handlerOption;
}
getPageData();

const handleToCreate = () => {
  emit('handleCreate');
};

const options = ref<IOptions>({ size: 'default' });

watchEffect(() => {
  options.value.size = tableState.size;
});

defineExpose({
  getPageData,
  refresh,
  handleEdit,
  handleDelete,
  handleCreate
});
</script>

<style lang="scss" scoped></style>
