<template>
  <el-button @click="openMessage">确认弹窗</el-button>
  <el-button @click="showDrawer = true">drawer弹窗</el-button>
  <el-button @click="showDialog = true">dialog弹窗</el-button>
  <SyDrawer
    title="这是一个drawer标题"
    :options="{ direction: 'ltr' }"
    v-model="showDrawer"
    :loading="loading"
    @on-confirm="onConfirm"
    ref="syDrawer"
  >
    drawer弹窗内容
  </SyDrawer>
  <SyDialog
    title="这是一个dialog标题"
    v-model="showDialog"
    :loading="loading"
    @on-confirm="onConfirm"
    ref="syDialog"
  >
    drawer弹窗内容
  </SyDialog>
  <SyCard :showHeader="false" class="mt-14px">
    <SyEcharts :options="barOptions" ref="barRef" />
  </SyCard>
</template>

<script setup lang="ts" name="dashboard">
import { SyDrawer, SyDialog, SyCard, SyEcharts } from '@/baseUI';
import { useConfirm, useMessage } from '@/hooks';
import { EChartsOption, SeriesOption } from 'echarts';

const confirm = useConfirm();
const { success } = useMessage();
const openMessage = async () => {
  await confirm({
    title: '提示'
  });
  success('成功的提示');
};
// ------------- drawer --------------
const showDrawer = ref(false);
const loading = ref(false);
const syDrawer = ref();
// ------------- dialog --------------
const showDialog = ref(false);
const syDialog = ref();

const onConfirm = () => {
  loading.value = true;
  if (showDrawer.value) {
    syDrawer.value.onClose();
  } else {
    syDialog.value.onClose();
  }
  loading.value = false;
  success('成功');
};

// ------------- echarts --------------
const barRef = ref<InstanceType<typeof SyEcharts>>();
const barOptions = {
  title: {
    text: '这是一个标题'
  },
  xAxis: {
    type: 'category',
    data: [1, 2, 3, 4, 5, 6]
  },
  yAxis: {
    type: 'value'
  },
  tooltip: {
    show: true
  },
  series: [
    {
      type: 'bar',
      data: [10, 15, 30, 45, 80, 150, 200]
    }
  ]
} as EChartsOption;
setTimeout(() => {
  barRef.value?.update!([
    {
      type: 'bar',
      data: [1, 5, 10, 20, 50, 30, 25]
    }
  ] as SeriesOption);
}, 3000);
</script>

<style lang="scss" scoped></style>
