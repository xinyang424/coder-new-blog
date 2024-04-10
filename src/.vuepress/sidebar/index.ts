import { sidebar } from "vuepress-theme-hope";

export default sidebar({
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
      text: "JavaScript",
      icon: "javascript",
      prefix: "javascript/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "TypeScript",
      icon: "typescript",
      prefix: "typescript/",
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
      text: "小程序",
      icon: "miniprogram",
      prefix: "miniprogram/",
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
      text: "GitHub",
      icon: "github",
      prefix: "github/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "Cookbook",
      icon: "cookbook",
      prefix: "cookbook/",
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
      text: "Markdown",
      icon: "markdown",
      prefix: "markdown/",
      collapsible: true,
      children: "structure",
    },
  ],
  "/back/": "structure",
  "/devops/": "structure",

  "/interview/": "structure",
  "/calculate/": "structure",

  "/life/": "structure",
  "/bug/": "structure",
  "/software/": "structure",
  "/en/": "structure",
  "/fitness/": "structure",
  "/about/": "structure",
  "/poetry/": "structure",
});