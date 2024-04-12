import Unocss from 'unocss/vite'
import MarkdownItFootnote from 'markdown-it-footnote'
import MarkdownItKbd from 'markdown-it-kbd-better'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, HeadConfig } from 'vitepress'
import { colorPreviewPlugin } from './theme/markdown/colorPreview'
import { cardPlugin } from './theme/markdown/card'
import { figure } from '@mdit/plugin-figure'
import { imgSize, obsidianImageSize } from '@mdit/plugin-img-size'
import { mark } from '@mdit/plugin-mark'
import { sub } from '@mdit/plugin-sub'
import { sup } from '@mdit/plugin-sup'
import { timeline } from './theme/markdown/timeline'

import { Config } from './locales/zh'

export const isProd = process.env.NODE_ENV === 'production'
export const commitRef = process.env.COMMIT_REF?.slice(0, 8) || 'dev'
export const productionHead: HeadConfig[] = [
  [
    'script',
    {
      id: 'clarity-script',
    },
    `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "gx0jeyqvg5")`,
  ],
  [
    'script',
    {
      id: 'application-json',
      type: 'application/ld+json',
    },
    `
    {"@context":"https://schema.org","@type":"WebPage","name":"SnowLin Web"}`,
  ],
]

export default defineConfig({
  srcDir: 'src',
  outDir: './dist',
  srcExclude: [],
  scrollOffset: 'header',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://docs.snowlinlan.com',
  },
  themeConfig: {
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
    footer: {
      copyright: "Copyright @ 2024 SnowLin",
    }
  },
  locales: {
    root: {
      label: '中文',
      lang: 'zh-TW',
      link: '/',
      ...Config,
    }
  },
  head: [
    [
      'meta',
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,viewport-fit=cover',
      },
    ],
    [
      'meta',
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'lack-translucent',
      },
    ],
    [
      'meta',
      {
        name: 'applicable-device',
        content: 'pc,mobile',
      },
    ],
    [
      'meta',
      {
        name: 'google',
        content: 'notranslate',
      },
    ],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'color-scheme', content: 'dark light' }],
    [
      'link',
      {
        rel: 'icon',
        href: `https://docs.snowlinlan.com/imgs/logo.png`,
        type: 'image/png',
      },
    ],
    [
      'link',
      {
        rel: 'alternate',
        hreflang: 'zh',
        href: 'https://docs.snowlinlan.com',
      },
    ],
    [
      'link',
      {
        rel: 'alternate',
        href: `https://docs.snowlinlan.com/feed.rss`,
        type: 'application/rss',
      },
    ],
    [
      'link',
      {
        rel: 'alternate',
        href: `https://docs.snowlinlan.com/imgs/logo.png`,
        type: 'image/x-icon',
      },
    ],
    ...(isProd ? productionHead : []),
  ],
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
  transformHead(content) {
    const { pageData, siteConfig } = content
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push([
      'meta',
      {
        name: 'og:url',
        content: `https://docs.snowlinlan.com/${
          siteConfig.site.base
        }${pageData.relativePath.replace('.md', '')}`,
      },
    ])
    pageData.frontmatter.head.push([
      'meta',
      {
        name: 'twitter:url',
        content: `https://docs.snowlinlan.com/${
          siteConfig.site.base
        }${pageData.relativePath.replace('.md', '')}`,
      },
    ])
    pageData.frontmatter.head.push([
      'meta',
      {
        name: 'og:title',
        content: pageData.frontmatter.title
          ? pageData.frontmatter.title
          : 'SnowLin',
      },
    ])
    pageData.frontmatter.head.push([
      'meta',
      {
        name: 'twitter:title',
        content: pageData.frontmatter.title
          ? pageData.frontmatter.title
          : 'SnowLin',
      },
    ])
    pageData.frontmatter.head.push([
      'meta',
      {
        name: 'og:description',
        content: pageData.frontmatter.description
          ? pageData.frontmatter.description
          : `溫暖且有地舖的窩`,
      },
    ])
    pageData.frontmatter.head.push([
      'meta',
      {
        name: 'twitter:description',
        content: pageData.frontmatter.description
          ? pageData.frontmatter.description
          : `溫暖且有地舖的窩`,
      },
    ])
    pageData.frontmatter.head.push([
      'meta',
      {
        name: 'description',
        content: pageData.frontmatter.description
          ? pageData.frontmatter.description
          : `溫暖且有地舖的窩`,
      },
    ])
    pageData.frontmatter.head.push([
      'meta',
      {
        name: 'keywords',
        content: pageData.frontmatter.keywords
          ? pageData.frontmatter.keywords
          : '雪鈴, SnowLin',
      },
    ])
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
      md.use(timeline)
      md.use(MarkdownItKbd, {
        presets: [
          {
            name: 'icons',
          },
        ],
      })
    },
  },
})
