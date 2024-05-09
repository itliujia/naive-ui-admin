import type { FormRules } from "naive-ui";

/** 表单校验规则 */
export const formRules: FormRules = {
  username: [
    {
      required: true,
      message: "请输入账号"
    }
  ],
  password: [
    {
      required: true,
      message: "请输入密码"
    }
  ]
};
