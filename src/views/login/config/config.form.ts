import { IFormConfig } from '@/baseUI/syForm/types';

export const formConfig: IFormConfig = {
  formItems: [
    {
      label: '用户名',
      type: 'input',
      field: 'username',
      placeholder: '请输入用户名',
      size: 'large',
      rules: [
        { required: true, message: '请输入用户名' },
        { min: 2, max: 20, message: '用户名长度为2-20位字符' }
      ]
    },
    {
      label: '密码',
      type: 'password',
      field: 'password',
      placeholder: '请输入用户密码',
      size: 'large',
      rules: [
        { required: true, message: '请输入用户密码' },
        { min: 6, max: 12, message: '用户名长度为6-12位字符' }
      ]
    }
  ]
};
