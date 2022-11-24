import { ITableConfig } from '@/baseUI/syTable/types';
import { ContentApis } from '@/service/api';
export const tableConfig: ITableConfig = {
  url: ContentApis.USER,
  columns: [
    {
      type: 'index',
      prop: 'index',
      label: '序号',
      width: '80px',
      align: 'center'
    },
    {
      label: '用户名',
      prop: 'username',
      align: 'center'
    },
    {
      label: '头像',
      prop: 'avatar',
      align: 'center'
    },
    {
      label: '创建时间',
      prop: 'createAt',
      align: 'center'
    },
    {
      label: '更新时间',
      prop: 'updateAt',
      align: 'center'
    },
    {
      label: '操作',
      prop: 'handler',
      align: 'center'
    }
  ],
  showFooter: true,
  handlerOption: { showCreated: true, showSizeIcon: true, showCulomnIcon: true },
  filterSlotNames: ['updateAt', 'createAt']
};
