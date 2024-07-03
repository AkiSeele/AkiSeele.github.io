---
title: 命名习惯规则
date: 2023-7-6 16:00:55
updated: 2023-7-6 16:21:06
tags:
  - 笔记
categories:
  - 笔记
---

### 方法名

> 初始化 `AkiGive()`
>
> 表单提交 `onSubmit()`
>
> 新增 `addFunc()`
>
> 删除 `deleteFunc()`
>
> 编辑 `editFunc()`
>
> 重置 `Rewrite()`
>
> 导出 `onExport`
>
> 组件函数 `on + 组件Props名()`
>
> 工具类 `含义 + Utils()`

### 文件名

> 组件命名 `含义（驼峰）+ Aki.vue`
>
> 页面命名 `含义（驼峰，每个单词省略形式，不超过6位）`
>
> 路由命名
>
> > path: `/同文件名` 
> >
> > name: `/同文件名(首字母大写)`

### 类名

> `css` 类命名 层级间以_链接，小写 `含义_含义_含义`
>
> 最多拼接 3 个，超过以-重新拼接 `含义-含义-含义`

### 含义参考

- 布局

```
头部    header(hd)
主体    body
尾部    footer(ft)
内容    main
侧栏    side
容器    box
```

- 通用部件

```
列表    list
列表项  item
表格    table
表单    form
链接    link
标题    caption/heading/title
菜单    menu
集合    group
条      bar
内容    content
结果    result
```

- 组件

```
按钮        btn
字体        text
下拉菜单    dropdown
工具栏      toolbar
分页        page
缩略图      thumbnail
警告框      alert
进度条      progress
导航条      navbar
导航        nav
子导航      subnav
面包屑      breadcrumb(crumb)
标签        label
徽章        badge
巨幕        jumbotron
面板        panel
洼地        well
标签页      tab
提示框      tooltip
弹出框      popover
轮播图      carousel
手风琴      collapse
定位浮标    affix
```

- 状态

```
前一个    prev
后一个    next
当前的    current

显示的    show
隐藏的    hide
打开的    open
关闭的    close

选中的    selected
有效的    active
默认的    default
反转的    toggle

禁用的    disabled
危险的    danger
主要的    primary
成功的    success
提醒的    info
警告的    warning
出错的    error

大型的    lg
小型的    sm
超小的    xs
```
