import { baseHelper } from '../theme/utils'
import { socialList } from '../theme/composables/socialList'
import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'
import type { CustomConfig } from './types'

export const META_URL = 'https://testdocs.snowlinlan.com/'
export const META_TITLE = '雪鈴的窩'
export const META_DESCRIPTION = '一個溫暖的地方'
export const META_KEYWORDS =
  '雪鈴, SnowLin'
export const META_IMAGE = 'https://testdocs.snowlinlan.com/imgs/logo.jpg'
export const LOCAL_CODE = 'zh-TW'
export const LOCAL_BASE = ''

export const Config: LocaleSpecificConfig<
  DefaultTheme.Config & CustomConfig
> = {
  titleTemplate: '雪鈴的窩',
  description: META_DESCRIPTION,
  head: [
    ['meta', { property: 'og:site_name', content: META_TITLE }],
    ['meta', { property: 'og:locale', content: LOCAL_CODE }],
  ],
  themeConfig: {
    siteTitle: '雪鈴的窩',
    keyword: META_KEYWORDS,
    description: META_DESCRIPTION,
    image: META_IMAGE,
    outlineTitle: '本頁目錄',
    outline: [1, 2],
    logo: '/imgs/logo.png',
    lastUpdatedText: '更新日期',
    returnToTopLabel: '回到頂部',
    langMenuLabel: '更改語言',
    sidebarMenuLabel: '選單',
    darkModeSwitchLabel: '主題',
    lightModeSwitchTitle: '切換到淺色模式',
    darkModeSwitchTitle: '切換到深色模式',
    notFound: {
      title: '這個頁面找不到了',
      quote: '404',
      linkLabel: '回到首頁',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/snowlinouo/' },
      { icon: 'youtube', link: 'https://www.youtube.com/c/nightsnowlin' },
      { icon: 'facebook', link: 'https://www.facebook.com/SnowLinOuO' },
      { icon: 'discord', link: 'https://discord.gg/W7P6UFQ' },
      { icon: 'x', link: 'https://twitter.com/nightsnowlin' },
    ],
    docFooter: {
      prev: '上一頁',
      next: '下一頁',
    },
    sidebar: baseHelper(sidebar(), LOCAL_BASE),
    footer: baseHelper(footer(), LOCAL_BASE),
    nav: baseHelper(nav(), LOCAL_BASE),
  },
}

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '首頁',
      link: '/',
    },
    {
      text: '光遇',
      activeMatch: `^/sky/`,
      items: [
        {
          text: '光遇 Bug',
          link: '/sky/sky-bug',
        }
      ],
    },
    {
      text: '測試中頁面',
      items: [
        {
          text: 'Markdown Test Pages',
          link: '/test/markdown-examples',
        }
      ],
    }
  ]
}

function footer(): CustomConfig['footer'] {
  return {
    navigation: [
      {
        title: '關於',
        items: [
          {
            text: '加入我们',
            link: '/join',
          },
          {
            text: '赞助鸣谢',
            link: '/support-us',
          },
          {
            text: '友情链接',
            link: '/friends-links',
          },
        ],
      },
      {
        title: '政策',
        items: [
          {
            text: '免责声明',
            link: '/disclaimer',
          },
          {
            text: '隐私政策',
            link: '/privacy',
          },
          {
            text: '用户协议',
            link: '/agreement',
          },
        ],
      }
    ],
  }
}

function sidebar(): DefaultTheme.SidebarItem[] {
  return {
    // @ts-ignore
    '/sky': [
      {
        text: '目錄',
        link: '/sky/sky-bug',
      },
      {
        text: '使用帮助',
        collapsed: false,
        items: [
          {
            text: '【自动追踪】',
            items: [
              {
                text: '功能介绍',
                link: '',
              },
              {
                text: '疑难解答',
                link: '',
              },
            ],
          }
        ],
      },
    ],
    '/': [
      {
        text: '範例頁面選單',
        collapsed: false,
        items: [
          {
            text: '範例用',
            items: [
              {
                text: '範例 1',
                link: '/test/api-examples',
              },
              {
                text: '範例 2',
                link: '/test/markdown-examples',
              },
            ],
          }
        ],
      },
    ],
  }
}
