import { IFormConfig } from '@/baseUI/syForm/types';

export const formConfig: IFormConfig = {
  formItems: [
    {
      label: '用户名',
      type: 'input',
      field: 'username',
      placeholder: '请输入用户名'
    },
    {
      type: 'custom',
      field: 'searchBtn'
    }
  ],
  customProps: 'searchBtn'
};
