import { ITableConfig } from '@/baseUI/syTable/types';
import { ContentApis } from '@/service/api';
export const tableConfig: ITableConfig = {
  options: {
    border: true,
    stripe: true,
    defaultSort: { prop: 'age', order: 'descending' }
  },
  columns: [
    {
      type: 'selection',
      prop: 'selection',
      width: '55px',
      align: 'center'
    },
    {
      type: 'index',
      prop: 'index',
      label: '序号',
      width: '80px',
      align: 'center'
    },
    {
      label: '姓名',
      prop: 'name',
      align: 'left'
    },
    {
      label: '年龄',
      prop: 'age',
      sortable: true,
      align: 'center'
    },
    {
      label: '操作',
      prop: 'handler',
      align: 'center'
    }
  ]
};

export const contentTableConfig: ITableConfig = {
  url: ContentApis.TABLE,
  columns: [
    {
      type: 'index',
      prop: 'index',
      label: '序号',
      width: '55px',
      align: 'center'
    },
    {
      label: '姓名',
      prop: 'name',
      align: 'left'
    },
    {
      label: '性别',
      prop: 'sex'
    },
    {
      label: '年龄',
      prop: 'age'
    },
    {
      label: '创建时间',
      prop: 'createTime'
    },
    {
      label: '操作',
      prop: 'handler'
    }
  ],
  filterSlotNames: ['createTime'],
  handlerOption: {
    showCreated: true,
    showSizeIcon: true,
    showCulomnIcon: true
  }
};
