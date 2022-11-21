import * as echarts from 'echarts';

export default function useEcharts(el: HTMLElement) {
  const echartInstance = echarts.init(el);
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options);
  };
  const updateSize = () => {
    echartInstance.resize();
  };
  const updateData = (data: echarts.SeriesOption) => {
    const options = echartInstance.getOption() as echarts.EChartsOption;
    options.series = data;
    echartInstance.setOption(options, true);
  };
  window.addEventListener('resize', () => {
    echartInstance.resize();
  });
  return {
    echartInstance,
    setOptions,
    updateSize,
    updateData
  };
}
