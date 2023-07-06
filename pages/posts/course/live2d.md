---
title: Hexo少前live2d使用指南
date: 2022-6-2 12:00:55
updated: 2022-6-3 13:21:06
tags:
  - 教程
categories:
  - 教程
# type: yuque
# url: 
hide: index
---

#### 安装hexo-helper-live2d

> npm install --save hexo-helper-live2d



#### 下载模型

> [少前l2d模型下载地址](https://gitee.com/rao_she/live2d_models_collect)



#### 模型移入项目

*在根目录下新建`live2d_models\hk416`文件夹,将需要的模型复制到此处*

#### 配置_config.yml文件

```
live2d:
  enable: true # 是否开启live2d
  scriptFrom: local # 脚本从本地引入
  pluginRootPath: live2dw/ # 插件在站点上的根目录(相对路径)
  pluginJsPath: lib/ # 脚本文件相对与插件根目录路径
  pluginModelPath: assets/ # 模型文件相对与插件根目录路径
  tagMode: false # 标签模式, 是否仅替换 live2d tag标签而非插入到所有页面中
  debug: false # 调试, 是否在控制台输出日志
  model:
      use: hk416 # 填写放进live2d_models文件夹中的模型文件夹名字
      scale: 1 # canvas 模型与canvas的缩放
  display:
    position: right
    width: 250
    height: 400
  mobile:
    show: true #移动端是否显示
  react:
    opacity: 2
```

> *待补充cdn优化加载*