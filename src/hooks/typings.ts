import { ref } from "vue";

/** 组件实例Ref */
export function useCompRef<T extends abstract new (...args: any) => any>(_comp: T) {
  return ref<InstanceType<T>>();
}
