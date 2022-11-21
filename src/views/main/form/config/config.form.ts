import { IFormConfig } from '@/baseUI/syForm/types';

export const formConfig: IFormConfig = {
  formItems: [
    {
      label: '用户名',
      type: 'input',
      field: 'name',
      placeholder: '请输入用户名',
      rules: [
        { required: true, message: '请输入用户名' },
        { min: 2, max: 12, message: '用户名长度为2-12位字符' }
      ]
    },
    {
      label: '密码',
      type: 'password',
      field: 'password',
      placeholder: '请输入用户密码',
      rules: [
        { required: true, message: '请输入用户密码' },
        { min: 6, max: 12, message: '用户名长度为6-12位字符' }
      ]
    },
    {
      label: '数量',
      type: 'number',
      field: 'count',
      placeholder: '请输入',
      otherOptions: {
        min: 2,
        max: 99
      }
    },
    {
      label: '是否启用',
      type: 'switch',
      field: 'canUse',
      defaultValue: 1,
      style: { '--el-switch-on-color': '#13ce66', '--el-switch-off-color': '#ff4949' },
      otherOptions: {
        activeValue: 1,
        inactiveValue: 0
      }
    },
    {
      label: '更新时间',
      type: 'datepicker',
      field: 'updateTime',
      placeholder: '请选择更新时间',
      rules: [{ required: true, message: '请选择更新时间' }],
      defaultValue: '2022-11-01',
      datePickerOptions: {
        type: 'date',
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD'
      }
    },
    {
      label: '用户权限',
      type: 'select',
      field: 'role',
      defaultValue: 'admin',
      placeholder: '请选择用户权限',
      options: []
    },
    {
      label: '城市',
      type: 'cascader',
      field: 'city',
      defaultValue: 'lg',
      placeholder: '请选择城市',
      options: [
        {
          label: '广州',
          value: 'guangz',
          children: [
            { label: '深圳', value: 'sz', children: [{ label: '龙岗', value: 'lg' }] },
            { label: '广东', value: 'gd' }
          ]
        },
        {
          label: '贵州',
          value: 'guiz',
          children: [
            { label: '贵阳', value: 'gy', children: [{ label: '花溪', value: 'hx' }] },
            { label: '铜仁', value: '松涛' }
          ]
        }
      ]
    },
    {
      label: '备注',
      type: 'textarea',
      field: 'remark',
      placeholder: '请输入备注信息',
      otherOptions: {
        autosize: { minRows: 2, maxRows: 4 },
        showWordLimit: true
      }
    },
    {
      label: '性别',
      type: 'custom',
      field: 'sex'
    },
    {
      label: '时间',
      type: 'timepicker',
      field: 'time',
      defaultValue: new Date(2016, 9, 10, 18, 30),
      otherOptions: {
        format: 'HH:mm',
        clearable: true
      }
    }
  ],
  customProps: 'role'
};
