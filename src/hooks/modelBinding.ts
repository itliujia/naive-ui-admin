import { computed } from "vue";

/**
 * 双向绑定逻辑函数
 * @template T - 属性值的数据类型
 * @param props 组件属性对象
 * @param emit 用于触发事件的函数
 * @param propName 属性名称
 */
export function useModelBinding<T, K extends keyof T>(
  props: T,
  emit: (event: string, value: T[K]) => void,
  propName: K
) {
  return computed<T[K]>({
    get() {
      return props[propName];
    },
    set(newVal: T[K]) {
      emit(`update:${String(propName)}`, newVal);
    }
  });
}

/**
 * 双向绑定可见性逻辑函数
 * @param props 组件属性对象
 * @param emit 用于触发事件的函数
 */
export const useVisibleBinding = (
  props: { visible: boolean },
  emit: (event: string, value: boolean) => void
) => useModelBinding(props, emit, "visible");
