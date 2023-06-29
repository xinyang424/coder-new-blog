/** @format */

import { hopeTheme } from "vuepress-theme-hope";
import { zhNavbar } from "./navbar/zh";
import { zhSidebar } from "./sidebar/zh";
export default hopeTheme({
  hostname: "https://github.com/coder-new-web",

  author: {
    name: "Coder-New",
    url: "https://blog.coder-new.cn",
  },
  fullscreen: true,
  print: false,
  logo: "/logo.svg",
  repo: "coder-new-web/coder-new-web.github.io",
  // docsDir: "src",

  blog: {
    medias: {
      GitHub: "https://github.com/coder-new-web",
      BiliBili: "https://space.bilibili.com/409568858?spm_id_from=333.1007.0.0",
      QQ: "http://wpa.qq.com/msgrd?v=3&uin=2578417052&site=qq&menu=yes",
      Gmail: "mailto:xinyang424@gmail.com",
      Email: "https://wx.mail.qq.com/home/index?t=readmail_businesscard_midpage&nocheck=true&name=%E6%9D%A8%E6%96%B0&icon=https%3A%2F%2Fp.qlogo.cn%2Fqqmail_head%2FBkBjDTOZTuwDOcyvCy2I1B6zbGSkls5zqHIyibStOeqCDQia3zH2Nlgjdd3pibS09TD%2F160&mail=xinyang424%40qq.com&code=FwUG9hkLKs-dHLjnuWFlkk14SMS1VLiQ_XBJqksBPYpKOi6fWFNZbmUlTJGRZOMz10Lq6BqONi27BbmSEKOOKA",
    },
  },
  themeColor: {
    blue: "#2196f3",
    red: "#f26d6d",
    orange: "#f39c12",
    pruple: "#8e44ad",
    black: "#2c3e50",
    grey: "#7f8c8d",
  },

  locales: {
    "/": {
      navbar: zhNavbar,
      sidebar: zhSidebar,
      // displayFooter: true,
      copyright: false,
      // footer: "MIT Licensed | Copyright © 2022-present Coder-New",
      blog: {
        description: "少年易学老难成，一寸光阴不可轻。",
        // intro: "/intro.html",
      },
      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },
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
      // provider: "Giscus",
      // repo: "coder-new-web/coder-new-blog",
      // repoId: "R_kgDOJJPrYg",
      // category: "General",
      // categoryId: "DIC_kwDOJJPrYs4CU3IN",

      copyright: false,
      reaction: true,
      provider: "Waline",
      serverURL: "https://blog.waline.coder-new.cn/",
      search: false,
    },

    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
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
      vuePlayground: true,
    },
    copyCode: {
      showInMobile: true,
    },
    components: {
      components: ["BiliBili"],
      componentOptions: {
        fontIcon: {
          prefix: "iconfont icon-",
          assets: "/iconfont/iconfont.css",
        },
      },
    },
    copyright: {
      author: "Coder-New",
    },
  },
});
