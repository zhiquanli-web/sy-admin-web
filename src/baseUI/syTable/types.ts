export type TAlign = 'left' | 'center' | 'right';

interface ISort {
  prop: string;
  order?: 'ascending' | 'descending';
}

export type TSize = 'large' | 'default' | 'small';

export interface IOptions {
  height?: string | number;
  maxHeight?: string | number;
  stripe?: boolean; // 是否为斑马纹 table
  border?: boolean; // 是否带有纵向边框
  size?: TSize; // Table 的尺寸
  fit?: boolean; // 列的宽度是否自撑开
  showHeader?: boolean; // 是否显示表头
  highlightCurrentRow?: boolean; // 是否要高亮当前行
  rowKey?: (() => any) | string; // 行数据的 Key，用来优化 Table 的渲染
  emptyText?: string; // 空数据时显示的文本内容
  defaultExpandAll?: boolean; // 是否默认展开所有行
  expandRowKeys?: any[]; // 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组
  defaultSort?: ISort; // 默认的排序列的 prop 和顺序
  tooltipEffect?: string; // tooltip effect 属性
  indent?: number; // 展示树形数据时，树节点的缩进
  lazy?: boolean;
  treeProps?: object;
  tableLayout?: 'fixed' | 'aut0'; // 设置表格单元、行和列的布局方式
  scrollbarAlwaysOn?: boolean; // 总是显示滚动条
  flexible?: boolean; // 确保主轴的最小尺寸
}

export interface IColumn {
  type?: 'selection' | 'index' | 'expand';
  index?: number | (() => any); // 如果设置了 type=index，可以通过传递 index 属性来自定义索引
  label?: string; // column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件
  columnKey?: string; // column 的 key， column 的 key， 如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件
  prop: string; // 字段名称 对应列内容的字段名
  width?: string | number; // 对应列的宽度
  minWidth?: string | number; // 对应列的最小宽度
  fixed?: boolean | 'left' | 'right'; // 列是否固定在左侧或者右侧。 true 表示固定在左侧
  sortable?: boolean | 'custom'; // 对应列是否可以排序
  resizable?: boolean; // 对应列是否可以通过拖动改变宽度
  showOverflowTooltip?: boolean; // 当内容过长被隐藏时显示 tooltip
  align?: TAlign; // 对齐方式
  headerAlign?: TAlign; // 表头对齐方式， 若不设置该项，则使用表格的对齐方式
}

interface IHandlerOption {
  showCreated?: boolean; // 添加按鈕
  showSizeIcon?: boolean; // 表格密度
  showCulomnIcon?: boolean; // 表格列展示
}

export interface ITableConfig<T = IColumn> {
  url?: string;
  options?: IOptions; // 表格配置项
  columns: T[]; // 表格数据配置项
  filterSlotNames?: string[]; //  需要过滤的slotName
  showFooter?: boolean; // 是否显示底部分页组件
  handlerOption?: IHandlerOption;
}

export interface IPage {
  currentPage: number; // 当前页数
  pageSize: number; // 每页显示条目个数
  pageSizes?: number[]; // 每页显示个数选择器的选项设置
  small?: boolean; // 是否使用小型分页样式
  background?: boolean; // 是否为分页按钮添加背景色
  total?: number; // 总条目数
  pageCount?: number; // 总页数
  pagerCount?: number; // 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠
  layout?: string; // 组件布局，子组件名用逗号分隔
  prevText?: string; // 替代图标显示的上一页文字
  nextText?: string; // 替代图标显示的下一页文字
  disabled?: boolean; // 是否禁用分页
  hideOnSinglePage?: boolean; // 只有一页时是否隐藏
  defaultCurrentPage?: number; // 当前页数的初始值
  defaultPageSize?: number; // 每页显示条目数的初始值
}
