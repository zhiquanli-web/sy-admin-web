<template>
  <el-upload
    class="avatar-uploader"
    :show-file-list="false"
    accept="jpeg,jpg,png"
    list-type="picture"
    v-model:file-list="defFileList"
    :limit="1"
    :on-exceed="handleExceed"
    :on-change="handleChange"
    :auto-upload="false"
    ref="uploadRef"
  >
    <img
      v-if="defFileList.length > 0 || url"
      :src="defFileList.length > 0 ? defFileList[0].url : url"
      class="avatar"
    />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script lang="ts" setup name="uploadAvatar">
import {
  genFileId,
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadUserFile
} from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { useMessage } from '@/hooks';

interface Props {
  modelValue: UploadUserFile[];
  url?: string;
}

const props = withDefaults(defineProps<Props>(), {
  url: ''
});
const emit = defineEmits(['update:modelValue']);

const { error } = useMessage();

const uploadRef = ref<UploadInstance>();
const defFileList = ref<UploadUserFile[]>(props.modelValue);

const handleChange: UploadProps['onChange'] = (uploadFile) => {
  const fileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const fileSize = (uploadFile as Record<string, any>).raw.size / 1024 / 1024;
  if (!fileTypes.includes((uploadFile as Record<string, any>).raw.type)) {
    error('头像必须为 JPG/JPEG/PNG 格式!');
    defFileList.value = [];
  } else if (fileSize > 2) {
    error('头像大小不能超过2MB！');
    defFileList.value = [];
  } else {
    defFileList.value = [uploadFile];
  }
  emit('update:modelValue', defFileList.value);
};

const handleExceed: UploadProps['onExceed'] = (files) => {
  uploadRef.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  uploadRef.value!.handleStart(file);
};
</script>

<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 60px;
  height: 60px;
  display: block;
}
</style>
<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  text-align: center;
}
</style>
