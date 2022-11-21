import type { DatePickType, FormItemRule } from 'element-plus';
import { Component } from 'vue';
export type TFormType =
  | 'input'
  | 'password'
  | 'textarea'
  | 'select'
  | 'datepicker'
  | 'timepicker'
  | 'cascader'
  | 'number'
  | 'switch'
  | 'custom';
export type TPosition = 'left' | 'right';
export type TLabelPosition = TPosition | 'top';
export type TSize = 'large' | 'default' | 'small';
export type TTrigger = 'blur' | 'change';
export type TResize = 'none' | 'both' | 'horizontal' | 'vertical';

export interface ISelectOption {
  label: string;
  value: string | number;
}
export interface ICascaderOption extends ISelectOption {
  children?: ICascaderOption[];
  [propType: string]: any;
}
export interface IFooter {
  show: boolean;
  confirmBtn?: boolean;
  cancelBtn?: boolean;
  resetBtn?: boolean;
}
interface IDatePicker {
  type: DatePickType; // 显示类型
  editable?: boolean; // 文本框可输入
  clearable?: boolean; // 是否显示清除按钮
  startPlaceholder?: string; // 范围选择时开始日期的占位内容
  endPlaceholder?: string; // 范围选择时结束日期的占位内容
  format?: string; // 显示在输入框中的格式
  rangeSeparator?: string; // 选择范围时的分隔符
  defaultTime?: Date | [Date, Date]; // 选择日期后的默认时间值
  valueFormat?: string; // 绑定值的格式。 不指定则绑定值为 Date 对象
  shortcuts?: Array<{ text: string; value: Date | (() => any) }>; // 设置快捷选项，需要传入数组对象
}
interface ITimePicker {
  isRange?: boolean; // 是否为时间范围选择
  arrowControl?: boolean; // 是否使用箭头进行时间选择
  disabledHours?: () => any; // 禁止选择部分小时选项
  disabledMinutes?: () => any; // 禁止选择部分分钟选项
  disabledSeconds?: () => any; // 禁止选择部分秒选项
  format?: string; // 显示在输入框中的格式
  rangeSeparator?: string; // 选择范围时的分隔符
}
interface IInput {
  showWordLimit?: boolean; // 是否显示统计字数, 只在 type 为 'text' 或 'textarea' 的时候生效
  clearable?: boolean; // 是否可清空
  formatter?: (value: string | number) => string; // 指定输入值的格式。(只有当 type 是"text"时才能工作)
  parser?: (value: string) => string; // 指定从格式化器输入中提取的值。(仅当 type 是"text"时才起作用)
  autocomplete?: string;
  max?: number; // 原生 max 属性，设置最大值
  min?: number; // 原生属性，设置最小值
  step?: number; // 原生属性，设置输入字段的合法数字间隔
  resize?: TResize; // 控制是否能被用户缩放
  autofocus?: boolean; //
}
interface ITextarea {
  autosize?: boolean | object; // textarea 高度是否自适应
  rows?: number; // 输入框行数
}
interface INumberInput {
  stepStrictly?: boolean; // 是否只能输入 step 的倍数
  precision?: number; // 数值精度
  controls?: boolean; // 是否使用控制按钮
  controlsPosition?: 'right'; // 控制按钮位置
}
interface ISelect {
  multiple?: boolean; // 是否多选
  collapseTags?: boolean; // 多选时是否将选中值按文字的形式展示
  collapseTagsTooltip?: boolean; // 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapse-tags属性必须设定为 true
  multipleLimit?: number; // multiple 属性设置为 true 时，代表多选场景下用户最多可以选择的项目数， 为 0 则不限制
  effect?: 'dark' | 'light'; // Tooltip 主题
  filterable?: boolean; // Select 组件是否可筛选
  noDataText?: string; // 无选项时显示的文字，也可以使用 empty 插槽设置自定义内容
}
interface ISwitch {
  loading?: boolean; // 是否显示加载中
  width?: number | string; // switch 的宽度
  activeIcon?: string | Component; // switch 状态为 on 时所显示图标，设置此项会忽略 active-text
  inactiveIcon?: string | Component; // switch 状态为 off 时所显示图标，设置此项会忽略 inactive-text
  activeText?: string; // switch 打开时的文字描述
  inactiveText?: string; // switch 的状态为 off 时的文字描述
  activeValue?: boolean | string | number; // switch 状态为 on 时的值
  inactiveValue?: boolean | string | number; // switch的状态为 off 时的值
}
export interface IForm {
  labelPosition?: TLabelPosition; // 表单域标签的位置
  labelWidth?: string | number; // 标签的长度
  inline?: boolean; // 行内表单模式
  labelSuffix?: string; // 表单域标签的后缀
  hideRequiredAsterisk?: boolean; // 是否隐藏必填字段标签旁边的红色星号。
  requireAsteriskPosition?: TPosition; // 星号的位置。
  showMessage?: boolean; // 是否显示校验错误信息
  inlineMessage?: boolean; //是否以行内形式展示校验信息
  statusIcon?: boolean; // 是否在输入框中显示校验结果反馈图标
  validateOnRuleChange?: boolean; // 是否在 rules 属性改变后立即触发一次验证
  size?: TSize; // 用于控制该表单内组件的尺寸
  disabled?: boolean; // 是否禁用该表单内的所有组件。 如果设置为 true, 它将覆盖内部组件的 disabled 属性
  scrollToError?: boolean; // 当校验失败时，滚动到第一个错误表单项
}
export interface IFormItem {
  type: TFormType; // 表单项类型
  prop?: string | string[]; // model 的键名,在定义了validate、resetFields的方法时，该属性是必填的
  label?: string; // 标签文本
  labelWidth?: string | number; // 标签宽度
  rules?: FormItemRule | FormItemRule[]; // 表单验证规则
  showMessage?: boolean; // 是否显示校验错误信息
  inlineMessage?: boolean; // 是否在行内显示校验信息
  size?: TSize; // 用于控制该表单域下组件的默认尺寸
  placeholder?: string; // 提示信息
  disabled?: boolean; // 是否禁用
  readonly?: boolean; // 是否只读

  field: string; // 表单唯一标识字段
  options?: Array<ISelectOption | ICascaderOption>; // (级联)选择器options
  datePickerOptions?: IDatePicker; // 日期/日期时间选择器配置项
  otherOptions?: IInput | INumberInput | ITextarea | ISelect | ISwitch | ITimePicker; // 其它配置选项
  style?: object; // 表单项样式
  defaultValue?: string | number | Date | [Date, Date]; // 默认值
}
export interface IFormConfig {
  form?: IForm; // 表单配置
  formItems: IFormItem[]; // 表单项配置
  customProps?: string[] | string; // 需要特殊处理的field属性(放到这里是为了方便处理，不用频繁去遍历formItems) 如选择器的动态options
}
