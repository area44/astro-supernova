import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  site: process.env.CI ? 'https://area4.github.io' : 'http://localhost:4321',
  base: '/starlight-tailwind-template',
  experimental: {
    contentCollectionCache: true,
  },
  integrations: [
    starlight({
      title: 'Starlight with Tailwind',
      social: {
        github: 'https://github.com/withastro/starlight',
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
      customCss: ['./src/styles/globals.css'],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
})
