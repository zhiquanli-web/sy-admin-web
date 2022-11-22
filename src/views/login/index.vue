<template>
  <div class="h-100% flex items-center justify-center">
    <SyCard :show-header="false" class="w-500px text-center p-40px">
      <h2 class="text-28px m-0 mb-30px">后台管理系统</h2>
      <SyForm
        v-bind="loginFormConfig"
        v-model="formState"
        :footerOptions="{ show: false }"
        ref="loginFormRef"
      />
      <el-button class="w-100%" size="large" type="primary" @click="onSubmmit" :loading="loading">
        登录
      </el-button>
      <div class="text-right mt-10px">
        没有账号？<el-link type="primary" @click="handleToRegister">去注册</el-link>
      </div>
    </SyCard>
  </div>
</template>

<script setup lang="ts" name="register">
import { SyCard, SyForm } from '@/baseUI';
import { IAccount } from '@/service/types/user';
import { useStore } from '@/store';
import { loginFormConfig } from './config/config.form';
const formState = ref<IAccount>({
  username: '',
  password: ''
});
const store = useStore();
const router = useRouter();
const loading = ref(false);
const loginFormRef = ref<InstanceType<typeof SyForm>>();
const onSubmmit = async () => {
  await loginFormRef.value?.formRef.validate();
  loading.value = true;
  await store.user.loginAction(formState.value);
  loading.value = false;
};
const handleToRegister = () => {
  router.push({ path: '/register' });
};
</script>

<style lang="scss" scoped></style>
