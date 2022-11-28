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
      <template #avatar="scope">
        <el-image
          :src="scope.row.avatar ? `${scope.row.avatar}?time=${Date.now()}` : null"
          style="width: 60px; height: 60px; line-height: 60px"
          fit="cover"
          :preview-teleported="true"
          :preview-src-list="[scope.row.avatar]"
        >
          <template #placeholder>
            <el-avatar icon="UserFilled" :size="34" />
          </template>
        </el-image>
      </template>
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
    <template #avatar="scope">
      <UploadAvatar v-model="fileList" :url="scope.row.avatar" />
    </template>
  </DialogForm>
</template>

<script setup lang="ts" name="user">
import {
  genFileId,
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadUserFile
} from 'element-plus';
import { SyCard, SyForm } from '@/baseUI';
import pageContent from '@/components/pageContent/index.vue';
import DialogForm from '@/components/dialogForm/index.vue';
import UploadAvatar from '@/components/uploadAvatar/index.vue';
import { queryFormConfig, formConfig } from './config/config.form';
import { tableConfig } from './config/config.table';
import { IDialog } from '@/common/types';
import { IRow } from './config/types';
import { useMessage } from '@/hooks';
import { uploadAvatar } from '@/service/api/user';

const { error } = useMessage();

const searchRef = ref();
const pageContentRef = ref();
const dialogFormRef = ref();
const fileList = ref<UploadUserFile[]>([]);
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
    const { id, password, avatar, username } = row;
    dialogParams.row = {
      id,
      password,
      avatar,
      username
    };
  }
  dialogParams.show = true;
};
const onSubmit = async (data: IRow) => {
  const params: IRow = Object.assign({}, data);
  if (fileList.value.length > 0) {
    const formData = new FormData();
    formData.append('userId', params.id as string);
    formData.append('avatar', fileList.value[0].raw as Blob);
    try {
      await uploadAvatar(formData);
    } catch (err) {
      error('头像上传失败');
    }
  }
  if (dialogParams.type === 'create') {
    await pageContentRef.value.handleCreate(params);
  } else {
    delete params.id;
    delete params.avatar;
    await pageContentRef.value.handleEdit(params, data.id);
  }
  dialogFormRef.value.closeModal();
};
const onClose = () => {
  fileList.value = [];
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
:deep(.el-image) {
  .el-image__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.avatar-uploader .avatar {
  width: 60px;
  height: 60px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  text-align: center;
}
</style>
