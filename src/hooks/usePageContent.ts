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
  const { success, error } = useMessage();
  const pageInfo = reactive<IPage>({ currentPage: 1, pageSize: 10, total: 0 });
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
    let params: any = {
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
    try {
      const res = await Request.get<IDataModel<ITableList>>({
        url,
        params
      });
      const {
        data: { list, page }
      } = res;
      dataSource.value = list;
      pageInfo.total = page.count;
    } catch (err) {
      error('获取数据失败，请刷新重试');
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
      await Request.put<IDataModel>({
        url: curUrl || `${url}?id=${id}`,
        data
      });
      success('操作成功');
      refresh();
    } catch (err) {
      error('操作失败，请稍后再试');
    }
  };
  // 新增
  const handleCreate = async (data: any) => {
    try {
      await Request.post<IDataModel>({
        url,
        data
      });
      success('添加成功');
      refresh();
    } catch (err) {
      error('添加失败，请稍后再试');
    }
  };
  // 删除
  const handleDelete = (row: any, contentTip?: string) => {
    confirm({
      title: '删除',
      content: contentTip || '删除之后无法恢复哦，确定删除吗?',
      type: 'warning'
    })
      .then(async () => {
        try {
          await Request.delete({
            url: `${url}?id=${row.id}`
          });
          success('删除成功');
        } catch (err) {
          error('删除失败，请稍后再试');
        }
        refresh();
      })
      .catch(() => {});
  };
  // 刷新数据
  const refresh = () => {
    pageInfo.currentPage = 1;
    getPageData();
  };
  return {
    pageInfo,
    dataSource,
    tableState,
    getPageData,
    refresh,
    currentChange,
    sizeChange,
    handleCreate,
    handleDelete,
    handleEdit
  };
}
