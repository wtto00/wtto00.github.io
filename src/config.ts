type Site = {
  website: string
  author: string
  desc: string
  title: string
  postPerPage: number
}

export const SITE: Site = {
  website: 'https://wtto00.github.io',
  author: 'wtto',
  desc: 'Record some issues encountered in daily work.',
  title: "WTTO'S BLOG",
  postPerPage: 6,
}

export const LOCALE = ['zh-CN']

type SocialObjects = {
  name: string
  href: string
  active: boolean
  linkTitle: string
}[]
export const SOCIALS: SocialObjects = [
  {
    name: 'Github',
    href: 'https://github.com/wtto00/Blog',
    linkTitle: `${SITE.title} on Github`,
    active: true,
  },
  {
    name: 'Mail',
    href: 'mailto:wtto00@outlook.com',
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
]
