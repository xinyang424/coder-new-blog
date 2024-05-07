import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "前端笔记",
    icon: "web",
    link: "/web/",
  },
  // {
  //   text:"后端笔记",
  //   icon:"server",
  //   link:"/back/"
  // },
  {
    text: "运维笔记",
    icon: "devops",
    link: "/devops/",
  },
  {
    text: "软件合集",
    icon: "software",
    link: "/software/",
  },
  {
    text: "英文词句",
    icon: "words",
    link: "/en/",
  },
  {
    text: "诗歌散文",
    icon: "poetry",
    link: "/poetry/",
  },
  {
    text: "关于",
    icon: "more",
    children: [
      {
        text: "关于我",
        icon: "me",
        link: "/about/about-me",
      },
      {
        text: "关于本站",
        icon: "about-website",
        link: "/about/about-website",
      },
    ],
  },
  // {
  //   text: "知识笔记",
  //   icon: "note",
  //   children: [
  //     {
  //       text: "前端笔记",
  //       icon: "web",
  //       link: "/web/",
  //     },
  //     {
  //       text: "后端笔记",
  //       icon: "server",
  //       link: "/back/",
  //     },
  //     {
  //       text: "运维笔记",
  //       icon: "devops",
  //       link: "/devops/",
  //     },
  //     // {
  //     //   text: "算法笔记",
  //     //   icon: "calculation",
  //     //   link: "/calculate/",
  //     // },
  //     // {
  //     //   text: "记八股文",
  //     //   icon: "talk",
  //     //   link: "/interview/",
  //     // },
  //     {
  //       text: "英文词句",
  //       icon: "words",
  //       link: "/en/",
  //     },
  //     {
  //       text: "诗歌散文",
  //       icon: "poetry",
  //       link: "/poetry/",
  //     },
  //     // {
  //     //   text: "健身笔记",
  //     //   icon: "fitness",
  //     //   link: "/fitness/",
  //     // },
  //     {
  //       text: "生活随记",
  //       icon: "life",
  //       link: "/life/",
  //     },
  //   ],
  // },
  // {
  //   text: "bug记录",
  //   icon: "debug",
  //   link: "/bug/",
  // },
  // {
  //   text: "软件教程",
  //   icon: "software",
  //   link: "/software/",
  // },
]);
