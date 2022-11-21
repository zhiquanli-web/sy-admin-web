<template>
  <div class="h-100% flex items-center justify-center">
    <SyCard :show-header="false" class="w-500px text-center p-20px">
      <h2 class="text-22px m-0 mb-20px">用户注册</h2>
      <SyForm
        v-bind="formConfig"
        v-model="formState"
        :footerOptions="{ show: false }"
        ref="registerFormRef"
      />
      <el-button class="w-100%" size="large" type="primary" @click="onSubmmit">注册</el-button>
    </SyCard>
  </div>
</template>

<script setup lang="ts" name="register">
import { SyCard, SyForm } from '@/baseUI';
import { useStore } from '@/store';
import { formConfig } from './config/config.form';
const formState = ref({});
const store = useStore();
const registerFormRef = ref<InstanceType<typeof SyForm>>();
const onSubmmit = async () => {
  await registerFormRef.value?.formRef.validate();
  console.log(1111);
};
</script>

<style lang="scss" scoped></style>
