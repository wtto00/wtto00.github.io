import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://wtto00.github.io/", // replace this with your deployed domain
  base: '/Blog',
  author: "wtto",
  desc: "Record some issues encountered in daily work.",
  title: "WTTO'S BLOG",
  postPerPage: 6,
};

export const LOCALE = ["zh-CN"]; // set to [] to use the environment default

// assets/logo.svg
export const LOGO_IMAGE = {
  enable: true,
  width: 24,
  height: 24,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/wtto00/Blog",
    linkTitle: `${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:wtto00@outlook.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  }
];
