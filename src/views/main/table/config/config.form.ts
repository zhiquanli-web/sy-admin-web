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
      label: '年龄',
      type: 'input',
      field: 'age',
      placeholder: '请输入年龄',
      rules: [
        { required: true, message: '请输入年龄' },
        { pattern: /^[1-9][0-9]*$/, message: '年龄为1-99岁' }
      ]
    },
    {
      label: '性别',
      type: 'select',
      field: 'sex',
      placeholder: '请选择性别',
      rules: [{ required: true, message: '请选择性别' }],
      options: [
        { value: 0, label: '女' },
        { value: 1, label: '男' }
      ]
    },
    {
      label: '创建时间',
      type: 'datepicker',
      field: 'createTime',
      placeholder: '请选择创建时间',
      rules: [{ required: true, message: '请选择创建时间' }]
    }
  ]
};
