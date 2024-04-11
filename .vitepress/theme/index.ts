import { onMounted, watch, nextTick, defineAsyncComponent, h } from 'vue'
import { useRoute, useData } from 'vitepress'
import { VPBadge } from 'vitepress/theme-without-fonts'
import mediumZoom from 'medium-zoom'
import DefaultTheme from 'vitepress/theme-without-fonts'
import Link from './components/Link.vue'
import Coins from './components/Coins.vue'
import googleAnalytics from '../plugins/googleAnalytics'
import Card from '../theme/components/Card'
import LinkGrid from '../theme/components/LinkGrid.vue'
import { createPinia } from 'pinia'
import DocAside from './components/DocAside.vue'
import DocHeader from './components/DocHeader.vue'

import type { Theme } from 'vitepress'

import 'uno.css'
import './styles/vars.css'
import './styles/main.css'
import './styles/timeline.css'
import './styles/kbd.css'

const pinia = createPinia()

export default {
  ...DefaultTheme,

  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () =>
        h(defineAsyncComponent(() => import('./components/Banner.vue'))),
      'doc-before': () => h(DocHeader),
      'aside-outline-after': () => h(DocAside),
    })
  },
  enhanceApp({ app }) {
    googleAnalytics({
      id: 'G-XSVZ1SQKJK',
      debug: false,
    })
    app.use(pinia)
    app.component('Link', Link)
    app.component('Coins', Coins)
    app.component('Card', Card)
    app.component('LinkGrid', LinkGrid)
    app.component('Badge', VPBadge)
  },
  setup() {
    const route = useRoute()
    const { lang } = useData()

    onMounted(() => {
      initZoom()
      loadFont()
    })
    watch(
      () => route.path,
      () =>
        nextTick(() => {
          initZoom()
        }),
    )
  },
} satisfies Theme

const loadFont = () => {
  const font = new FontFace('zh-cn-full', 'url(/docs/fonts/zh-cn-full.ttf)', {
    display: 'swap',
  })

  document.fonts.add(font)
  font.load().then((e) => {
    console.log(e)
    document.documentElement.classList.toggle('font-full')
  })
}

const initZoom = () => {
  mediumZoom('.main img:not(.no-zoomable)', {
    background: 'var(--vp-c-bg)',
  })
}
