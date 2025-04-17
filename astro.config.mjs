// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import rehypeMermaid from "rehype-mermaid";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import starlightLinksValidator from "starlight-links-validator";
import { remarkReadingTime } from "./plugins/remark-reading-time.mjs";

// https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables
const site =
  process.env.CONTEXT !== "production" && process.env.DEPLOY_PRIME_URL
    ? process.env.DEPLOY_PRIME_URL
    : "https://astro-supernova.netlify.app";

// https://astro.build/config
export default defineConfig({
  site,
  markdown: {
    syntaxHighlight: {
      type: "shiki",
      excludeLangs: ["mermaid", "math"],
    },
    remarkPlugins: [remarkMath, remarkReadingTime],
    rehypePlugins: [
      rehypeSlug,
      rehypeKatex,
      rehypeMermaid,
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["nofollow", "noopener"],
          content: { type: "text", value: " ↗" },
        },
      ],
    ],
  },
  integrations: [
    starlight({
      title: "Supernova",
      description: "Play with Astro",
      customCss: ["katex/dist/katex.min.css"],
      components: {
        Head: "./src/components/Head.astro",
        PageTitle: "./src/components/PageTitle.astro",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/AREA44/astro-supernova",
        },
      ],
      editLink: {
        baseUrl: "https://github.com/AREA44/astro-supernova/blob/main/",
      },
      sidebar: [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "Recipes",
          autogenerate: { directory: "recipes" },
        },
      ],
      lastUpdated: true,
      credits: true,
      plugins: [starlightLinksValidator()],
    }),
  ],
});
