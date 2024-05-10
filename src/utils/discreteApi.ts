import { createDiscreteApi } from "naive-ui";
import { VNodeChild } from "vue";

const {
  message: messageApi,
  notification: notificationApi,
  // dialog,
  loadingBar
  // modal: modalApi
} = createDiscreteApi(["message", "notification", "loadingBar"]);

type MessageTypes = "info" | "success" | "warning" | "error" | "loading" | "default";

type VNodeChildFun = () => VNodeChild;

type MessageRenderMessage = (props: {
  content?: string | number | VNodeChildFun;
  icon?: () => VNodeChild;
  closable: boolean;
  type: "info" | "success" | "warning" | "error" | "loading";
  onClose?: () => void;
}) => VNodeChild;

/** 消息配置项 */
interface MessageOption {
  /** 是否显示 close 图标， 默认 `false` */
  closable?: boolean;
  /** 信息展示的时长，默认 `3000` */
  duration?: number;
  /** 信息图标，返回一个 VNodeChild */
  icon?: () => VNodeChild;
  /** Hover 到信息上是否不销毁 */
  keepAliveOnHover?: boolean;
  /** 消息的渲染函数 */
  render?: MessageRenderMessage;
  /** 是否展示图标 */
  showIcon?: boolean;
  /** 消息类型，可选 `info` 、`success` 、`warning` 、`error`、`loading` 、`default` ，默认 `default` */
  type: MessageTypes;
  /** 信息消失动画结束的回调 */
  onAfterLeave?: () => void;
  /** 点击关闭图标的回调 */
  onClose?: () => void;
  /** 信息开始消失的回调 */
  onLeave?: () => void;
}

/** 打开`Message`消息提示 */
export const showMessage = (content: string | VNodeChildFun, option?: MessageOption) => {
  if (!option) {
    return messageApi.info(content);
  }
  return messageApi.create(content, option);
};

/** 关闭所有 `Message` 消息提示 */
export const closeAllMessage = () => messageApi.destroyAll();

/** 通知配置项 */
interface NotificationOption {
  /** 操作区域的内容 */
  action?: string | VNodeChildFun;
  /** 头像区域的内容 */
  avatar?: VNodeChildFun;
  /** 是否显示 close 图标，默认 `true` */
  closable?: boolean;
  /** 通知框内容 */
  content?: string | VNodeChildFun;
  /** 描述的内容 */
  description?: string | VNodeChildFun;
  /** 如果没有设定则不会自动关闭，单位毫秒 */
  duration?: number;
  /** 当鼠标移入时是否保持通知框显示，默认 `false` */
  keepAliveOnHover?: boolean;
  /** `meta` 信息 */
  meta?: string | VNodeChildFun;
  /** `title` 信息 */
  title?: string | VNodeChildFun;
  /** 通知类型，可选 `info` 、`success` 、`warning` 、`error` */
  type?: "info" | "success" | "warning" | "error";
  /** 过渡动画进入执行完后执行的回调 */
  onAfterEnter?: () => void;
  /** 过渡动画离开执行完后执行的回调 */
  onAfterLeave?: () => void;
  /** 关闭通知的回调，返回 `false`、Promise resolve `false` 或者 reject 会取消这次关闭 */
  onClose?: () => boolean | Promise<boolean>;
  /** 过渡动画离开时执行的回调 */
  onLeave?: () => void;
}

/** 打开`Notification`消息提示 */
export const showNotification = (option: NotificationOption) => {
  notificationApi.create(option);
};

/** 关闭所有 `Notification` 消息提示 */
export const closeAllNotification = () => notificationApi.destroyAll();

// /** 模态框配置项 */
// interface ModalOption {
//   /** 是否自动聚焦 Modal 第一个可聚焦的元素，默认 `true`  */
//   autoFocus?: boolean;
//   /** 是否在打开时禁用 body 滚动，默认 `true`  */
//   blockScroll?: boolean;
//   /** 是否在摁下 Esc 键的时候关闭 Modal，默认 `true`  */
//   closeOnEsc?: boolean;
//   /** 使用何种指令控制模态框主体的条件渲染，默认 `if` */
//   displayDirective?: "if" | "show";
//   /** 点击遮罩时是否发出 `update:show` 事件，默认 `true`  */
//   maskClosable?: boolean;
//   /** 模态框使用何种预设 */
//   preset?: "dialog" | "card";
//   /** 是否展示 Modal */
//   show?: boolean;
//   /** Modal 的挂载位置，默认 `body` */
//   to?: string | HTMLElement;
//   /** 模态框动画出现的位置，默认 `mouse` */
//   transformOrigin?: "mouse" | "center";
//   /** 是否将焦点锁定在 Modal 内部，默认 `true` */
//   trapFocus?: boolean;
//   /** Modal 的 z-index */
//   zIndex?: number;
//   /** Modal 出现后的回调 */
//   onAfterEnter?: () => void;
//   /** Modal 关闭后的回调 */
//   onAfterLeave?: () => void;
//   /** 焦点在 Modal 内部时按下 Esc 键的回调 */
//   onEsc?: () => void;
//   /** 点击遮罩时的回调 */
//   onMaskClick?: () => void;
//   /** 模态框更新是否展示状态的回调 */
//   "onUpdate:show"?: (value: boolean) => void;
// }

// /** 打开`Modal`消息提示 */
// export const showModal = (option: ModalOption) => {
//   modalApi.create(option);
// };

// /** 关闭所有 `Modal` 消息提示 */
// export const closeAllModal = () => modalApi.destroyAll();

export { messageApi, notificationApi, loadingBar };
