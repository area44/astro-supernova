// @ts-check
import starlight from "@astrojs/starlight";
import mermaid from "astro-mermaid";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import starlightLinksValidator from "starlight-links-validator";

import { rehypeExternalLinks } from "./src/plugins/rehype-external-links";
import { remarkReadingTime } from "./src/plugins/remark-reading-time";

// https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables
const site = process.env.NETLIFY
  ? process.env.CONTEXT === "production"
    ? "https://astro-supernova.netlify.app"
    : process.env.DEPLOY_PRIME_URL || process.env.URL
  : (process.env.SITE ?? "http://localhost:4321");

const base = process.env.BASE || "/";

// https://astro.build/config
export default defineConfig({
  site,
  base,
  markdown: {
    syntaxHighlight: {
      type: "shiki",
      excludeLangs: ["mermaid", "math"],
    },
    remarkPlugins: [remarkMath, remarkReadingTime],
    rehypePlugins: [rehypeKatex, rehypeExternalLinks()],
  },
  integrations: [
    mermaid(),
    starlight({
      routeMiddleware: "./src/routeData.ts",
      title: "Supernova",
      description: "Play with Astro",
      customCss: ["./src/styles/global.css", "katex/dist/katex.min.css"],
      components: {
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
          label: "Astro Recipes",
          autogenerate: { directory: "astro" },
        },
        {
          label: "Starlight Recipes",
          autogenerate: { directory: "starlight" },
        },
      ],
      lastUpdated: true,
      credits: true,
      plugins: [starlightLinksValidator()],
    }),
  ],
});
