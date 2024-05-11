export default {
  path: "/error",
  redirect: "/403",
  meta: {
    title: "异常页面",
    showLink: false
  },
  children: [
    {
      path: "/403",
      name: "403",
      component: () => import("@/views/error/403.vue"),
      meta: {
        title: "无权限"
      }
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/views/error/404.vue"),
      meta: {
        title: "404"
      }
    },
    {
      path: "/500",
      name: "500",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: "500"
      }
    }
  ]
};
