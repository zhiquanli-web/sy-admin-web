import Request from '@/service';
import { IDataModel } from '@/service/types/axios';
import { ITableList } from '@/service/types/table';
import { IColumn, IPage, ITableConfig, TSize } from '@/baseUI/syTable/types';
import { useMessage, useConfirm } from '@/hooks';
interface ITableState {
  size: TSize;
  columns: IColumn[];
  changeSize: (size: TSize) => void;
  changeColumns: (columns: IColumn[]) => void;
}

/**
 *
 * @param config 表格配置数据
 *    url: 请求地址
 *    columns: 表格数据
 *    showFooter: 是否分页
 * @param pageQuery 当前页面请求参数
 *
 */
export default function usePageContent(config: ITableConfig, pageQuery: any = {}) {
  const { url, showFooter, columns } = config;
  const confirm = useConfirm();
  const { success } = useMessage();
  const pageInfo = reactive<IPage>({ currentPage: 1, pageSize: 10 });
  const total = ref(0);
  const dataSource = ref<any[]>([]);
  watch(pageInfo, () => getPageData());

  const tableState = reactive<ITableState>({
    columns, // 表格列
    size: 'default', // 表格间距
    changeSize: (size: TSize) => {
      tableState.size = size;
    },
    changeColumns: (columns: IColumn[]) => {
      tableState.columns = columns;
    }
  });

  /**
   *
   * @param query 用于覆盖原有参数值，通常用于通过ref调用该方法时传入
   */
  const getPageData = async (query?: any) => {
    query = query ?? {};
    let params: Record<string, any> = {
      ...pageQuery,
      pageNo: pageInfo.currentPage,
      pageSize: pageInfo.pageSize,
      ...query
    };
    if (!showFooter) {
      params = {
        ...pageQuery,
        ...query
      };
    }
    for (const key in params) {
      if (params[key] !== 0 && params[key] !== false && !params[key]) {
        delete params[key];
      }
    }
    try {
      const res = await Request.get<IDataModel<ITableList>>({
        url,
        params
      });
      const {
        data: { list, count }
      } = res;
      dataSource.value = list;
      total.value = count;
    } catch (err) {
      // console.log(err);
    }
  };
  // 改变页码
  const currentChange = (val: number) => {
    pageInfo.currentPage = val;
  };
  // 改变展示条数
  const sizeChange = (val: number) => {
    pageInfo.pageSize = val;
  };
  // 编辑
  const handleEdit = async (data: any, id: string | number, curUrl?: string) => {
    try {
      const { code } = await await Request.put<IDataModel>({
        url: curUrl || `${url}/${id}`,
        data
      });
      if (code === 0) {
        success('操作成功');
      }
      getPageData();
    } catch (err) {
      // console.log(err);
    }
  };
  // 新增
  const handleCreate = async (data: any) => {
    try {
      const { code } = await Request.post<IDataModel>({
        url,
        data
      });
      if (code === 0) {
        success('添加成功');
      }
      getPageData();
    } catch (err) {
      // console.log(err);
    }
  };
  // 删除
  const handleDelete = (id: string, contentTip?: string) => {
    confirm({
      title: '删除',
      content: contentTip || '删除之后无法恢复哦，确定删除吗?',
      type: 'warning'
    })
      .then(async () => {
        try {
          const { code } = await Request.delete({
            url: `${url}/${id}`
          });
          if (code === 0) {
            success('删除成功');
          }
        } catch (err) {
          // console.log(err);
        }
        refresh();
      })
      .catch(() => {});
  };
  // 刷新数据
  const refresh = () => {
    pageInfo.currentPage = 1;
  };
  return {
    pageInfo,
    dataSource,
    tableState,
    total,
    getPageData,
    refresh,
    currentChange,
    sizeChange,
    handleCreate,
    handleDelete,
    handleEdit
  };
}
