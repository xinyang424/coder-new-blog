/** @format */

import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
	"/note/": [
		"",
		{
			text: "Vue2",
			icon: "vue",
			prefix: "vue2/",
			collapsible: true,
			children: "structure",
		},
		{
			text: "Vue3",
			icon: "vue",
			prefix: "vue3/",
			collapsible: true,
			children: "structure",
		},
		{
			text: "网络与网络安全",
			icon: "network",
			prefix: "network/",
			collapsible: true,
			children: "structure",
		},
		{
			text: "算法",
			icon: "calculate",
			prefix: "algorithm/",
			collapsible: true,
			children: "structure",
		},
		{
			text: "面试题",
			icon: "group",
			prefix: "interview/",
			collapsible: true,
			children: "structure",
		},
	],
});
