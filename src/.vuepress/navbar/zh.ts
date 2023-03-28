/** @format */

import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "知识笔记",
    icon: "editor",
    children: [
      {
        text: "前端笔记",
        icon: "template",
        link: "/web-note/",
      },
      {
        text: "后端笔记",
        icon: "back-stage",
        link: "/back-note/",
      },
      {
        text: "运维笔记",
        icon: "network",
        link: "/devops-note/",
      },
      {
        text: "其它杂记",
        icon: "physics",
        link: "/other-note/",
      },
    ],
  },
  {
    text: "bug记录",
    icon: "debug",
    link: "/bug-record/",
  },
  {
    text: "软件教程",
    icon: "software",
    link: "/software/",
  },
]);
