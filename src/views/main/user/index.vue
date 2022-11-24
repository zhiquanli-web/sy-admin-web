<template>
  <div class="user-container">
    <SyCard :show-header="false" class="serach-form mb-20px">
      <SyForm
        v-bind="queryFormConfig"
        v-model="searchForm"
        ref="searchRef"
        :footer-options="{ show: false }"
        :form-options="{ inline: true }"
      >
      </SyForm>
      <el-button type="primary" @click="handleSearch" class="mb-14px">
        <i class="i-ep-search mr-4px"></i>
        查询
      </el-button>
    </SyCard>
    <pageContent
      :table-config="tableConfig"
      title="用户列表"
      @handle-create="handleEdit"
      @handle-edit="handleEdit"
      :page-query="curQuery"
      ref="pageContentRef"
    >
    </pageContent>
  </div>
  <DialogForm
    v-model="dialogParams.show"
    :formConfig="formConfig"
    :title="dialogParams.type === 'create' ? '新增用户' : '编辑用户'"
    :row="dialogParams.row"
    @on-submit="onSubmit"
    @on-close="onClose"
    ref="dialogFormRef"
  >
  </DialogForm>
</template>

<script setup lang="ts" name="user">
import { SyCard, SyForm } from '@/baseUI';
import pageContent from '@/components/pageContent/index.vue';
import DialogForm from '@/components/dialogForm/index.vue';
import { queryFormConfig, formConfig } from './config/config.form';
import { tableConfig } from './config/config.table';
import { IDialog } from '@/common/types';
import { IRow } from './config/types';

const searchRef = ref();
const pageContentRef = ref();
const dialogFormRef = ref();
const searchForm = ref({
  username: ''
});
const curQuery = reactive({});
const dialogParams = reactive<IDialog>({
  show: false,
  type: 'create',
  row: {}
});
const handleSearch = async () => {
  Object.assign(curQuery, searchForm.value);
  await pageContentRef.value.getPageData();
};
const handleEdit = (row: IRow) => {
  if (!row) {
    dialogParams.type = 'create';
  } else {
    dialogParams.type = 'edit';
    dialogParams.row = row;
  }
  dialogParams.show = true;
};
const onSubmit = async (data: IRow) => {
  const params = Object.assign({}, data);
  if (dialogParams.type === 'create') {
    await pageContentRef.value.handleCreate(params);
  } else {
    delete params.id;
    await pageContentRef.value.handleEdit(params, data.id);
  }
  dialogFormRef.value.closeModal();
};
const onClose = () => {
  dialogParams.row = {};
  dialogParams.type = 'create';
};
</script>

<style lang="scss" scoped>
:deep(.serach-form) {
  .el-card__body {
    padding-bottom: 2px;
    .card-content {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .el-form-item {
    margin-right: 14px;
  }
}
</style>
