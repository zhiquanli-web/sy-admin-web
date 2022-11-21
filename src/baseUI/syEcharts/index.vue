<template>
  <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
</template>

<script setup lang="ts" name="syEcharts">
import { EChartsOption, SeriesOption } from 'echarts';
import { useEcharts } from '@/hooks';
interface Props {
  options: EChartsOption;
  width?: string;
  height?: string;
}
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '350px'
});
const echartDivRef = ref<HTMLElement>();
const update = ref<(series: SeriesOption) => void>();
onMounted(() => {
  const { setOptions, updateData } = useEcharts(echartDivRef.value!);
  update.value = updateData;
  watchEffect(() => {
    setOptions(props.options);
  });
});
defineExpose({
  update
});
</script>

<style lang="scss" scoped></style>
