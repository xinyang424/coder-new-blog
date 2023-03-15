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
	fullscreen: true,
	print:false,
	iconAssets: "iconfont",
	logo: "/logo.svg",
	repo: "coder-new-web/coder-new-blog",
	docsDir: "src",

	blog: {
		medias: {
			Baidu: "https://www.baidu.com",
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
			excerptLength:0
		},
		comment: {
			provider: "Waline",
			serverURL: "blog.coder-new.cn",
			// provider: "Giscus",
			// repo: "coder-new-web/coder-new-blog",
			// repoId: "R_kgDOJJPrYg",
			// category: "General",
			// categoryId: "DIC_kwDOJJPrYs4CU3IN",
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
