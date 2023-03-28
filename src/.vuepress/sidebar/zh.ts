/** @format */

import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/web-note/": [
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
      text: "插件",
      icon: "npm",
      prefix: "npm/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "实用技巧",
      icon: "write",
      prefix: "practical-skills/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "配置文件",
      icon: "config",
      prefix: "config-file/",
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
  "/back-note/": [
    "",
    {
      text: "数据库",
      icon: "storage",
      prefix: "database/",
      collapsible: true,
      children: "structure",
    },
  ],
  "/devops-note/": [
    "",
    {
      text: "运维",
      icon: "rss",
      prefix: "devops/",
      collapsible: true,
      children: "structure",
    },
  ],

  "/other-note/": [
    "",
    {
      text: "GitHub",
      icon: "github",
      prefix: "github/",
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
    {
      text: "其它",
      icon: "info",
      prefix: "other/",
      collapsible: true,
      children: "structure",
    },
  ],
  "/bug-record/": [
    "",
    {
      text: "GitHub",
      icon: "github",
      prefix: "github/",
      collapsible: true,
      children: "structure",
    },
  ],
  "/software/": [
    "",
    {
      text: "GitHub",
      icon: "github",
      prefix: "github/",
      collapsible: true,
      children: "structure",
    },
  ],
});
