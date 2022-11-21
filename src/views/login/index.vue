<template>
  <div class="h-100% flex items-center justify-center">
    <SyCard :show-header="false" class="w-500px text-center p-40px">
      <h2 class="text-28px m-0 mb-30px">后台管理系统</h2>
      <SyForm
        v-bind="formConfig"
        v-model="formState"
        :footerOptions="{ show: false }"
        ref="loginFormRef"
      />
      <el-button class="w-100%" size="large" type="primary" @click="onSubmmit" :loading="loading">
        登录
      </el-button>
    </SyCard>
  </div>
</template>

<script setup lang="ts" name="register">
import { SyCard, SyForm } from '@/baseUI';
import { IAccount } from '@/service/types/user';
import { useStore } from '@/store';
import { formConfig } from './config/config.form';
const formState = ref<IAccount>({
  username: '',
  password: ''
});
const store = useStore();
const loading = ref(false);
const loginFormRef = ref<InstanceType<typeof SyForm>>();
const onSubmmit = async () => {
  await loginFormRef.value?.formRef.validate();
  loading.value = true;
  await store.user.loginAction(formState.value);
  loading.value = false;
};
</script>

<style lang="scss" scoped></style>
