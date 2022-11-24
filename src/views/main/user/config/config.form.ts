import { IFormConfig } from '@/baseUI/syForm/types';

export const queryFormConfig: IFormConfig = {
  formItems: [
    {
      label: '用户名',
      type: 'input',
      field: 'username',
      placeholder: '请输入用户名'
    }
  ],
  customProps: 'searchBtn'
};

export const formConfig: IFormConfig = {
  formItems: [
    {
      label: '用户名',
      type: 'input',
      field: 'username',
      placeholder: '请输入用户名',
      rules: [
        { required: true, message: '请输入用户名' },
        { min: 2, max: 20, message: '用户名长度为2-20位字符' }
      ]
    },
    {
      label: '密码',
      type: 'password',
      field: 'password',
      placeholder: '请输入密码',
      rules: [
        { required: true, message: '请输入用户密码' },
        { min: 6, max: 12, message: '用户密码长度为6-12位字符' }
      ]
    }
  ]
};
