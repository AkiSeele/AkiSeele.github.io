---
title: Vite项目搭建
date: 2022-10-17
updated: 
tags:
  - 教程
categories:
  - 教程
# type: yuque
# url: 
---

## 目录结构
```
├── README.md
├── index.html           项目入口
├── mock                 mock目录
├── package.json
├── public
├── src
│   ├── App.vue          主应用
│   ├── api              请求中心
│   ├── assets           资源目录（图片、less、css等）
│   ├── components       项目组件
│   ├── constants        常量
│   ├── env.d.ts         全局声明
│   ├── main.ts          主入口
│   ├── pages            页面目录
│   ├── router           路由配置
│   ├── types            ts类型定义
│   ├── store            pinia状态管理
│   └── utils            基础工具包
├── test                 测试用例
├── tsconfig.json        ts配置
├── .eslintrc.js         eslint配置
├── .prettierrc.json     prettier配置
├── .gitignore           git忽略配置
└── vite.config.ts       vite配置
```

## 创建脚手架
> 使用pnpm

```
pnpm create vite
```

## 约束代码风格
### Eslint 
#### 安装
```
# eslint 安装
pnpm add eslint
# eslint 插件安装
pnpm add eslint-plugin-vue

pnpm add @typescript-eslint/eslint-plugin

pnpm add eslint-plugin-prettier

# typescript parser
pnpm add @typescript-eslint/parser
```

#### 新建.eslintrc.js
> 配置eslint效验规则
```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    // eslint-config-prettier 的缩写
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  // eslint-plugin-vue @typescript-eslint/eslint-plugin eslint-plugin-prettier的缩写
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-var': 'error',
    'prettier/prettier': 'error',
    // 禁止出现console
    'no-console': 'warn',
    // 禁用debugger
    'no-debugger': 'warn',
    // 禁止出现重复的 case 标签
    'no-duplicate-case': 'warn',
    // 禁止出现空语句块
    'no-empty': 'warn',
    // 禁止不必要的括号
    'no-extra-parens': 'off',
    // 禁止对 function 声明重新赋值
    'no-func-assign': 'warn',
    // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    'no-unreachable': 'warn',
    // 强制所有控制语句使用一致的括号风格
    curly: 'warn',
    // 要求 switch 语句中有 default 分支
    'default-case': 'warn',
    // 强制尽可能地使用点号
    'dot-notation': 'warn',
    // 要求使用 === 和 !==
    eqeqeq: 'warn',
    // 禁止 if 语句中 return 语句之后有 else 块
    'no-else-return': 'warn',
    // 禁止出现空函数
    'no-empty-function': 'warn',
    // 禁用不必要的嵌套块
    'no-lone-blocks': 'warn',
    // 禁止使用多个空格
    'no-multi-spaces': 'warn',
    // 禁止多次声明同一变量
    'no-redeclare': 'warn',
    // 禁止在 return 语句中使用赋值语句
    'no-return-assign': 'warn',
    // 禁用不必要的 return await
    'no-return-await': 'warn',
    // 禁止自我赋值
    'no-self-assign': 'warn',
    // 禁止自身比较
    'no-self-compare': 'warn',
    // 禁止不必要的 catch 子句
    'no-useless-catch': 'warn',
    // 禁止多余的 return 语句
    'no-useless-return': 'warn',
    // 禁止变量声明与外层作用域的变量同名
    'no-shadow': 'off',
    // 允许delete变量
    'no-delete-var': 'off',
    // 强制数组方括号中使用一致的空格
    'array-bracket-spacing': 'warn',
    // 强制在代码块中使用一致的大括号风格
    'brace-style': 'warn',
    // 强制使用骆驼拼写法命名约定
    camelcase: 'warn',
    // 强制使用一致的缩进
    indent: 'off',
    // 强制在 JSX 属性中一致地使用双引号或单引号
    // 'jsx-quotes': 'warn',
    // 强制可嵌套的块的最大深度4
    'max-depth': 'warn',
    // 强制最大行数 300
    // "max-lines": ["warn", { "max": 1200 }],
    // 强制函数最大代码行数 50
    // 'max-lines-per-function': ['warn', { max: 70 }],
    // 强制函数块最多允许的的语句数量20
    'max-statements': ['warn', 100],
    // 强制回调函数最大嵌套深度
    'max-nested-callbacks': ['warn', 3],
    // 强制函数定义中最多允许的参数数量
    'max-params': ['warn', 3],
    // 强制每一行中所允许的最大语句数量
    'max-statements-per-line': ['warn', { max: 1 }],
    // 要求方法链中每个调用都有一个换行符
    'newline-per-chained-call': ['warn', { ignoreChainWithDepth: 3 }],
    // 禁止 if 作为唯一的语句出现在 else 语句中
    'no-lonely-if': 'warn',
    // 禁止空格和 tab 的混合缩进
    'no-mixed-spaces-and-tabs': 'warn',
    // 禁止出现多行空行
    'no-multiple-empty-lines': 'warn',
    // 禁止出现;
    semi: ['warn', 'never'],
    // 强制在块之前使用一致的空格
    'space-before-blocks': 'warn',
    // 强制在 function的左括号之前使用一致的空格
    // 'space-before-function-paren': ['warn', 'never'],
    // 强制在圆括号内使用一致的空格
    'space-in-parens': 'warn',
    // 要求操作符周围有空格
    'space-infix-ops': 'warn',
    // 强制在一元操作符前后使用一致的空格
    'space-unary-ops': 'warn',
    // 强制在注释中 // 或 /* 使用一致的空格
    // "spaced-comment": "warn",
    // 强制在 switch 的冒号左右有空格
    'switch-colon-spacing': 'warn',
    // 强制箭头函数的箭头前后使用一致的空格
    'arrow-spacing': 'warn',
    'no-var': 'warn',
    'prefer-const': 'warn',
    'prefer-rest-params': 'warn',
    'no-useless-escape': 'warn',
    'no-irregular-whitespace': 'warn',
    'no-prototype-builtins': 'warn',
    'no-fallthrough': 'warn',
    'no-extra-boolean-cast': 'warn',
    'no-case-declarations': 'warn',
    'no-async-promise-executor': 'warn',
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
}
```
#### 新建.eslintignore
```
# eslint 忽略检查 (根据项目需要自行添加)
node_modules
dist
```

