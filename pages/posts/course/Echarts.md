---
title: Echarts配置项
date: 2022-6-22 12:00:55
updated: 2023-8-10 13:21:06
tags:
  - 教程
categories:
  - 教程
# type: yuque
# url:
---

## 部分配置项
```js
// 顶部图例
legend: {
	top: 22,	// 同css定位top
    right: 24,  // 同css定位right
    itemGap: 20, // 图例每项之间的间隔
    itemWidth: 15,	// 顶部图标示例图像宽
    itemHeight: 15,	// 顶部图标示例图像高
    data: ["办结", "受理"],	 // 图例子显示顺序，填写series中的name名,不设置默认按顺序来
    orient: "horizontal",    //图例列表的布局朝向，可选值vertical（竖）、horizontal（横）
    x: "center",             //方位，可直接选left、center、bottom
    y: "bottom",			 //方位，可直接选top、center、bottom
    padding: [0, 0, 20, 0],  //设置padding
    // textStyle，设置文本样式，放最外层可作为全局文本样式，详细见文档
    textStyle: {
    	color: "rgba(0,0,0,0.87)",
    },
},
    
// 建议查看文档  https://echarts.apache.org/zh/option.html#%2Fsearch%2Fgrid
grid: {
    left: "3%", // 组件离容器左侧的距离，还有top、bottom、right
    show: false,	//是否显示直角坐标系网格。
    containLabel: true,	 //区域是否包含坐标轴的刻度标签
},
    
// 鼠标移入提示框（自定义写法）
* 可以设置在全局，即 tooltip
* 可以设置在坐标系中，即 grid.tooltip、polar.tooltip、single.tooltip
* 可以设置在系列中，即 series.tooltip
* 可以设置在系列的每个数据项中，即 series.data.tooltip
tooltip: {
    formatter: function (params: any) {
      //定义数据前的圆点
      let dotHtml1 = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color: ${params.color}"></span>`;
      return `案件类型：<br />${dotHtml1} ${params.name}：${params.value}（件），占比：
      `;
    },
},
// X轴
// https://blog.csdn.net/hhf235678/article/details/79899464
xAxis: {
    // 防止x轴数据太多会隐藏
    axisLabel: {  
        interval:0,  
        rotate:-20  
    },
    inverse: true,	 //倒序
}
yAxis: {
    // 自定义数值
     axisLabel: {
      formatter: function (value: any) {
        console.log(value);
        return value + " °C";
      },
    },
}

//  点击图表触发事件
this.myChart.on("click", function (param) {
  console.log('点击了图表');
});
```

### 饼图

```js
// 设置radius: ['40%', '70%']为数组形式,可为圆角环形图 
series: [
    {
        radius: '50%',
        minAngle: 20, //最小角度
        startAngle: 70, //起始角度
        // label也可以使用自定义，用法同上面的tooltip
        /* label: {
          formatter: function(params) {
            return (
              params.name +
              "：" +
              ((params.value / 420) * 100).toFixed(2) +
              "%"
            );
          },
        }, */
        // emphasis高亮状态的扇区和标签样式
        emphasis: {
            disabled: false,	// 鼠标移入是否高亮显示，true为禁用（在图形非常多的时候可以关闭以提升交互流畅性）
            scale: true,	// 是否开启扇贝放大
            scaleSize: 10,
            // 指示
            label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
            }
        },
    },
],
```

### 柱状图

```js
series: [
    {
        name: "受理",
        barWidth: '45%',   // 柱子宽度
    	type: "bar"
        stack: "办理情况",	// 设置相同stack可使柱状图堆叠
    },
    {
        name: "办结",
        type: "bar",
        stack: "办理情况",
    },
],
```

### 折线图/面积图

```js

