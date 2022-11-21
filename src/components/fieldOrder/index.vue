<template>
  <el-popover placement="bottom" :width="200" trigger="click">
    <template #reference>
      <i class="i-ep-setting text-22px block cursor"></i>
    </template>
    <div class="flex justify-between mb-10px">
      <el-checkbox @change="clickCheckedAll" v-model="allChecked">列展示</el-checkbox>
      <el-button class="reset-btn" @click="handleReset">重置</el-button>
    </div>
    <ul class="field-list">
      <li
        v-for="(item, index) in state.copyColumns"
        draggable="true"
        @dragstart="dragStart($event, index)"
        @dragenter="dragenter($event, index)"
        @dragover.prevent="dragover($event)"
        @dragend="dragend"
        :class="{
          status: state.dropStatus && state.dropIndex === index
        }"
        :key="item.prop"
      >
        <el-checkbox @change="changeChecked" v-model="item.isChecked">{{ item.label }}</el-checkbox>
      </li>
    </ul>
  </el-popover>
</template>

<script setup lang="ts" name="config">
import { IColumn } from '@/baseUI/syTable/types';

const props = defineProps<{ columns: IColumn[] }>();
const emit = defineEmits(['changeColumns']);
const allChecked = ref(true);
const initColumns = JSON.parse(JSON.stringify(props.columns));
const state = reactive({
  dropIndex: -1,
  dropStatus: false, // 拖拽状态
  copyColumns: toRaw(props.columns).map((v) => {
    const temp: any = Object.assign({}, v);
    temp.isChecked = true;
    return temp;
  })
});

// 1. 开始拖元素触发，作用于拖拽元素
const dragStart = (ev: DragEvent, index: number) => {
  state.dropIndex = index;
  state.dropStatus = true;
};
// 2. 元素拖进可drop元素（绑定drop事件的元素）时触发，作用于目标元素
const dragenter = (ev: DragEvent, index: number) => {
  const column = state.copyColumns[state.dropIndex];
  state.copyColumns.splice(state.dropIndex, 1);
  state.copyColumns.splice(index, 0, column);
  state.dropIndex = index;
  const tempArr = state.copyColumns
    .filter((v) => v.isChecked)
    .map((v) => {
      const temp = Object.assign({}, v);
      delete temp.isChecked;
      return temp;
    });
  emit('changeColumns', tempArr);
};
// 3. 当元素拖动到drop元素上时触发，作用于目标元素
const dragover = (ev: DragEvent) => {
  ev.preventDefault();
};
// 4. 放开拖动元素时触发，作用于目标元素
const dragend = () => {
  state.dropStatus = false;
};
const changeChecked = () => {
  allChecked.value = !state.copyColumns.some((v) => !v.isChecked);
  const tempArr = state.copyColumns
    .filter((v) => v.isChecked)
    .map((v) => {
      const temp = Object.assign({}, v);
      delete temp.isChecked;
      return temp;
    });
  emit('changeColumns', tempArr.length ? tempArr : [{ label: '', prop: '' }]);
};
const clickCheckedAll = () => {
  state.copyColumns.forEach((v) => {
    v.isChecked = allChecked.value;
  });
  changeChecked();
};
const handleReset = () => {
  allChecked.value = true;
  state.copyColumns = initColumns.map((item: object) => ({ ...item, isChecked: true }));
  clickCheckedAll();
};
</script>

<style lang="scss" scoped>
.field-list {
  width: 100%;
  list-style: none;
  padding-left: 0;
  li {
    line-height: 28px;
    .item-icon {
      color: #cecece;
      margin-right: 28px;
    }
  }
}
</style>
