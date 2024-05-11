/** 请求结果数据项 */
export type ResultDataType<T> = {
  code: number;
  msg: string;
  data: T;
};

/** 操作结果 */
export type OperationResultType = {
  code: number;
  msg: string;
};

/** 请求结果数据列表 */
export type ResultListType<T> = {
  code: number;
  msg: string;
  data: T[];
  total?: number;
};
