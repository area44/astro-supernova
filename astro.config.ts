import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import tailwind from '@astrojs/tailwind'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

// https://astro.build/config
export default defineConfig({
  site: process.env.CI ? 'https://area4.github.io' : 'http://localhost:4321',
  base: '/playastro',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    starlight({
      title: 'Playastro',
      customCss: ['./src/styles/globals.css', 'katex/dist/katex.min.css'],
      social: {
        github: 'https://github.com/AREA44/playastro',
      },
      sidebar: [
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
      ],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
})
