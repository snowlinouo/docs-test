import Unocss from 'unocss/vite'
import MarkdownItFootnote from 'markdown-it-footnote'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, HeadConfig } from 'vitepress'
import { colorPreviewPlugin } from './theme/markdown/colorPreview'
import { cardPlugin } from './theme/markdown/card'
import { figure } from '@mdit/plugin-figure'
import { imgSize, obsidianImageSize } from '@mdit/plugin-img-size'
import { mark } from '@mdit/plugin-mark'
import { sub } from '@mdit/plugin-sub'
import { sup } from '@mdit/plugin-sup'

export const isProd = process.env.NODE_ENV === 'production'
export const commitRef = process.env.COMMIT_REF?.slice(0, 8) || 'dev'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  // base: "/Snowlin-VitePress/",
  title: "雪鈴的窩",
  description: "一個溫暖的地方",
  head: [["link", { rel: "icon", href: "/imgs/logo.png" }]],
  themeConfig: {
    outlineTitle: '本頁目錄',
    outline: [1, 2],
    lastUpdatedText: '更新日期',
    logo: '/imgs/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首頁', link: '/' },
      { text: '範例', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '演示 1',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: '光遇 Bug', link: '/sky-bug' }
        ]
      },
      {
        text: '演示 2',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜尋',
            buttonAriaLabel: '搜尋',
          },
          modal: {
            noResultsText: '無法找到相關項目',
            resetButtonTitle: '清除查詢條件',
            footer: {
              selectText: '選擇',
              navigateText: '切換',
              closeText: '關閉',
            },
          },
        },
      },
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

    footer: {
      copyright: "Copyright @ 2024 SnowLin",
    }
  },
  ignoreDeadLinks: [
    // ignore exact url "/playground"
    '/playground',
    // ignore all localhost links
    /^https?:\/\/localhost/,
    // ignore all links include "/repl/""
    /\/repl\//,
    // custom function, ignore all links include "ignore"
    (url) => {
      return url.toLowerCase().includes('ignore')
    },
  ],
  vite: {
    server: {
      host: true,
      fs: {
        allow: ['../..'],
      },
    },
    resolve: {
      alias: [
        {
          find: /^.*\/VPFooter\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/Footer.vue', import.meta.url),
          ),
        },
      ],
    },
    plugins: [
      // https://github.com/antfu/unocss
      Unocss(),
    ],
    json: {
      stringify: true,
    },
  },
  markdown: {
    image: {
      lazyLoading: true,
    },
    config(md) {
      md.use(MarkdownItFootnote)
      md.use(colorPreviewPlugin)
      md.use(cardPlugin)
      md.use(sub)
      md.use(sup)
      md.use(mark)
      md.use(imgSize)
      md.use(obsidianImageSize)
      md.use(figure)
    },
  },
})