series: [
    {
        type: "line",
        areaStyle: {},    // 设置 areaStyle 后可以绘制面积图
        smooth: true,	// 线条变为曲线
        symbol: 'circle', // 拐点类型，也可改变顶部图例的图案，详细见文档
        symbolSize: 0, // 拐点圆的大小，为0取消园
        // itemStyle 分隔区域的样式设置。
        itemStyle: {
            normal: {
                color: '#289df5', // 折线条的颜色
                borderColor: '#289df5', // 拐点边框颜色
                areaStyle: {
                    type: 'default',
                    opacity: 0.1	// 改变
                }
            }
        },
    },
],
// 同柱状图，设置stack可开启堆叠
```

### 漏斗图

```js
option = {
  series: [
    {
      name: 'Funnel',
      type: 'funnel',
      left: '10%',
      top: 60,
      bottom: 60,
      width: '80%',
      min: 0, 
      max: 100,
      minSize: '0%',  // 配置最小形状
      maxSize: '100%',
      sort: 'descending',	// 数据排序，可以取 'ascending'，'descending'，'none'
      gap: 2,				//数据图形之间的间隔
      label: {
        show: true,
        position: 'inside'
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: 'solid'
        }
      },
    }
  ]
};
```

### 组件封装
> 代码部分
```js
<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <div>
        <span>{{ title }}</span>
        <div>
          <slot name="title"></slot>
        </div>
      </div>
    </div>
    <div style="height: 100%">
      <slot name="content" :UUid="UUid">
        <div style="height: 100%" :id="UUid"></div>
      </slot>
    </div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'asdas',
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    option: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  watch: {
    option() {
      this.myChart.setOption(this.option)
    },
  },
  data() {
    return {
      UUid: '',
      myChart: '',
    }
  },
  mounted() {
    this.UUid = this._uid
    const that = this
    this.$nextTick(() => {
      that.initEcharts()
    })
  },
  methods: {
    async initEcharts() {
      if (this.option!={}) { 
        this.myChart = echarts.init(document.getElementById(this.UUid))
        this.myChart.setOption(this.option)
        window.addEventListener('resize', () => {
          this.myChart.resize()
        })
      }
    },
  },
}
</script>
```

```vue
// 引入使用
<chart-data title="图表1" :option="GetOption('EchartsOne', data.sujv)">
</chart-data>

参数  title  String     标题
      option function   函数
```
![图表1](https://s1.ax1x.com/2022/10/24/x2WYM4.png)
```
// 自定义添加内容 示例
<chart-data title="图表1" :option="GetOption('EchartsOne', data.sujv)">
  <template v-slot:content="{ UUid }">
    <div>
      <div style="color: red">这里是自己定义的标题,位置样式都可以自己调</div>
      <div>
        <!-- 这个是图表 -->
        <div style="height: 250px;" :id="UUid"></div>
      </div>
    </div>
  </template>
</chart-data>
```
![图表2](https://s1.ax1x.com/2022/10/24/x2WNL9.png)


```js
// type 相当于图表名  data 传入的参数
// 示例没有用到传入的参数，拿后台参数用时自己做处理
GetOption(type, data) {
let option;
if (type == "EchartsOne") {
  option = {
    xAxis: {
      type: "category",
      data: [
        "妇联",
        "公安",
        "民政",
        "教育",
        "检察院",
        "司法",
        "法院",
        "其他",
      ],
    },
    yAxis: {
      type: "value",
    },
    tooltip: {},
    legend: {
      itemWidth: 15,
      itemHeight: 15,
      data: ["办结", "受理"],
    },
    series: [
      {
        name: "受理",
        // realtimeSort: true,
        data: [160, 155, 90, 48, 30, 50, 70, 45],
        type: "bar",
        stack: "办理情况",
        itemStyle: {
          color: "#4ECB73",
        },
      },
      {
        name: "办结",
        data: [50, 30, 40, 54, 42, 70, 80, 60],
        type: "bar",
        stack: "办理情况",
        itemStyle: {
          color: "#3AA0FF",
        },
      },
    ],
  };
}
return option;
},
```



```tsx
<template>
  <div
    style="height: 100%; width: 100%; position: relative"
    v-resize="resizeOf"
  >
    <!-- <n-card  style="height: 100%;width: 100%;"> -->
    <slot name="content" :Uid="Uid"> </slot>
    <!-- </n-card> -->
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { debounce } from "@/utils/utils";

let Echarts: any;
const props = defineProps({
  options: {
    type: Object,
    default: {},
  },
  Uid: {
    type: String,
    default: "",
  },
});

const { options } = toRefs(props);

nextTick(() => {
  initChart();
});
watch(
  () => options.value,
  (value, oldvalue) => {
    Echarts.setOption(value);
  },
  { deep: true }
);

// 基础配置一下Echarts
function initChart() {
  Echarts = echarts.init(document.getElementById(props.Uid)!);
  // 把配置和数据放这里
  Echarts.setOption(options.value);
}

// 自定义指令监听宽高变化，来重置图表
const resizeOf = debounce(() => {
  Echarts.resize();
}, 0);

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
</script>

<style lang="scss" scoped></style>
```