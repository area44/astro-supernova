import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import tailwind from '@astrojs/tailwind'
import remarkMath from 'remark-math'
import rehypeMathJax from 'rehype-mathjax'

// https://astro.build/config
export default defineConfig({
  site: process.env.CI ? 'https://area4.github.io' : 'http://localhost:4321',
  base: '/starlight-tailwind-template',
  // experimental: {
  //  contentCollectionCache: true,
  // },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathJax],
  },
  integrations: [
    starlight({
      title: 'Starlight with Tailwind',
      customCss: [
        './src/styles/globals.css',
        './src/styles/mathjax.css',
      ],
      social: {
        github: 'https://github.com/AREA44/starlight-tailwind-template',
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
