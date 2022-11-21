<template>
  <div class="h-100% flex items-center justify-center">
    <div class="b-1px b-#ccc b-rd-14px box-border w-500px p-40px">
      <h2 class="mb-30px text-center">{{ globalConfig.title }}</h2>
      <el-form :model="loginForm" :rules="rules" size="large" ref="loginRuleFormRef">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            class="w-100%"
            size="large"
            @click="handleLogin"
          >
            立即登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts" name="login">
import type { FormInstance, FormRules } from 'element-plus';
import { IAccount } from '@/service/types/user';
import { globalConfig } from '@/config';
import { useStore } from '@/store';

const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    },
    { min: 3, max: 5, message: '3-5', trigger: 'blur' }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
});
const store = useStore();
const loading = ref(false);
const loginForm = ref<IAccount>({
  username: '',
  password: ''
});
const loginRuleFormRef = ref<FormInstance>();
const handleLogin = async () => {
  await loginRuleFormRef.value?.validate();
  loading.value = true;
  await store.user.loginAction(loginForm.value);
  loading.value = false;
};
</script>

<style lang="scss" scoped></style>
