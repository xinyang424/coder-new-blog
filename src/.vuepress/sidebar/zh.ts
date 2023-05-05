/** @format */

import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/web/": [
    "",
    {
      text: "HTML",
      icon: "html",
      prefix: "html/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "CSS",
      icon: "css",
      prefix: "css/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "script",
      icon: "javascript",
      prefix: "script/",
      collapsible: true,
      children: "structure",
    },
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
      text: "React",
      icon: "react",
      prefix: "react/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "移动开发",
      icon: "mobile-dev",
      prefix: "mobile-dev/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "桌面应用",
      icon: "desktop-dev",
      prefix: "desktop-dev/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "插件",
      icon: "npm",
      prefix: "npm/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "微前端",
      icon: "micro-web",
      prefix: "micro-web/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "实用技巧",
      icon: "skills",
      prefix: "practical-skills/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "配置文件",
      icon: "code-file",
      prefix: "config-file/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "包管理工具",
      icon: "package",
      prefix: "package-manage-tools/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "构建工具",
      icon: "build-tools",
      prefix: "build-tools/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "版本管理工具",
      icon: "version-control",
      prefix: "version-management-tools/",
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
  ],
  "/back/": [
    "",
    {
      text: "数据库",
      icon: "database",
      prefix: "database/",
      collapsible: true,
      children: "structure",
    },
  ],
  "/devops/": [
    "",
    {
      text: "https实现",
      icon: "lock",
      prefix: "https/",
      collapsible: true,
      children: "structure",
    },
  ],

  "/interview/": "structure",
  "/calculate/": "structure",

  "/other/": [
    "",
    {
      text: "GitHub",
      icon: "github",
      prefix: "github/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "未分类",
      icon: "unknown",
      prefix: "other/",
      collapsible: true,
      children: "structure",
    },
  ],
  "/bug/": "structure",
  "/software/": "structure",
  "/en/": "structure",
});
