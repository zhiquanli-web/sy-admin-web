<template>
  <el-form v-bind="formOptions" ref="formRef" :model="modelValue">
    <template v-for="item in formItems" :key="item.field">
      <el-form-item
        :label="item.label"
        :label-width="item.labelWidth"
        :inline-message="item.inlineMessage"
        :size="item.size"
        :rules="item.rules"
        :style="item.style"
        :prop="item.field"
      >
        <template v-if="['input', 'password'].includes(item.type)">
          <el-input
            :placeholder="item.placeholder"
            :style="item.style"
            :show-password="item.type === 'password'"
            :disabled="item.disabled"
            :readonly="item.readonly"
            v-bind="item.otherOptions"
            :model-value="modelValue[`${item.field}`]"
            @update:modelValue="handleValueChange($event, item.field)"
          />
        </template>
        <template v-if="item.type === 'textarea'">
          <el-input
            :placeholder="item.placeholder"
            :style="item.style"
            :disabled="item.disabled"
            :readonly="item.readonly"
            v-bind="item.otherOptions"
            :model-value="modelValue[`${item.field}`]"
            @update:modelValue="handleValueChange($event, item.field)"
          />
        </template>
        <template v-if="item.type === 'select'">
          <el-select
            :placeholder="item.placeholder"
            :style="item.style"
            :disabled="item.disabled"
            :readonly="item.readonly"
            v-bind="item.otherOptions"
            :model-value="modelValue[`${item.field}`]"
            @update:modelValue="handleValueChange($event, item.field)"
          >
            <el-option
              v-for="option in item.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </template>
        <template v-if="item.type === 'datepicker'">
          <el-date-picker
            :placeholder="item.placeholder"
            :style="item.style"
            :disabled="item.disabled"
            :readonly="item.readonly"
            v-bind="item.datePickerOptions"
            :model-value="modelValue[`${item.field}`]"
            @update:modelValue="handleValueChange($event, item.field)"
          >
          </el-date-picker>
        </template>
        <template v-if="item.type === 'timepicker'">
          <el-time-picker
            :placeholder="item.placeholder"
            :style="item.style"
            :disabled="item.disabled"
            :readonly="item.readonly"
            v-bind="item.otherOptions"
            :model-value="modelValue[`${item.field}`]"
            @update:modelValue="handleValueChange($event, item.field)"
          >
          </el-time-picker>
        </template>
        <template v-if="item.type === 'cascader'">
          <el-cascader
            :placeholder="item.placeholder"
            :style="item.style"
            :disabled="item.disabled"
            :readonly="item.readonly"
            :options="item.options"
            v-bind="item.otherOptions"
            :model-value="modelValue[`${item.field}`]"
            @update:modelValue="handleValueChange($event, item.field)"
          />
        </template>
        <template v-if="item.type === 'number'">
          <el-input-number
            :placeholder="item.placeholder"
            :style="item.style"
            :disabled="item.disabled"
            :readonly="item.readonly"
            v-bind="item.otherOptions"
            :model-value="modelValue[`${item.field}`]"
            @update:modelValue="handleValueChange($event, item.field)"
          />
        </template>
        <template v-if="item.type === 'switch'">
          <el-switch
            :style="item.style"
            :disabled="item.disabled"
            v-bind="item.otherOptions"
            :model-value="modelValue[`${item.field}`]"
            @update:modelValue="handleValueChange($event, item.field)"
          />
        </template>
        <template v-if="item.type === 'custom'">
          <slot :name="item.field" :row="item"></slot>
        </template>
      </el-form-item>
    </template>
    <el-form-item class="form-footer" v-if="footerOptions.show">
      <slot name="footer">
        <el-button
          type="primary"
          v-if="footerOptions.confirmBtn"
          @click="submitForm(formRef)"
          :loading="loading"
        >
          确定
        </el-button>
        <el-button v-if="footerOptions.cancelBtn" @click="cancelForm">取消</el-button>
        <el-button v-if="footerOptions.resetBtn" @click="resetForm(formRef)">重置</el-button>
      </slot>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="syForm">
import { FormInstance } from 'element-plus';
import { IForm, IFormItem, IFooter } from './types';

interface IPoros {
  formOptions?: IForm; // 表单配置项
  formItems: IFormItem[]; // 表单项属性
  modelValue: object | any; // 绑定表单
  footerOptions?: IFooter; // 表单域按钮
}
const props = withDefaults(defineProps<IPoros>(), {
  formOptions: () => ({
    labelWidth: '80px'
  }),
  footerOptions: () => ({
    show: true,
    cancelBtn: true,
    confirmBtn: true,
    resetBtn: true
  })
});
const emit = defineEmits(['update:modelValue', 'onSubmit', 'onCancel']);
const loading = ref(false);
const formRef = ref();

onBeforeMount(() => {
  // 给参数附初值
  const originForm: any = {};
  props.formItems.forEach((item) => {
    const { field, type } = item;
    const hsaValue = originForm[field] || originForm[field] === 0;
    if (item.defaultValue !== undefined && !hsaValue) {
      originForm[field] = item.defaultValue;
    } else {
      if (['number'].includes(type)) {
        originForm[field] = props.modelValue[field] ?? null;
      } else {
        originForm[field] = props.modelValue[field] ?? '';
      }
    }
  });
  emit('update:modelValue', Object.assign(props.modelValue, originForm));
});

const handleValueChange = (value: string | boolean, field: string) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value });
};
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      loading.value = true;
      emit('onSubmit');
    }
  });
};
const cancelForm = () => {
  emit('onCancel');
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

defineExpose({
  loading,
  formRef,
  resetForm
});
</script>

<style lang="scss" scoped></style>
