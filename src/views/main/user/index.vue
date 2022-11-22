<template>
  <div class="user-container">
    <SyCard :show-header="false" class="serach-form mb-20px">
      <SyForm
        v-bind="formConfig"
        v-model="searchForm"
        ref="searchRef"
        :footer-options="{ show: false }"
        :form-options="{ inline: true }"
      >
        <template #searchBtn>
          <el-button type="primary" @click="handleSearch">
            <i class="i-ep-search mr-4px"></i>
            查询
          </el-button>
        </template>
      </SyForm>
    </SyCard>
    <pageContent
      :table-config="tableConfig"
      title="用户列表"
      @handle-create="handleEdit"
      ref="pageContentRef"
    >
      <template name="right"></template>
    </pageContent>
  </div>
</template>

<script setup lang="ts" name="user">
import { SyCard, SyForm } from '@/baseUI';
import pageContent from '@/components/pageContent/index.vue';
import { formConfig } from './config/config.form';
import { tableConfig } from './config/config.table';

const searchForm = ref({
  username: ''
});
const searchRef = ref();
const pageContentRef = ref();
const handleSearch = () => {
  console.log(pageContentRef.value);
};
const handleEdit = () => {
  console.log('edit');
};

SyCard;
</script>

<style lang="scss" scoped>
.user-container {
  :deep(.serach-form) {
    .el-card__body {
      padding-bottom: 2px;
    }
    .el-form-item {
      margin-right: 14px;
    }
  }
}
</style>
