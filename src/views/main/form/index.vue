<template>
  <SyCard title="基础表单">
    <SyForm v-bind="formConfig" v-model="formState" @on-submit="onSubmit" ref="syFormRef">
      <template #sex="scope">
        <el-radio-group v-model="(formState as any)[scope.row.field]">
          <el-radio :label="0">女</el-radio>
          <el-radio :label="1">男</el-radio>
        </el-radio-group>
      </template>
    </SyForm>
  </SyCard>

  <SyCard title="表单-弹窗结合使用" class="mt-20px mb-20px">
    <el-button type="primary" @click="showDialog = true">dialog-form</el-button>
    <el-button type="primary" @click="showDrawer = true">drawer-form</el-button>
  </SyCard>
  <SyDialog
    v-model="showDialog"
    title="编辑"
    @on-confirm="onConfirm"
    :loading="loading"
    ref="syDialogRef"
  >
    <SyForm
      v-bind="formConfig"
      v-model="formState"
      ref="syDialogFormRef"
      :footerOptions="{ show: false }"
    >
      <template #sex="scope">
        <el-radio-group v-model="(formState as any)[scope.row.field]">
          <el-radio :label="0">女</el-radio>
          <el-radio :label="1">男</el-radio>
        </el-radio-group>
      </template>
    </SyForm>
  </SyDialog>
  <SyDrawer
    v-model="showDrawer"
    title="编辑"
    @on-confirm="onDrawerConfirm"
    :loading="loading"
    ref="syDrawerRef"
  >
    <SyForm
      v-bind="formConfig"
      v-model="formState"
      ref="syDrawerFormRef"
      :footerOptions="{ show: false }"
    >
      <template #sex="scope">
        <el-radio-group v-model="(formState as any)[scope.row.field]">
          <el-radio :label="0">女</el-radio>
          <el-radio :label="1">男</el-radio>
        </el-radio-group>
      </template>
    </SyForm>
  </SyDrawer>

  <SyCard title="dialogForm/drawerForm组件">
    <el-button @click="changeDrawerForm">drawerForm</el-button>
    <el-button @click="changeDialogForm">drawerForm</el-button>
  </SyCard>
  <DrawerForm
    v-model="showDrawerForm"
    :formConfig="formConfig"
    title="drawerForm"
    :row="editForm"
    @on-submit="onDrawerFormSubmit"
    ref="drawerFormRef"
  >
    <template #sex="scope">
      <el-radio-group v-model="(formState as any)[scope.row.field]">
        <el-radio :label="0">女</el-radio>
        <el-radio :label="1">男</el-radio>
      </el-radio-group>
    </template>
  </DrawerForm>
  <DialogForm
    v-model="showDialogForm"
    :formConfig="formConfig"
    title="drawerForm"
    :row="editForm"
    @on-submit="onDialogFormSubmit"
    ref="dialogFormRef"
  >
    <template #sex="scope">
      <el-radio-group v-model="(formState as any)[scope.row.field]">
        <el-radio :label="0">女</el-radio>
        <el-radio :label="1">男</el-radio>
      </el-radio-group>
    </template>
  </DialogForm>
</template>

<script setup lang="ts" name="form">
import { SyCard, SyForm, SyDialog, SyDrawer } from '@/baseUI';
import DrawerForm from '@/components/drawerForm/index.vue';
import DialogForm from '@/components/dialogForm/index.vue';
import { useMessage } from '@/hooks';
import { formConfig } from './config/config.form';
const { success } = useMessage();
// ------- 1.基础表单 -------
formConfig.formItems.find((item) => item.field === formConfig.customProps)!.options = [
  { label: '普通用户', value: 'custom' },
  { label: '管理员', value: 'admin' },
  { label: '超级管理员', value: 'superAdmin' }
];
const syFormRef = ref();
const formState = ref({
  sex: 0
});
const onSubmit = () => {
  console.log(formState.value);
  success('成功~');
  syFormRef.value.loading = false;
};
// ------- 2.表单-弹窗结合使用 -------
// 1. dialog
const showDialog = ref(false);
const syDialogRef = ref();
const syDialogFormRef = ref();
const loading = ref(false);
const onConfirm = async () => {
  await syDialogFormRef.value.formRef.validate();
  loading.value = true;
  // 这里发送请求...
  setTimeout(() => {
    loading.value = false;
    success('修改成功!');
    syDialogRef.value.onClose();
  }, 300);
};
// 2. drawer
const showDrawer = ref(false);
const syDrawerRef = ref();
const syDrawerFormRef = ref();
const onDrawerConfirm = async () => {
  await syDrawerFormRef.value.formRef.validate();
  loading.value = true;
  // 这里发送请求...
  setTimeout(() => {
    loading.value = false;
    success('修改成功!');
    syDrawerRef.value.onClose();
  }, 300);
};

// 3. drawerForm
const showDrawerForm = ref(false);
const editForm = ref({});
const drawerFormRef = ref();
const changeDrawerForm = () => {
  showDrawerForm.value = true;
  editForm.value = { name: '张三', password: '123456', canUse: 0, city: 'gy', sex: 1 };
};
const onDrawerFormSubmit = (form: any) => {
  console.log('form', form);
  drawerFormRef.value.loading = true;
  // 这里发送请求
  setTimeout(() => {
    drawerFormRef.value.closeModal();
    success('成功!');
  }, 300);
};
const showDialogForm = ref(false);
const dialogFormRef = ref();
const changeDialogForm = () => {
  showDialogForm.value = true;
  editForm.value = { name: '张三', password: '123456', canUse: 0, city: 'gy', sex: 1 };
};
const onDialogFormSubmit = (form: any) => {
  console.log('form', form);
  dialogFormRef.value.loading = true;
  // 这里发送请求
  setTimeout(() => {
    dialogFormRef.value.closeModal();
    success('成功!');
  }, 300);
};
</script>

<style lang="scss" scoped></style>
