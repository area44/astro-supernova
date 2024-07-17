import starlight from '@astrojs/starlight'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import rehypeMermaid from 'rehype-mermaid'
import rehypeSlug from 'rehype-slug'
import remarkMath from 'remark-math'
import { rehypeAutolink } from './plugins/rehype-autolink'
import { remarkReadingTime } from './plugins/remark-reading-time.mjs'

// https://astro.build/config
export default defineConfig({
  site: process.env.CI ? 'https://area44.github.io' : 'http://localhost:4321',
  base: '/astro-supernova',
  markdown: {
    remarkPlugins: [remarkMath, remarkReadingTime],
    rehypePlugins: [
      rehypeSlug,
      ...rehypeAutolink(),
      rehypeKatex,
      rehypeMermaid,
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noopener'],
          content: { type: 'text', value: ' ↗' },
        },
      ],
    ],
  },
  integrations: [
    starlight({
      title: 'Supernova',
      description: 'Play with Astro',
      customCss: [
        './src/styles/globals.css',
        './src/styles/headings.css',
        'katex/dist/katex.min.css',
        './src/styles/mermaid.css',
      ],
      components: {
        Head: './src/components/Head.astro',
        PageTitle: './src/components/PageTitle.astro',
      },
      social: {
        github: 'https://github.com/AREA44/astro-supernova',
      },
      editLink: {
        baseUrl: 'https://github.com/AREA44/astro-supernova/blob/main/',
      },
      sidebar: [
        {
          label: 'Home',
          link: '/',
        },
        {
          label: 'Recipes',
          autogenerate: { directory: 'recipes' },
        },
      ],
      lastUpdated: true,
      credits: true,
    }),
    tailwind({ applyBaseStyles: false }),
  ],
})
