---
title: 练习补充笔记
date: 2022-6-14 12:00:55
updated: 2023-2-10 13:21:06
tags:
  - 笔记
categories:
  - 笔记
hide: true
---

## VUE3

> defineProps 获取组件传值

```

```

> defineEmits 子组件向父组件事件传递

- 子组件

```
  // 子组件中
  const emit = defineEmits(['menuSelect'])

  function routerLiveTO(data: any, index: number) {
      emit('menuSelect', data.name)
  }
```

- 父组件

```
 <Breadcrumb  @menuSelect="menuSelect" />

 function menuSelect(data: string) {
   selectedKeyRef.value = data
   menuInstRef.value?.showOption(data)
 }
```

> defineExpose 组件暴露自己的属性

## 扁平数组转树状结构

```js
// 需处理数组
let arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
];

// 函数
function arrayToTree(items: any) {
  // 存放结果集
  const result: any = [];

  // 先转成map整体存储
  const itemMap: any = {};
  for (const item of items) {
    itemMap[item.id] = { ...item, children: [] };
  }

  // 第二次循环
  for (const item of items) {
    // （重要）每次循环重新赋一遍值，下面判断以这些重新定义的值来做处理

    const id = item.id; // 当前对象对应的id
    const pid = item.pid; // 当前对象对应的层级
    const treeItem = itemMap[id]; // 当前对象(第一层的循环加上了children)

    if (pid === 0) {
      // 最顶级直接加入最终返回值里
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        };
      }
      // 这里的pid每次对应的层级会重新赋为当前的pid值
      // 也就是将当前循环的对象放入对应的层级  children 里
      // 比如循环到部门3时，当前pid为1， 指向itemMap[1] 也就是 部门1的 children 里，直接放入数组末尾
      itemMap[pid].children.push(treeItem);
    }
  }
  return result;
}
```

## 根据数组的一个属性分为对应数组

```
const groupedArr = ref([])
arr.forEach((item: any) => {
  if (groupedArr.value[item.gzbh]) {
    groupedArr.value[item.gzbh].push(item);
  } else {
    groupedArr.value[item.gzbh] = [item];
  }
});
```

## 根据对象属性去重

```
function queChong(arr: any[]) {
  const res = <any[]>[]
  arr.forEach(item => {
    if (typeof item === 'object' && item !== null) {
      const tmp = res.filter(i => JSON.stringify(i.deptId) === JSON.stringify(item.deptId));
      console.log(tmp);
      if (tmp.length === 0) {
        res.push(item)
      }
    }
  })
  return res;
}
```

## pinia

> 使用 storeToRefs 可以保证解构出来的数据也是响应式的

```
<script setup>
import { storeToRefs } from 'pinia'
import useCounterStore from './store/counter'

const counter = useCounterStore()
// 如果直接从pinia中解构数据，会丢失响应式
const { count, double } = counter

// 使用storeToRefs可以保证解构出来的数据也是响应式的
const { count, double } = storeToRefs(counter)

</script>
```

## vuex

```js
用watch监听state值的变化时可以用computed将state中的变量接收 方便模板中使用
computed: {
	timeTotal() {
		return this.$store.state.timeDuration;
	}
},
```

## 自定义指令

```ts
// 监听绑定元素的宽高变化
// vue3写法：
const vResize = {
  beforeMount(el: any, binding: any) {
    // el为绑定的元素，binding为绑定给指令的对象
    let width = "",
      height = "";
    function isReize() {
      const style = document.defaultView!.getComputedStyle(el);
      if (width !== style.width || height !== style.height) {
        binding.value(); // 关键
      }
      width = style.width;
      height = style.height;
    }
    // el.__vueSetInterval__ = setInterval(isReize, 300);
    el.__vueSetInterval__ = setInterval(isReize);
  },
  unmounted(el: any) {
    clearInterval(el.__vueSetInterval__);
  },
};
```

## 获取 openID

```js
<script>
    uni.login({
        success: res => {
            //code值(5分钟失效)
            console.info(res.code);
            //小程序appid
            let appid = 'wx3599fe368a452c9';
            //小程序secret
            let secret = '';
            //wx接口路径
            let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code';
            uni.request({
                url: url, // 请求路径
                method: 'GET', //请求方式
                success: result => {
                    //响应成功
                    //这里就获取到了openid了
                    console.info(result.data.openid);
                    uni.setStorage({
                        key:'user',
                        data: result.data.openid
                    })
                },
                fail: err => {} //失败
            });
        }
    });
</script>
```

## 发送小程序订阅消息

```vue
<script>
var test = {
  touser: ac_user, // openID
  template_id: template_id, // 订阅模板ID
  // 模板内容
  data: {
    thing13: { value: "张三" },
    number16: { value: "5" },
  },
};

uni
  .request({
    method: "get",
    // 获取access_token
    url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,
    dataType: "json",
    timeout: 30000,
  })
  .then((res) => {
    let [err, success] = res;
    if (success.statusCode == 200) {
      wx.request({
        // 发送模板消息
        url:
          "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=" +
          success.data.access_token,
        method: "post",
        data: JSON.stringify(test),
        success: function (res) {
          console.log("订阅成功");
          console.log(res);
        },
        fail: function (res) {
          console.log("订阅失败");
        },
      });
    }
  });
</script>
```

## 解决前端做 excel 下载的文件打不开

- 常用的 excel 对应得 mine-type 类型：
- 1.  "application/vnd.ms-excel"
- 2.  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

```
A："application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"方案
1、查看浏览器请求中content-type使用的是哪种mine-type
2、需要在请求参数中设置 responseType: 'arraybuffer'
3、
  const link = document.createElement("a");
  let blob = new Blob([res.data], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  var fileName = "名称.xlsx";
  link.style.display = "none";
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

B: content-type: "application/vnd.ms-excel" 的方案
  const link = document.createElement("a");
  let blob = new Blow([res.data], { type: 'application/vand.ms-excel' });
  var fileName = "名称.xlsx";
  link.style.display = "none";
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
```

## addEventListener

![addEventListener](https://s1.ax1x.com/2022/11/11/z9xVGd.png)

```
// 这个storage事件，可以多个同源页面，一个修改storage的值，其它的同源页面就会触发这个事件
window.addEventListener("storage", function (e) {
   console.log(e)
   console.log(e.newValue)
});
```

## 排序

```js
let arr = [
  {
    age: 1,
    name: "一",
  },
  {
    age: 3,
    name: "三",
  },
  {
    age: 2,
    name: "二",
  },
  {
    age: 5,
    name: "五",
  },
  {
    age: 4,
    name: "四",
  },
];

console.log(
  arr.sort((a, b) => {
    return a.age - b.age; //小到大
  })
);
```