### Prettier
#### 安装
```
# 安装 prettier
pnpm add prettier
```
#### 解决eslint冲突
> 解决 ESLint 中的样式规范和 prettier 中样式规范的冲突，以 prettier 的样式规范为准，使 ESLint 中的样式规范自动失效
```
# 安装插件 eslint-config-prettier
pnpm add eslint-config-prettier
```
#### 新建.prettierrc.js
```js
配置 prettier 格式化规则
module.exports = {
  tabWidth: 2,
  jsxSingleQuote: true,
  jsxBracketSameLine: true,
  printWidth: 100,
  singleQuote: true,
  semi: false,
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
  ],
  arrowParens: 'always',
}
```
#### 新建.prettierignore
```
# 忽略格式化文件 (根据项目需要自行添加)
node_modules
dist
```

#### package.json 配置
```
{
  "script": {
    "lint": "eslint src --fix --ext .ts,.tsx,.vue,.js,.jsx",
    "prettier": "prettier --write ."
  }
}
```
### 使用
```
# eslint 检查
pnpm lint
# prettier 自动格式化
pnpm prettier
```

## 配置scss预处理器
### 安装
```
pnpm add dart-sass
pnpm add sass
```
### 配置全局 scss 
在`src/assets`下新增`style`文件夹，用来存放全局样式文件
新建`main.scss`,设置一个变量
```
$test-color: red;
```
配置`vite.config.ts`
```
css:{
  preprocessorOptions:{
    scss:{
      additionalData:'@import "./src/assets/style/main.scss";'
    }
  }
},
这样就可以全局使用scss中定义的变量了
```
组件中使用
```
.test{
  color: $test-color;
}
```

## 路由
> [官方文档](https://router.vuejs.org/zh/introduction.html)
```
# 安装路由
pnpm add vue-router
```
> src/router/index.ts，没有的话就创建
```ts
router.ts内容： 
import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
const routes : Array <RouteRecordRaw> = [
    {
        path: '/a',
        name: 'home',
        component:()=>import('../views/teacher/index.vue'),
    }
]

const router = createRouter({
    history: createWebHashHistory(), //哈希值模式
    routes
})

export default router
```
> 修改入口文件main.ts
```ts
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";

const app = createApp(App);

app.use(router);
app.mount("#app");

```
> 在app.vue中更改
```vue
<template>
  <!-- 放置路由容器 -->
  <router-view></router-view>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <div>
    <router-link to="/">Go to Home</router-link>
    <br/>
    <router-link to="/about">Go to About</router-link>
  </div>
</template>
```

## 统一请求封装
### 安装axios
```
# 安装 axios
pnpm add axios
# 安装 nprogress 用于请求 loading
# 也可以根据项目需求自定义其它 loading
pnpm add nprogress
# 类型声明，或者添加一个包含 `declare module 'nprogress'
pnpm add @types/nprogress
```
### 编写目录文件

```

```

