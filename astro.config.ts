import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import tailwind from '@astrojs/tailwind'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeMermaid from 'rehype-mermaid'
import rehypeExternalLinks from 'rehype-external-links'

// https://astro.build/config
export default defineConfig({
  site: process.env.CI ? 'https://area44.github.io' : 'http://localhost:4321',
  base: '/playastro',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeHeadingIds,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
      rehypeKatex,
      rehypeMermaid,
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noopener'],
          content: { type: 'text', value: '↗' },
          contentProperties: { 'aria-hidden': true, class: 'no-select' },
        },
      ],
    ],
  },
  integrations: [
    starlight({
      title: 'PlayAstro',
      description: 'Play with Astro',
      customCss: [
        './src/styles/globals.css',
        './src/styles/headings.css',
        'katex/dist/katex.min.css',
        './src/styles/mermaid.css',
      ],
      components: {
        Head: './src/components/Head.astro',
      },
      social: {
        github: 'https://github.com/AREA44/playastro',
      },
      editLink: {
        baseUrl: 'https://github.com/AREA44/playastro/blob/main/',
      },
      sidebar: [
        {
          label: 'Home',
          link: '/',
        },
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
      ],
      credits: true,
    }),
    tailwind({ applyBaseStyles: false }),
  ],
})
