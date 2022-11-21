<template>
  <SyCard title="基础表格">
    <SyTable
      :data="data"
      v-bind="tableConfig"
      :page-options="pageInfo"
      @current-change="currentChange"
      @size-change="sizeChange"
    >
      <!-- 自定义表头 -->
      <template #header-age="scope">
        <el-tag>{{ scope.row.label }}</el-tag>
      </template>
      <!-- 自定义列 -->
      <template #name="scope">
        <el-tag>{{ scope.row.name }}</el-tag>
      </template>
      <!-- 操作 -->
      <template #handler="scope">
        <el-button type="primary" link @click="handlerEdit(scope.row)">编辑</el-button>
        <el-button type="danger" link @click="handlerDelete(scope.row)">删除</el-button>
      </template>
    </SyTable>
  </SyCard>

  <PageContent
    :table-config="contentTableConfig"
    title="组合组件-增删改"
    class="mt-14px"
    @handleEdit="handleEdit"
    @handle-create="handleEdit"
    ref="pageContentRef"
  >
    <template #sex="scope">
      {{ scope.row.sex === 1 ? '男' : '女' }}
    </template>
  </PageContent>
  <DrawerForm
    v-model="drawerParams.visible"
    :row="editForm"
    :formConfig="formConfig"
    :title="drawerParams.type === 'create' ? '新增' : '编辑'"
    @on-submit="onSubmit"
    ref="drawerFormRef"
  >
  </DrawerForm>
</template>

<script setup lang="ts" name="table">
import { SyCard, SyTable } from '@/baseUI';
import PageContent from '@/components/pageContent/index.vue';
import DrawerForm from '@/components/drawerForm/index.vue';
import { IPage } from '@/baseUI/syTable/types';
import { useConfirm, useMessage } from '@/hooks';
import { tableConfig, contentTableConfig } from './config/config.table';
import { formConfig } from './config/config.form';
interface IUser {
  name: string;
  age: number;
}
interface IEditForm {
  id?: string | number;
  name: string;
  age: number | null;
  sex: 0 | 1;
  createTime: string;
}
const { success } = useMessage();
const confirm = useConfirm();
// ------- 1.基础表格 --------
const data = reactive<IUser[]>([
  {
    name: '张三',
    age: 18
  },
  {
    name: '李四',
    age: 20
  }
]);
const pageInfo = reactive<IPage>({
  currentPage: 1,
  pageSize: 10,
  total: 100
});
const handlerEdit = (row: IUser) => {
  console.log('handlerEdit', row);
};
const handlerDelete = async (row: IUser) => {
  await confirm({
    title: '删除',
    content: `确定要删除${row.name}吗?`,
    type: 'warning'
  });
};
const currentChange = (val: number) => {
  pageInfo.currentPage = val;
};
const sizeChange = (val: number) => {
  pageInfo.pageSize = val;
};
// ------- 2.内容组件-增删改 --------
const pageContentRef = ref<InstanceType<typeof PageContent>>();
const handleEdit = (row: IEditForm) => {
  if (!row) {
    editForm.value = {
      name: '',
      age: null,
      sex: 1,
      createTime: ''
    };
    drawerParams.value.type = 'create';
  } else {
    editForm.value = row;
    drawerParams.value.type = 'edit';
  }
  drawerParams.value.visible = true;
};
// 编辑
const drawerParams = ref<{ visible: boolean; type: 'create' | 'edit' }>({
  visible: false,
  type: 'create'
});
const drawerFormRef = ref();
const editForm = ref<IEditForm>({
  name: '',
  age: null,
  sex: 1,
  createTime: ''
});
const onSubmit = async (data: IEditForm) => {
  drawerFormRef.value.loading = true;
  if (drawerParams.value.type === 'create') {
    await pageContentRef.value?.handleCreate(data);
  } else {
    await pageContentRef.value?.handleEdit(data, data.id!);
  }
  await pageContentRef.value?.getPageData();
  drawerFormRef.value.closeModal();
};
</script>

<style lang="scss" scoped></style>
