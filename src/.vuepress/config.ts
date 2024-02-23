import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { viteBundler } from "@vuepress/bundler-vite";

// import { searchProPlugin } from "vuepress-plugin-search-pro";
export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "杨不旧",
  description: "杨不旧的博客",
  theme,
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
  // plugins: [
  //   searchProPlugin({
  //     indexContent: true,
  //     customFields: [
  //       {
  //         getter: ({ frontmatter }) => frontmatter.category as string[],
  //         formatter: "分类：$content",
  //       },
  //     ],
  //   }),
  // ],
});
