export interface IOptions {
  fullscreen?: boolean; // 是否为全屏 Dialog
  top?: string; // Dialog CSS 中的 margin-top 值
  modal?: boolean; // 是否需要遮罩层
  lockScroll?: boolean; // 是否在 Dialog 出现时将 body 滚动锁定
  openDelay?: number; // Dialog 打开的延时时间，单位毫秒
  closeDelay?: number; // Dialog 关闭的延时时间，单位毫秒
  closeOnClickModal?: boolean; // 是否可以通过点击 modal 关闭 Dialog
  closeOnPressEscape?: boolean; // 是否可以通过按下 ESC 关闭 Dialog
  showClose?: boolean; // 是否显示关闭按钮
  draggable?: boolean; // 为 Dialog 启用可拖拽功能
  center?: boolean; // 是否让 Dialog 的 header 和 footer 部分居中排列
  alignCenter?: boolean; // 是否水平垂直对齐对话框
  destroyOnClose?: boolean; // 当关闭 Dialog 时，销毁其中的元素
}
