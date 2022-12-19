import { defineConfig } from 'valaxy'
import type { ThemeConfig } from 'valaxy-theme-yun'
import { addonWaline } from 'valaxy-addon-waline'
// add icons what you will need
/**
 * User Config
 */
export default defineConfig<ThemeConfig>({
  lang: "zh-CN",
  title: "舰舰的奇妙见闻",
  author: {
    name: "AkiSeele",
  },
  description: "舰舰的奇妙见闻",
  url: "www.zsrbxs.xyz",
  social: [
    {
      name: "GitHub",
      link: "https://github.com/AkiSeele",
      icon: "i-ri-github-line",
      color: "#181717",
    },
    {
      name: "哔哩哔哩",
      link: "https://space.bilibili.com/12087145",
      icon: "i-ri-bilibili-line",
      color: "#FF8EB3",
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
      name: "Twitter",
      link: "",
      icon: "i-ri-twitter-line",
      color: "#1da1f2",
    }, */
    {
      name: "E-Mail",
      link: "mailto:a2371445972@outlook.com",
      icon: "i-ri-mail-line",
      color: "#8E71C1",
    },
  ],

  search: {
    enable: false,
  },

  theme: "yun",

  themeConfig: {
    banner: {
      enable: true,
      title: "舰舰的奇妙见闻",
    },

    pages: [
      {
        name: "小可爱们",
        url: "/girls/",
        icon: "fluent:animal-cat-28-filled",
        color: "dodgerblue",
      },
      {
        name: "留影册",
        url: "/albums/",
        icon: "material-symbols:all-inbox-sharp",
        color: "dodgerblue",
      },
    ],

    /* footer: {
      since: 2016,
      beian: {
        enable: true,
        icp: "苏ICP备17038157号",
      },
    }, */
  },
  sponsor: {
    enable: false,
    title: "我很穷，请给我钱！",
    methods: [
      {
        name: "支付宝",
        url: "",
        color: "#00A3EE",
        icon: "i-ri-alipay-line",
      },
      {
        name: "QQ 支付",
        url: "",
        color: "#12B7F5",
        icon: "i-ri-qq-line",
      },
      {
        name: "微信支付",
        url: "",
        color: "#2DC100",
        icon: "i-ri-wechat-pay-line",
      },
    ],
  },
  addons: [
    addonWaline({
      serverURL: "https://example.akibro.top",
    }),
  ],
  unocss: { safelist: ["i-ri-home-line"] },
});
