import { defineSiteConfig } from "valaxy";

export default defineSiteConfig({
  url: "https://akiseele.top/",
  lang: "zh-CN",
  author: {
    name: "Aki Seele",
    avatar:
      "https://akiimage-1314209857.cos.ap-guangzhou.myqcloud.com/image/202307031757567.png",
    status: {
      emoji: "🥵",
      message: "我要摸鱼！",
    },
  },
  favicon:
    "https://akiimage-1314209857.cos.ap-guangzhou.myqcloud.com/image/202307031757567.png",
  title: "舰舰的奇妙见闻",
  subtitle: "纵使日薄西山，愿君相依为伴。",
  description: "",
  social: [
    {
      name: "GitHub",
      link: "https://github.com/AkiSeele",
      icon: "i-ri-github-line",
      color: "#6e5494",
    },
    {
      name: "哔哩哔哩",
      link: "https://space.bilibili.com/12087145",
      icon: "i-ri-bilibili-line",
      color: "#FF8EB3",
    },
    {
      name: "E-Mail",
      link: "mailto:a2371445972@outlook.com",
      icon: "i-ri-mail-line",
      color: "#8E71C1",
    },
    {
      name: "微博",
      link: "https://weibo.com/u/6162682416",
      icon: "i-ri-weibo-line",
      color: "#E6162D",
    },
    {
      name: "网易云音乐",
      link: "https://music.163.com/#/user/home?id=333109340",
      icon: "i-ri-netease-cloud-music-line",
      color: "#C20C0C",
    },
    /* {
      name: '知乎',
      link: 'https://www.zhihu.com/people/zong-shi-ri-bo-xi-shan',
      icon: 'i-ri-zhihu-line',
      color: '#0084FF',
    }, */
  ],

  search: {
    enable: true,
    // 设置类型为 Fuse
    type: "fuse",
  },
  mediumZoom: {
    enable: true,
  },
  sponsor: {
    enable: true,
    title: "我很穷，请给我钱（伸手）",
    description: "我很穷，请给我钱（伸手）",
    methods: [
      {
        name: "支付宝",
        url: "https://akiimage-1314209857.cos.ap-guangzhou.myqcloud.com/image/boke/202307040957426.jpg",
        color: "#00A3EE",
        icon: "ri:alipay-line",
      },
      {
        name: "QQ 支付",
        url: "https://akiimage-1314209857.cos.ap-guangzhou.myqcloud.com/image/boke/202307040957422.jpg",
        color: "#12B7F5",
        icon: "ri:qq-line",
      },
      {
        name: "微信支付",
        url: "https://akiimage-1314209857.cos.ap-guangzhou.myqcloud.com/image/boke/202307040957425.jpg",
        color: "#2DC100",
        icon: "ri:wechat-pay-line",
      },
    ],
  },
  license: {
    enabled: false,
  },
});
