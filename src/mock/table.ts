import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';

import { ContentApis } from '@/service/api';
import { ITableList } from '@/service/types/table';

const tableData: ITableList = Mock.mock({
  'list|1-10': [
    {
      'id|+1': 1,
      name: /([赵钱孙李周吴郑王冯陈褚卫辰宿列张][一二三四五六七八九十]){1}/,
      age: /[1-9][0-9]/,
      'sex|0-1': 0,
      createTime: '2022-11-2 11:31:23'
    }
  ]
});

let listLength = tableData.list.length;

export default [
  {
    url: `/api${ContentApis.TABLE}`,
    method: 'get',
    response: ({ query }: any) => {
      const { name } = query;
      let resData = {
        ...tableData,
        page: {
          count: tableData.list.length,
          currentPage: 1,
          pageSize: query.pageSize
        }
      };
      if (name) {
        resData.list = tableData.list.filter((item: any) => item.name.indexOf(name) !== -1);
        resData.page.count = resData.list.length;
      }
      console.log(`GET::${ContentApis.TABLE}`, query);
      return {
        code: 0,
        data: resData,
        message: 'success'
      };
    }
  },
  {
    url: `/api${ContentApis.TABLE}`,
    method: 'post',
    response: ({ body }: any) => {
      console.log(`POST::${ContentApis.TABLE}`, body);
      tableData.list.push({ id: listLength + 1, ...body });
      return {
        code: 0,
        data: '添加成功',
        message: 'success'
      };
    }
  },
  {
    url: `/api${ContentApis.TABLE}`,
    method: 'put',
    response: ({ body, query }: any) => {
      console.log(`PUT::${ContentApis.TABLE}`, body);
      const index = tableData.list.findIndex((item: any) => item.id === parseInt(query.id));
      tableData.list[index] = body;
      return {
        code: 0,
        data: '修改成功',
        message: 'success'
      };
    }
  },
  {
    url: `/api${ContentApis.TABLE}`,
    method: 'delete',
    response: ({ query }: any) => {
      console.log(`DELETE::${ContentApis.TABLE}`, query);
      const index = tableData.list.findIndex((item: any) => item.id === parseInt(query.id));
      tableData.list.splice(index, 1);
      return {
        code: 0,
        data: '删除成功',
        message: 'success'
      };
    }
  }
] as MockMethod[];
