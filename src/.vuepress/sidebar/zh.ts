/** @format */

import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
	"/note": [
		"",
		{
			text: "Vue2",
			icon: "creative",
			prefix: "demo/",
			link: "demo/",
			children: "structure",
		},
		{
			text: "Vue3",
			icon: "creative",
			prefix: "demo/",
			link: "demo/",
			children: "structure",
		},
		{
			text: "网络与网络安全",
			icon: "note",
			prefix: "posts/",
			children: "structure",
		},
		{
			text: "算法",
			icon: "note",
			prefix: "posts/",
			children: "structure",
		},
		{
			text: "面试题",
			icon: "note",
			prefix: "posts/",
			children: "structure",
		},
	],
});
