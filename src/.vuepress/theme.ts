/** @format */

import { hopeTheme } from "vuepress-theme-hope";
import { zhNavbar } from "./navbar/zh";
import { zhSidebar } from "./sidebar/zh";

export default hopeTheme({
	hostname: "https://github.com/coder-new-web",

	author: {
		name: "Coder-New",
		url: "https://www.coder-new.cn",
	},
	iconAssets: "iconfont",
	logo: "/logo.svg",
	repo: "coder-new-web/coder-new-blog",
	docsDir: "src",

	blog: {
		medias: {
			Baidu: "https://www.baidu.com",
		},
	},

	locales: {
		"/": {
			navbar: zhNavbar,
			sidebar: zhSidebar,
			footer: "",
			displayFooter: true,
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
		blog: true,

		comment: {
			// provider: "Giscus",
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
	},
});
