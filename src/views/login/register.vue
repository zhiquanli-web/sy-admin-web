<template>
  <div class="h-100% flex items-center justify-center">
    <SyCard :show-header="false" class="w-500px text-center p-40px">
      <h2 class="text-28px m-0 mb-20px">用户注册</h2>
      <SyForm
        v-bind="formConfig"
        v-model="formState"
        :footerOptions="{ show: false }"
        ref="registerFormRef"
      />
      <el-button class="w-100%" size="large" type="primary" @click="onSubmmit" :loading="loading">
        注册
      </el-button>
      <div class="mt-10px text-right">
        <el-link type="primary" @click="handleToLogin">返回登录</el-link>
      </div>
    </SyCard>
  </div>
</template>

<script setup lang="ts" name="register">
import { SyCard, SyForm } from '@/baseUI';
import { useMessage } from '@/hooks';
import { register } from '@/service/api/user';
import { IAccount } from '@/service/types/user';
import { formConfig } from './config/config.form';
const { success, error } = useMessage();
const router = useRouter();
const loading = ref(false);
const formState = ref<IAccount>({
  username: '',
  password: ''
});
const registerFormRef = ref<InstanceType<typeof SyForm>>();
const onSubmmit = async () => {
  await registerFormRef.value?.formRef.validate();
  loading.value = true;
  const { code, data } = await register({ ...formState.value });
  if (code === 0) {
    success('注册成功');
    setTimeout(() => {
      router.push({ path: '/login' });
    }, 1500);
  } else {
    error(data || '注册失败, 请稍后再试');
  }
  loading.value = false;
};
const handleToLogin = () => {
  router.replace({ path: '/login' });
};
</script>

<style lang="scss" scoped></style>
