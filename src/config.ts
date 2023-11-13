import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://wtto00.github.io/Blog/", // replace this with your deployed domain
  author: "wtto",
  desc: "wtto's blog.",
  title: "WTTO'S BLOG",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 6,
};

export const LOCALE = ["zh-CN"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/wtto00/Blog",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:wtto00@outlook.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  }
];
