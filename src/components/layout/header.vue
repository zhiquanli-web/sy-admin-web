<template>
  <div class="flex justify-between h-50px lh-50px c-#000">
    <div class="flex items-center cursor left-icon">
      <el-icon size="20px">
        <component @click="changeCollapse" :is="isCollapse ? `Expand` : 'Fold'" />
      </el-icon>
    </div>
    <el-dropdown class="flex items-center right-action-info" @command="handleCommand">
      <span class="flex items-center cursor">
        <el-avatar icon="UserFilled" :size="34" />
        <span class="ml-10px c-#000">超级管理员</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="Avatar">用户信息</el-dropdown-item>
          <el-dropdown-item divided icon="CircleClose" command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useConfirm } from '@/hooks';
import localCache from '@/utils/localCache';

const props = defineProps<{ isCollapse: boolean }>();
const emit = defineEmits(['update:isCollapse']);

const router = useRouter();
const confirm = useConfirm();
const handleCommand = async (key: string) => {
  if (key === 'logout') {
    await confirm({
      title: '提示',
      type: 'warning',
      content: '确定要退出登录吗？'
    });
    localCache.clearCache();
    router.push({ path: '/login', replace: true });
  }
};
const changeCollapse = () => {
  emit('update:isCollapse', !props.isCollapse);
};
</script>

<style lang="scss" scoped>
.left {
  flex: 0 0 20px;
}
.right-action-info {
  flex: 0 0 120px;
}
</style>
