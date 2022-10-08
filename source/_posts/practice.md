---
title: 练习补充笔记
tags:
  - 笔记
categories:
  - 笔记
---
## vuex

```js
用watch监听state值的变化时可以用computed将state中的变量接收 方便模板中使用
computed: {
	timeTotal() {
		return this.$store.state.timeDuration;
	}
},
```



## 排序

```js
let arr = [
    {
        age:1,
        name:'一'
    },
    {
        age:3,
        name:'三'
    },
    {
        age:2,
        name:'二'
    },
    {
        age:5,
        name:'五'
    },
    {
        age:4,
        name:'四'
    },
]

console.log(arr.sort((a,b)=>{
    return a.age-b.age//小到大
}))
```

## 获取openID

```vue
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
        touser: ac_user,	// openID
        template_id: template_id,	// 订阅模板ID
        // 模板内容
        data: {
            thing13: { value: '张三' },
            number16: { value: '5' }
        }
    };

    uni.request({
        method: 'get',
        // 获取access_token
        url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,
        dataType: 'json',
        timeout: 30000
    }).then(res => {
        let [err, success] = res;
        if (success.statusCode == 200) {
            wx.request({
                // 发送模板消息
                url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + success.data.access_token,
                method: 'post',
                data: JSON.stringify(test),
                success: function(res) {
                    console.log('订阅成功');
                    console.log(res);
                },
                fail: function(res) {
                    console.log('订阅失败');
                }
            });
        }
    });
</script>
```