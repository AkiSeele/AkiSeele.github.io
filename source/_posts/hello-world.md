---
title: uniapp笔记
tags:
  - 笔记
categories:
  - 笔记
---
## 一、路由跳转

### （1）`navigator`	组件跳转

当`open-type="navigate"`时，会打开新页面	(不设置`open-type`默认为`navigate`)

用`navigator`跳转，在跳转后的页面可以用`navigateBack`自定义返回操作

当`open-type="redirect"`时，会进行页面重定向（不会进入历史记录。不支持页面返回）

想要进行Tab切换可以使用`switchTab`

当`open-type="reLaunch"`时，会进行重加载，页面全部出栈，只留下新页面

```vue
// 跳转
<navigator 
        open-type="navigate" 
        url="/pages/news/index" 
   		hover-class="navigator-hover"  // 点击后的样式
>
    <view>
        测试跳转
    </view>
</navigator>

// 返回
<navigator open-type="navigateBack">
    <button >
        放你回去
    </button>
</navigator>

```

### （2）`Api`路由跳转

使用`uni.navigateTo()`方法跳转页面，可以保留当前页面，跳转到应用的某个页面。类似于`this.$router.push()`

使用`uni.refirectTo()`方法关闭当前页面，跳转到应用的某个页面。类似于`this.$router.replace()`

使用`uni.navigateBack()`可以返回到原页面，类似于`this.$router.go(-1)` ，其中`dalta`参数表示返回的页面数，如果`dalta`大于现有页面数则返回首页

想要进行Tab切换可以使用`uni.switchTab()`

使用`uni.reLaunch()`时，可以关闭所有页面，接着跳转到应用内的某个页面

### （3）接收参数

`uniapp`是在`onLoad()`钩子函数中接收参数

`url`是有长度限制的，太长的字符串会传递失败，这可以使用`encodeURIComponent()`解决 （接收参数使用`decodeURIComponent()`解码）

使用`getCurrentPages()`获取页面栈

```vue
<button @click="urlPush">
    过去吧
</button>
<script>
	export default {
		name: 'index',
		methods: {
			urlPush() {
				uni.navigateTo({
					url: "/pages/news/news?id=1&title=测试&name=" + encodeURIComponent('我要进行测试拉') + ""
				})
			}
		}
	}
</script>


// 跳转后的页面
<script>
	export default {
		name: 'index',
		methods: {
			urlPush() {
				uni.navigateBack()
			}
		},
		onLoad(parems) {
			console.log(parems.id);		// 1
			console.log(parems.title); // 测试
			console.log(decodeURIComponent(parems.name)); //	我要进行测试拉
			let pages = getCurrentPages()
			console.log(pages[1].route);	// pages/index/two
            //获取当前页面
            console.log(pages[pages.length - 1].route);
		}
		
	}
</script>

```

`tabBar`是不能传参的，可以通过本地缓存`uni.setStorageSync`来实现传参，`uni.getStorageSync`取



```vue
<template>
	<div class="ddd">
		<div @click="urlPush('/pages/news/index', 1)">跳到测试页面传1</div>
		<div @click="urlPush('/pages/news/index', 2)">跳到测试页面传2</div>
		<div @click="urlPush('/pages/news/index', 3)">跳到测试页面传3</div>
	</div>
</template>
<script>
export default {
    methods: {
        urlPush(url, id) {
            uni.setStorageSync('show_id', id);
            uni.navigateTo({
                url: url
            });
        }
    },
};
</script>


// 跳转页面
<script>
export default {
	onLoad(parems) {
		let barUrlStorg = uni.getStorageSync('show_id');
		console.log(barUrlStorg);
	}
};
</script>
```



## 二、判断运行环境及平台

### （1）判断环境

```js
if (process.env.NODE_ENV === 'development') {
    console.log('开发环境');
}
if (process.env.NODE_ENV === 'production') {
    console.log('生产环境');
}
```

在`static/js/conf/config.js`中 定义开发环境与生产环境的接口，并引入`mian.js`中挂载到`Vue`原型属性`$config`上

```js
let baseApi = process.env.NODE_ENV === 'development' ? "http://4399.com" : "http://192.168.2.69:8001"
export default {
	baseApi: baseApi
}


// mian.js
import config from "./static/js/conf/config"
Vue.prototype.$config = config
```

### （2）判断平台

`uni.getSystemInfoSync().platform`可以判断客户端环境是`Android、IOS还是devtools（小程序开发者工具）`

