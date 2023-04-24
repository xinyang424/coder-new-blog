/** @format */

import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "知识笔记",
    icon: "note",
    children: [
      {
        text: "前端笔记",
        icon: "web",
        link: "/web/",
      },
      {
        text: "后端笔记",
        icon: "server",
        link: "/back/",
      },
      {
        text: "运维笔记",
        icon: "devops",
        link: "/devops/",
      },
      // {
      //   text: "算法笔记",
      //   icon: "calculation",
      //   link: "/calculate/",
      // },
      {
        text: "记八股文",
        icon: "talk",
        link: "/interview/",
      },
      {
        text: "其它杂记",
        icon: "other",
        link: "/other/",
      },
    ],
  },
  {
    text: "bug记录",
    icon: "debug",
    link: "/bug/",
  },
  {
    text: "软件教程",
    icon: "software",
    link: "/software/",
  },
]);
