import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import tailwind from '@astrojs/tailwind'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

const VERCEL_PREVIEW_SITE =
  process.env.VERCEL_ENV !== 'production' &&
  process.env.VERCEL_URL &&
  `https://${process.env.VERCEL_URL}`

const site = VERCEL_PREVIEW_SITE || 'https://area4.github.io'

// https://astro.build/config
export default defineConfig({
  site: process.env.CI ? site : 'http://localhost:4321',
  base: VERCEL_PREVIEW_SITE ? '' : '/starlight-template',
  // experimental: {
  //   contentCollectionCache: true,
  // },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    starlight({
      title: 'Starlight Template',
      customCss: ['./src/styles/globals.css', './src/styles/katex.min.css'],
      social: {
        github: 'https://github.com/AREA44/starlight-template',
      },
      sidebar: [
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
})
