/** @format */

import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

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
});
