import { buildHierarchyTree } from '@pureadmin/utils'
import { createWebHashHistory, createWebHistory, RouteRecordRaw, RouterHistory } from 'vue-router'

/**
 * 排序rank路由等级
 * @param sort `1`升序，`-1`降序
 */
export function sortRankRoute(arr: any[], sort: -1 | 1 = 1) {
  // arr.forEach((v, index) => {
  //   // 当rank不存在时，根据顺序自动创建，首页路由永远在第一位
  //   if (handRank(v)) v.meta.rank = index + 999;
  // });
  return arr.sort((a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
    return (a?.meta.rank - b?.meta.rank) * sort
  })
}

/**
 * 获取路由历史模式
 * @see https://next.router.vuejs.org/zh/guide/essentials/history-mode.html
 */
export const getHistoryMode = (historyMode: 'hash' | 'h5' = 'hash'): RouterHistory =>
  historyMode === 'h5' ? createWebHistory() : createWebHashHistory()
