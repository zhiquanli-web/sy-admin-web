<template>
  <SyDrawer
    v-model="visible"
    :title="title"
    :loading="loading"
    @on-confirm="onSubmit"
    @on-close="onClose"
    ref="syDrawerRef"
  >
    <SyForm
      v-bind="formConfig"
      v-model="formState"
      :footerOptions="{ show: false }"
      ref="syFormRef"
    >
      <template #footer>
        <slot name="footer" />
      </template>
      <template v-for="item in customSlotes" :key="item.field" #[item.field]="scope">
        <slot :name="item.field" :row="scope.row"></slot>
      </template>
    </SyForm>
  </SyDrawer>
</template>

<script setup lang="ts" name="drawerForm">
import { SyDrawer, SyForm } from '@/baseUI';
import { IFormConfig } from '@/baseUI/syForm/types';

interface Props {
  modelValue: boolean;
  formConfig: IFormConfig;
  title?: string;
  row?: object;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'onSubmit', 'onClose']);

const loading = ref(false);
const visible = ref(false);
const syDrawerRef = ref();
const syFormRef = ref();
const formState = ref<any>({});
// custom 插槽
const customSlotes = props.formConfig.formItems.filter((item) => {
  return item.type === 'custom';
});
watchEffect(() => {
  visible.value = props.modelValue;
});
watchEffect(() => {
  formState.value = toRaw(props.row);
});
watch(visible, () => {
  emit('update:modelValue', visible.value);
});
const onSubmit = async () => {
  await syFormRef.value.formRef.validate();
  emit('onSubmit', formState.value);
};
const onClose = () => {
  loading.value = false;
  emit('onClose');
};
const closeModal = () => {
  loading.value = false;
  visible.value = false;
};
defineExpose({
  loading,
  closeModal
});
</script>

<style lang="scss" scoped></style>
