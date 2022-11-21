export interface IOptions {
  direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'; // Drawer 打开的方向
  lockScroll?: boolean; // 是否在 Drawer 出现时将 body 滚动锁定
  closeOnClickModal?: boolean; // 是否可以通过点击 modal 关闭 Drawer
  closeOnPressEscape?: boolean; // 是否可以通过按下 ESC 关闭 Drawer
  openDelay?: number; // Drawer 打开的延时时间，单位毫秒
  closeDelay?: number; // Drawer 关闭的延时时间，单位毫秒
  destroyOnClose?: boolean; // 控制是否在关闭 Drawer 之后将子元素全部销毁
  modal?: boolean; // 是否需要遮罩层
  showClose?: boolean; // 是否显示关闭按钮
  size?: number | string; // Drawer 窗体的大小
  title?: string; // Drawer 的标题
  withHeader?: boolean; // 控制是否显示 header 栏
}
