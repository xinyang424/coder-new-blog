/** @format */

import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";
export default defineUserConfig({
	base: "/",

	locales: {
		"/": {
			lang: "zh-CN",
			title: "Coder-New",
			description: "coder-new 的博客",
		},
	},
	theme,
	plugins: [
		searchProPlugin({
			indexContent: true,
			customFields: [
				{
					getter: ({ frontmatter }) => frontmatter.category as string[],
					formatter: "分类：$content",
				},
				// {
				// 	getter: ({ frontmatter }) => frontmatter.tag as string[],
				// 	formatter: "标签：$content",
				// },
			],
		}),
	],
});
