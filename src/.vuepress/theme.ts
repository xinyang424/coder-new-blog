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
      GitHub: "https://github.com/coder-new-web",
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
        description: "总结自己的经验进步，吸取别人的教训避坑。",
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
    components: {
      components: ["BiliBili"],
      componentOptions: {
        fontIcon: {
          // assets: "iconfont",
          assets: "//at.alicdn.com/t/c/font_3974296_ncur3t0r2af.css",
        },
      },
    },
    copyright: {
      author: "Coder-New",
    },
  },
});
