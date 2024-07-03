---
title: Vite项目搭建
date: 2022-11-03
updated: 2023-11-03
tags:
  - 教程
categories:
  - 教程
# type: yuque
# url:
---

## 创建脚手架

建议使用 pnpm 搭建项目雏形

> pnpm create vite

## 目录结构

```
// 记得先把文件夹创建好哦,后面跟着步骤创建也可以
├── pubilc
└── src
    ├── api                       // 接口请求
    ├── assets                    // 静态资源
    ├── common                    // 通用类库
    ├── components                // 公共组件
    ├── router                    // 路由配置
    ├── store                     // 状态管理
    ├── style                     // 通用样式
    ├── utils                     // 工具函数
    ├── views                     // 页面组件
    ├── App.vue
    ├── main.ts
    ├── style.css
├── index.html
├── package.json
├── README.md
├── tsconfig.json                 // TypeScript 配置文件
└── vite.config.ts                // Vite 配置文件
```

## 配置@路径

> [掘金文章](https://juejin.cn/post/7006213924588617735)

- ts 环境无法正确识别 node 相关的包的类型声明，需要先配置 node 的 types 依赖
  > pnpm add @types/node -D
- vite.config.ts 配置

```ts
import { resolve } from "path";

defineConfig({
  // ...

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // 路径别名
    },
    extensions: [".js", ".json", ".ts"], // 使用路径别名时想要省略的后缀名，可以自己 增减
  },

  // ...
});
```

> 别名一般都是配置的文件目录，所以 key 和 value 都需要加上后缀 /\*

- tsconfig.json 配置

```json
"compilerOptions" : {
    // ...

    "baseUrl": ".", // 用于设置解析非相对模块名称的基本目录，相对模块不会受到baseUrl的影响
    "paths": { // 用于设置模块名到基于baseUrl的路径映射
        "@/*": ["src/*"]
    }

    // ...
}
```

## 配置服务器和代理配置

> [官方文档](https://cn.vitejs.dev/config/server-options.html)

- vite.config.ts 配置

```js
defineConfig({
  // ...
    server: {
      // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
      // 默认为 'localhost'，即仅能本机访问
      host: "0.0.0.0",
      // 启动端口
      port: 3422,
      // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
      strictPort: false,
      // HMR 连接配置（用于 HMR websocket 必须使用不同的 http 服务器地址的情况，或者禁用 hmr 模块），一般省略
      hmr: {
        host: "127.0.0.1",
        port: 8080,
      },
      // 配置启动时是否自动打开网页，是字符串时表示打开某个特定路径
      open: false,
      // 自定义代理规则，用来配合后端服务进行接口调用等。
      // 默认使用 [http-proxy](https://github.com/http-party/node-http-proxy) 模块，完整配置见官方仓库
      proxy: {
        "/api": {
          // 这是本地网易云api服务开启的地址,方便后续使用网易云api
          // 怎么使用网易云api这里略过,可自己根据文档开启https://github.com/w4ctech/NeteaseCloudMusicApi
          target: "http://localhost:3000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  // ...
});
```

- eslint 、 prettier
  > 目前跳过此部分

## 配置 router

> 安装 pnpm add vue-router [官方文档](https://router.vuejs.org/zh/guide/)

```js
// 创建 src/router/index.ts 文件
// 没有的文件自己按照目录创建
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: "/",
    name: "Index",
    meta: {
      title: "首页",
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import("@/views/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
```

```js
// 挂在main.ts
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@/router";

const app = createApp(App);

app.use(router);

app.mount("#app");
```

```vue
// App.vue
<template>
  <!-- 放置路由容器 -->
  <RouterView />
  <button @click="lickLogin">跳到登陆页面</button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function lickLogin() {
  router.push("/login");
}
</script>

<style scoped></style>
```

## 配置 pinia 状态管理

> 安装 pnpm add pinia [大菠萝官方文档](https://pinia.web3doc.top/introduction.html)
> 安装 pnpm add pinia-plugin-persistedstate   持久化pinia  [使用方法](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/)

- store 文件夹下新建 index.ts 和 user.ts

  ```js
  // index.ts
  import { createPinia } from "pinia";

  const store = createPinia();

  export default store;

  // user.ts
  import { defineStore } from "pinia";

  export const useUserStore = defineStore("user", {
    state: (): StateTs => {
      return {
        name: "Hello Pinia",
      };
    },
    actions: {
      updateName(name: string | number) {
        this.name = name;
      },
    },
  });

  interface StateTs {
    name: string | number;
  }
  ```

- main.ts 引入

  ```js
    import { createApp } from "vue";
    import { createPinia } from "pinia";
    import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
    import "./style.css";
    import App from "./App.vue";
    import router from "@/router";

    const app = createApp(App);
    const pinia = createPinia();
    pinia.use(piniaPluginPersistedstate);

    app.use(router).use(pinia);
    app.mount("#app");
  ```

- 页面使用

  ```vue
  // views/index.vue 下面
  <template>
    <div>
      <h1 class="test">首页index</h1>
      <h2>Store： {{ userStore.name }}</h2>
    </div>
  </template>

  <script setup lang="ts">
  import { useUserStore } from "@/store/user";

  const userStore = useUserStore();
  console.log(userStore.name);
  </script>

  <style scoped lang="scss">
  .test {
    color: $test-color;
  }
  </style>
  ```

## 配置 scss 预处理器

- 安装

```
pnpm add sass
```

- 配置全局 scss

在`style`下新增`main.scss`文件夹，用来存放全局样式文件

```
// main.scss 设置一个全局变量
$test-color: red;
```

- 配置`vite.config.ts`

```
css:{
  preprocessorOptions:{
    scss:{
      additionalData: '@import "@/style/main.scss";',
    }
  }
},
这样就可以全局使用scss中定义的变量了
```

- 组件中使用

```
// 不用引入直接使用即可
.test{
  color: $test-color;
}
```

## 配置自动引入插件

> 安装 pnpm add unplugin-auto-import [掘金文章](https://juejin.cn/post/7050668133404639268)

```json
// vite.config.js
import AutoImport from "unplugin-auto-import/vite"
...
plugins: [
    [vue()],  // 网上配置都没有留下这个，但是我不加上会报错
    AutoImport({
        // 自动导入vue、vue-router、pinia相关函数
        imports: ["vue", "vue-router", "pinia"],
        dts: "src/auto-import.d.ts", // 生成 `auto-import.d.ts` 全局声明
    }),
...
],
```

## 配置 axios 拦截器

> 安装 pnpm add axios [官方文档](https://www.axios-http.cn/docs/intro)

- api 文件夹下新建 index.ts

  ```ts
  // 没有封装,只是方便配置拦截器
  // 还没有写状态码对于提示，因为咱的后端没整什么规范（我也是）,后续有需要自己跳转，这里啥也没配置
  import axios from "axios";

  const AxiosToken = axios.create({
    // baseURL 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 这里的'/api'是为了代理，要和vite.config.ts里的proxy保持一致
    baseURL: "/api",
    // 指定请求超时的毫秒数。
    timeout: 10000,
    // 自定义请求头
    headers: { "X-Requested-With": "XMLHttpRequest" },
  });

  // 添加请求拦截器
  AxiosToken.interceptors.request.use(
    (config) => {
      // 在发送请求之前做些什么
      return config;
    },
    (error) => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  AxiosToken.interceptors.response.use(
    (response) => {
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么
      console.log("响应码：", response.status, "响应成功");
      return response;
    },
    (error) => {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      console.log(error);

      return Promise.reject(error);
    }
  );

  export default AxiosToken;
  ```

- 请求文件

  我这里新建了 test 文件夹来准备放登陆和主页的请求，可按自己习惯来

  ```js
  // api/test/login.ts

  import AxiosToken from "../index";

  const { request } = AxiosToken;
  let remoteUrl = "";

  interface LoginAki {
    /**手机 */
    phone: string;
    /**密码 */
    password: string;
  }
  // 这里我是前面配置了自动引入pinia，要是报错记得检查一下
  export const userAkiStore = defineStore("userAki", () => {
    //网易云api登陆接口
    async function userLogin(params: LoginAki) {
      return await request({
        url: remoteUrl + "/login/cellphone",
        method: "get",
        params: params,
      });
    }
    return { userLogin };
  });
  ```

- 使用请求

  ```vue
  // login.vue

  <template>
    <div v-if="userData">
      <img
        :src="userData.avatarUrl"
        style="width: 100px;height: 100px;border-radius: 50%;"
      />
      <h1 class="test">{{ userData.nickname }}</h1>
      <div>{{ userData.signature }}</div>
    </div>
    <div>
      <input v-model="loginForm.phone" />
      <input v-model="loginForm.password" type="password" />
    </div>

    <button @click="Login">登录</button>
  </template>

  <script setup lang="ts">
  import { userAkiStore } from "@/api/test/login";
  const loginForm = reactive({
    phone: "",
    password: "",
  });

  const StoreLing = userAkiStore();
  const userData = ref();

  async function GetDateShang(data: LoginAki) {
    return await StoreLing.userLogin(data)
      .then((res) => {
        userData.value = res.data.profile;
      })
      .then((err) => {
        return err;
      });
  }
  function Login() {
    GetDateShang(loginForm);
  }

  interface LoginAki {
    /**手机 */
    phone: string;
    /**密码 */
    password: string;
  }
  </script>
  ```

## 配置组件库

Naive UI

> 安装 pnpm add @douyinfe/semi-ui [文档]([Naive UI: 一个 Vue 3 组件库](https://www.naiveui.com/zh-CN/light))

- 配置按需引入 （使用前面配置过的 unplugin-auto-import，还需要安装 unplugin-vue-components）

  > 安装 pnpm add unplugin-vue-components

  ```json
  import Components from "unplugin-vue-components/vite";
  import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

  plugins: [
    ......
      AutoImport({
          imports: [
              "vue",
              "vue-router",
              "pinia",
              {
                  "naive-ui": [
                      "useDialog",
                      "useMessage",
                      "useNotification",
                      "useLoadingBar",
                  ],
              },
          ], // 自动导入vue、vue-router、pinia相关函数
          dts: "src/auto-import.d.ts", // 生成 `auto-import.d.ts` 全局声明
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      }),
    ......
  ]
  ```

---

## 使用 svg 图标

> 安装 pnpm add naive-ui -D [掘金文章](https://juejin.cn/post/7094060278475653128)

- 配置 vite.config.ts

```json
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

plugins: [
   ...
     createSvgIconsPlugin({
         // 指定需要缓存的图标文件夹
         iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
         // 指定symbolId格式
         symbolId: "icon-[dir]-[name]",
     }),
   ...
 ],
```

- 封装 SvgIcon 组件

```vue
// src/components/SvgIcon

<template>
  <svg aria-hidden="true">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "SvgIcon",
  props: {
    prefix: {
      type: String,
      default: "icon",
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#333",
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);
    return { symbolId };
  },
});
</script>
```

- 配置 main.ts

```ts
import "virtual:svg-icons-register"; // 新增
import SvgIcon from "@/components/SvgIcon.vue"; // 新增

app.component("svg-icon", SvgIcon); // 新增
```

- 页面中使用

  ```vue
  <template>
    <div>
      <SvgIcon name="genshin" style="width: 50px; height: 50px" />
    </div>
  </template>
  <script setup lang="ts">
  import SvgIcon from "@/components/SvgIcon.vue";
  </script>
  ```

## 配置 xicons 自动引入

> 安装 pnpm add -D unplugin-icons [掘金文章](https://juejin.cn/post/7095460309673967646) [图标库](https://icones.js.org/)

```json
// 搭配前面unplugin-vue-components一起使用

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
plugins: [
 ......
  Components({
    resolvers: [
      NaiveUiResolver(),
      // 新增的
      IconsResolver({
        prefix: 'icon', // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
        // {prefix}-{collection}-{icon} 使用组件解析器时，您必须遵循名称转换才能正确推断图标。
        // alias: { park: 'icon-park' } 集合的别名
        enabledCollections: ['ep'] // 这是可选的，默认启用 Iconify 支持的所有集合['mdi']
      }),
    ],
  }),
  Icons({
    // scale: 1, // 缩放
    compiler: 'vue3', // 编译方式
    // defaultClass: '', // 默认类名
    // defaultStyle: '', // 默认样式
    autoInstall: true
    // jsx: 'react' // jsx支持
  }),
 ......
]
```

- 使用

  ```vue
  去官网复制图标name 不需要下载图标库，系统会自动按需下载。
  <IconEpFold class="v-icon" />

  .v-icon { display: inline-block; width: 1em; height: 1em; font-size: 1em; }
  ```

## 配置半自动化路由

> 自己水平垃圾了，写完后也不太好整理。
>
> 我的仓库地址放这里，可以直接参考还方便一点 [仓库地址](https://github.com/AkiSeele/aki-viteTem)

- 文件夹格式

  - 路由文件夹
  - ![路由](https://s1.ax1x.com/2022/11/04/xqjfe0.png)
  - layout 文件夹
  - ![layout](https://s1.ax1x.com/2022/12/19/zqIVdx.png)

- 效果图

  - ![首页](https://s1.ax1x.com/2022/12/19/zqISiT.png)

- 主题颜色修改

> 因为使用的是 Naive UI 修改主题挺方便的，官方也有详细的教程 [官方文档](https://www.naiveui.com/zh-CN/os-theme/docs/customize-theme#调整主题变量)

```vue
// App.vue

<template>
  <!-- 放置路由容器 -->
  <div id="app">
    <n-config-provider :theme-overrides="themeOverrides">
      <RouterView />
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import { NConfigProvider, GlobalThemeOverrides } from "naive-ui";

const themeOverrides: GlobalThemeOverrides = {
  // 这里设置你想要的颜色就可以啦
  // 具体可使用变量请参考 GlobalThemeOverrides 类型提示。
  common: {
    primaryColor: "#5593F9",
  },
  Button: {
    textColor: "#5593F9",
  },
};
</script>

<style scoped></style>
```

> 一些小问题
>
> Naive 的菜单组件，为了方便自动实现，我就关了路由的类型校验 RouteRecordRaw（谁来教教我 ts 啊）
