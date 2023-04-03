/** @format */

import { hopeTheme } from "vuepress-theme-hope";
import { path } from "@vuepress/utils";
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
  repo: "coder-new-web/coder-new-blog",
  docsDir: "src",

  blog: {
    medias: {
      BiliBili:"https://space.bilibili.com/409568858?spm_id_from=333.1007.0.0",
      GitHub: "https://github.com/coder-new-web",
      QQ:"http://wpa.qq.com/msgrd?v=3&uin=2578417052&site=qq&menu=yes",
      Yuque: [
        // 链接
        "https://www.yuque.com/coder-new/web",
        // 图标地址
        path.resolve(__dirname, "public/yuque.svg"),
      ],
    },
  },
  themeColor: {
    blue: "#2196f3",
    red: "#f26d6d",
    green: "#27ae60",
    orange: "#f39c12",
  },

  locales: {
    "/": {
      navbar: zhNavbar,
      sidebar: zhSidebar,
      displayFooter: true,
      copyright: false,
      footer: "MIT Licensed | Copyright © 2022-present Coder-New",
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
    },
    comment: {
      provider: "Waline",
      serverURL: "https://blog.waline.coder-new.cn/",
      copyright: false,
      reaction: true,
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
          // assets: "iconfont",
          assets: "//at.alicdn.com/t/c/font_3974296_k0kt1zp9es.css",
        },
      },
    },
    copyright: {
      author: "Coder-New",
    },
  },
});
