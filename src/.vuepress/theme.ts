import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";
export default hopeTheme({
  hostname: "https://github.com/xinyang424",

  author: {
    name: "XinYang's Blog",
    url: "https://xinyang424.com",
  },
  fullscreen: true,
  print: false,
  logo: "/logo.png",
  repo: "xinyang424/xinyang424.github.io",
  // docsDir: "src",

  blog: {
    medias: {
      GitHub: "https://github.com/xinyang424",
      BiliBili: "https://space.bilibili.com/409568858/favlist",
      QQ: "http://wpa.qq.com/msgrd?v=3&uin=2578417052&site=qq&menu=yes",
      Gmail: "mailto:xinyang424@gmail.com",
      Email:
        "https://wx.mail.qq.com/home/index?t=readmail_businesscard_midpage&nocheck=true&name=%E6%9D%A8%E6%96%B0&icon=https%3A%2F%2Fp.qlogo.cn%2Fqqmail_head%2FBkBjDTOZTuwDOcyvCy2I1B6zbGSkls5zqHIyibStOeqCDQia3zH2Nlgjdd3pibS09TD%2F160&mail=xinyang424%40qq.com&code=FwUG9hkLKs-dHLjnuWFlkk14SMS1VLiQ_XBJqksBPYpKOi6fWFNZbmUlTJGRZOMz10Lq6BqONi27BbmSEKOOKA",
    },
  },
  // themeColor: {
  //   blue: "#2196f3",
  //   red: "#f26d6d",
  //   orange: "#f39c12",
  //   pruple: "#8e44ad",
  //   black: "#2c3e50",
  //   grey: "#7f8c8d",
  // },

  navbar,
  sidebar,
  // displayFooter: true,
  // copyright: true,
  // footer: "MIT Licensed | Copyright © 2022-present Coder-New",
  // blog: {
  //   description: "少年易学老难成，一寸光阴不可轻。",
  //   // intro: "/intro.html",
  // },
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  plugins: {
    blog: {
      excerptLength: 0,
      excerpt: false,
    },
    git: {
      createdTime: false,
      updatedTime: false,
    },
    comment: {
      provider: "Giscus",
      repo: "xinyang424/xinyang424.github.io",
      repoId: "R_kgDOJjCisQ",
      category: "Q&A",
      categoryId: "DIC_kwDOJjCisc4CWfGK",

      // copyright: false,
      // reaction: true,
      // provider: "Waline",
      // serverURL: "https://blog.waline.coder-new.cn/",
    },
    searchPro: true,

    mdEnhance: {
      align: true,
      attrs: true,
      codetabs: true,
      component: true,
      demo: true,
      figure: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      // revealJs: true,
      // 在启用之前安装 chart.js
      // chart: true,

      // insert component easily

      // 在启用之前安装 echarts
      // echarts: true,

      // 在启用之前安装 flowchart.ts
      // flowchart: true,

      // gfm requires mathjax-full to provide tex support
      // gfm: true,

      // 在启用之前安装 katex
      // katex: true,

      // 在启用之前安装 mathjax-full
      // mathjax: true,

      // 在启用之前安装 mermaid
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // 在启用之前安装 reveal.js
      // revealJs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },

      // 在启用之前安装 @vue/repl
      // vuePlayground: true,

      // install sandpack-vue3 before enabling it
      // sandpack: true,
    },
    copyCode: {
      showInMobile: true,
    },
    components: {
      components: ["BiliBili", "PDF"],
      componentOptions: {
        fontIcon: {
          prefix: "iconfont icon-",
          assets: "/iconfont/iconfont.css",
        },
      },
    },
    copyright: {
      author: "XinYang",
    },
  },
});
